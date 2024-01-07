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
		<view class="content">
			<view class="tool">
				<view class="toolTop">
					<text class="topTitle">热门推荐</text>
					<text>换一换<uni-icons type="reload" size="16"></uni-icons></text>
				</view>
				<view class="category">
					<view class="item" :class="{'active':index==hotActive}" v-for="(item,index) in category['男频阅读榜']"
						@tap="hotActive = index">
						<text>{{index}}</text>
					</view>
				</view>
			</view>
			<view class="hot" id="hot">
				<view class="hot_items" v-for="(items,indexs) in result" :key="indexs">
					<view class="item" v-for="(item,index) in items" :key="item.bookId" @tap="readBoot(item)">
						<image :src="item.thumbUri"></image>
						<view>
							<view>
								<text class="index">{{index+1+indexs*4}}</text>
								<text class="name">{{item.bookName}}</text>
							</view>
							<text>{{item.read_count}}</text>

						</view>

					</view>
				</view>
				<view class="hot_item" v-for="item in 3" :key="item">

				</view>
			</view>
		</view>
	</view>


</template>

<script setup lang="ts">
	import { ref, watch } from "vue"
	import category from "@/static/category.json"
	import { useStore } from "@/store"
	console.log(category);
	const result = ref<any>([])
	const hotActive = ref("科幻")
	const defaultName = '男频阅读榜'
	watch(() => hotActive.value, async (val) => {
		const { data } : any = await getHotList(category[defaultName], val)
		const book_list = data.data.book_list

		let index = 0
		result.value![index] = []
		for (let i = 0; i < book_list.length; i++) {
			if (i % 4 == 0 && i != 0) {
				index++
				result.value![index] = []
			}
			result.value![index].push(book_list[i])
		}

	}, { immediate: true })

	function getHotList(obj : any, index : string) {
		const str = obj[index]
		const strarr = str.split('_')
		const url1 = 'https://fanqienovel.com/api/rank/category/list?app_id=1967&rank_list_type=3&'
		const url2 = `offset=10&limit=24&category_id=${strarr[2]}&gender=${strarr[0]}&rankMold=${strarr[1]}&rank_version=`
		return uni.request({
			url: url1 + url2,
			method: "GET",
		})
	}

	const focus = () => {
		uni.navigateTo({
			url: "/pages/search/index",
			animationType: "pop-in",
		})
	}
	const changeActive = (index : any) => {
		console.log(index);
		hotActive.value = index
	}
	const readBoot = (item : any) => {
		const store = useStore()
		store.bookInfo = item
		uni.navigateTo({
			url: `/pages/read/index?bookId=${item.bookId}`,
			animationType: "fade-in"
		})

	}
</script>

<style scoped lang="scss">
	.main {
		position: relative;
		padding: 0 20rpx;
		height: calc(100vh);
		background-image: linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%);


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

		.content {
			position: relative;
			background-color: #fff;
			border-radius: 10rpx;
			filter: drop-shadow(0 0 3px #a1a1a1);

			.tool {
				width: 92%;
				position: absolute;
				top: 40rpx;
				left: 50%;
				transform: translateX(-50%);
				z-index: 1;

				.toolTop {
					display: flex;
					justify-content: space-between;
					margin-bottom: 25rpx;

					.topTitle {
						font-family: 'almama';
						font-size: 1.1rem;
					}

					text:nth-child(2) {
						font-size: 0.8rem;

					}

					.uni-icons {
						vertical-align: text-bottom;
					}
				}

				.category {
					height: 60rpx;
					background-color: #fff;
					display: flex;
					gap: 20rpx;
					align-items: center;
					overflow: hidden;
					overflow-x: scroll;

					.item {
						width: auto;
						height: 50rpx;
						padding: 0 30rpx;
						flex-shrink: 0;
						background-color: #eee;
						border-radius: 10rpx;
						color: #555;
						font-size: 24rpx;
						line-height: 50rpx;

						&.active {
							background-color: #ff5500;
							color: #fff;
						}
					}
				}
			}



			.hot {
				width: 92%;
				margin: 0 auto;
				position: relative;
				padding-top: 6rem;
				background-color: #fff;
				height: 20rem;
				// padding: 40rpx 0;
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
					scroll-snap-align: start;
					display: grid;
					gap: 10rpx 30rpx;



					.item {
						width: 340rpx;
						height: 110rpx;
						display: grid;
						grid-template-columns: 80rpx 1fr;
						gap: 14rpx;

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

	}
</style>