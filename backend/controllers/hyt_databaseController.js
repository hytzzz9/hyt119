/**
 * 姓名：【侯雨彤】 | 学号：【24002120119】 |
 * 时间：2026-11-20 | 大模型：DeepSeek-V4.1-Flash
 *
 * 控制器：用页面提交的用户名 / 密码尝试连接 MySQL，返回成功或错误提示。
 */
const mysql = require('mysql2/promise');

/**
 * 函数功能描述：校验参数后用临时连接测试 MySQL 登录，并返回统一 code/msg/data 结构。
 * @param {import('express').Request} hyt_req - 请求对象（body: user, password）
 * @param {import('express').Response} hyt_res - 响应对象
 */
async function hyt_testDatabase(hyt_req, hyt_res) {
    const hyt_user = String(hyt_req.body && hyt_req.body.user || '').trim();
    const hyt_password = String(hyt_req.body && hyt_req.body.password || '');

    if (!hyt_user) {
        return hyt_res.json({ code: 1, msg: '用户名不能为空', data: null });
    }

    const hyt_host = process.env.DB_HOST || 'localhost';
    let hyt_conn = null;

    try {
        hyt_conn = await mysql.createConnection({
            host: hyt_host,
            user: hyt_user,
            password: hyt_password,
            connectTimeout: 5000,
            charset: 'utf8mb4'
        });

        const [hyt_rows] = await hyt_conn.query('SELECT VERSION() AS hyt_version');
        const hyt_version = hyt_rows[0] && hyt_rows[0].hyt_version;

        console.log('[hyt] 数据库连接成功：', hyt_user, '@', hyt_host);

        hyt_res.json({
            code: 0,
            msg: '连接成功',
            data: {
                host: hyt_host,
                user: hyt_user,
                version: hyt_version,
                time: new Date().toISOString()
            }
        });
    } catch (hyt_err) {
        const hyt_reason = hyt_err.code ? hyt_err.code + ' · ' + hyt_err.message : hyt_err.message;
        console.error('[hyt] 数据库连接失败：', hyt_reason);

        hyt_res.json({
            code: 1,
            msg: '连接失败：' + hyt_reason,
            data: { host: hyt_host, user: hyt_user }
        });
    } finally {
        if (hyt_conn) {
            await hyt_conn.end().catch(function () {});
        }
    }
}

module.exports = { hyt_testDatabase };
