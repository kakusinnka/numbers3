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

const i18n = {
  zh: {
    docLang: "zh-CN",
    pageTitle: "Numbers 3 日本彩票历史开奖统计",
    sidebarAria: "主导航",
    languageAria: "语言切换",
    menuOpen: "打开导航菜单",
    menuClose: "关闭导航菜单",
    brandSubtitle: "历史开奖统计",
    navOverview: "总览",
    navFrequency: "号码频率",
    navTrend: "和值趋势",
    navPatterns: "形态分析",
    navRecords: "开奖列表",
    navImport: "导入数据",
    sourceTitle: "数据说明",
    sourceBody: "页面内置为演示数据。可在“导入数据”中粘贴真实 CSV，字段为 draw,date,number。",
    heroTitle: "日本ナンバーズ3历史开奖结果统计站",
    heroBody: "快速查看开奖号码、和值走势、数字冷热、奇偶大小与组选形态，适合用来整理公开历史数据并做轻量分析。",
    latestAria: "最新开奖",
    latestLabel: "最新一期",
    waiting: "等待数据",
    metricsAria: "统计概览",
    metricDraws: "记录期数",
    metricDrawsSub: "当前数据集",
    metricAverage: "平均和值",
    metricAverageSub: "三位数字合计",
    metricHot: "最热数字",
    metricPattern: "最常见形态",
    occurrence: (count) => `出现 ${count} 次`,
    ratio: (value) => `占比 ${value}%`,
    frequencyTitle: "号码频率",
    frequencyAria: "频率位置",
    positionAll: "全部",
    positionHundreds: "百位",
    positionTens: "十位",
    positionOnes: "个位",
    trendTitle: "和值趋势",
    trendAria: "和值趋势图",
    patternTitle: "形态分布",
    patternAria: "形态分布图",
    recordsTitle: "历史开奖列表",
    filterNumber: "号码",
    filterPattern: "形态",
    numberPlaceholder: "如 123 或 7",
    tableDraw: "期号",
    tableDate: "开奖日期",
    tableNumber: "开奖号码",
    tableSum: "和值",
    tableSpan: "跨度",
    tablePattern: "形态",
    tableParity: "奇偶",
    importTitle: "导入真实历史数据",
    importBody: "支持 CSV 表头：draw,date,number。号码会自动补足三位，例如 7 会转为 007。",
    loadCsv: "载入 CSV",
    resetData: "恢复演示数据",
    importIdle: "尚未导入",
    imported: (count) => `已载入 ${count} 条记录`,
    resetDone: "已恢复演示数据",
    csvNeedRows: "至少需要表头和一行数据。",
    csvNeedHeaders: "CSV 表头必须包含 draw,date,number。",
    csvInvalidNumber: (line) => `第 ${line} 行号码无效。`,
    drawFallback: (index) => `第${index}回`,
    patternStraight: "组六",
    patternPair: "组三",
    patternTriple: "豹子",
    recordsUnit: "期记录",
    parityLabel: (odd, even) => `${odd}奇${even}偶`,
    sizeLabel: (big, small) => `${big}大${small}小`,
    lowSum: "低和值 0-9",
    midSum: "中和值 10-18",
    highSum: "高和值 19-27",
    parityGroup: "奇偶组合",
    sizeGroup: "大小组合",
    sumBandGroup: "和值区间",
    times: (count) => `${count}次`,
    other: "其它",
  },
  ja: {
    docLang: "ja",
    pageTitle: "ナンバーズ3 過去当選番号データ分析",
    sidebarAria: "メインナビゲーション",
    languageAria: "言語切り替え",
    menuOpen: "ナビゲーションメニューを開く",
    menuClose: "ナビゲーションメニューを閉じる",
    brandSubtitle: "過去当選データ分析",
    navOverview: "概要",
    navFrequency: "数字頻度",
    navTrend: "合計値推移",
    navPatterns: "パターン分析",
    navRecords: "抽せん一覧",
    navImport: "データ取込",
    sourceTitle: "データについて",
    sourceBody: "内蔵データはサンプルです。「データ取込」で実データの CSV を貼り付けできます。列は draw,date,number です。",
    heroTitle: "ナンバーズ3 過去当選番号分析サイト",
    heroBody: "当選番号、合計値の推移、数字の出現頻度、奇偶・大小・組み合わせパターンをすばやく確認できます。",
    latestAria: "最新抽せん",
    latestLabel: "最新回",
    waiting: "データ待ち",
    metricsAria: "統計概要",
    metricDraws: "抽せん回数",
    metricDrawsSub: "現在のデータセット",
    metricAverage: "平均合計値",
    metricAverageSub: "3桁の数字の合計",
    metricHot: "最多出現数字",
    metricPattern: "最多パターン",
    occurrence: (count) => `${count}回出現`,
    ratio: (value) => `${value}%`,
    frequencyTitle: "数字の出現頻度",
    frequencyAria: "桁の位置",
    positionAll: "全体",
    positionHundreds: "百の位",
    positionTens: "十の位",
    positionOnes: "一の位",
    trendTitle: "合計値の推移",
    trendAria: "合計値推移グラフ",
    patternTitle: "パターン分布",
    patternAria: "パターン分布グラフ",
    recordsTitle: "過去抽せん一覧",
    filterNumber: "番号",
    filterPattern: "パターン",
    numberPlaceholder: "例 123 または 7",
    tableDraw: "回号",
    tableDate: "抽せん日",
    tableNumber: "当選番号",
    tableSum: "合計",
    tableSpan: "スパン",
    tablePattern: "パターン",
    tableParity: "奇偶",
    importTitle: "実データを取り込む",
    importBody: "CSV の列は draw,date,number に対応しています。番号は 3 桁に自動補完されます。例: 7 は 007。",
    loadCsv: "CSV を読込",
    resetData: "サンプルに戻す",
    importIdle: "未取込",
    imported: (count) => `${count}件を読み込みました`,
    resetDone: "サンプルデータに戻しました",
    csvNeedRows: "ヘッダーと 1 行以上のデータが必要です。",
    csvNeedHeaders: "CSV ヘッダーには draw,date,number が必要です。",
    csvInvalidNumber: (line) => `${line} 行目の番号が無効です。`,
    drawFallback: (index) => `第${index}回`,
    patternStraight: "ストレート型",
    patternPair: "ペア型",
    patternTriple: "ゾロ目",
    recordsUnit: "回分",
    parityLabel: (odd, even) => `奇${odd}・偶${even}`,
    sizeLabel: (big, small) => `大${big}・小${small}`,
    lowSum: "低合計 0-9",
    midSum: "中合計 10-18",
    highSum: "高合計 19-27",
    parityGroup: "奇偶構成",
    sizeGroup: "大小構成",
    sumBandGroup: "合計値帯",
    times: (count) => `${count}回`,
    other: "その他",
  },
};

let draws = [...demoDraws];
let frequencyPosition = "all";
let currentLang = localStorage.getItem("numbers3-lang") || "zh";
let importStatusKey = "importIdle";
let importStatusValue = null;
let trendPoints = [];

const colors = ["#1d63c8", "#178c9b", "#d4942f"];

const els = {
  sidebar: document.querySelector(".sidebar"),
  mobileMenuToggle: document.querySelector(".mobile-menu-toggle"),
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
  sumTooltip: document.querySelector("#sumTooltip"),
  patternDonut: document.querySelector("#patternDonut"),
  patternLegend: document.querySelector("#patternLegend"),
  recordsBody: document.querySelector("#recordsBody"),
  numberFilter: document.querySelector("#numberFilter"),
  patternFilter: document.querySelector("#patternFilter"),
  csvInput: document.querySelector("#csvInput"),
  loadCsv: document.querySelector("#loadCsv"),
  resetData: document.querySelector("#resetData"),
  importStatus: document.querySelector("#importStatus"),
};

function t(key, ...args) {
  const value = i18n[currentLang][key];
  return typeof value === "function" ? value(...args) : value;
}

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

function patternKeyOf(number) {
  const unique = new Set(number).size;
  if (unique === 1) return "patternTriple";
  if (unique === 2) return "patternPair";
  return "patternStraight";
}

function parityTextOf(number) {
  const odd = digitsOf(number).filter((digit) => digit % 2 === 1).length;
  return t("parityLabel", odd, 3 - odd);
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

function renderStaticText() {
  document.documentElement.lang = t("docLang");
  document.title = t("pageTitle");

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((node) => {
    node.dataset.i18nAttr.split(";").forEach((pair) => {
      const [attr, key] = pair.split(":");
      if (attr && key) node.setAttribute(attr, t(key));
    });
  });

  document.querySelectorAll(".language-switcher button").forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === currentLang);
  });

  const menuOpen = els.sidebar.classList.contains("menu-open");
  els.mobileMenuToggle.setAttribute("aria-expanded", String(menuOpen));
  els.mobileMenuToggle.setAttribute("aria-label", t(menuOpen ? "menuClose" : "menuOpen"));

  els.importStatus.textContent =
    importStatusValue === null ? t(importStatusKey) : t(importStatusKey, importStatusValue);
}

function renderOverview() {
  const latest = draws[0];
  const sums = draws.map((draw) => sumOf(draw.number));
  const average = sums.reduce((total, sum) => total + sum, 0) / Math.max(draws.length, 1);
  const counts = digitCounts("all");
  const hotCount = Math.max(...counts);
  const hotDigit = counts.indexOf(hotCount);
  const patterns = countBy(draws, (draw) => patternKeyOf(draw.number));
  const topPattern = Object.entries(patterns).sort((a, b) => b[1] - a[1])[0] || ["-", 0];

  els.latestNumber.textContent = latest?.number || "---";
  els.latestMeta.textContent = latest ? `${latest.draw} · ${latest.date}` : t("waiting");
  els.totalDraws.textContent = draws.length;
  els.averageSum.textContent = Number.isFinite(average) ? average.toFixed(1) : "0";
  els.hotDigit.textContent = hotDigit >= 0 ? hotDigit : "-";
  els.hotDigitCount.textContent = t("occurrence", hotCount || 0);
  els.topPattern.textContent = topPattern[0] === "-" ? "-" : t(topPattern[0]);
  els.topPatternCount.textContent = t("ratio", Math.round((topPattern[1] / Math.max(draws.length, 1)) * 100));
}

function renderFrequency() {
  const counts = digitCounts(frequencyPosition);
  const total = frequencyPosition === "all" ? draws.length * 3 : draws.length;
  els.frequencyChart.innerHTML = counts
    .map(
      (count, digit) => {
        const percent = total > 0 ? (count / total) * 100 : 0;
        return `
        <div class="bar-row" title="${digit}: ${count}">
          <span class="digit">${digit}</span>
          <span class="bar-track"><span class="bar-fill" style="width:${percent}%"></span></span>
          <span class="bar-count">${count}</span>
        </div>
      `;
      },
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
  const padLeft = 42;
  const padRight = 22;
  const padTop = 20;
  const padBottom = 30;
  const ordered = [...draws].reverse();
  const sums = ordered.map((draw) => sumOf(draw.number));
  const max = 27;

  trendPoints = [];
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "#dce5f0";
  ctx.lineWidth = 1;

  [0, 9, 18, 27].forEach((tick) => {
    const y = height - padBottom - (tick / max) * (height - padTop - padBottom);
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(width - padRight, y);
    ctx.stroke();
    ctx.fillStyle = "#647083";
    ctx.font = "600 12px Inter, sans-serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(String(tick), padLeft - 10, y);
  });

  if (sums.length < 2) return;
  const xStep = (width - padLeft - padRight) / (sums.length - 1);
  const yOf = (sum) => height - padBottom - (sum / max) * (height - padTop - padBottom);

  ctx.beginPath();
  sums.forEach((sum, index) => {
    const x = padLeft + index * xStep;
    const y = yOf(sum);
    trendPoints.push({ x, y, sum, draw: ordered[index] });
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = "#1d63c8";
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "#d4942f";
  trendPoints.forEach(({ x, y }) => {
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fill();
  });
}

function hideTrendTooltip() {
  els.sumTooltip.classList.remove("visible");
}

function updateTrendTooltip(event) {
  if (!trendPoints.length) return;
  const rect = els.sumTrend.getBoundingClientRect();
  const clientX = event.touches?.[0]?.clientX ?? event.clientX;
  const clientY = event.touches?.[0]?.clientY ?? event.clientY;
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const nearest = trendPoints.reduce((best, point) => {
    const distance = Math.hypot(point.x - x, point.y - y);
    return distance < best.distance ? { point, distance } : best;
  }, { point: null, distance: Infinity });

  if (!nearest.point || nearest.distance > 22) {
    hideTrendTooltip();
    return;
  }

  els.sumTooltip.textContent = `${nearest.point.sum}`;
  els.sumTooltip.style.left = `${nearest.point.x}px`;
  els.sumTooltip.style.top = `${nearest.point.y}px`;
  els.sumTooltip.classList.add("visible");
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
  const patterns = ["patternStraight", "patternPair", "patternTriple"].map((key) => ({
    key,
    name: t(key),
    value: draws.filter((draw) => patternKeyOf(draw.number) === key).length,
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
  ctx.fillText(t("recordsUnit"), center, center + 20);

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

function renderRecords() {
  const numberQuery = els.numberFilter.value.trim();
  const patternQuery = els.patternFilter.value;
  const filtered = draws.filter((draw) => {
    const matchesNumber = !numberQuery || draw.number.includes(numberQuery);
    const matchesPattern = patternQuery === "all" || patternKeyOf(draw.number) === patternQuery;
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
          <td><span class="tag">${t(patternKeyOf(draw.number))}</span></td>
          <td>${parityTextOf(draw.number)}</td>
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
  if (lines.length < 2) throw new Error(t("csvNeedRows"));

  const headers = lines[0].split(",").map((header) => header.trim().toLowerCase());
  const drawIndex = headers.indexOf("draw");
  const dateIndex = headers.indexOf("date");
  const numberIndex = headers.indexOf("number");
  if ([drawIndex, dateIndex, numberIndex].includes(-1)) {
    throw new Error(t("csvNeedHeaders"));
  }

  return lines.slice(1).map((line, index) => {
    const cells = line.split(",").map((cell) => cell.trim());
    const number = String(cells[numberIndex] || "").replace(/\D/g, "").padStart(3, "0").slice(-3);
    if (!/^\d{3}$/.test(number)) throw new Error(t("csvInvalidNumber", index + 2));
    return {
      draw: cells[drawIndex] || t("drawFallback", index + 1),
      date: cells[dateIndex] || "",
      number,
    };
  });
}

function renderAll() {
  renderStaticText();
  renderOverview();
  renderFrequency();
  drawLineChart();
  drawDonut();
  renderRecords();
  setActiveNav(location.hash || "#overview");
}

function setActiveNav(hash) {
  document.querySelectorAll(".nav-list a").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === hash);
  });
}

function getTopNavOffset() {
  if (!window.matchMedia("(max-width: 1080px)").matches) return 0;
  return els.sidebar.getBoundingClientRect().height + 10;
}

function scrollToSection(hash) {
  const target = document.querySelector(hash);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - getTopNavOffset();
  window.scrollTo({ top, behavior: "smooth" });
}

document.querySelectorAll(".segmented button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".segmented button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    frequencyPosition = button.dataset.position;
    renderFrequency();
  });
});

document.querySelectorAll(".language-switcher button").forEach((button) => {
  button.addEventListener("click", () => {
    currentLang = button.dataset.lang;
    localStorage.setItem("numbers3-lang", currentLang);
    renderAll();
  });
});

els.mobileMenuToggle.addEventListener("click", () => {
  els.sidebar.classList.toggle("menu-open");
  renderStaticText();
});

document.querySelectorAll(".nav-list a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const hash = link.getAttribute("href");
    setActiveNav(hash);
    els.sidebar.classList.remove("menu-open");
    renderStaticText();
    history.pushState(null, "", hash);
    requestAnimationFrame(() => scrollToSection(hash));
  });
});

window.addEventListener("hashchange", () => {
  setActiveNav(location.hash || "#overview");
});

els.sumTrend.addEventListener("mousemove", updateTrendTooltip);
els.sumTrend.addEventListener("mouseleave", hideTrendTooltip);
els.sumTrend.addEventListener("touchstart", updateTrendTooltip, { passive: true });
els.sumTrend.addEventListener("touchmove", updateTrendTooltip, { passive: true });
els.sumTrend.addEventListener("touchend", hideTrendTooltip);

els.numberFilter.addEventListener("input", renderRecords);
els.patternFilter.addEventListener("change", renderRecords);
els.loadCsv.addEventListener("click", () => {
  try {
    draws = parseCsv(els.csvInput.value);
    importStatusKey = "imported";
    importStatusValue = draws.length;
    renderAll();
  } catch (error) {
    els.importStatus.textContent = error.message;
  }
});
els.resetData.addEventListener("click", () => {
  draws = [...demoDraws];
  importStatusKey = "resetDone";
  importStatusValue = null;
  renderAll();
});

window.addEventListener("resize", () => {
  drawLineChart();
  drawDonut();
});

renderAll();
