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
        var rect;
        var startX, startY;
        shapeModel.on('mousedown', function (event) {
            if (event.button === 2) { // 仅处理鼠标右键按下事件
                // console.log("mousedown",event)
                drawing = true
                shapeModel.panZoom({
                     panning: false
                 });
                
                 var ctm = shapeModel.node.getScreenCTM();
                 var point = shapeModel.node.createSVGPoint();
                 point.x = event.clientX;
                 point.y = event.clientY;
                 var transformedPoint = point.matrixTransform(ctm.inverse());
     
                 startX = transformedPoint.x;
                 startY = transformedPoint.y;
     
                 rect = shapeModel.rect().attr({ fill:  getRandomColor(), stroke: 'red','stroke-width': 2 });
                 rect.on("mousedown",function(e){
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
                 
                 shapeModel.on('mousemove', drawIng);
            }
           
        });

        function drawIng(event){
            
        //    console.log("mousemove",event)

            if (rect&&event.buttons === 2 && drawing) {
                
                var ctm = shapeModel.node.getScreenCTM();
                var point = shapeModel.node.createSVGPoint();
                point.x = event.clientX;
                point.y = event.clientY;
                var transformedPoint = point.matrixTransform(ctm.inverse());

                var x = transformedPoint.x;
                var y = transformedPoint.y;

                var width = x - startX;
                var height = y - startY;

                rect.size(Math.abs(width), Math.abs(height));
                rect.move(Math.min(startX, x), Math.min(startY, y));
                

            }

        
        }
        shapeModel.on('contextmenu', function(event) {
            event.preventDefault();
        })
        shapeModel.on('mouseup', function (event) {
            if (event.button === 2) { // 仅处理鼠标右键按下事件
                // console.log("mouseup",event)
                drawing = false
                rect = null;
                startX = 0;
                startY = 0;
                shapeModel.off('mousemove',drawIng);
            }
           
        });
        shapeModel.on('mouseleave', function (event) {
            drawing = false
        })
        
    })


}