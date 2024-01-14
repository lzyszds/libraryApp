import { host } from "./http"

export const handleUrl = (url : string) => {
	if (url) return url.replace("/admin", host)
	// return url.replace("/admin", "http://localhost:4090")
}

export const ellipsisText = (text : string, maxLength : number) => {
	if (text && text.length > maxLength) {
		return text.slice(0, maxLength) + '...';
	}
	return text;
}

export function numberFormatter(num : number) {
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