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

function SVGPolyline(){
	this.startFoot = null; // 起点引脚对象
	this.endFoot = null; // 终点引脚对象
	this.points=[]; //连线点集合
	// 移动图形时，改变连接处点
	this.moveDrawObj(polyline)
}

function Component() {
    this.id = '';
    this.drawObjList = [];
    // 取消全部选中器件
    this.unSelectAll = function () {
        selectDrawObjList.forEach(function (v) {
            v.unSelected()
        })
    }
    // 添加图形
    this.addDrawObj = function (obj) {

    }
    // 移除图形
    this.removeDrawObj = function (obj) {
        obj.remove()
    }
    // 重置画板
    this.resetDrawObj = function () {

    }
}

function createPolyLine() {
    var polyLine = svgroot.polyLine()

}

function DrawObj() {
    this.id = ''; // 图形id
    this.displayName = ''; // 图形显示名称
    this.value = ''; // 数据化操作
    this.foots = []; // 引脚集合
    this.location = '' // 图形左上角坐标
    this.svgcontent = '' //svg描述字符串，如'<rect>xxxx</rect>,<line></line>'
    // 定义绘画方法
    this.draw = function () {
        // 每个图形创建一个group
        var group = grouproot.group()
        var groupfoot = group.group() // 包裹在图形group里
        var objStrList = this.svgcontent.split(',')
        objStrList.forEach(function (v) {
            // svg.js有个通过字符串导入svg对象的方法
            var obj = svgroot.svg(v)
            group.add(obj)
        })
        // 添加引脚,用圆形来代替引脚
        this.foots.forEach(function (foot) {
            var circle = svgroot.circle().attr({
                id: foot.id,
                cx: foot.x,
                cy: foot.y,
                r: 3,
                fill: '#ffffff00' //设置透明色将引脚隐藏
            })
            // 定义移动到引脚上时时间
            circle.on('mouseover', function (e) {
                // 显示引脚
                circle.fill('red')
            })
            // 定义点击引脚创建连线事件
            circle.on('mousedown', function (e) {
                // 创建连线事件
                createPolyLine()
            })
            // 定义离开引脚事件
            circle.on('mouseout', function (e) {
                circle.fill('#ffffff00')
            })
        })
        // 定义group选中方法和resize方法,若是一维图形如直线、折线等，则selectize({deepSelect:true})可添加参数描述
        group.selectize().resize();
        // 定义图形拖动，这里添加一个移动时发生的事件
        group.draggable().on('dragmove', e => {

        })
    }
    // 删除图形
    this.remove = function () {
        if (!_this.isLock) {
            _this.group.remove()
        }
    }

}



    export default function () {
        onMounted((a) => {
            // var shapeModel = SVG('simpleSquare').size("100%", "100%")
            var svgRoot = SVG('simpleSquare').size('100%', '100%').id('svgroot')
            var groupRoot = svgRoot.group().id('groupRoot').size('3000px', '1500px').attr('style', 'background-color:white') // all
            var groupPolyLine = groupRoot.group('group_polyline') // 连线层
            var selectDrawObjList = []; // 用来存放选中的图形集合
            var changeLineX = false; // 连线的起线变换是否位于X轴
            var changeLiney = false; // 连线的起线变换是否位于Y轴
            var component = new Component(); //创建图形操作对象
            var originScale = 1; // 原始比例
            var gridNumber = 10; //栅格数（移动步长）
            var isSelectBox = false; // 矩形拉选
            var isMulSelect = false; // 是否处于多选状态
            var isMoveMulSelect = false; // 是否开启批量移动
            var currentMousePointer = {}; // 当前点击的点坐标
            var outpattern = svgRoot.pattern(10, 10, function (add) {
                add.path('M 10 0 L 0 0 0 10').fill('none').stroke({
                    color: '#eee',
                    width: 0.5
                })
                add.pattern(10, 10, function (add) {
                    add.rect().attr({
                        width: 10,
                        height: 10,
                        fill: 'url(#smallGrid)'
                    })
                    add.path('M 100 0 L 0 0 0 100').fill('none').stroke({
                        color: '#eee',
                        width: 1
                    })
                }).attr({
                    'id': 'grid'
                })
            }).attr({
                'id': 'smallGrid'
            })
            var gridRect = groupRoot.rect().size('3000px', '1500px').fill('url(#grid)').id('gridrect') // 网格
            groupRoot.add(gridRect)

            var polylineGroup = groupRoot.group().id('polylinegroup') // 连线组对象
            var crossLine_X = svgRoot.path('M 0 0').attr({
                'id': 'cross_line_x',
                'stroke-dasharray': '2,2',
                'fill': 'none',
                'stroke': 'red',
                'stroke-width': 1
            })
            var crossLine_Y = svgRoot.path('M 0 0').attr({
                'id': 'cross_line_y',
                'stroke-dasharray': '2,2',
                'fill': 'none',
                'stroke': 'red',
                'stroke-width': 1
            })


            var selectRectBox = svgRoot.rect('0,0').attr({
                'id': 'select_rect_box',
                'stroke-dasharray': '3,3',
                'fill': 'none',
                'stroke': '#0000ff',
                'stroke-width': 1
            }).hide()


            svgRoot.on('mousedown', function (e) {
                // 判断是否鼠标左键
                if (1 == e.which) {
                    // 选中图形逻辑等等
                    // if () {}

                    // 若无选中图形则开启矩形选择
                    if (!isSelectBox ) {
                        isSelectBox = true
                        isMulSelect = false
                        isMoveMulSelect = false
                        selectRectBox.attr({
                            'x': e.offsetX,
                            'y': e.offsetY,
                            'width': 0,
                            'height': 0
                        })
                        currentMousePointer.x = e.offsetX
                        currentMousePointer.y = e.offsetY
                        selectRectBox.show()
                        return;
                    }
                }
            })
            svgRoot.on('mouseup', function (e) {
                if (1 == e.which) {
                    // 取消矩形选择
                    // selectRectBox.hide()
                }
            })
            // 鼠标滚轮发大和缩小
            svgRoot.on('mousewheel', function (e) {
                var target = $(e.target).context
                var delta = e.originalEvent.wheelDelta
                var scale = originScale;
                originScale = originScale * 10
                if (delta > 0 && originScale < 50)
                    originScale += 2
                else if (delta < 0 && originScale > 2 && originScale <= 50)
                    originScale -= 2
                originScale = originScale / 10
                var t = svgRoot.transform();
                svgRoot.scale(originScale, (e.offsetX - (t.e + svgRoot.node.clientWidth / 2)) / scale, (e.offsetY - (t.f + svgRoot.node.clientHeight / 2)) / scale)
            })

            // 根据自己需求书写
            svgRoot.on('mouseenter', function (e) {})
            // 根据自己需求书写
            svgRoot.on('mouseleave', function (e) {})
            svgRoot.on('mousemove', function (e) {
                // 矩形选择
                if (e.which == 1) {
                    if (isSelectBox) {
                        var x = currentMousePointer.x
                        var y = currentMousePointer.y
                        var d = {}
                        d.x = Math.abs(x - e.offsetX)
                        d.y = Math.abs(y - e.offsetY)
                        if (x <= e.offsetX) {
                            selectRectBox.attr('x', x);
                        } else {
                            selectRectBox.attr('x', e.offsetX);
                        }
                        if (y <= e.offsetY) {
                            selectRectBox.attr('y', y);
                        } else {
                            selectRectBox.attr('y', e.offsetY);
                        }
                        selectRectBox.size(d.x, d.y)
                    }
                    // 调用自身的移动方法
                    if (isMulSelect && isMoveMulSelect) {
                        selectDrawObjList.forEach(function (obj) {
                            obj.group.dmove(d.x, d.y)
                        })
                    }
                }
            })





        })


    }