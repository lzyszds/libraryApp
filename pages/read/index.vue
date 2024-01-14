<template>
	<view class="read" @touchstart="touchstart" @touchend="touchend">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view class="navBar">
			<uni-icons type="left" size="15"></uni-icons>
			<text v-if="data" class="subtitle">{{data.content.title}}</text>
			<text class="time">{{newDate}}</text>
		</view>
		<view v-if="data">
			<view class="readContent" :style="'transform:translateX(calc(-100vw *'+currentPage+'))'">
				<text class="tt-title">{{data.content.title}}</text>
				<text class="p" v-for="item in data.content.matches">
					{{item}}
				</text>
			</view>
			<scroll-view scroll-y="true" class="readContent_sub" id="readContent_sub">
				<view>
					<text class="tt-title">{{data.content.title}}</text>
					<text class="p" v-for="item in data.content.matches">
						{{item}}
					</text>
				</view>

			</scroll-view>
		</view>
	</view>
	<view class="firstScreen" :class="{hide:!first}" @tap="showFirst()">
		<view class="status_bar">

		</view>
		<image class="cover" :src="dataInfo.thumbUri" />
		<text class="title">{{dataInfo.bookName}}</text>
		<text class="author">作者：<text>{{dataInfo.author}}</text></text>
		<view class="bottomMain">
			<view class="introduce">
				<view class="read_count">
					<text>{{numberFormatter(dataInfo.read_count)}}人</text>
					<text>正在阅读</text>
				</view>
				<view class="work_number">
					<text>{{numberFormatter(dataInfo.wordNumber)}}字</text>
					<text>{{dataInfo.creationStatus==1?'连载中':'已完结'}}</text>
				</view>
			</view>
			<view class="abstract">
				<text>简介：</text>
				<text>{{dataInfo.abstract}}</text>
			</view>

		</view>
	</view>

</template>

<script lang="ts" setup>
	import { onLoad } from "@dcloudio/uni-app"
	import { ref, computed, getCurrentInstance, nextTick } from "vue";
	import { useStore } from "@/store";
	import { numberFormatter } from "@/common/utils"
	const instance = getCurrentInstance()

	const first = ref(false)
	const dataInfo = ref()
	const data = ref()
	const sumCountPage = ref(0)
	onLoad(async () => {
		const store = useStore()
		dataInfo.value = store.bookInfo
		let res = await getContentInfo(dataInfo.value.firstChapterItemId) as any
		data.value = res.data.data
		data.value.content = handleContentTab(res.data.data.content)
		await nextTick()
		sumCountPage.value = await calculateTotalPages()

	})
	const newDate = computed(() => {
		return new Date().getHours() + ":" + new Date().getMinutes()
	})

	const showFirst = () => {
		first.value = false
	}
	let oldPagex = 0
	let currentPage = ref(0)
	const pageWidth = uni.getSystemInfoSync().windowWidth

	const touchstart = (event : any) => {
		oldPagex = event.touches[0].clientX

	}
	const touchend = (event : any) => {
		const x = event.changedTouches[0].clientX
		if (Math.abs(oldPagex - x) == 0) {
			if (x > pageWidth / 2) {
				currentPage.value++
			} else {
				currentPage.value = Math.max(0, --currentPage.value)
			}
		} else {
			if (oldPagex - x > 0) {
				// 滑动到下一页
				currentPage.value++
			} else {
				currentPage.value = Math.max(0, --currentPage.value)
			}
		}
		if (currentPage.value - 3 > sumCountPage.value) {
			//获取下一章内容
			console.log("下一章");
		}
	}


	async function getContentInfo(id : number) {
		const urlhost = "https://novel.snssdk.com/api/novel/book/reader/full/v1/?device_platform=android&parent_enterfrom=novel_channel_search.tab.&aid=2329&platform_id=1&"
		const param = `group_id=${id}&item_id=${id}`
		return await uni.request({
			method: "GET",
			url: urlhost + param
		})
	}

	function handleContentTab(content : string) {

		// // 提取标题
		let tregex = /<div class="tt-title">(.*?)<\/div>/g;
		let title
		let tmatch;

		while ((tmatch = tregex.exec(content)) !== null) {
			title = tmatch[1].trim()
		}
		// 提取所有的<p>标签中的内容
		var regex = /<p>(.*?)<\/p>/g;
		var matches = [];
		var match;

		while ((match = regex.exec(content)) !== null) {
			matches.push(match[1].trim());
		}

		return {
			title,
			matches
		}
	}

	const getNodeInfo = (selecter : string) : any => {
		// 获取位置信息并返回
		return new Promise(resolve => {
			const query = uni.createSelectorQuery().in(instance);
			query.select(selecter).boundingClientRect(data => {
				resolve(data || { height: 0 });
			}).exec();
		});
	}


	// 计算总页数
	const calculateTotalPages = async () => {
		const contentHeight = await getNodeInfo('#readContent_sub');
		const windowHeight = uni.getSystemInfoSync().windowHeight;
		const totalPages = Math.ceil(contentHeight.height / windowHeight);
		return totalPages
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
		margin: 0;
		font-family: "alibabaSans";

		.navBar {
			height: 44rpx;
			width: calc(100vw - 80rpx);
			display: grid;
			grid-template-columns: 30rpx 1fr 100rpx;
			align-items: center;
			margin: 20rpx auto;
			gap: 10rpx;
			font-size: .8rem;
			color: #999;

			.subtitle {
				overflow-x: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.time {
				text-align: right;
			}
		}

		.readContent {
			column-count: auto;
			column-width: calc(100vw - 32px);
			column-gap: 0;
			height: calc(100vh - 144rpx);
			transition: .4s;
		}

		.readContent_sub {
			height: 100%;
			opacity: 0;
		}

		.tt-title {
			width: calc(100vw - 80rpx);
			font-weight: 600;
			font-size: 2rem;
			margin: 0 auto;
			margin-bottom: 1rem;
			display: block;
		}

		.p {
			width: calc(100vw - 80rpx);
			margin: 40rpx auto;
			display: block;
			font-size: 24px;
			text-indent: 48px;
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
		transition: .5s;
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