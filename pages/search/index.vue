<template>
	<view class="search">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="navTop">
			<view class="back" @tap="back()">
				<uni-icons type="left" color="#000" size="25" />
			</view>
			<view class="input-view">
				<uni-search-bar :focus="true" class="uni-mt-10" radius="10" placeholder="斗破苍穹" clearButton="auto"
					cancelButton="none" @confirm="search" v-model="title" />
			</view>
			<view class="city" @tap="search">
				搜索
			</view>
		</view>

		<view class="history" v-if="!searchData">
			<uv-skeletons :loading="false" :skeleton="skeleton">
				<view class="card">
					<uv-modal ref="modal" content='确认删除所有搜索历史?' :asyncClose="true" @confirm="deleteHist"
						confirmColor="#F87470" :zoom="false" :showCancelButton="true" align="center" width="250px">
					</uv-modal>

					<view class="top">
						<text>搜索历史</text>
						<uni-icons type="trash" size="24" @tap="openModal"></uni-icons>
					</view>

					<view class="cardMain">
						<view v-for="item in searchHistory">
							<text>{{ item }}</text>
						</view>

					</view>
				</view>

			</uv-skeletons>
		</view>

		<view class="serach_result" v-else>
			<uv-skeletons :loading="loading" :skeleton="skeleton">
				<uni-list class="list">
					<uni-list-item class="listItem" v-for="(item,index) in searchData.data">
						<!-- 自定义 header -->
						<template v-slot:header>
							<view class="slot-box">
								<image class="slot-image" :src="handleUrl(item.cover)" mode="widthFix"></image>
							</view>
						</template>
						<!-- 自定义 body -->
						<template v-slot:body>
							<view class="item_body">
								<text class="title">{{item.book_name}}</text>
								<text class="subtitle">{{item.category_name}}# {{item.author}}</text>
								<text class="main">{{ellipsisText(item.introduction,45)}}</text>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
			</uv-skeletons>

		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	import { http } from "@/common/http"
	import { handleUrl, ellipsisText } from "@/common/utils"
	import { BookCountData } from "../../type/BookList";
	import { Response } from "../../type/Request";
	import dayjs from "dayjs"
	const title = ref("")
	const searchData = ref<BookCountData>()
	let searchHistory = ref()
	searchHistory.value = uni.getStorageSync('searchHistory')

	const loading = ref(true)
	const skeleton = ref([{
		type: 'flex',
		num: 10,
		children: [{
			type: 'custom',
			num: 1,
			style: 'width:136rpx;height:136rpx;marginRight: 30rpx;'
		}, {
			type: 'line',
			num: 3,
			style: ['width:200rpx;', 'width:360rpx;', null]
		}]
	}])
	const back = () => {
		uni.navigateBack({
			delta: 1,
			animationType: "pop-out",
			animationDuration: 200
		})
	}
	const search = async () => {

		// 存储数据
		const store = await uni.getStorageSync('searchHistory')

		if (title.value) {
			let storedata : any = ''
			if (!searchHistory.value) {
				storedata = [title.value]
			} else {
				const arr = store
				arr.push(title.value)
				storedata = arr
			}
			uni.setStorage({
				key: 'searchHistory',
				data: storedata,
				success() {
					searchHistory.value = storedata
				}
			});
		} else {
			searchData.value = undefined
			return
		}

		const oldTime = dayjs()
		loading.value = true
		const result = await http<Response<BookCountData>>({
			url: "/Book/getBookList?search=" + title.value,
			method: "GET",
		}) as any
		searchData.value = result.data
		if (oldTime.diff(dayjs()) < 1000) {
			setTimeout(() => {
				loading.value = false
			}, 1000);
		}
	}
	const modal = ref()
	const deleteHist = () => {
		uni.setStorage({
			key: "searchHistory",
			data: []
		})
		searchHistory.value = []
		modal.value.close()
	}
	const openModal = () => {
		modal.value.open()
	}
</script>

<style lang="scss">
	

	.search {
		height: calc(100vh - 50rpx);
		overflow: hidden;
		padding: 20rpx;

		

		// display: grid;
		// grid-template-columns: 1fr 100rpx;
		.navTop {
			display: grid;
			grid-template-columns: 60rpx 1fr 80rpx;
			justify-content: center;
			align-items: center;
			gap: 10px;
		}

		.uni-searchbar {
			padding: 0;

			:deep(.uni-searchbar__box) {
				height: 100%;

				.uni-searchbar__box-icon-clear {
					line-height: 24rpx;
					display: flex;
					align-items: center;
				}
			}

		}

		:deep(.uni-searchbar__box-search-input) {
			line-height: 14px;
		}

		uni-button {
			height: 100%;
			border-radius: 10rpx;
			border: 1px solid transparent;
			line-height: 32rpx;
			font-size: 16rpx;
			padding: 10rpx 20rpx;

		}

		.history {
			margin-top: 30rpx;

			.card {
				:deep(.uv-modal__content__text) {
					font-size: 1rem;
					color: #000;
					padding: 15rpx 0;
					font-family: 'almama';
				}

				.top {
					display: flex;
					place-items: center;
					justify-content: space-between;

					text:nth-child(1) {
						font-size: 1.2rem;
						font-family: "almama";
					}
				}

				.cardMain {
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					gap: 15rpx;
					margin-top: 20rpx;

					view {
						background-color: #eee;
						border-radius: 15rpx;
						padding: 5rpx 20rpx;
						font-size: 32rpx;
						font-family: 'dindin';
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
				}
			}
		}

		.serach_result {
			margin-top: 30rpx;

			.list {
				.listItem {
					height: 200rpx;
					overflow: hidden;

					:deep(.uni-list-item__container) {
						padding: 0 5rpx;

						image {
							width: 110rpx;
							height: 150rpx;
							border-radius: 10rpx;
						}

						.item_body {
							display: grid;
							grid-template-rows: 40rpx 30rpx 1fr;
							gap: 10rpx;
							margin-left: 20rpx;
							font-size: 22rpx;
							color: #777;

							.title {
								font-size: 1rem;
								font-weight: 600;
								color: #000;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}

							.subtitle {
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}

							.main {
								text-align: left;

							}


						}

					}


				}
			}
		}

	}
</style>