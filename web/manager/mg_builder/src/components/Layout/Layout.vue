<style lang="less" scoped>
.layout {
    width: 100vw;
    height: 100vh;
    padding: 50px 0 0 200px;
    box-sizing: border-box;
}
.top-bar {
    height: 50px;
}
.side-bar{
    padding-top: 50px;
    width: 200px;
}
.content-bar{
    width:100%;
    height: 100%;
}
</style>

<template>
<div class="layout">
    <top-bar class="top-bar" />
    <side-bar class="side-bar" />
    <div class="content-bar">
        <slot></slot>
    </div>
</div>
</template>

<script>
import SideBar from './SideBar';
import TopBar from './TopBar';
export default {

    components:{
        SideBar,
        TopBar,
    }
}
</script>


