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