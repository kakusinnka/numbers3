# 日本ナンバーズ3历史开奖统计网站

这是一个用于统计日本 Numbers 3 彩票历史开奖结果的纯静态网站。页面包含开奖总览、数字频率、和值趋势、形态分析、开奖列表筛选和 CSV 数据导入功能。

## 网站设计思路

网站整体按“数据分析仪表盘”来设计，而不是普通介绍页。用户打开页面后，第一眼能看到最新开奖号、记录期数、平均和值、最热数字、常见形态等核心信息，然后继续向下查看号码频率、走势、形态分布和详细开奖表。

视觉主题使用蓝色系：深蓝侧边栏负责导航和稳定感，亮蓝用于按钮、高亮状态、图表线条和标签，让数据重点更醒目。首屏使用本地静态图片 `assets/hero-lottery-balls.jpg` 作为背景，让“数字、开奖、彩票”的主题在第一屏就成立，同时避免页面看起来像单纯的表格工具。网页标签图标使用 `assets/favicon-n3.svg`，侧边栏品牌图标使用 `assets/brand-n3.svg`。

功能布局分为以下模块：

- 总览区：展示最新开奖、记录期数、平均和值、最热数字和常见形态。
- 数字频率：支持全部、百位、十位、个位切换，用于观察冷热数字。
- 和值趋势：用折线图展示近期和值变化。
- 形态分析：统计组六、组三、豹子，以及奇偶、大小、和值区间。
- 开奖列表：支持按号码和形态筛选历史记录。
- 导入数据：支持粘贴 CSV 数据，临时替换默认数据集。

技术上采用纯静态实现，只包含 `index.html`、`styles.css`、`script.js` 三个核心文件。不需要后端、不需要数据库，通过本地静态服务器或 GitHub Pages 访问即可运行。页面初期显示会优先读取 `data/numbers3-latest100.json` 中的近 100 期真实开奖数据；如果该文件读取失败，则自动回退到 `script.js` 内的演示数据。

## 真实数据获取流程

真实数据采用“构建时抓取、静态文件发布”的方式处理，而不是让浏览器在用户访问页面时直接请求外部站点。

1. 数据更新脚本位于 `tools/fetch-numbers3.mjs`。
2. 脚本请求 CSV 数据源 `https://znlandstar.com/Numbers3/DownLoadCsv`。
3. CSV 数据源页面说明其数据基于「みずほ銀行 ナンバーズ3 公式サイト」发布信息。
4. 脚本解析 CSV 表头中的 `回別`、`抽選日`、`抽せん数字` 三列。
5. 脚本按期号倒序排序，只保留近 100 期。
6. 脚本把数据转换成网站使用的结构：

   ```json
   {
     "draw": "第6987回",
     "date": "2026-05-20",
     "number": "762"
   }
   ```

7. 最终生成 `data/numbers3-latest100.json`，由 `script.js` 在页面初始化时通过 `fetch()` 加载。

更新真实数据时运行：

```powershell
node tools/fetch-numbers3.mjs
```

如需调整数量，可以指定 `--limit`：

```powershell
node tools/fetch-numbers3.mjs --limit=100
```

如果未来要切换到其他 CSV 地址，可以指定 `--source`：

```powershell
node tools/fetch-numbers3.mjs --source=https://example.com/numbers3.csv
```

注意：直接用 `file://` 打开 `index.html` 时，浏览器通常会阻止读取本地 JSON 文件。因此真实数据预览建议使用本地静态服务器，例如 `http://127.0.0.1:8765/index.html`。

## 自动更新数据

仓库通过 GitHub Actions 自动维护近 100 期开奖数据，workflow 位于 `.github/workflows/update-numbers3-data.yml`。

自动任务会在日本时间工作日 21:30 左右执行一次，对应 cron 配置为 UTC 时间：

```yaml
cron: "30 12 * * 1-5"
```

任务流程如下：

1. 检出 `develop` 分支。
2. 使用 Node.js 20。
3. 运行 `node --check tools/fetch-numbers3.mjs` 检查脚本语法。
4. 运行 `node tools/fetch-numbers3.mjs` 重新生成 `data/numbers3-latest100.json`。
5. 校验 JSON 是否包含 100 条记录，以及最新记录是否包含合法的期号、日期和三位号码。
6. 如果 JSON 有变化，自动创建 `automation/update-numbers3-data -> develop` 的 PR。
7. 如果 JSON 没有变化，不会创建新 PR。

也可以在 GitHub 页面手动触发这个 workflow：进入 Actions，选择“更新 Numbers3 真实数据”，点击 Run workflow。

## 本地预览步骤

本地预览时进行了以下操作：

1. 先尝试用浏览器直接打开本地文件：

   ```text
   file:///D:/workSpace/codex/test/index.html
   ```

2. 浏览器安全策略阻止了 `file://` 本地文件访问，因此没有继续绕过该限制。

3. 改用本地静态服务器预览页面，这种方式更接近真实网站访问方式。

4. 先尝试使用 `python` 启动服务器：

   ```powershell
   python -m http.server 8765 --bind 127.0.0.1
   ```

5. 发现系统 PATH 中没有 `python` 命令。

6. 检查可用运行时，发现本机可用：

   ```text
   py.exe
   node.exe
   ```

7. 使用 Windows Python Launcher 启动静态服务器：

   ```powershell
   py -m http.server 8765 --bind 127.0.0.1
   ```

8. 在浏览器中打开本地预览地址：

   ```text
   http://127.0.0.1:8765/index.html
   ```

9. 等待页面加载完成，并确认页面标题为：

   ```text
   Numbers 3 日本彩票历史开奖统计
   ```

10. 检查页面 DOM 内容，确认包含主标题：

    ```text
    日本ナンバーズ3历史开奖结果统计站
    ```

11. 读取浏览器控制台错误日志，确认没有 JavaScript 错误。

12. 截取页面当前视口截图，目视确认蓝色主题、首屏、统计卡片和图表区域都正常渲染。
