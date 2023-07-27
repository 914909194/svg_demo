<template>
    <div>
        <canvas ref="canvas" width="500" height="500"></canvas>
    </div>
</template>
<script>
export default {
    data() {
        return {
            annotations: [] // 存储标注信息的数组
        };
    },
    mounted() {
        const canvas = this.$refs.canvas;
        const context = canvas.getContext('2d');

        const image = new Image();
        image.src = require('@/assets/sl.webp');
        image.onload = () => {
            context.drawImage(image, 0, 0);
        };
    },
    methods: {
        drawRectangle() {
            const canvas = this.$refs.canvas;
            const context = canvas.getContext('2d');

            // 绘制矩形标注的逻辑
            context.fillRect(x, y, width, height);
        },
        drawCircle() {
            const canvas = this.$refs.canvas;
            const context = canvas.getContext('2d');

            // 绘制圆形标注的逻辑
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI);
            context.closePath();
            context.stroke();
        },
        drawPolygon() {
            const canvas = this.$refs.canvas;
            const context = canvas.getContext('2d');

            // 绘制多边形标注的逻辑
            context.beginPath();
            context.moveTo(x1, y1);
            context.lineTo(x2, y2);
            // ...
            context.closePath();
            context.stroke();
        }
    }


};
</script>