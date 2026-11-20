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

