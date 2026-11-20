/**
 * 姓名：【侯雨彤】 | 学号：【24002120119】 |
 * 时间：2026-11-20 | 大模型：DeepSeek-V4.1-Flash
 *
 * 首页背景动画：canvas 粒子网络，鼠标靠近时产生连线与轻微吸引。
 */

const hyt_canvas = document.getElementById('hyt_bgCanvas');
const hyt_ctx = hyt_canvas.getContext('2d');

let hyt_particles = [];
let hyt_w = 0;
let hyt_h = 0;
let hyt_rafId = 0;

const hyt_pointer = { x: -9999, y: -9999 };
const hyt_reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * 函数功能描述：按设备像素比设置画布尺寸，并重新生成粒子。
 */
function hyt_resize() {
    const hyt_dpr = Math.min(window.devicePixelRatio || 1, 2);
    hyt_w = window.innerWidth;
    hyt_h = window.innerHeight;

    hyt_canvas.width = Math.floor(hyt_w * hyt_dpr);
    hyt_canvas.height = Math.floor(hyt_h * hyt_dpr);
    hyt_ctx.setTransform(hyt_dpr, 0, 0, hyt_dpr, 0, 0);

    hyt_createParticles();
}

/**
 * 函数功能描述：根据视口面积生成适量粒子（每 22000 平方像素一个，最多 110 个）。
 */
function hyt_createParticles() {
    const hyt_count = Math.min(110, Math.floor((hyt_w * hyt_h) / 22000));
    hyt_particles = [];

    for (let hyt_i = 0; hyt_i < hyt_count; hyt_i++) {
        hyt_particles.push({
            x: Math.random() * hyt_w,
            y: Math.random() * hyt_h,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.7 + 0.7
        });
    }
}

/**
 * 函数功能描述：更新粒子位置（碰到边界反弹），并受鼠标轻微吸引。
 */
function hyt_update() {
    for (const hyt_p of hyt_particles) {
        hyt_p.x += hyt_p.vx;
        hyt_p.y += hyt_p.vy;

        if (hyt_p.x < 0 || hyt_p.x > hyt_w) hyt_p.vx *= -1;
        if (hyt_p.y < 0 || hyt_p.y > hyt_h) hyt_p.vy *= -1;

        const hyt_dx = hyt_pointer.x - hyt_p.x;
        const hyt_dy = hyt_pointer.y - hyt_p.y;
        const hyt_dist = Math.hypot(hyt_dx, hyt_dy);

        if (hyt_dist < 150 && hyt_dist > 1) {
            hyt_p.x += (hyt_dx / hyt_dist) * 0.55;
            hyt_p.y += (hyt_dy / hyt_dist) * 0.55;
        }
    }
}

/**
 * 函数功能描述：绘制粒子与粒子间、粒子与鼠标间的连线。
 */
function hyt_draw() {
    hyt_ctx.clearRect(0, 0, hyt_w, hyt_h);

    for (const hyt_p of hyt_particles) {
        hyt_ctx.beginPath();
        hyt_ctx.arc(hyt_p.x, hyt_p.y, hyt_p.r, 0, Math.PI * 2);
        hyt_ctx.fillStyle = 'rgba(148, 197, 255, 0.65)';
        hyt_ctx.fill();
    }

    const hyt_maxDist = 130;

    for (let hyt_i = 0; hyt_i < hyt_particles.length; hyt_i++) {
        const hyt_a = hyt_particles[hyt_i];

        for (let hyt_j = hyt_i + 1; hyt_j < hyt_particles.length; hyt_j++) {
            const hyt_b = hyt_particles[hyt_j];
            const hyt_d = Math.hypot(hyt_a.x - hyt_b.x, hyt_a.y - hyt_b.y);

            if (hyt_d < hyt_maxDist) {
                hyt_ctx.strokeStyle = 'rgba(120, 170, 255, ' + (0.16 * (1 - hyt_d / hyt_maxDist)) + ')';
                hyt_ctx.lineWidth = 1;
                hyt_ctx.beginPath();
                hyt_ctx.moveTo(hyt_a.x, hyt_a.y);
                hyt_ctx.lineTo(hyt_b.x, hyt_b.y);
                hyt_ctx.stroke();
            }
        }

        const hyt_md = Math.hypot(hyt_a.x - hyt_pointer.x, hyt_a.y - hyt_pointer.y);

        if (hyt_md < 170) {
            hyt_ctx.strokeStyle = 'rgba(94, 234, 212, ' + (0.32 * (1 - hyt_md / 170)) + ')';
            hyt_ctx.beginPath();
            hyt_ctx.moveTo(hyt_a.x, hyt_a.y);
            hyt_ctx.lineTo(hyt_pointer.x, hyt_pointer.y);
            hyt_ctx.stroke();
        }
    }
}

/**
 * 函数功能描述：单帧循环，更新后重绘并请求下一帧。
 */
function hyt_loop() {
    hyt_update();
    hyt_draw();
    hyt_rafId = requestAnimationFrame(hyt_loop);
}

/**
 * 函数功能描述：记录指针位置，用于粒子连线与吸引。
 * @param {PointerEvent} hyt_e - 指针事件
 */
function hyt_onPointerMove(hyt_e) {
    hyt_pointer.x = hyt_e.clientX;
    hyt_pointer.y = hyt_e.clientY;
}

/**
 * 函数功能描述：指针离开窗口时把坐标移到画面外，避免残留连线。
 */
function hyt_onPointerLeave() {
    hyt_pointer.x = -9999;
    hyt_pointer.y = -9999;
}

/**
 * 函数功能描述：页面切到后台时暂停动画，回到前台再恢复，节省性能。
 */
function hyt_onVisibility() {
    if (document.hidden) {
        cancelAnimationFrame(hyt_rafId);
    } else {
        hyt_rafId = requestAnimationFrame(hyt_loop);
    }
}

/**
 * 函数功能描述：双击直接打开页面（file://）时，把 /legacy/xxx 绝对链接改写为指向项目根目录的相对链接，避免点击后 404。
 */
function hyt_fixLegacyLinks() {
    if (location.protocol !== 'file:') return;

    const hyt_links = document.querySelectorAll('a[href^="/legacy/"]');

    hyt_links.forEach(function (hyt_a) {
        hyt_a.setAttribute('href', '../../' + hyt_a.getAttribute('href').slice('/legacy/'.length));
    });
}

/**
 * 函数功能描述：初始化画布尺寸、监听事件并启动动画（减弱动效时仅绘制静态一帧）。
 */
function hyt_init() {
    hyt_resize();

    if (hyt_reduced) {
        hyt_draw();
        return;
    }

    window.addEventListener('resize', hyt_resize);
    window.addEventListener('pointermove', hyt_onPointerMove);
    window.addEventListener('pointerleave', hyt_onPointerLeave);
    document.addEventListener('visibilitychange', hyt_onVisibility);

    hyt_rafId = requestAnimationFrame(hyt_loop);
}

hyt_fixLegacyLinks();
hyt_init();
