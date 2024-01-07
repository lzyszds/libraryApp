<template>

	<view class="read" :class="{hide:first}" @tap="showFirst('read')">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="navBar">
			<uni-icons type="left" size="15"></uni-icons>

		</view>
	</view>
	<view class="firstScreen" :class="{hide:!first}" @tap="showFirst('first')">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<image class="cover" :src="data.thumbUri" />
		<text class="title">{{data.bookName}}</text>
		<text class="author">作者：<text>{{data.author}}</text></text>
		<view class="bottomMain">
			<view class="introduce">
				<view class="read_count">
					<text>{{numberFormatter(data.read_count)}}人</text>
					<text>正在阅读</text>
				</view>
				<view class="work_number">
					<text>{{numberFormatter(data.wordNumber)}}字</text>
					<text>{{data.creationStatus==1?'连载中':'已完结'}}</text>
				</view>
			</view>
			<view class="abstract">
				<text>简介：</text>
				<text>{{data.abstract}}</text>
			</view>
		</view>
	</view>

</template>

<script lang="ts" setup>
	import { onLoad } from "@dcloudio/uni-app"
	import { ref, reactive } from "vue";
	import { useStore } from "@/store";
	const bootPage = reactive({
		first: true,
		up: false,
		down: false
	})
	const first = ref(true)
	const data = ref()
	onLoad(() => {
		const store = useStore()
		data.value = store.bookInfo
		console.log(data.value);
	})

	const showFirst = (val : string) => {

		first.value = val == 'first' ? false : true
	}

	function numberFormatter(num : number) {
		if (num >= 100000000) {
			return (num / 100000000).toFixed(2) + '亿';
		} else if (num >= 10000) {
			return (num / 10000).toFixed(2) + '万';
		} else if (num >= 1000) {
			return (num / 1000).toFixed(2) + '千';
		} else if (num >= 100) {
			return (num / 100).toFixed(2) + '百';
		} else if (num >= 10) {
			return (num / 10).toFixed(2) + '十';
		} else {
			return num + '个';
		}
	};
</script>

<style lang="scss">
	.read {
		z-index: 2;
		position: absolute;
		inset: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		transition: .36s;

		&.hide {
			left: -50rem;
			z-index: 0;
		}
	}

	.firstScreen {
		position: absolute;
		inset: 0;
		width: 100vw;
		height: 100vh;
		display: grid;
		grid-template-rows: 200rpx auto auto auto 1fr;
		place-content: center;
		place-items: center;
		background-color: #f8f8f8;
		gap: .6rem;
		overflow: hidden;
		transition: .36s ;
		z-index: 3;

		&.hide {
			left: -50rem;
			z-index: 1;
		}

		.cover {
			width: 268rpx;
			height: 368rpx;
			border-radius: .5rem;
		}

		.title {
			font-size: 1.3rem;
			font-weight: 600;
			width: 70%;
			text-align: center;
		}

		.author {
			font-size: .8rem;

			text {
				font-weight: 600;
				text-decoration: underline;
			}
		}

		.bottomMain {
			background-color: #fff;
			width: 100vw;
			height: 100%;
			margin-top: 3rem;

			.introduce {
				display: flex;
				justify-content: space-between;
				text-align: center;
				padding: 1rem 0;

				.read_count,
				.work_number {
					flex: 1;
					display: grid;

					text:nth-child(1) {
						font-size: 1.2rem;
						font-weight: 600;
					}

					text:nth-child(2) {
						font-size: 1rem;
						color: #999;
					}
				}


			}

			.abstract {
				padding: 0 2rem;
				/* 设置文本溢出时显示省略号 */
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				/* 防止文本换行 */

				/* 限制显示的行数 */
				display: -webkit-box;
				-webkit-line-clamp: 12;
				/* 显示的行数 */
				-webkit-box-orient: vertical;

				text:nth-child(1) {
					font-weight: 600;
				}

				text:nth-child(2) {
					font-size: 1rem;

				}
			}
		}

	}
</style>