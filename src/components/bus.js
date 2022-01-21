import Vue from 'vue';
// 建立一个中转站，实现不同子组件之间的传值
// 使用 Event Bus
const bus = new Vue();

export default bus;