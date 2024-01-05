const host = "http://192.168.3.63:4090/Api"
const createKey = (path : string, data : any) => `${JSON.stringify(data)}${path}`
const requestList : Map<string, UniApp.RequestTask> = new Map()



//是否正在加载中
let loadingBox : null | (() => null) = null

export default (option) => {
	//加载动画
	// if (loading && loadingBox === null) {
	// 	console.log('开启加载')
	// 	//开启加载动画
	// 	loadingBox = showLoading()
	// }


	return new Promise((resolve, reject) => {
		const requestKey = createKey(option.url, option.data)

		uni.request({
			url: host + option.url,
			method: option.method,
			header: option.header || '',
			timeout: option.timeout || 3000,
			/** 返回数据类型 */
			dataType: option.dataType,
			//
			success: res => {
				//返回数据
				resolve(res.data)
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