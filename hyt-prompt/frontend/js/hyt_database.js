/**
 * 姓名：【侯雨彤】 | 学号：【24002120119】 |
 * 时间：2026-11-20 | 大模型：DeepSeek-V4.1-Flash
 *
 * 数据库检测页交互：提交表单调用 /api/database/test，成功与失败都给出提示。
 */

const hyt_form = document.getElementById('hyt_dbForm');

/** 直接双击打开 html 时，接口需指向本地后端（否则相对路径无法请求） */
const hyt_apiUrl = location.protocol === 'file:'
    ? 'http://localhost:8119/api/database/test'
    : '/api/database/test';
const hyt_userInput = document.getElementById('hyt_user');
const hyt_pwdInput = document.getElementById('hyt_password');
const hyt_submitBtn = document.getElementById('hyt_submitBtn');
const hyt_tip = document.getElementById('hyt_tip');
const hyt_detail = document.getElementById('hyt_detail');
const hyt_hostOut = document.getElementById('hyt_host');
const hyt_userOut = document.getElementById('hyt_userOut');
const hyt_versionOut = document.getElementById('hyt_version');
const hyt_timeOut = document.getElementById('hyt_time');

/**
 * 函数功能描述：切换提示框的样式状态（等待 / 成功 / 失败）。
 * @param {string} hyt_state - 'loading' | 'ok' | 'bad' | 'idle'
 * @param {string} hyt_text - 提示文案
 */
function hyt_setTip(hyt_state, hyt_text) {
    hyt_tip.classList.remove('is-ok', 'is-bad', 'is-loading');
    if (hyt_state === 'ok') hyt_tip.classList.add('is-ok');
    if (hyt_state === 'bad') hyt_tip.classList.add('is-bad');
    if (hyt_state === 'loading') hyt_tip.classList.add('is-loading');
    hyt_tip.textContent = hyt_text;
}

/**
 * 函数功能描述：把连接成功后的主机、用户、版本、时间写入详情区并显示。
 * @param {object} hyt_data - 接口返回的 data 对象
 */
function hyt_showDetail(hyt_data) {
    hyt_hostOut.textContent = hyt_data.host || '-';
    hyt_userOut.textContent = hyt_data.user || '-';
    hyt_versionOut.textContent = hyt_data.version || '-';
    hyt_timeOut.textContent = hyt_data.time ? new Date(hyt_data.time).toLocaleString('zh-CN') : '-';
    hyt_detail.classList.remove('hyt_hide');
}

/**
 * 函数功能描述：提交表单前做非空校验，返回是否允许继续。
 * @returns {boolean} 校验是否通过
 */
function hyt_validate() {
    const hyt_user = hyt_userInput.value.trim();

    if (!hyt_user) {
        hyt_setTip('bad', '用户名不能为空，请输入后再试。');
        hyt_userInput.focus();
        return false;
    }

    return true;
}

/**
 * 函数功能描述：向 /api/database/test 发起连接测试，处理成功与失败提示。
 * @param {SubmitEvent} hyt_event - 表单提交事件
 */
async function hyt_onSubmit(hyt_event) {
    hyt_event.preventDefault();

    if (!hyt_validate()) return;

    hyt_submitBtn.disabled = true;
    hyt_detail.classList.add('hyt_hide');
    hyt_setTip('loading', '正在连接 MySQL，请稍候…');

    try {
        const hyt_res = await fetch(hyt_apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: hyt_userInput.value.trim(),
                password: hyt_pwdInput.value
            })
        });

        const hyt_json = await hyt_res.json();

        if (hyt_json.code === 0) {
            hyt_setTip('ok', '✓ ' + hyt_json.msg + '（MySQL ' + (hyt_json.data.version || '') + '）');
            hyt_showDetail(hyt_json.data || {});
            console.log('[hyt] 数据库连接成功：', hyt_json.data);
        } else {
            hyt_setTip('bad', '✗ ' + hyt_json.msg);
            console.error('[hyt] 数据库连接失败：', hyt_json.msg);
        }
    } catch (hyt_err) {
        hyt_setTip('bad', '✗ 请求失败：' + hyt_err.message + '（请确认后端已在 8119 端口运行）');
        console.error('[hyt] 请求异常：', hyt_err);
    } finally {
        hyt_submitBtn.disabled = false;
    }
}

/**
 * 函数功能描述：重置表单时恢复默认提示与详情区隐藏状态。
 */
function hyt_onReset() {
    hyt_detail.classList.add('hyt_hide');
    hyt_setTip('idle', '等待连接…');
}

hyt_form.addEventListener('submit', hyt_onSubmit);
hyt_form.addEventListener('reset', hyt_onReset);
