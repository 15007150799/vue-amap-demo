<template>
	<div>
		<div class="amap-wrapper">
			<!-- 搜索框 -->
		<!-- 	<el-amap-search-box ref="search" @keyup="keyUpSearch" class="search-box" :search-option="searchOption" :on-search-result="onSearchResult" placeholder="请输入地址"></el-amap-search-box> -->
			<div class="search-zone">
				<input type="text" ref="search" class="search-box" placeholder="请输入地址" v-model="display">
				<button class="serchBtn" @click="keyUpSearch">搜索</button>
			</div>
			<div class="result-zone" v-if="searchData.length > 0">
				<ul class="result">
					<li v-for="(item,index) in searchData" class="item" @click="itemclick(index)">{{ item.name }}-{{ item.address }}</li>
				</ul>
			</div>
			<!-- 基础地图 -->
			<el-amap ref="map" class="mapView" vid="amapDemo" :zoom="zoom" :center="mapCenter" :events="events" :plugin="plugin">
				<!-- 地图标注 -->
				<!-- <el-amap-marker v-for="marker in markers" :position="marker" ></el-amap-marker> -->
				<div class="arrow">
					<span class="icon"></span>
				</div>
			</el-amap>
			<div >
				<vue-loading v-show="isshow" class="load" type="spiningDubbles" color="rgb(97,216,198)" :size="{ width: '40px', height: '40px' }"></vue-loading>
			</div>
			 
		</div>
	</div>
</template>
<script type="text/javascript">
import vueLoading from 'vue-loading-template'
export default{
	data(){
		var self = this
		return{
			zoom: 15,
			mapCenter: [121.5273285, 31.21515044],
			events: {
				init: (o) =>{
					console.log(o.getCenter());
					// 获取地图实例
					console.log(this.$refs.map.$$getInstance())
					o.getCity(result => {
						console.log(result.province + result.district)
					})
				},
				'moveend': () => {
					console.log('move-end')
					// 移动结束获取中心坐标
					console.log(this.$refs.map.$$getCenter())
					var getcoder = new AMap.Geocoder({
						radius: 1000,
						exentsions: "all"
					})
					getcoder.getAddress(this.$refs.map.$$getCenter(),(status,result) => {
						if (status === 'complete' && result.info === 'OK') {
							console.log(result.regeocode.addressComponent)
							var content = result.regeocode.addressComponent
							var split = content.province + content.city +  content.district
							self.display = result.regeocode.formattedAddress.split(split)[1]
						}
					})
				},
				'zoomchange': () => {
					console.log('zoom-change');
				},
				'click': (e) => {
					alert('amap click')
				},
			},
			searchOption:{
				city: '上海',
				citylimit: true
			},
			markers:[
				[121.59996, 31.197646],
	            [121.40018, 31.197622],
	            [121.69991, 31.207649]
			],
			plugin: [{
				pName: 'Geolocation',
				events: {
					init:(o) => {
						// 定位成功之后调用
						o.getCurrentPosition((status,result) => {
							if (status == 'complete' && result.position) {
								this.mapCenter = [result.position.lng,result.position.lat]
								self.isshow = false
								// this.$nextTick()
							}
						})
					}
				}
			}],
			searchData: [],
			selectItem: {},
			display: "",
			isshow: true
		}
	},
	methods:{
		addMarker(){
			let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
			let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
			this.markers.push([lng, lat]);
        },
        // 搜索之后的回调
		onSearchResult(pois){
			// console.log(pois.length)
		},
		keyUpSearch(){
			var _this = this 
			_this.isshow = true
			// console.log('keyUpSearch' + this.$refs.search.value)
			var aim = this.$refs.search.value
			var placeSearch = new AMap.PlaceSearch({city: '全国',citylimit: false})
			placeSearch.search(aim,(status,result) => {
				_this.searchData = result.poiList.pois
				_this.isshow = false
			})
		},
		itemclick(index){
			// 保存选择内容
			this.selectItem = this.searchData[index]
			// 清空搜索内容
			this.searchData = []
			// 输入框内容更新
			this.display = this.selectItem.address
			// 更改中心点
			this.mapCenter = [this.selectItem.location.lng,this.selectItem.location.lat]
		}
	},
	components:{
		vueLoading
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.amap-wrapper
		position relative
		.search-zone
			display flex
			z-index 1
			height 60px
			.search-box
				flex 1
				height 45px
				font-size 13px
				border-radius 5px
				margin-top 5px
				margin-left 5px
				border 1px solid rgb(97,216,198)
				box-sizing border-box
				box-shadow 2px 2px 5px gray
				-webkit-box-shadow 2px 2px 5px gray
			.serchBtn 
				flex 0 1 70px
				height 45px
				line-height 45px
				border-radius 5px
				margin 5px 5px 0 5px
				background-color rgb(97,216,198)
				border 0 solid rgb(97,216,198)
				font-size 15px
				color white
				font-weight bold
		.result-zone
			// background-color red
			margin-top 0px
			background-color rgb(245,245,245)
			.result 
				.item 
					background-color white
					// box-sizing border-box
					margin-bottom 1px
					padding-left 5px
					font-size 12px
					// border 1px solid gray 
					line-height 35px
					height auto
		.mapView
			position fixed
			top 0px
			left 0px 
			bottom 0px
			right 0px
			z-index -1
			.arrow
				background-color red 
				.icon 
					// background-color red
					position fixed
					// vertical-align middle
					// text-align center
					left 50%
					bottom 50%
					height 30px
					width 30px
					margin-left -15px
					background-size 30px 30px
					background-repeat no-repeat
					background-image url('dingwei@2x.png')
		.load 
			// position relative
			// height 300px
			// width 300px
			border-radius 5px
			background-color rgba(1,1,1,0.5)
		
</style>