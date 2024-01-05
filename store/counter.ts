import { defineStore } from 'pinia'

export const useStore = defineStore("app", {
	state: () => {
		return {
			hostUrl: 'http://localhost:4090/Api',
			// hostUrl: 'http://localhost:4090/Api',
		};
	},
})