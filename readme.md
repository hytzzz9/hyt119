# 前端交互作品集

- **姓名**：侯雨彤
- **学号**：24002120119
- **项目名称**：前端交互作品集
- **项目类别**：模仿 + 自选

## 项目简介

本项目汇总移动端触摸事件、手势交互、传感器应用、Swiper 轮播特效与本地数据交互等课堂练习，并提供统一入口页。

## 目录结构

```
.
├── hyt-prompt/               # 课程项目目录
│   ├── AGENTS.md             # 项目规则
│   └── frontend/             # 前端（原生 HTML / CSS / JS，无第三方库）
│       ├── index.html        # 项目首页（canvas 粒子背景 + 页面导航）
│       ├── css/hyt_index.css
│       ├── js/hyt_index.js
│       ├── fonts/            # iconfont 图标（如有）
│       └── images/
├── backend/                  # 后端 Node.js + Express（端口 8119，接口前缀 /api）
│   ├── server.js
│   ├── config/hyt_db.js
│   ├── routes/hyt_api.js
│   ├── controllers/
│   ├── models/
│   ├── hyt_interface.md      # 接口记录（追加写入）
│   └── hyt_database.md       # 数据库 SQL 记录（追加写入）
├── *.html                    # 历史课堂练习页（通过 /legacy 前缀访问）
└── houyutong_prompt.md        # 提示词记录
```

## 运行方式

```bash
# 1. 安装后端依赖
cd backend
npm install

# 2. 配置数据库凭据（复制后填写，.env 不入库）
cp .env.example .env

# 3. 启动服务
npm start
```

启动后访问：

- 项目首页：<http://localhost:8119/>
- 接口示例：<http://localhost:8119/api/health>
- 历史练习页：`http://localhost:8119/legacy/<文件名>.html`

## 说明

- 前端仅使用原生 HTML / CSS / JavaScript，不使用任何第三方库、框架或 CDN 链接。
- 后端跨域（cors）已全部开放，仅用于课程作业环境。
- 数据库凭据只保存在 `backend/.env`，已加入 `.gitignore`。
