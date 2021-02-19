import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
Vue.config.productionTip = false
Vue.prototype.$http=axios
//引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


//引入ckeditor
import CKEditor from '@ckeditor/ckeditor5-vue'; //富文本编辑
Vue.use(CKEditor);
//引入公共样式
import './assets/css/common.css'
import './assets/css/animate.css'

/* 中央事件总线 */
const bus = new Vue()
Vue.prototype.$bus = bus


import AMap from 'vue-amap';
Vue.use(AMap);
  // 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德key
  key: 'ac3e2dec66981128d50aa7c987d8d32e',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Autocomplete', 'AMap.Marker',
	'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation','AMap.Geocoder']
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
