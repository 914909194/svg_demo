import {SVG} from "@svgdotjs/svg.js"
import '@svgdotjs/svg.draggable.js'
import '@svgdotjs/svg.panzoom.js'
import { ref,reactive, onMounted} from 'vue'

function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";

}

export default function () {
    onMounted((a) => {
        let shapeModel = SVG().addTo("#simpleSquare").size("100%", "100%").viewbox('0 0 1000 1000')
        .panZoom({zoomMin: 0.5, zoomMax: 20 ,zoomFactor:0.5});
        let rect = shapeModel.rect(100, 100).attr({ fill: "#00B1B6" })
        // rect.on("click",function(e){
        //     // rect.animate().move(150, 150)
        //     // rect.attr('x', 50)
        //     rect.draggable()
        // })
        // .viewbox({
        //     x:0,
        //     y:0,
        //     width:297,
        //     height:210
        // });
        // shapeModel.circle(100).radius(50).attr({ fill: "#0284A3" });
        // shapeModel.polygon("0,0,100,50,50,100").fill("#175369") .stroke({ width: 1 });
        // shapeModel.line(0, 0, 100, 150).stroke({ width: 5, color: "#6488B7" });
        
        // let image = shapeModel.image(require('../assets/logo.png'),function(e){
        //     // console.log("图片",e.target.naturalWidth)
            
        // })
        // image.on('click', function (e) {
        //     // this is the loading event for the svg image
        //     console.log("图片",e)

        // })
        // image.load(require('../assets/logo.png'), function(e){
        //     console.log("图片1",e)
        // })
       
        // console.log("image",image)
    })


}