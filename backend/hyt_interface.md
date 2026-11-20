# 接口记录（hyt_interface.md）

> 规则：每次创建或修改接口后追加一条记录，禁止覆盖已有内容。
> 统一响应格式：`{ "code": 0, "msg": "提示信息", "data": {...} }`，`code = 0` 表示成功。

---

## 记录 #1 · 2026-11-20 14:15

- **接口路径**：`/api/health`
- **HTTP 方法**：GET
- **请求参数**：无
- **响应格式**：

```json
{
  "code": 0,
  "msg": "服务正常",
  "data": {
    "service": "ok",
    "database": "ok",
    "time": "2026-11-20T06:15:00.000Z"
  }
}
```

- **说明**：健康检查接口，`data.database` 为 `ok` 表示 MySQL 连接池可用，`unavailable` 表示连接失败（此时仍返回 `code: 0`，服务本身可用）。

---

## 记录 #2 · 2026-11-20 14:32

- **接口路径**：`/api/database/test`
- **HTTP 方法**：POST
- **请求参数**（`application/json`）：

```json
{
  "user": "root",
  "password": "hyt061123"
}
```

- **响应格式（成功）**：

```json
{
  "code": 0,
  "msg": "连接成功",
  "data": {
    "host": "localhost",
    "user": "root",
    "version": "8.0.36",
    "time": "2026-11-20T06:32:00.000Z"
  }
}
```

- **响应格式（失败）**：

```json
{
  "code": 1,
  "msg": "连接失败：ER_ACCESS_DENIED_ERROR · Access denied for user 'root'@'localhost' (using password: YES)",
  "data": { "host": "localhost", "user": "root" }
}
```

- **说明**：使用请求中的用户名 / 密码建立一次性 MySQL 连接并执行 `SELECT VERSION()`，连接用完即关闭；主机取自 `.env` 的 `DB_HOST`，不落库、不保存请求中的密码。

---

## 记录 #3 · 2026-11-20 14:58

- **接口路径**：`/api/news`
- **HTTP 方法**：GET
- **请求参数**：无（无查询串、无请求体）
- **响应格式（成功）**：

```json
{
  "code": 0,
  "msg": "获取成功",
  "data": {
    "total": 8,
    "list": [
      {
        "hyt_id": 1,
        "hyt_title": "国产 AI 芯片新一代架构发布，训练能效提升明显",
        "hyt_category": "芯片",
        "hyt_summary": "新架构面向大模型训练场景，单位算力能耗较上一代下降约三成……",
        "hyt_source": "科技日报",
        "hyt_published_at": "2026-11-20T00:30:00.000Z",
        "hyt_views": 1286
      }
    ]
  }
}
```

- **响应格式（失败）**：

```json
{
  "code": 1,
  "msg": "查询失败：connect ECONNREFUSED 127.0.0.1:3306",
  "data": null
}
```

- **说明**：从数据库表 `hyt_news` 按 `hyt_published_at` 倒序读取全部新闻；`data.list` 为数组，`data.total` 为条数；时间字段由 MySQL DATETIME 序列化为 ISO 字符串。

---

## 记录 #4 · 2026-11-20 15:05

- **接口路径**：`/api/news`（字段调整后的最终版本）
- **HTTP 方法**：GET
- **请求参数**：无
- **响应格式（成功）**：

```json
{
  "code": 0,
  "msg": "获取成功",
  "data": {
    "total": 8,
    "list": [
      {
        "hyt_id": 1,
        "hyt_title": "国产 AI 芯片新一代架构发布，训练能效提升明显",
        "hyt_summary": "新架构面向大模型训练场景，单位算力能耗较上一代下降约三成，多家整机厂商已同步推出适配方案。",
        "hyt_content": "该芯片采用芯粒拼接与近存计算设计……",
        "hyt_source": "科技日报",
        "hyt_publish_time": "2026-11-20T00:30:00.000Z",
        "hyt_cover_img": "https://picsum.photos/seed/hyt-news-1/800/450"
      }
    ]
  }
}
```

- **响应格式（失败）**：

```json
{ "code": 1, "msg": "查询失败：<错误原因>", "data": null }
```

- **说明**：表结构改为 `hyt_id / hyt_title / hyt_summary / hyt_content / hyt_source / hyt_publish_time / hyt_cover_img`，按 `hyt_publish_time` 倒序；本记录替代记录 #3 的字段定义。

---

## 记录 #5 · 2026-11-20 15:17

- **接口路径**：`/api/gallery`
- **HTTP 方法**：GET
- **请求参数**：无
- **响应格式（成功）**：

```json
{
  "code": 0,
  "msg": "获取成功",
  "data": {
    "total": 8,
    "list": [
      {
        "hyt_id": 1,
        "hyt_title": "紫禁城的秋日金顶",
        "hyt_desc": "琉璃瓦在午后的斜阳里连成一片暖金，红墙与蓝天之间只剩干净的光影。",
        "hyt_location": "北京 · 故宫",
        "hyt_img": "/images/hyt_gallery_1.jpg",
        "hyt_publish_time": "2026-11-20T01:10:00.000Z"
      }
    ]
  }
}
```

- **响应格式（失败）**：

```json
{ "code": 1, "msg": "查询失败：<错误原因>", "data": null }
```

- **说明**：读取数据库表 `hyt_gallery`，按 `hyt_publish_time` 倒序；`hyt_img` 为站内相对路径，由 `express.static` 托管 `frontend/` 后可直接访问。

