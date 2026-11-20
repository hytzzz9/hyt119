/**
 * 姓名：【侯雨彤】 | 学号：【24002120119】 |
 * 时间：2026-11-20 | 大模型：DeepSeek-V4.1-Flash
 *
 * 控制器：科技新闻列表接口。
 */
const hyt_newsModel = require('../models/hyt_newsModel');

/**
 * 函数功能描述：返回科技新闻列表与总数，失败时返回错误信息。
 * @param {import('express').Request} hyt_req - 请求对象
 * @param {import('express').Response} hyt_res - 响应对象
 */
async function hyt_listNews(hyt_req, hyt_res) {
    try {
        const hyt_rows = await hyt_newsModel.hyt_listNews();

        console.log('[hyt] 查询科技新闻成功，共', hyt_rows.length, '条');

        hyt_res.json({
            code: 0,
            msg: '获取成功',
            data: { total: hyt_rows.length, list: hyt_rows }
        });
    } catch (hyt_err) {
        console.error('[hyt] 查询科技新闻失败：', hyt_err.message);
        hyt_res.json({ code: 1, msg: '查询失败：' + hyt_err.message, data: null });
    }
}

module.exports = { hyt_listNews };
