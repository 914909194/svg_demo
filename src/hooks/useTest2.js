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
        // let rect = shapeModel.rect(100, 100)
        // rect.selectize({deepSelect:true,classRect:"cj-select",rotationPoint: false,pointType:"rect"}).resize();;
        // rect.draggable()

        // var text = shapeModel.text('标注文字').attr({ fill: 'red', 'font-size': 16 });
        let image = shapeModel.image(require('../assets/sl.webp'))
        image.loaded(
            function (e) {
                let width = shapeModel.node.clientWidth
                let height = e.height * (shapeModel.node.clientWidth / e.width)
                image.attr({
                    width,
                    height
                })
                // shapeModel.viewbox(`0 0 ${width} ${shapeModel.node.clientHeight}`)
                //     .panZoom({
                //         zoomFactor: 0.5
                //     });
            }
        )

        let drawing = false
        var rect = null;
        shapeModel.on('mousedown', function (event) {
            console.log("坐标",event)
            drawing = true
            shapeModel.panZoom({
                panning: false
            });
            if (event.button === 0) {
                rect = shapeModel.rect().attr({
                    fill: getRandomColor(),
                    stroke: 'red',
                    'stroke-width': 2
                })
                var point = shapeModel.point(event.offsetX, event.offsetX);
                console.log("缩放后的坐标",point)
                // 
                // rect.draggable()
                var x = event.offsetX;
                var y = event.offsetY;
                rect.attr({
                    x: x,
                    y: y,
                    width: 0,
                    height: 0
                });
                // text.attr({ x: x, y: y });
            }
            // event.preventDefault();


        });

        shapeModel.on('mousemove', function (event) {
            if (event.button === 0 && drawing) {
                var x = event.offsetX;
                var y = event.offsetY;
                var width = Math.abs(x - rect.attr('x'));
                var height = Math.abs(y - rect.attr('y'));
                if (width > 0 && height > 0) {
                    rect.attr({
                        width: Math.abs(width) - 1,
                        height: Math.abs(height) - 1
                    });
                }
            }
            // event.preventDefault();

        });
        shapeModel.on('mouseup', function (event) {
            drawing = false


            if (event.button === 0) {
                var x = rect.attr('x');
                var y = rect.attr('y');
                var width = rect.attr('width');
                var height = rect.attr('height');
                // var annotation = shapeModel.group().add(rect).add(text);
                if(width>15&&height>15){
                    var annotation = shapeModel.group().add(rect);
                    annotation.data({
                        x: x,
                        y: y,
                        width: width,
                        height: height
                    });
                    rect.on("mousedown",function(e){
                        
                        if(selectList.length){
                            selectList.forEach(item=>{
                                item.selectize(false);
                            })
                        }
                        selectList = [this]
                        this.selectize({deepSelect:true,classRect:"cj-select",rotationPoint: false,pointType:"rect"}).resize();
                        this.draggable()
                        e.preventDefault();
                    })
                    annotation.on("mousedown",function(e){
                        // let srect = rect.selectize({deepSelect:true});
                        // // console.log("rect",this)
    
                        // annotation.node.remove()
                        // // e.stopPropagation();
    
                    })
                }else{
                    rect.node.remove()
                }
               
                

            }
            event.preventDefault();

        });
        shapeModel.on('mouseleave', function (event) {
            drawing = false
        })
        // var annotations = shapeModel.find('g');
        // annotations.each(function() {
        //     var annotation = this;
        //     var x = annotation.data('x');
        //     var y = annotation.data('y');
        //     var width = annotation.data('width');
        //     var height = annotation.data('height');
        //     console.log('x:', x, 'y:', y, 'width:', width, 'height:', height);
        // });
    })


}