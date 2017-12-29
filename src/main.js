// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import AMap from 'vue-amap'
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(AMap)
AMap.initAMapApiLoader({
  key: 'c31f76491c9e138bdd789bc5ed31c303',
  plugin: ['AMap.Autocomplete','AMap.Geolocation','AMap.Geocoder','AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
})
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
