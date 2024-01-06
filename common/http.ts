
const createKey = (path : string, data : any) => `${JSON.stringify(data)}${path}`
const requestList : Map<string, UniApp.RequestTask> = new Map()

export const host = "http://192.168.3.63:4090"

//是否正在加载中
let loadingBox : null | (() => null) = null

export const http = <T>(option : UniNamespace.RequestOptions) => {
	//加载动画
	// if (loading && loadingBox === null) {
	// 	console.log('开启加载')
	// 	//开启加载动画
	// 	loadingBox = showLoading()
	// }


	return new Promise((resolve, reject) => {
		const requestKey = createKey(option.url, option.data)

		uni.request({
			url: host + "/Api" + option.url,
			method: option.method,
			header: option.header || '',
			timeout: option.timeout || 3000,
			/** 返回数据类型 */
			dataType: option.dataType || 'json',
			//
			success: (res : any) => {
				const data : T = res.data
				//返回数据
				resolve(data)
			},
			// 失败
			fail: err => {
				reject(err)
			},
			// 最终执行
			complete: () => {
				// 移除request请求
				requestList.delete(requestKey)
				// 如果加载
				if (loadingBox !== null && requestList.size === 0) {
					// 关闭提示
					loadingBox = loadingBox()
				}
			},
		})
	})
}