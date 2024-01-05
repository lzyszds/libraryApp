export interface Response<T> {
	code : number;
	message : string;
	data : T;
}

export interface ResponseMessage {
	code : number;
	message : string;
}

export interface ResponseList<T> {
	count : number,
	data : T[];
}