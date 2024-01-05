<template>
	<view class="tabber">
		<view class="bar" v-for="(item,index) in tabber" :key="item.text" :class="{'active':activeBar==index}"
			@tap="toRouter(item)">
			<img v-if="activeBar!=index" :src="item.iconPath" alt="">
			<img v-else :src="item.selectedIconPath" alt="">
			{{item.text}}
		</view>
	</view>
</template>

<script lang="ts" setup>
	import { computed, ref, watch, } from "vue"

	const tabber = [
		{
			"iconPath": "static/tabBar/home.png",
			"selectedIconPath": "static/tabBar/homeHover.png",
			"text": "首页",
			"pagePath": "/pages/index/index"
		},
		{
			"iconPath": "static/tabBar/book.png",
			"selectedIconPath": "static/tabBar/bookHover.png",
			"text": "书城",
			"pagePath": "/pages/book/index"
		},
		{
			"iconPath": "static/tabBar/mine.png",
			"selectedIconPath": "static/tabBar/mineHover.png",
			"text": "分类",
			"pagePath": "/pages/mine/index"
		}
	]
	console.log(window.location.hash);
	const activeBar = computed(() => {
		let count = 0
		tabber.forEach((item, index) => {
			if (window.location.hash.indexOf(item.pagePath) > 0) {
				count = index
			}
		})
		return count

	})
	const toRouter = (val) => {
		uni.switchTab({
			url: val.pagePath
		});
	}
</script>

<style scoped lang="scss">
	.tabber {
		height: 100rpx;
		width: 100vw;
		background-color: #eee;
		position: fixed;
		bottom: 0;
		z-index: 999;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		align-items: center;

		.bar {
			display: grid;
			justify-content: center;
			text-align: center;
			font-size: .6rem;
			gap: 5rpx;

			img {
				width: 50rpx;
				border-radius: 80%;

			}

			&.active {
				color: #5161ce;
			}
		}

	}
</style>