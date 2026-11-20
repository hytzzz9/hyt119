/**
 * 姓名：【侯雨彤】 | 学号：【24002120119】 |
 * 时间：2026-11-20 | 大模型：DeepSeek-V4.1-Flash
 *
 * 科技新闻列表页逻辑：请求 /api/news，渲染接口条与新闻列表
 */

/** 是否以文件方式直接打开页面（此时接口需补全为后端地址） */
const hyt_isFile = location.protocol === 'file:';

/** 接口地址常量：直接双击打开时指向本地后端，走服务访问时用相对路径 */
const hyt_apiUrl = hyt_isFile ? 'http://localhost:8119/api/news' : '/api/news';

/** 页面元素引用 */
const hyt_list = document.getElementById('hyt_list');
const hyt_tip = document.getElementById('hyt_tip');
const hyt_apiCount = document.getElementById('hyt_apiCount');
const hyt_refreshBtn = document.getElementById('hyt_refreshBtn');
const hyt_apiLink = document.getElementById('hyt_apiLink');

/**
 * 函数功能描述：把数据库返回的时间字符串格式化为 yyyy-MM-dd HH:mm。
 * @param {string} hyt_value - 原始时间字符串
 * @returns {string} 格式化后的时间
 */
function hyt_formatTime(hyt_value) {
    if (!hyt_value) {
        return '时间未知';
    }

    const hyt_date = new Date(hyt_value);

    if (Number.isNaN(hyt_date.getTime())) {
        return String(hyt_value);
    }

    const hyt_pad = hyt_num => String(hyt_num).padStart(2, '0');

    return hyt_date.getFullYear() + '-' + hyt_pad(hyt_date.getMonth() + 1) + '-' + hyt_pad(hyt_date.getDate())
        + ' ' + hyt_pad(hyt_date.getHours()) + ':' + hyt_pad(hyt_date.getMinutes());
}

/**
 * 函数功能描述：把一条新闻渲染为列表项（标题、摘要、来源、时间）。
 * @param {Object} hyt_item - 单条新闻数据
 * @returns {HTMLLIElement} 列表项节点
 */
function hyt_buildItem(hyt_item) {
    const hyt_li = document.createElement('li');

    const hyt_title = document.createElement('h2');
    hyt_title.className = 'hyt_itemTitle';
    hyt_title.textContent = hyt_item.hyt_title;

    const hyt_summary = document.createElement('p');
    hyt_summary.className = 'hyt_itemSummary';
    hyt_summary.textContent = hyt_item.hyt_summary;

    const hyt_foot = document.createElement('div');
    hyt_foot.className = 'hyt_itemFoot';

    const hyt_footData = [
        '来源 ' + (hyt_item.hyt_source || '本站'),
        hyt_formatTime(hyt_item.hyt_publish_time)
    ];

    hyt_footData.forEach(hyt_text => {
        const hyt_span = document.createElement('span');
        hyt_span.textContent = hyt_text;
        hyt_foot.appendChild(hyt_span);
    });

    hyt_li.appendChild(hyt_title);
    hyt_li.appendChild(hyt_summary);
    hyt_li.appendChild(hyt_foot);

    return hyt_li;
}

/**
 * 函数功能描述：请求新闻接口并刷新页面内容，成功与失败都输出到控制台。
 */
async function hyt_loadNews() {
    hyt_refreshBtn.disabled = true;
    hyt_tip.classList.remove('is-bad');
    hyt_tip.textContent = '正在加载新闻…';

    try {
        const hyt_res = await fetch(hyt_apiUrl);
        const hyt_body = await hyt_res.json();

        console.log('[hyt] 接口返回：', hyt_apiUrl, hyt_body);

        if (hyt_body.code !== 0) {
            throw new Error(hyt_body.msg || '接口返回失败');
        }

        const hyt_list_data = (hyt_body.data && hyt_body.data.list) || [];

        hyt_apiCount.textContent = '共 ' + hyt_list_data.length + ' 条';
        hyt_list.innerHTML = '';
        hyt_list_data.forEach(hyt_item => hyt_list.appendChild(hyt_buildItem(hyt_item)));

        hyt_tip.textContent = hyt_list_data.length
            ? '数据来自数据库表 hyt_news，点击上方接口链接可查看原始 JSON'
            : '数据库暂无新闻数据';
    } catch (hyt_err) {
        console.error('[hyt] 获取新闻失败：', hyt_err.message);

        hyt_list.innerHTML = '';
        hyt_apiCount.textContent = '共 0 条';
        hyt_tip.classList.add('is-bad');
        hyt_tip.textContent = '获取新闻失败：' + hyt_err.message + '（请确认后端已启动，端口 8119）';
    } finally {
        hyt_refreshBtn.disabled = false;
    }
}

/** 绑定刷新按钮 */
hyt_refreshBtn.addEventListener('click', hyt_loadNews);

/** 接口链接补全为完整地址，便于展示与复制 */
hyt_apiLink.href = hyt_apiUrl;
hyt_apiLink.textContent = hyt_apiLink.href;
hyt_apiLink.title = hyt_apiLink.href;

/** 页面加载后立即请求一次 */
hyt_loadNews();
