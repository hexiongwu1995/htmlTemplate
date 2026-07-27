/**
 * scroll-position-keeper.js
 * 功能：在页面重新加载后保持滚动位置
 * 适用于VS Code实时预览场景，编辑文件时预览页面不会跳回顶部
 */

// 定义存储滚动位置的key（使用当前页面URL作为唯一标识）
const SCROLL_STORAGE_KEY = 'scroll_position_' + window.location.pathname;

/**
 * 保存当前滚动位置到sessionStorage
 */
function saveScrollPosition() {
    const main = document.querySelector('main');
    if (main) {
        const scrollTop = main.scrollTop;
        sessionStorage.setItem(SCROLL_STORAGE_KEY, scrollTop.toString());
    }
}

/**
 * 从sessionStorage读取并恢复滚动位置
 */
function restoreScrollPosition() {
    const savedPosition = sessionStorage.getItem(SCROLL_STORAGE_KEY);
    if (savedPosition) {
        const main = document.querySelector('main');
        if (main) {
            const scrollTop = parseInt(savedPosition, 10);
            if (!isNaN(scrollTop)) {
                main.scrollTop = scrollTop;
            }
        }
    }
}

/**
 * 初始化滚动位置保持功能
 */
function initScrollPositionKeeper() {
    // 页面加载完成后恢复滚动位置
    restoreScrollPosition();

    // 监听滚动事件，保存当前位置
    const main = document.querySelector('main');
    if (main) {
        main.addEventListener('scroll', () => {
            saveScrollPosition();
        });
    }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollPositionKeeper);
} else {
    initScrollPositionKeeper();
}