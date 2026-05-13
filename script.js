const demoDraws = [
  ["第6607回", "2026-05-12", "394"],
  ["第6606回", "2026-05-11", "628"],
  ["第6605回", "2026-05-10", "177"],
  ["第6604回", "2026-05-09", "042"],
  ["第6603回", "2026-05-08", "905"],
  ["第6602回", "2026-05-07", "551"],
  ["第6601回", "2026-05-06", "286"],
  ["第6600回", "2026-05-05", "730"],
  ["第6599回", "2026-05-04", "444"],
  ["第6598回", "2026-05-03", "819"],
  ["第6597回", "2026-05-02", "063"],
  ["第6596回", "2026-05-01", "592"],
  ["第6595回", "2026-04-30", "116"],
  ["第6594回", "2026-04-29", "248"],
  ["第6593回", "2026-04-28", "970"],
  ["第6592回", "2026-04-27", "335"],
  ["第6591回", "2026-04-26", "681"],
  ["第6590回", "2026-04-25", "204"],
  ["第6589回", "2026-04-24", "777"],
  ["第6588回", "2026-04-23", "459"],
  ["第6587回", "2026-04-22", "020"],
  ["第6586回", "2026-04-21", "864"],
  ["第6585回", "2026-04-20", "139"],
  ["第6584回", "2026-04-19", "506"],
  ["第6583回", "2026-04-18", "292"],
  ["第6582回", "2026-04-17", "748"],
  ["第6581回", "2026-04-16", "611"],
  ["第6580回", "2026-04-15", "387"],
  ["第6579回", "2026-04-14", "094"],
  ["第6578回", "2026-04-13", "525"],
  ["第6577回", "2026-04-12", "860"],
  ["第6576回", "2026-04-11", "318"],
  ["第6575回", "2026-04-10", "999"],
  ["第6574回", "2026-04-09", "157"],
  ["第6573回", "2026-04-08", "426"],
  ["第6572回", "2026-04-07", "733"],
  ["第6571回", "2026-04-06", "084"],
  ["第6570回", "2026-04-05", "692"],
  ["第6569回", "2026-04-04", "240"],
  ["第6568回", "2026-04-03", "515"],
].map(([draw, date, number]) => ({ draw, date, number }));

let draws = [...demoDraws];
let frequencyPosition = "all";

const colors = ["#1d63c8", "#178c9b", "#d4942f"];

const els = {
  latestNumber: document.querySelector("#latestNumber"),
  latestMeta: document.querySelector("#latestMeta"),
  totalDraws: document.querySelector("#totalDraws"),
  averageSum: document.querySelector("#averageSum"),
  hotDigit: document.querySelector("#hotDigit"),
  hotDigitCount: document.querySelector("#hotDigitCount"),
  topPattern: document.querySelector("#topPattern"),
  topPatternCount: document.querySelector("#topPatternCount"),
  frequencyChart: document.querySelector("#frequencyChart"),
  sumTrend: document.querySelector("#sumTrend"),
  patternDonut: document.querySelector("#patternDonut"),
  patternLegend: document.querySelector("#patternLegend"),
  statLines: document.querySelector("#statLines"),
  recordsBody: document.querySelector("#recordsBody"),
  numberFilter: document.querySelector("#numberFilter"),
  patternFilter: document.querySelector("#patternFilter"),
  sumRange: document.querySelector("#sumRange"),
  csvInput: document.querySelector("#csvInput"),
  loadCsv: document.querySelector("#loadCsv"),
  resetData: document.querySelector("#resetData"),
  importStatus: document.querySelector("#importStatus"),
};

function digitsOf(number) {
  return number.split("").map(Number);
}

function sumOf(number) {
  return digitsOf(number).reduce((total, digit) => total + digit, 0);
}

function spanOf(number) {
  const digits = digitsOf(number);
  return Math.max(...digits) - Math.min(...digits);
}

function patternOf(number) {
  const unique = new Set(number).size;
  if (unique === 1) return "豹子";
  if (unique === 2) return "组三";
  return "组六";
}

function parityOf(number) {
  const odd = digitsOf(number).filter((digit) => digit % 2 === 1).length;
  return `${odd}奇${3 - odd}偶`;
}

function sizeOf(number) {
  const big = digitsOf(number).filter((digit) => digit >= 5).length;
  return `${big}大${3 - big}小`;
}

function countBy(items, pick) {
  return items.reduce((acc, item) => {
    const key = pick(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function digitCounts(position = "all") {
  const counts = Array(10).fill(0);
  draws.forEach(({ number }) => {
    const digits = number.split("");
    if (position === "all") {
      digits.forEach((digit) => counts[Number(digit)]++);
      return;
    }
    const index = { hundreds: 0, tens: 1, ones: 2 }[position];
    counts[Number(digits[index])]++;
  });
  return counts;
}

function renderOverview() {
  const latest = draws[0];
  const sums = draws.map((draw) => sumOf(draw.number));
  const average = sums.reduce((total, sum) => total + sum, 0) / Math.max(draws.length, 1);
  const counts = digitCounts("all");
  const hotCount = Math.max(...counts);
  const hotDigit = counts.indexOf(hotCount);
  const patterns = countBy(draws, (draw) => patternOf(draw.number));
  const topPattern = Object.entries(patterns).sort((a, b) => b[1] - a[1])[0] || ["-", 0];

  els.latestNumber.textContent = latest?.number || "---";
  els.latestMeta.textContent = latest ? `${latest.draw} · ${latest.date}` : "等待数据";
  els.totalDraws.textContent = draws.length;
  els.averageSum.textContent = Number.isFinite(average) ? average.toFixed(1) : "0";
  els.hotDigit.textContent = hotDigit >= 0 ? hotDigit : "-";
  els.hotDigitCount.textContent = `出现 ${hotCount || 0} 次`;
  els.topPattern.textContent = topPattern[0];
  els.topPatternCount.textContent = `占比 ${Math.round((topPattern[1] / Math.max(draws.length, 1)) * 100)}%`;
}

function renderFrequency() {
  const counts = digitCounts(frequencyPosition);
  const max = Math.max(...counts, 1);
  els.frequencyChart.innerHTML = counts
    .map(
      (count, digit) => `
        <div class="bar-row">
          <span class="digit">${digit}</span>
          <span class="bar-track"><span class="bar-fill" style="width:${(count / max) * 100}%"></span></span>
          <span class="bar-count">${count}</span>
        </div>
      `,
    )
    .join("");
}

function drawLineChart() {
  const canvas = els.sumTrend;
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  canvas.width = rect.width * scale;
  canvas.height = 280 * scale;
  ctx.scale(scale, scale);

  const width = rect.width;
  const height = 280;
  const pad = 34;
  const ordered = [...draws].reverse();
  const sums = ordered.map((draw) => sumOf(draw.number));
  const min = Math.min(...sums, 0);
  const max = Math.max(...sums, 27);

  els.sumRange.textContent = `${min} - ${max}`;
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "#dce5f0";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad + ((height - pad * 2) / 4) * i;
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(width - pad, y);
    ctx.stroke();
  }

  if (sums.length < 2) return;
  const xStep = (width - pad * 2) / (sums.length - 1);
  const yOf = (sum) => height - pad - ((sum - min) / Math.max(max - min, 1)) * (height - pad * 2);

  ctx.beginPath();
  sums.forEach((sum, index) => {
    const x = pad + index * xStep;
    const y = yOf(sum);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = "#1d63c8";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "#d4942f";
  sums.forEach((sum, index) => {
    const x = pad + index * xStep;
    const y = yOf(sum);
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawDonut() {
  const canvas = els.patternDonut;
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const scale = window.devicePixelRatio || 1;
  canvas.width = rect.width * scale;
  canvas.height = rect.width * scale;
  ctx.scale(scale, scale);
  const size = rect.width;
  const radius = size / 2 - 18;
  const center = size / 2;
  const patterns = ["组六", "组三", "豹子"].map((name) => ({
    name,
    value: draws.filter((draw) => patternOf(draw.number) === name).length,
  }));
  const total = Math.max(draws.length, 1);
  let start = -Math.PI / 2;

  ctx.clearRect(0, 0, size, size);
  patterns.forEach((item, index) => {
    const angle = (item.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(center, center, radius, start, start + angle);
    ctx.lineWidth = 34;
    ctx.strokeStyle = colors[index];
    ctx.stroke();
    start += angle;
  });

  ctx.fillStyle = "#16211d";
  ctx.font = "700 24px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(String(draws.length), center, center - 3);
  ctx.fillStyle = "#66736e";
  ctx.font = "500 13px Noto Sans SC, sans-serif";
  ctx.fillText("期记录", center, center + 20);

  els.patternLegend.innerHTML = patterns
    .map(
      (item, index) => `
        <div class="legend-item">
          <span><i style="background:${colors[index]}"></i>${item.name}</span>
          <strong>${item.value} · ${Math.round((item.value / total) * 100)}%</strong>
        </div>
      `,
    )
    .join("");
}

function renderStatLines() {
  const parity = countBy(draws, (draw) => parityOf(draw.number));
  const size = countBy(draws, (draw) => sizeOf(draw.number));
  const sumBand = countBy(draws, (draw) => {
    const sum = sumOf(draw.number);
    if (sum <= 9) return "低和值 0-9";
    if (sum <= 18) return "中和值 10-18";
    return "高和值 19-27";
  });

  const groups = [
    ["奇偶组合", parity],
    ["大小组合", size],
    ["和值区间", sumBand],
  ];

  els.statLines.innerHTML = groups
    .map(([title, data]) => {
      const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
      const top = entries[0] || ["-", 0];
      const second = entries[1] || ["其它", 0];
      return `
        <div class="stat-line">
          <header><span>${title}</span><strong>${top[0]} · ${top[1]}次</strong></header>
          <div class="stacked" title="${title}">
            <span class="a" style="width:${(top[1] / Math.max(draws.length, 1)) * 100}%"></span>
            <span class="b" style="width:${(second[1] / Math.max(draws.length, 1)) * 100}%"></span>
          </div>
        </div>
      `;
    })
    .join("");
}

function renderRecords() {
  const numberQuery = els.numberFilter.value.trim();
  const patternQuery = els.patternFilter.value;
  const filtered = draws.filter((draw) => {
    const matchesNumber = !numberQuery || draw.number.includes(numberQuery);
    const matchesPattern = patternQuery === "all" || patternOf(draw.number) === patternQuery;
    return matchesNumber && matchesPattern;
  });

  els.recordsBody.innerHTML = filtered
    .map(
      (draw) => `
        <tr>
          <td>${draw.draw}</td>
          <td>${draw.date}</td>
          <td class="number">${draw.number}</td>
          <td>${sumOf(draw.number)}</td>
          <td>${spanOf(draw.number)}</td>
          <td><span class="tag">${patternOf(draw.number)}</span></td>
          <td>${parityOf(draw.number)}</td>
        </tr>
      `,
    )
    .join("");
}

function parseCsv(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length < 2) throw new Error("至少需要表头和一行数据。");

  const headers = lines[0].split(",").map((header) => header.trim().toLowerCase());
  const drawIndex = headers.indexOf("draw");
  const dateIndex = headers.indexOf("date");
  const numberIndex = headers.indexOf("number");
  if ([drawIndex, dateIndex, numberIndex].includes(-1)) {
    throw new Error("CSV 表头必须包含 draw,date,number。");
  }

  return lines.slice(1).map((line, index) => {
    const cells = line.split(",").map((cell) => cell.trim());
    const number = String(cells[numberIndex] || "").replace(/\D/g, "").padStart(3, "0").slice(-3);
    if (!/^\d{3}$/.test(number)) throw new Error(`第 ${index + 2} 行号码无效。`);
    return {
      draw: cells[drawIndex] || `第${index + 1}回`,
      date: cells[dateIndex] || "",
      number,
    };
  });
}

function renderAll() {
  renderOverview();
  renderFrequency();
  drawLineChart();
  drawDonut();
  renderStatLines();
  renderRecords();
}

document.querySelectorAll(".segmented button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".segmented button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    frequencyPosition = button.dataset.position;
    renderFrequency();
  });
});

els.numberFilter.addEventListener("input", renderRecords);
els.patternFilter.addEventListener("change", renderRecords);
els.loadCsv.addEventListener("click", () => {
  try {
    draws = parseCsv(els.csvInput.value);
    els.importStatus.textContent = `已载入 ${draws.length} 条记录`;
    renderAll();
  } catch (error) {
    els.importStatus.textContent = error.message;
  }
});
els.resetData.addEventListener("click", () => {
  draws = [...demoDraws];
  els.importStatus.textContent = "已恢复演示数据";
  renderAll();
});

window.addEventListener("resize", () => {
  drawLineChart();
  drawDonut();
});

renderAll();
