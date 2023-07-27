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

        var previewCircle; // 用于预览圆的变量
        var isDragging = false;
        var offsetX, offsetY;
         // 监听鼠标按下事件
         shapeModel.on('mousedown', function(event) {
            
            if (event.button === 2) { // 仅处理鼠标右键按下事件
                shapeModel.panZoom({
                    panning: false
                });
                isDragging = true;

                var ctm = shapeModel.node.getScreenCTM();
                var point = shapeModel.node.createSVGPoint();
                point.x = event.clientX;
                point.y = event.clientY;
                var transformedPoint = point.matrixTransform(ctm.inverse());
    
                offsetX = transformedPoint.x;
                offsetY = transformedPoint.y;
        
                // 创建预览圆
                previewCircle = shapeModel.circle(0).opacity(0.5).attr({ fill:  getRandomColor(), stroke: getRandomColor(),'stroke-width': 2 });
                previewCircle.on("mousedown",function(e){
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
            }
        });
            // 监听鼠标移动事件
        shapeModel.on('mousemove', function(event) {
            if (isDragging) {
                var ctm = shapeModel.node.getScreenCTM();
                var point = shapeModel.node.createSVGPoint();
                point.x = event.clientX;
                point.y = event.clientY;
                var transformedPoint = point.matrixTransform(ctm.inverse());

                var x = transformedPoint.x;
                var y = transformedPoint.y;

                var width = x - offsetX;
                var height = y - offsetY;

                var radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
                previewCircle.radius(radius);
                previewCircle.center(offsetX, offsetY);
            }
        });
        shapeModel.on('contextmenu', function(event) {
            event.preventDefault();
        })
    
        // 监听鼠标释放事件
        shapeModel.on('mouseup', function(event) {
            if (event.button === 2) { // 仅处理鼠标右键释放事件
                isDragging = false;
                shapeModel.panZoom({
                    panning: true
                });
        
                // 创建最终的圆
                // var finalCircle = shapeModel.circle(previewCircle.radius()).fill('blue');
                // finalCircle.center(offsetX, offsetY);
        
                // 移除预览圆
                // previewCircle.remove();
            }
        });

        
    })


}