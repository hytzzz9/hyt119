/**
 * 姓名：【侯雨彤】 | 学号：【24002120119】 |
 * 时间：2026-11-20 | 大模型：DeepSeek-V4.1-Flash
 *
 * 图文列表页逻辑：请求 /api/gallery，渲染接口条与图文卡片
 */

/** 是否以文件方式直接打开页面（此时接口与图片需补全为后端地址） */
const hyt_isFile = location.protocol === 'file:';

/** 接口地址常量：直接双击打开时指向本地后端，走服务访问时用相对路径 */
const hyt_apiUrl = hyt_isFile ? 'http://localhost:8119/api/gallery' : '/api/gallery';

/** 页面元素引用 */
const hyt_grid = document.getElementById('hyt_grid');
const hyt_tip = document.getElementById('hyt_tip');
const hyt_apiCount = document.getElementById('hyt_apiCount');
const hyt_refreshBtn = document.getElementById('hyt_refreshBtn');
const hyt_apiLink = document.getElementById('hyt_apiLink');

/**
 * 函数功能描述：把时间字符串格式化为 yyyy-MM-dd HH:mm。
 * @param {string} hyt_value - 原始时间字符串
 * @returns {string} 格式化后的时间
 */
function hyt_formatTime(hyt_value) {
    const hyt_date = new Date(hyt_value);

    if (!hyt_value || Number.isNaN(hyt_date.getTime())) {
        return '时间未知';
    }

    const hyt_pad = hyt_num => String(hyt_num).padStart(2, '0');

    return hyt_date.getFullYear() + '-' + hyt_pad(hyt_date.getMonth() + 1) + '-' + hyt_pad(hyt_date.getDate())
        + ' ' + hyt_pad(hyt_date.getHours()) + ':' + hyt_pad(hyt_date.getMinutes());
}

/**
 * 函数功能描述：把一条图文数据渲染为卡片。
 * @param {Object} hyt_item - 单条图文数据
 * @returns {HTMLLIElement} 卡片节点
 */
function hyt_buildCard(hyt_item) {
    const hyt_li = document.createElement('li');
    hyt_li.className = 'hyt_card';

    const hyt_thumb = document.createElement('div');
    hyt_thumb.className = 'hyt_thumb';

    const hyt_img = document.createElement('img');
    hyt_img.src = hyt_isFile ? hyt_item.hyt_img.replace(/^\//, '') : hyt_item.hyt_img;
    hyt_img.alt = hyt_item.hyt_title;
    hyt_img.loading = 'lazy';

    const hyt_place = document.createElement('span');
    hyt_place.className = 'hyt_place';
    hyt_place.textContent = hyt_item.hyt_location;

    hyt_thumb.appendChild(hyt_img);
    hyt_thumb.appendChild(hyt_place);

    const hyt_body = document.createElement('div');
    hyt_body.className = 'hyt_body';

    const hyt_cardTitle = document.createElement('h2');
    hyt_cardTitle.className = 'hyt_cardTitle';
    hyt_cardTitle.textContent = hyt_item.hyt_title;

    const hyt_desc = document.createElement('p');
    hyt_desc.className = 'hyt_desc';
    hyt_desc.textContent = hyt_item.hyt_desc;

    const hyt_time = document.createElement('span');
    hyt_time.className = 'hyt_time';
    hyt_time.textContent = '发布 ' + hyt_formatTime(hyt_item.hyt_publish_time);

    hyt_body.appendChild(hyt_cardTitle);
    hyt_body.appendChild(hyt_desc);
    hyt_body.appendChild(hyt_time);

    hyt_li.appendChild(hyt_thumb);
    hyt_li.appendChild(hyt_body);

    return hyt_li;
}

/**
 * 函数功能描述：请求图文接口并刷新页面内容，成功与失败都输出到控制台。
 */
async function hyt_loadGallery() {
    hyt_refreshBtn.disabled = true;
    hyt_tip.classList.remove('is-bad');
    hyt_tip.textContent = '正在加载图文…';

    try {
        const hyt_res = await fetch(hyt_apiUrl);
        const hyt_body = await hyt_res.json();

        console.log('[hyt] 接口返回：', hyt_apiUrl, hyt_body);

        if (hyt_body.code !== 0) {
            throw new Error(hyt_body.msg || '接口返回失败');
        }

        const hyt_rows = (hyt_body.data && hyt_body.data.list) || [];

        hyt_apiCount.textContent = '共 ' + hyt_rows.length + ' 条';
        hyt_grid.innerHTML = '';
        hyt_rows.forEach(hyt_item => hyt_grid.appendChild(hyt_buildCard(hyt_item)));

        hyt_tip.textContent = hyt_rows.length
            ? '图片存放于 frontend/images，图说与地点来自数据库'
            : '数据库暂无图文数据';
    } catch (hyt_err) {
        console.error('[hyt] 获取图文失败：', hyt_err.message);

        hyt_grid.innerHTML = '';
        hyt_apiCount.textContent = '共 0 条';
        hyt_tip.classList.add('is-bad');
        hyt_tip.textContent = '获取图文失败：' + hyt_err.message + '（请确认后端已启动，端口 8119）';
    } finally {
        hyt_refreshBtn.disabled = false;
    }
}

/** 绑定刷新按钮 */
hyt_refreshBtn.addEventListener('click', hyt_loadGallery);

/** 接口链接显示为完整地址 */
hyt_apiLink.href = hyt_apiUrl;
hyt_apiLink.textContent = hyt_apiLink.href;
hyt_apiLink.title = hyt_apiLink.href;

/** 页面加载后立即请求一次 */
hyt_loadGallery();
