/**
 * 姓名：【侯雨彤】 | 学号：【24002120119】 |
 * 时间：2026-11-20 | 大模型：DeepSeek-V4.1-Flash
 *
 * 模型层：科技新闻表的查询。
 */
const hyt_db = require('../config/hyt_db');

/**
 * 函数功能描述：按发布时间倒序查询全部科技新闻。
 * @returns {Promise<Array>} 新闻列表
 */
async function hyt_listNews() {
    const hyt_sql = [
        'SELECT hyt_id, hyt_title, hyt_summary, hyt_content,',
        '       hyt_source, hyt_publish_time, hyt_cover_img',
        '  FROM hyt_news',
        ' ORDER BY hyt_publish_time DESC, hyt_id DESC'
    ].join('\n');

    return hyt_db.hyt_query(hyt_sql);
}

module.exports = { hyt_listNews };
