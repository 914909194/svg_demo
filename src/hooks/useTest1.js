import {SVG} from "@svgdotjs/svg.js"

import '@svgdotjs/svg.draggable.js'
import '@svgdotjs/svg.panzoom.js'
// import SVG from 'svg.js'
// import 'svg.draggable.js'
// import 'svg.panzoom.js'
// import 'svg.draw.js'
// import 'svg.draggy.js'
// import 'svg.select.js'
// import 'svg.resize.js'
import { ref,reactive, onMounted} from 'vue'

function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";

}

export default function () {
    onMounted((a) => {
        const width = document.getElementById('simpleSquare').clientWidth
        const persent = width / 4096
        let shapeModel = SVG().addTo("#simpleSquare").size("100%", "100%")
        .viewbox('0 0 4096 1096')
        .panZoom({zoomFactor:0.5});
        console.log("persent",persent)
        let image = shapeModel.image(require('../assets/sl.webp'),function(e){
            console.log("图片",e.target.naturalWidth)
            // shapeModel.size('100%', '100%')
            // shapeModel.group().add(this)
            shapeModel// uses center of viewport by default
            .animate()
            .zoom(persent, { x: 0, y: 0 }) // zoom into specified point
            // shapeModel.panZoom({ zoomMin: 0.2, zoomMax: 5 })
            // shapeModel.on('panStart', function(e) {
            //     console.log("eee",e)
            // })
            
        })
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