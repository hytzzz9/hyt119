/**
 * 姓名：【侯雨彤】 | 学号：【24002120119】 |
 * 时间：2026-11-20 | 大模型：DeepSeek-V4.1-Flash
 *
 * MySQL 连接池：只读取环境变量，凭据不落在代码里。
 */
const mysql = require('mysql2/promise');

/* 连接池按 .env 中的四个变量创建 */
const hyt_pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    charset: 'utf8mb4'
});

/**
 * 函数功能描述：执行一条 SQL 并返回结果行，供模型层复用。
 * @param {string} hyt_sql - SQL 语句
 * @param {Array} hyt_params - 占位参数
 * @returns {Promise<Array>} 查询结果
 */
async function hyt_query(hyt_sql, hyt_params) {
    const [hyt_rows] = await hyt_pool.query(hyt_sql, hyt_params || []);
    return hyt_rows;
}

/**
 * 函数功能描述：探测数据库是否可连接，供健康检查使用。
 * @returns {Promise<boolean>} 是否连通
 */
async function hyt_ping() {
    try {
        await hyt_pool.query('SELECT 1');
        return true;
    } catch (hyt_err) {
        console.error('[hyt] 数据库连接失败：', hyt_err.message);
        return false;
    }
}

module.exports = { hyt_pool, hyt_query, hyt_ping };
