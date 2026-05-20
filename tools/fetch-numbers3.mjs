import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const defaultSourceUrl = "https://znlandstar.com/Numbers3/DownLoadCsv";
const outputPath = path.resolve("data", "numbers3-latest100.json");

const args = new Map(
  process.argv
    .slice(2)
    .map((arg) => {
      const [key, ...value] = arg.split("=");
      return [key, value.join("=")];
    }),
);

const sourceUrl = args.get("--source") || defaultSourceUrl;
const limit = Number(args.get("--limit") || 100);

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell);
  if (row.some((value) => value.trim())) rows.push(row);
  return rows;
}

function normalizeDate(value) {
  const [year, month, day] = String(value || "").trim().split("/");
  if (!year || !month || !day) return "";
  return `${year.padStart(4, "0")}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function toDrawRecord(row, headers) {
  const drawNo = Number(row[headers.get("回別")]);
  const number = String(row[headers.get("抽せん数字")] || "").replace(/\D/g, "").padStart(3, "0").slice(-3);
  if (!Number.isFinite(drawNo) || !/^\d{3}$/.test(number)) return null;

  return {
    draw: `第${drawNo}回`,
    date: normalizeDate(row[headers.get("抽選日")]),
    number,
    drawNo,
  };
}

async function main() {
  if (!Number.isInteger(limit) || limit <= 0) {
    throw new Error("--limit must be a positive integer.");
  }

  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch CSV: ${response.status} ${response.statusText}`);
  }

  const rows = parseCsv(await response.text());
  const headerRow = rows.shift();
  if (!headerRow) throw new Error("CSV has no header row.");

  const headers = new Map(headerRow.map((name, index) => [name.trim(), index]));
  for (const required of ["回別", "抽選日", "抽せん数字"]) {
    if (!headers.has(required)) throw new Error(`CSV is missing "${required}".`);
  }

  const records = rows
    .map((row) => toDrawRecord(row, headers))
    .filter(Boolean)
    .sort((a, b) => b.drawNo - a.drawNo)
    .slice(0, limit)
    .map(({ draw, date, number }) => ({ draw, date, number }));

  if (records.length === 0) throw new Error("No valid draw records were parsed.");

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(records, null, 2)}\n`, "utf8");
  console.log(`Wrote ${records.length} records to ${outputPath}`);
  console.log(`Latest: ${records[0].draw} ${records[0].date} ${records[0].number}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
