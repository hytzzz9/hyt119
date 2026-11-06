/**
 * 切换到指定索引的选项卡，同步更新按钮与内容面板的选中状态。
 * 先清除所有选项卡的选中状态，再设置当前元素的选中状态。
 * @param {NodeList} tabs - 选项卡按钮集合
 * @param {NodeList} panels - 内容面板集合
 * @param {number} index - 要切换到的索引，从 0 开始
 * @param {string} activeClass - 选中状态对应的 CSS 类名
 */
function switchTab(tabs, panels, index, activeClass = 'active') {
  // 1. 清除所有选项卡的选中状态
  tabs.forEach(function(t) {
    t.classList.remove(activeClass);
  });
  panels.forEach(function(p) {
    p.classList.remove(activeClass);
  });
  // 2. 设置当前元素的选中状态
  if (tabs[index]) {
    tabs[index].classList.add(activeClass);
  }
  if (panels[index]) {
    panels[index].classList.add(activeClass);
  }
}

/**
 * 初始化 Tab 选项卡组件，绑定按钮与内容面板的点击切换。
 * @param {string} tabSelector - 选项卡按钮的 CSS 选择器
 * @param {string} panelSelector - 内容面板的 CSS 选择器
 * @param {string} activeClass - 选中状态对应的 CSS 类名，默认 'active'
 */
function initTab(tabSelector, panelSelector, activeClass = 'active') {
  const tabs = document.querySelectorAll(tabSelector);
  const panels = document.querySelectorAll(panelSelector);

  tabs.forEach(function(tab, index) {
    // 为每个选项卡绑定点击监听事件
    tab.addEventListener('click', function() {
      switchTab(tabs, panels, index, activeClass);
    });
  });
}

/**
 * 设置默认选中的选项卡。
 * @param {string} tabSelector - 选项卡按钮的 CSS 选择器
 * @param {string} panelSelector - 内容面板的 CSS 选择器
 * @param {number} index - 默认选中项的索引，从 0 开始
 * @param {string} activeClass - 选中状态对应的 CSS 类名，默认 'active'
 */
function setDefaultTab(tabSelector, panelSelector, index = 0, activeClass = 'active') {
  const tabs = document.querySelectorAll(tabSelector);
  const panels = document.querySelectorAll(panelSelector);
  switchTab(tabs, panels, index, activeClass);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  setDefaultTab('.tab-btn', '.tab-panel', 0); // 国内新闻默认选中
  initTab('.tab-btn', '.tab-panel');
});
