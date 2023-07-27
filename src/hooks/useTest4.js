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
        var rect = null;
        var startX, startY;
        shapeModel.on('mousedown', function (event) {
           console.log("mousedown")
           drawing = true

           shapeModel.panZoom({
                panning: false
            });
            startX = event.clientX;
            startY = event.clientY;
            
            rect = shapeModel.rect().attr({ fill: getRandomColor(), stroke: 'red','stroke-width': 2});
            rect.draw(event.clientX, event.clientY);

            shapeModel.on('mousemove', drawIng );

        });

        function drawIng(event){
            
           console.log("mousemove")

           
            if (rect&&event.button === 0 && drawing) {
                var width = event.clientX - startX;
                var height = event.clientY - startY;
                
                rect.size(Math.abs(width), Math.abs(height));
                rect.move(Math.min(startX, event.clientX), Math.min(startY, event.clientY));
              }

        
        }
        shapeModel.on('mouseup', function (event) {
           console.log("mouseup")

            drawing = false
            rect = null;
            startX = 0;
            startY = 0;
            shapeModel.off('mousemove');
        });
        shapeModel.on('mouseleave', function (event) {
            drawing = false
        })
        
    })


}