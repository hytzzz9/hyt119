# 提示词记录（houyutong_prompt.md）

> 规则：每次向 AI 发出开发指令后追加记录，禁止覆盖已有内容。
> 格式：时间 | 提示词全文 | 大模型名称

---

## 记录 #2
- **时间**: 2026-11-20 14:09:34
- **模型**: DeepSeek-V4.1-Flash
- **提示词**:

```
在当前项目根目录创建 AGENTS.md，写入以下规则。

## 项目结构与技术栈
- 前端：frontend/ 目录
  - 原生 HTML、CSS、JavaScript，禁止使用任何第三方库、框架、CDN 链接
  - 目录结构：frontend/ 下建 css/、js/、fonts/、images/ 子目录；
    fonts/ 存放 iconfont 图标文件（如果有）
- 后端：backend/ 目录，Node.js + Express，RESTful+MVC 风格，
  所有接口以 /api/ 为前缀，端口固定为 8119。
- 使用 express.static 托管 frontend/ 静态资源目录。
- 后端通过 cors 中间件开放全部跨域访问，本配置仅用于课程作业。
- 后端依赖安装：预先将 npm 源切换为国内镜像：
  npm config set registry https://registry.npmmirror.com
- 后端依赖安装： npm i 包名
- 数据库：MySQL（凭据按要求仅写入 backend/.env，本记录不保存明文）
- 数据库凭据写入 backend/.env（变量名：DB_USER、DB_PASSWORD、DB_HOST、DB_NAME），
  不得出现在代码或 AGENTS.md 中；.env 同时加入 .gitignore
- 根据后端的要求自行建立和修改数据库表，每张表建立后，插入至少 8 条有真实业务意义的测试数据

## 命名与注释
- CSS 类名、JS 变量名、JS 函数名、数据库表名（及字段相关命名）
  一律以 hyt_ 开头
- 每个文件头部包含注释块：
  姓名：【侯雨彤】 | 学号：【24002120119】 |
  时间：yyyy-mm-dd | 大模型：{本次使用的大模型名称}

## 记录文件（一律追加写入，禁止覆盖已有内容）
- houyutong_prompt.md（项目根目录）：每次向 AI 发出开发指令后，
  追加记录：时间 | 提示词全文 | 大模型名称
- backend/hyt_interface.md：每次创建或修改接口后，追加：
  接口路径 | HTTP 方法 | 请求参数（含示例）|
  响应格式（含 JSON 示例）| 修改时间
- backend/hyt_database.md：每次建表、改表或插入数据后，
  按执行顺序追加对应 SQL 语句（含测试数据的 INSERT），
  要求仅凭此文件即可在新机器上完整重建数据库
- 统一 JSON 响应格式：{ "code": 0, "msg": "提示信息", "data": {...} }，
  code=0 表示成功，非 0 表示失败

## 前端约定
- 服务器返回的数据和错误信息输出到浏览器控制台（console.log / console.error）；
- 新建 HTML 页面后，在 frontend/index.html 中追加超链接入口；
  文件名包含 detail 的页面除外

补充：在我刚建的 hyt-prompt 文件夹中完成
```

---

## 记录 #1
- **时间**: 2026-11-20 14:03:16
- **模型**: DeepSeek-V4.1-Flash
- **提示词**:

```
在当前项目根目录创建 AGENTS.md，写入以下规则。

## 项目结构与技术栈
- 前端：frontend/ 目录
  - 原生 HTML、CSS、JavaScript，禁止使用任何第三方库、框架、CDN 链接
  - 目录结构：frontend/ 下建 css/、js/、fonts/、images/ 子目录；
    fonts/ 存放 iconfont 图标文件（如果有）
- 后端：backend/ 目录，Node.js + Express，RESTful+MVC 风格，
  所有接口以 /api/ 为前缀，端口固定为 8119。
- 使用 express.static 托管 frontend/ 静态资源目录。
- 后端通过 cors 中间件开放全部跨域访问，本配置仅用于课程作业。
- 后端依赖安装：预先将 npm 源切换为国内镜像：
  npm config set registry https://registry.npmmirror.com
- 后端依赖安装： npm i 包名
- 数据库：MySQL（凭据按要求仅写入 backend/.env，本记录不保存明文）
- 数据库凭据写入 backend/.env（变量名：DB_USER、DB_PASSWORD、DB_HOST、DB_NAME），
  不得出现在代码或 AGENTS.md 中；.env 同时加入 .gitignore
- 根据后端的要求自行建立和修改数据库表，每张表建立后，插入至少 8 条有真实业务意义的测试数据

## 命名与注释
- CSS 类名、JS 变量名、JS 函数名、数据库表名（及字段相关命名）
  一律以 hyt_ 开头
- 每个文件头部包含注释块：
  姓名：【侯雨彤】 | 学号：【24002120119】 |
  时间：yyyy-mm-dd | 大模型：{本次使用的大模型名称}

## 记录文件（一律追加写入，禁止覆盖已有内容）
- houyutong_prompt.md（项目根目录）：每次向 AI 发出开发指令后，
  追加记录：时间 | 提示词全文 | 大模型名称
- backend/hyt_interface.md：每次创建或修改接口后，追加：
  接口路径 | HTTP 方法 | 请求参数（含示例）|
  响应格式（含 JSON 示例）| 修改时间
- backend/hyt_database.md：每次建表、改表或插入数据后，
  按执行顺序追加对应 SQL 语句（含测试数据的 INSERT），
  要求仅凭此文件即可在新机器上完整重建数据库
- 统一 JSON 响应格式：{ "code": 0, "msg": "提示信息", "data": {...} }，
  code=0 表示成功，非 0 表示失败

## 前端约定
- 服务器返回的数据和错误信息输出到浏览器控制台（console.log / console.error）；
- 新建 HTML 页面后，在 frontend/index.html 中追加超链接入口；
  文件名包含 detail 的页面除外
```

---

## 记录 #3
- **时间**: 2026-11-20 14:21:40
- **模型**: DeepSeek-V4.1-Flash
- **提示词**:

```
请初始化本项目：
1、git init + .gitignore（排除 node_modules、.env）+ 首次提交
2、按 AGENTS.md 规则创建前后端目录骨架、安装依赖、
3、创建前端首页 index.html，包括姓名侯雨彤、学号24002120119、项目名称、项目类别（自选、模仿），所有完成的 html 页面的超链接。有 canvas 背景动画。主体是页面链接导航。页面美观。
4、创建 readme.md，在根目录下，包括学号、姓名。
```

---

## 记录 #4
- **时间**: 2026-11-20 14:28:30
- **模型**: DeepSeek-V4.1-Flash
- **提示词**:

```
创建运行后台的bat文件，在根目录下。
```

---

## 记录 #5
- **时间**: 2026-11-20 14:31:21
- **模型**: DeepSeek-V4.1-Flash
- **提示词**:

```
创建 database.html 页面，输入用户名，密码，链接数据库，数据库使用 mysql，成功和错误都有提示，默认用户名 root，密码 hyt061123。
```

---

## 记录 #6
- **时间**: 2026-11-20 14:45:05
- **模型**: DeepSeek-V4.1-Flash
- **提示词**:

```
密码就是 hyt061123。
```

---

## 记录 #7
- **时间**: 2026-11-20 14:52:10
- **模型**: DeepSeek-V4.1-Flash
- **提示词**:

```
完成科技新闻列表页面，新闻的数据存在数据库表里。网页显示后端接口链接和数据内容。
```

---

## 记录 #8
- **时间**: 2026-11-20 15:02:40
- **模型**: DeepSeek-V4.1-Flash
- **提示词**:

```
完成科技新闻列表页面：
1、在 MySQL 中建表 hyt_news，字段包含：id、title、summary、content、source、publish_time、cover_img；
2、插入至少 8 条真实的科技新闻测试数据；
3、后端提供 GET /api/news 接口，返回全部新闻（按发布时间倒序），统一 JSON 格式 { code, msg, data }；
4、新建 frontend/news.html，页面顶部显示当前调用的接口地址，下方以列表展示新闻标题、摘要、来源、时间；
5、数据用 fetch 获取，控制台输出返回数据；
6、把建表与插入数据的 SQL 追加写入 backend/hyt_database.md，接口信息追加写入 backend/hyt_interface.md，本次提示词追加写入 houyutong_prompt.md；
7、在 frontend/index.html 增加入口链接。
```

---

## 记录 #9
- **时间**: 2026-11-20 15:12:30
- **模型**: DeepSeek-V4.1-Flash
- **提示词**:

```
完成图文列表，图片可以使用网络图片或创建图片，创建一个新的表，网页显示后端接口链接和数据内容。
```

---

## 记录 #10
- **时间**: 2026-11-20 15:46:20
- **模型**: DeepSeek-V4.1-Flash
- **提示词**:

```
打不开，没有图片
```

---

## 记录 #11
- **时间**: 2026-11-20 15:52:10
- **模型**: DeepSeek-V4.1-Flash
- **提示词**:

```
把frontend移到hyt-prompt里
```

---

## 记录 #12
- **时间**: 2026-11-20 15:58:40
- **模型**: DeepSeek-V4.1-Flash
- **提示词**:

```
创建 database.html 页面，输入用户名，密码，链接数据库，数据库使用 mysql，成功和错误都有提示，默认用户名 root，密码 hyt061123
```

---

## 记录 #13
- **时间**: 2026-11-20 16:02:15
- **模型**: DeepSeek-V4.1-Flash
- **提示词**:

```
还是打不开啊
```

---

## 记录 #14
- **时间**: 2026-11-20 16:12:30
- **模型**: DeepSeek-V4.1-Flash
- **提示词**:

```
给他变得好看点
```

---

## 记录 #15
- **时间**: 2026-11-20 16:16:40
- **模型**: DeepSeek-V4.1-Flash
- **提示词**:

```
打开这个的预览
```

---

## 记录 #16
- **时间**: 2026-11-20 16:21:05
- **模型**: DeepSeek-V4.1-Flash
- **提示词**:

```
好的，按规则挪回 frontend 目录并同步改后端
```

---
