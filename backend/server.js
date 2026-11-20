/**
 * 姓名：【侯雨彤】 | 学号：【24002120119】 |
 * 时间：2026-11-20 | 大模型：DeepSeek-V4.1-Flash
 *
 * 后端入口：启动 Express 服务（端口 8119），托管 frontend 静态资源并挂载 /api 接口。
 */
require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');

const hyt_app = express();
const hyt_port = 8119;

/* 开放全部跨域，仅用于课程作业 */
hyt_app.use(cors());

/* 解析 JSON 请求体 */
hyt_app.use(express.json());

/* 托管新前端静态资源：frontend/ */
hyt_app.use(express.static(path.join(__dirname, '..', 'frontend')));

/* 兼容根目录下的历史课堂练习页，统一走 /legacy 前缀 */
hyt_app.use('/legacy', express.static(path.join(__dirname, '..')));

/* 所有业务接口统一以 /api 为前缀 */
hyt_app.use('/api', require('./routes/hyt_api'));

/* 统一 JSON 404，保证前端能拿到 { code, msg, data } */
hyt_app.use(function (req, res) {
    res.status(404).json({ code: 404, msg: '接口或资源不存在', data: null });
});

hyt_app.listen(hyt_port, function () {
    console.log('[hyt] 服务已启动：http://localhost:' + hyt_port);
});
