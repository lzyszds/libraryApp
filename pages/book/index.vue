<template>
	<view class="main">
		<view class="status_bar">
			<!-- 这里是状态栏 -->
		</view>
		<view>
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="120">
				<view id="demo1" class="scroll-view-item_H uni-bg-red">A</view>
				<view id="demo2" class="scroll-view-item_H uni-bg-green">B</view>
				<view id="demo3" class="scroll-view-item_H uni-bg-blue">C</view>
			</scroll-view>
		</view>
	</view>

</template>

<script setup lang="ts">
	import { ref } from "vue"
	const old = ref(0)
	const scrollTop = ref(0)
	const scroll = (e : any) => {
		old.value = e.detail.scrollTop
	}
</script>

<style lang="scss">
	.main {
		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}

	 

		
	}
</style>