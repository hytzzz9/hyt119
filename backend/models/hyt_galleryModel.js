/**
 * 姓名：【侯雨彤】 | 学号：【24002120119】 |
 * 时间：2026-11-20 | 大模型：DeepSeek-V4.1-Flash
 *
 * 模型层：图文列表（hyt_gallery 表）的查询。
 */
const hyt_db = require('../config/hyt_db');

/**
 * 函数功能描述：按发布时间倒序查询全部图文数据。
 * @returns {Promise<Array>} 图文列表
 */
async function hyt_listGallery() {
    const hyt_sql = [
        'SELECT hyt_id, hyt_title, hyt_desc, hyt_location, hyt_img, hyt_publish_time',
        '  FROM hyt_gallery',
        ' ORDER BY hyt_publish_time DESC, hyt_id DESC'
    ].join('\n');

    return hyt_db.hyt_query(hyt_sql);
}

module.exports = { hyt_listGallery };
