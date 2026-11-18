/**
 * 文件功能：本地数据服务器，读取同目录下的 db.json，并通过 /api/poems 接口返回 poems 数组
 * 启动方式：在 db 文件夹执行 node server.js
 */
const express = require('express');
const fs = require('fs');
const path = require('path');

const hyt_app = express();
const hyt_port = 3004;
const hyt_dbPath = path.join(__dirname, 'db.json');

// 给所有响应加上跨域通行证，页面用 file:// 打开也能取到数据
hyt_app.use(function (hyt_req, hyt_res, hyt_next) {
  hyt_res.setHeader('Access-Control-Allow-Origin', '*');
  hyt_next();
});

/**
 * 函数功能描述：读取 db.json 文件，把其中的 poems 数组以 JSON 形式返回给前端。
 * @param {Object} hyt_req - Express 请求对象
 * @param {Object} hyt_res - Express 响应对象
 */
hyt_app.get('/api/poems', function (hyt_req, hyt_res) {
  fs.readFile(hyt_dbPath, 'utf8', function (hyt_err, hyt_data) {
    if (hyt_err) {
      hyt_res.status(500).json({ error: '读取 db.json 失败，请检查文件名与路径' });
      return;
    }
    try {
      const hyt_json = JSON.parse(hyt_data);
      hyt_res.json(hyt_json.poems);
    } catch (hyt_parseErr) {
      hyt_res.status(500).json({ error: 'db.json 格式不是合法 JSON' });
    }
  });
});

/**
 * 函数功能描述：启动服务器，并在终端打印可直接访问的接口地址。
 */
hyt_app.listen(hyt_port, function () {
  console.log('数据服务器已启动：http://localhost:' + hyt_port + '/api/poems');
});
