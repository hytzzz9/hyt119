---
name: we-web-lab
description: Use when working on the We 项目（侯雨彤《高级网页设计》课堂实践静态站点）。Covers editing index.html 课堂目录、Flex 布局练习（1.html）、字体图标 iconfont（font/）、SVG 图标（svg005.html）。Use for adding or modifying HTML/CSS pages, adding new practice modules to the directory, or explaining project structure.
---

# We 项目 / 高级网页设计课堂实践

侯雨彤《高级网页设计》课程的课堂实践静态站点。全部使用原生 HTML + CSS 实现，不依赖任何 CDN 或前端框架。

## 页面结构

| 文件 | 说明 |
| --- | --- |
| `index.html` | 课堂目录首页，聚合所有练习模块的入口 |
| `1.html` / `1.css` | MODULE 01：Flex 布局复习（导航栏、三等分布局、响应式卡片、侧边栏） |
| `font/demo_index.html` | MODULE 02：iconfont 字体图标，涵盖 Unicode / Font class / Symbol 三种引用方式 |
| `svg005.html` | MODULE 03：SVG symbol 图标，标签页切换交互 |
| `css/svg图标.css` | 与 svg005.html 配套的样式 |
| `yy-master/` | 从 gitee 仓库下载的原始备份（README、.gitignore 等） |

## 约定

- 原生 HTML/CSS，**禁止**使用 CDN，资源一律本地引入（如 `font/` 中的 iconfont）。
- 新练习页面完成后，需在 `index.html` 的课堂目录 `.module-grid` 中增加对应 `.module-card` 入口。
- 样式集中在各页面 `<style>` 或对应 css 文件中；`index.html` 使用 CSS 变量（`:root`）统一配色。
- 字体图标新增时，同步更新 `font/` 下的 iconfont 相关文件。

## 预览方式

- 直接用浏览器打开对应 `.html` 文件。
- 或在 VS Code 中使用 Live Server 预览，入口从 `index.html` 开始。

## 添加新练习模块的流程

1. 新建练习页面（如 `newmodule.html`）及其样式。
2. 在 `index.html` 的 `.module-grid` 中新增 `<a class="module-card">`，仿照现有卡片填写编号、标题与说明。
3. 如需图标，遵循 `font/` 中 iconfont 的本地引用方式。