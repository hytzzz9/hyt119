/**
 * 姓名：【侯雨彤】 | 学号：【24002120119】 |
 * 时间：2026-11-20 | 大模型：DeepSeek-V4.1-Flash
 *
 * 控制器：健康检查，验证服务与数据库状态。
 */
const hyt_db = require('../config/hyt_db');

/**
 * 函数功能描述：返回服务状态与数据库连通状态，统一 code/msg/data 结构。
 * @param {import('express').Request} hyt_req - 请求对象
 * @param {import('express').Response} hyt_res - 响应对象
 */
async function hyt_health(hyt_req, hyt_res) {
    const hyt_dbOk = await hyt_db.hyt_ping();

    hyt_res.json({
        code: 0,
        msg: '服务正常',
        data: {
            service: 'ok',
            database: hyt_dbOk ? 'ok' : 'unavailable',
            time: new Date().toISOString()
        }
    });
}

module.exports = { hyt_health };
