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
				<uni-search-bar :focus="focus" class="uni-mt-10" radius="10" placeholder="斗破苍穹" clearButton="auto"
					cancelButton="none" @focus="focusHandle" />
			</view>
			<view class="city">
				搜索
			</view>
		</view>

	</view>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	const title = ref("")
	const focus = ref(true)
	const back = () => {
		uni.navigateBack({
			delta: 1,
			animationType: "pop-out",
			animationDuration: 200
		})
	}
	const search = () => {
		console.log(123);
	}
	const focusHandle = () => {

	}
	const confirm = () => {

	}
</script>

<style lang="scss">
	.search {
		height: calc(100vh - 50rpx);
		overflow: hidden;
		padding: 20rpx;

		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}

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


	}
</style>