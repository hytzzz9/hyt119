/**
 * 姓名：【侯雨彤】 | 学号：【24002120119】 |
 * 时间：2026-11-20 | 大模型：DeepSeek-V4.1-Flash
 *
 * 控制器：图文列表接口。
 */
const hyt_galleryModel = require('../models/hyt_galleryModel');

/**
 * 函数功能描述：返回图文列表与总数，失败时返回错误信息。
 * @param {import('express').Request} hyt_req - 请求对象
 * @param {import('express').Response} hyt_res - 响应对象
 */
async function hyt_listGallery(hyt_req, hyt_res) {
    try {
        const hyt_rows = await hyt_galleryModel.hyt_listGallery();

        console.log('[hyt] 查询图文列表成功，共', hyt_rows.length, '条');

        hyt_res.json({
            code: 0,
            msg: '获取成功',
            data: { total: hyt_rows.length, list: hyt_rows }
        });
    } catch (hyt_err) {
        console.error('[hyt] 查询图文列表失败：', hyt_err.message);
        hyt_res.json({ code: 1, msg: '查询失败：' + hyt_err.message, data: null });
    }
}

module.exports = { hyt_listGallery };
