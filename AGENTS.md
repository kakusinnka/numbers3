# AGENTS.md

本文件记录本项目的协作约定。以后在这个仓库中工作的 AI / Codex 代理，应优先遵守这里的项目级规则。

## 项目概况

这是一个纯静态的日本排列3 / ナンバーズ3 历史开奖统计网站。

核心文件：

- `index.html`：页面结构。
- `styles.css`：视觉样式、响应式布局、图表/表格区域样式。
- `script.js`：数据加载、统计计算、图表绘制、多语言切换、交互逻辑。
- `data/numbers3-latest100.json`：默认加载的近 100 期真实开奖数据。
- `tools/fetch-numbers3.mjs`：抓取并生成近 100 期 JSON 数据。
- `.github/workflows/update-numbers3-data.yml`：自动更新开奖数据的 GitHub Actions workflow。
- `assets/`：本地静态图片资源，包括 hero 背景、favicon、brand mark。

## 语言与文案

- 默认面向中文用户，回答用户时使用中文。
- PR 标题和 PR 描述必须使用中文。
- 中文界面中使用“排列3”。
- 日文界面中保留“ナンバーズ3”。
- 需要新增页面文案时，优先加入 `script.js` 的 `i18n` 对象，并同步中文和日文。
- 有 `data-i18n` 的 HTML 默认文案也要同步更新，不能只改 JS 翻译值。

## 分支与发布流程

当前常用分支流程：

1. 在 `feature` 分支开发。
2. 提交并推送 `feature`。
3. 创建 `feature -> develop` PR。
4. 合并 `feature -> develop`。
5. 创建 `develop -> main` PR。
6. 合并 `develop -> main`。
7. GitHub Pages 从 `main` 发布。

除非用户明确要求直接推送目标分支，否则不要绕过 PR 流程。

## GitHub Actions 与自动数据更新

`update-numbers3-data.yml` 的目标是自动完成数据更新发布：

1. 定时或手动触发 workflow。
2. 检出 `develop`。
3. 运行 `node tools/fetch-numbers3.mjs`。
4. 如果 `data/numbers3-latest100.json` 有变化，创建 `automation/update-numbers3-data -> develop` PR。
5. 自动合并该 PR 到 `develop`。
6. 自动创建 `develop -> main` PR。
7. 自动合并发布 PR 到 `main`。

注意：

- 该 workflow 依赖仓库设置允许 GitHub Actions 创建 PR。
- 如果日志出现 `GitHub Actions is not permitted to create or approve pull requests.`，应提示用户开启：

```text
Settings -> Actions -> General -> Workflow permissions
Allow GitHub Actions to create and approve pull requests
```

## 数据规则

- 页面初始数据优先读取 `data/numbers3-latest100.json`。
- 如果 JSON 读取失败，回退到 `defaultCsvInput` 解析出的初始 CSV 数据。
- `defaultCsvInput` 只保留少量示例数据，目前为 5 条。
- 点击“恢复初始数据”时：
  - 如果已成功加载近 100 期 JSON，则恢复 JSON 数据。
  - 如果 JSON 不可用，则恢复 `defaultCsvInput`。
  - 同时恢复 `csvInput` 文本框为 `defaultCsvInput` 常量值。
- `tools/fetch-numbers3.mjs` 输出结构必须保持：

```json
{
  "draw": "第6988回",
  "date": "2026-05-21",
  "number": "127"
}
```

## 前端设计约定

- 整体是蓝色系数据仪表盘，不做营销型 landing page。
- `hero` 使用本地图片 `assets/hero-lottery-balls.jpg`，不要再依赖远程背景图。
- favicon 使用 `assets/favicon-n3.svg`。
- 侧边栏 brand mark 使用 `assets/brand-n3.svg`。
- 移动端顶部是汉堡导航，展开后显示导航和数据说明。
- 点击导航时，对应 section 需要避开 sticky sidebar / mobile header，不要被遮挡。
- `records` 表格需要限制视口内最大高度，`tbody#recordsBody` 自身滚动。
- `sumTrend` 折线图要在初期显示和 resize 时正确重绘，避免首次宽度异常。

## 本地验证

常用验证命令：

```powershell
node --check script.js
node --check tools/fetch-numbers3.mjs
```

生成最新真实数据：

```powershell
node tools/fetch-numbers3.mjs
```

本地预览建议使用静态服务器，不要直接用 `file://`：

```powershell
py -m http.server 8765 --bind 127.0.0.1
```

如果本机没有 Python，可以使用 Node 启动一个临时静态服务。

## 代码修改原则

- 保持项目纯静态，不引入构建系统，除非用户明确要求。
- 不引入大型依赖。
- 优先使用原生 HTML/CSS/JS。
- 修改文案时同步 HTML 默认值和 i18n。
- 修改视觉资源时放入 `assets/`，并使用相对路径引用。
- 修改数据流程时同步 README。
- 发布前至少运行 `node --check script.js`；如果改到抓取脚本，还要运行 `node --check tools/fetch-numbers3.mjs`。

## Git 提交规范

- 提交信息使用中文。
- PR 标题使用中文。
- PR 描述使用中文，并包含：
  - `## 修改内容`
  - `## 验证`
- 不要提交无关格式化或无关文件。
- 工作区可能已有用户改动，提交前必须用 `git status --short` 确认范围。

