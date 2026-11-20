# 数据库记录（hyt_database.md）

> 规则：每次建表、改表或插入数据后，按执行顺序追加 SQL 语句（含测试数据 INSERT），
> 要求仅凭本文件即可在新机器上完整重建数据库。

---

## 0. 初始化说明

- 数据库类型：MySQL
- 连接凭据：见 `backend/.env`（`DB_USER` / `DB_PASSWORD` / `DB_HOST` / `DB_NAME`），本文件不记录任何凭据。
- 尚未建表；后续建表语句按顺序追加在下方。

---

## 1. 创建数据库 · 2026-11-20 14:47

```sql
CREATE DATABASE IF NOT EXISTS hyt_web_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;
```

- 说明：库名与 `backend/.env` 中的 `DB_NAME` 一致；字符集 utf8mb4，排序规则 utf8mb4_general_ci。
- 环境备注：本机 MySQL 8.0.30 的 `root` 密码已按课程要求设置，凭据仅保存在 `backend/.env`，成功连接验证通过（`SELECT VERSION()` 返回 8.0.30）。
