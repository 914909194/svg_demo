// import {SVG} from "@svgdotjs/svg.js"

// import '@svgdotjs/svg.draggable.js'
// import '@svgdotjs/svg.panzoom.js'
import SVG from 'svg.js'
import 'svg.draggable.js'
import 'svg.panzoom.js'
import 'svg.draw.js'
import 'svg.draggy.js'
import 'svg.select.js'
import 'svg.resize.js'
import {
    ref,
    reactive,
    onMounted
} from 'vue'

function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";

}
let selectList = []

export default function () {
    onMounted((a) => {
        var shapeModel = SVG('simpleSquare').size("100%", "100%")
        .panZoom({zoomMin: 0.5, zoomMax: 20 ,zoomFactor:0.5});
        let image = shapeModel.image(require('../assets/sl.webp'))
        image.loaded(
            function (e) {
                let width = shapeModel.node.clientWidth
                let height = e.height * (shapeModel.node.clientWidth / e.width)
                image.attr({
                    width,
                    height
                })
            }
        )

        let drawing = false
        var pathData = '';
        var polygon

        // shapeModel.on('mousedown', function (event) {
        //     shapeModel.panZoom();
        // });

       
        shapeModel.on('contextmenu', function(event) {
            event.preventDefault();

            var ctm = shapeModel.node.getScreenCTM();
            var point = shapeModel.node.createSVGPoint();
            point.x = event.clientX;
            point.y = event.clientY;
            var transformedPoint = point.matrixTransform(ctm.inverse());

            console.log("转换后的坐标系",transformedPoint)

            var mouseX = transformedPoint.x;
            var mouseY = transformedPoint.y;
      
            // 添加点击坐标到路径数据
            if (pathData === '') {
              pathData = 'M' + mouseX + ' ' + mouseY;
            } else {
              pathData += ' L' + mouseX + ' ' + mouseY;
            }
      
            // 创建小点来显示点击效果
            var point = shapeModel.circle(10).center(mouseX, mouseY).addClass('point').fill(getRandomColor());
      
            // 更新多边形路径
            if (polygon) {
                polygon.attr('d', pathData);
            }else{
                polygon = shapeModel.path(pathData).fill('none').stroke({ width: 2, color: getRandomColor() });
            }
        });
         // 监听鼠标左键双击事件
         shapeModel.on('dblclick', function(event) {
            event.preventDefault();

            // 判断是否形成了闭合的多边形
            if (pathData !== '') {
              // 添加闭合路径命令
              pathData += ' Z';
      
              // 绘制多边形
              polygon.attr('d', pathData);
              polygon.fill(getRandomColor())
              polygon.on("mousedown",function(e){
                var bbox = this.bbox();
                console.log("矩形框的坐标",bbox)
                if(selectList.length){
                    selectList.forEach(item=>{
                        item.selectize(false);
                    })
                }
                selectList = [this]
                this.selectize({deepSelect:true,classRect:"cj-select",rotationPoint: false,pointType:"rect"}).resize();
                this.draggable()
                e.stopPropagation();
            })
      
              // 清空路径数据
              pathData = '';
              polygon = null
      
              // 清除小点
                 // 获取元素并移除
                var elementsToRemove = shapeModel.select('.point');
                elementsToRemove.each(function() {
                    this.remove();
                });
            //   shapeModel.selectAll('.point').remove();
            }
        });

        
    })


}