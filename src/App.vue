<script>
export default {
    onLaunch: function () {
        console.log("App Launch");
    },
    onShow: function () {
        console.log("App Show");
    },
    onHide: function () {
        console.log("App Hide");
    },
};
</script>

<style>
/*每个页面公共css */

/* 确保CSS变量在全局范围内可用 */
page {
    /* 在uni-app中，page标签相当于根节点 */
    background-color: var(--white, #fff);
    color: var(--dark-color, #343a40);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
        "Open Sans", "Helvetica Neue", sans-serif;
}

/* 隐藏滚动条 - 适用于uni-app所有平台 */
::-webkit-scrollbar {
    display: none;
}

/* 在page中设置以适应小程序环境 */
page {
    overflow: hidden;
}

/* 所有可滚动元素都隐藏滚动条但保留滚动功能 */
view,
scroll-view {
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
}
</style>
