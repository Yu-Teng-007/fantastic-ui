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
</style>
