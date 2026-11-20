/**
 * 姓名：【侯雨彤】 | 学号：【24002120119】 |
 * 时间：2026-11-20 | 大模型：DeepSeek-V4.1-Flash
 *
 * 路由入口：所有接口以 /api 为前缀，在此按模块挂载。
 */
const express = require('express');
const hyt_healthController = require('../controllers/hyt_healthController');
const hyt_databaseController = require('../controllers/hyt_databaseController');

const hyt_router = express.Router();

/* 健康检查：GET /api/health */
hyt_router.get('/health', hyt_healthController.hyt_health);

/* 数据库连接测试：POST /api/database/test */
hyt_router.post('/database/test', hyt_databaseController.hyt_testDatabase);

module.exports = hyt_router;
