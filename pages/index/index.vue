<template>
	<view class="main">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="search">
			<button @tap="focus">
				<uni-icons type="search" size="13"></uni-icons>
				斗破苍穹
			</button>
		</view>

		<view class="hot" id="hot">
			<view class="hot_items" v-for="(items,indexs) in result" :key="indexs">
				<view class="item" v-for="(item,index) in items" :key="item.book_id">
					<image :src="handleUrl(item.cover)"></image>
					<view>
						<text class="index">{{index+1+indexs*4}}</text>
						<text class="name">{{item.book_name}}</text>
					</view>
				</view>
			</view>
			<view class="hot_item" v-for="item in 3" :key="item">

			</view>
		</view>
	</view>


</template>

<script setup lang="ts">
	import { ref } from "vue"
	import { Book, } from "@/type/BookList"
	import { http, host } from "@/common/http"
	import { handleUrl } from "@/common/utils"

	const result = ref<Book[][]>([])

	http({ url: '/Book/getBookList', method: 'GET' })
		.then((res : any) => {
			let index = 0
			result.value![0] = []
			result.value![1] = []
			result.value![2] = []
			result.value![3] = []
			result.value![4] = []
			for (let i = 0; i < res.data.data.length; i++) {
				if (i % 4 == 0 && i != 0) {
					index++
					result.value![index] = []
				}
				result.value![0].push(res.data.data[i])
				result.value![1].push(res.data.data[i])
				result.value![2].push(res.data.data[i])
				result.value![3].push(res.data.data[i])
				result.value![4].push(res.data.data[i])
			}

			console.log(result.value);

		})
	const focus = () => {
		uni.navigateTo({
			url: "/pages/search/index",
			animationType: "pop-in",
		})
	}
</script>

<style scoped lang="scss">
	.main {
		position: relative;
		padding: 0 20rpx;
		height: calc(100vh);
		background-image: linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%);

		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}

		.search {
			height: 60rpx;
			padding-bottom: 10rpx;
			margin-bottom: 20rpx;
			padding-top: 20rpx;
			z-index: 99;
			background-image: linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%);

			button {
				height: 60rpx;
				width: 100%;
				background-color: #fff;
				color: #999;
				line-height: 60rpx;
				font-size: 26rpx;
				text-align: left;
				border-radius: 10rpx;
				border: 1px solid transparent;
				outline: none;

				&:hover {
					background-color: #fff;
					color: #888;
				}

				&::after {
					border: none;
				}
			}
		}

		.hot {
			background-color: #fff;
			height: 19rem;
			border-radius: 20rpx;
			padding: 40rpx 0;
			display: flex;

			gap: 15rpx;
			overflow: hidden;
			overflow-x: scroll;
			scroll-snap-type: x proximity;

			&::-webkit-scrollbar {
				width: 0;
			}

			.hot_items {
				font-size: .9rem;
				padding-left: 20rpx;
				scroll-snap-align: start;
				display: grid;
				gap: 30rpx;

				.item {
					width: 360rpx;
					height: 130rpx;
					display: grid;
					grid-template-columns: 100rpx 1fr;
					gap: 20rpx;

					image {
						width: 100%;
						height: 100%;
						object-fit: cover;
						border-radius: 10rpx;
						border: 2rpx solid #aaa;
						box-shadow: 0 0 6rpx #aaa;
					}

					.index {
						color: #ffaa00;
						float: left;
						margin-right: 5rpx;
					}

					.name {
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-line-clamp: 2;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						text-align: left;
						line-height: 19px;
					}
				}


			}
		}
	}
</style>