<template>

    <div class="down">
        <button @click="download">下载</button>
    </div>

</template>

<script setup>
import { ref, reactive } from 'vue'
function download(e){
    console.log("下载事件",e)
    fetch('./xj.mp4')
    .then(response => {
       
        return response.blob()
    })
    .then(blob => {
        console.log("请求返回的数据",blob)
        // 创建一个链接元素
        var downloadLink = document.createElement("a");

        // 设置链接的 href 属性为文件的 URL
        downloadLink.href = URL.createObjectURL(blob);

        // 设置链接的下载属性为文件的名称
        downloadLink.download = "file.mp4";

        // 模拟点击下载链接
        downloadLink.click();
    })
    .catch(error => {
        console.error('下载文件时发生错误:', error);
    });
}
</script>

<style scoped>

</style>