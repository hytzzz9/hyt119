# 数据库记录（hyt_database.md）

> 规则：每次建表、改表或插入数据后，按执行顺序追加 SQL 语句（含测试数据 INSERT），
> 要求仅凭本文件即可在新机器上完整重建数据库。

---

## 0. 初始化说明

- 数据库类型：MySQL
- 连接凭据：见 `backend/.env`（`DB_USER` / `DB_PASSWORD` / `DB_HOST` / `DB_NAME`），本文件不记录任何凭据。
- 尚未建表；后续建表语句按顺序追加在下方。
