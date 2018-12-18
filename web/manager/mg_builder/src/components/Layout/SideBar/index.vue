<style lang="less" scoped>
.side-bar {
    position: absolute;
    left:0;
    top:0;
    height: 100%;
    box-sizing: border-box;
    background: #fff;
	box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.07);
}
</style>

<template>
<div>
    <nd-menu :items="menuList"></nd-menu>
</div>
</template>


<script>
import ndMenu from 'nd-menu'
export default {
    data(){
        return {
            menuList: [
                {
                    name: '项目',
                    router : 'home'
                }
            ]
        }
    },
    components:{
        'nd-menu' : ndMenu
    }
}
</script>


