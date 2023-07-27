<template>

    <div class="canvas-div">
        <!--画布-->
        <canvas class="mycanvas" 
            id="myCanvas"
            :width="imgSize.width" 
            :height="imgSize.height"
            :style="{
                cursor: isDrag ? 'grab' : 'default',
                top: canvasPosition.y + 'px',
                left: canvasPosition.x + 'px',
            }"
            @mousewheel="handleMouseWheel"
         ></canvas>
    </div>

</template>

<script setup>
import { ref, reactive ,onMounted} from 'vue'
let imgSize = reactive({
    width:0,
    height:0
})
let isDrag = ref(false)

let imgZoom = 1 //图片缩放倍数(默认一倍)
let canvasPosition = reactive({
    x:0,
    y:0
})
let ctx = null
let canvasImg = null


onMounted(()=>{
    loadBgImg(require('../assets/sl.webp')).then(res=>{
        initCanvas(res); //图片加载完后初始化画布
        canvasImg = res
    })
})
 //必须异步加载图片
function loadBgImg(markImg) {
    let img = new Image(); //创建img标签
    img.src = markImg; //添加src
    return new Promise((resolve, reject) => {
        img.onload = () => {
            resolve(img); //返回标签
        };
        img.onerror = (err) => {
            reject(err);
        };
    });
}
async function initCanvas(img){
    // imgSize = { height: img.height, width: img.width }; //记录下图片原始尺寸
    ctx = document.getElementById("myCanvas").getContext("2d"); //获取上下文
    let clientWidth = document.documentElement.clientWidth
    imgZoom = clientWidth/img.width
    imgSize.width = clientWidth
    imgSize.height = imgZoom*img.height
    console.log("imgSize",imgSize)
    await ctx.drawImage(img, 0, 0, imgSize.width,imgSize.height); //在canvas中绘制图片(图片、起始位置、绘图尺寸)   
 
}

  //鼠标滚动事件(wheelDelta值上滚为负下滚为正)
async function handleMouseWheel(e) {
    let el = document.getElementById("myCanvas");
    let oldX = el.offsetLeft; //旧位置
    let oldY = el.offsetTop;
    await changeCanvas(e, oldX, oldY); //改变画布
    //使用改变后的此村绘制图片
    await ctx.drawImage(
        canvasImg,
        0,
        0,
        imgSize.width,
        imgSize.height
    );
    // await this.drawToArr(); //重绘列表数据
}
 //滚动时改变画布
 function changeCanvas(e, oldX, oldY) {
    let zoomSpeed = 1.2; //缩放速度
    e.wheelDelta < 0 && (zoomSpeed = 2 - zoomSpeed); //判断放大与缩小
    let posX = e.offsetX; //获取鼠标定点的位置（鼠标在图片上的位置）
    let posY = e.offsetY;
    let oldImgZoom = imgZoom; //记录下旧的图片缩放倍数
    imgZoom = imgZoom * zoomSpeed; //更新缩放倍数
    let minZoom = 0.3; //最小缩放倍数
    let maxZoom = 3; //最大缩放倍数
    imgZoom > maxZoom && (imgZoom = maxZoom); //限制缩放倍数
    imgZoom < minZoom && (imgZoom = minZoom);
    zoomSpeed = imgZoom / oldImgZoom; //更新缩放速度
    let height = Math.round(imgSize.height * imgZoom); //计算画布新宽高(原始宽高乘缩放倍数)
    let width = Math.round(imgSize.width * imgZoom);
    //   let newX = oldX + Math.round(posX * (1 - zoomSpeed)); //计算画布新位置(旧位置加偏移量)
    //   let newY = oldY + Math.round(posY * (1 - zoomSpeed));

    imgSize.height = height
    imgSize.width = width
    console.log("imgSize",imgSize)
    // canvasPosition.x = newX
    // canvasPosition.y = newY
     
}

</script>

<style scoped lang="scss">
.canvas-div{
    height:100%;
    width:100%;
    overflow: hidden;
      position: absolute;
    .mycanvas{
        background-color: #b4c5b4;
        position:absolute;
    }
}

</style>