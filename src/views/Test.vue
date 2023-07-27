<template>
    <div class="btn-box" style="margin:10px">
        <el-button type="primary" @click="startDraw">开始画图-{{ data.name }}</el-button>
    </div>
       
    <div id="simpleSquare"></div>
</template>

<script setup>
import { ref, reactive ,onMounted,toRefs} from 'vue'
// import { SVG } from "@svgdotjs/svg.js"
// 引入hooks
import useTest from '../hooks/useTest7'

let data = reactive({
    name:"陈江"
})
useTest()
function startDraw(){
    console.log("开始画图",data)
}


// onMounted(()=>{
    
// })

// return {
//   ...toRefs(data)
// };;
</script>

<style scoped lang="scss">
 svg {
      background-color: #f0f0f0;
      cursor: crosshair;
    }
    .point {
      fill: #f00;
    }
#simpleSquare{
    width:100%;
    height:100%;
}
::v-deep .cj-select{
    fill:rgba(222,222,222,0.2)
}
::v-deep .svg_select_points_rt,::v-deep .svg_select_points_lb{
    cursor: ne-resize;
}
::v-deep .svg_select_points_lt ,::v-deep .svg_select_points_rb{
    cursor:nw-resize;
}
::v-deep .svg_select_points_r ,::v-deep .svg_select_points_l{
    cursor:w-resize;
}
::v-deep .svg_select_points_t ,::v-deep .svg_select_points_b{
    cursor:s-resize;
}
// ::v-deep .svg_select_points_rot{
// display: none;
// }
</style>