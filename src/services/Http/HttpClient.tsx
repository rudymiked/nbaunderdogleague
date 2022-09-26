import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

export interface IHttpGETProps {
	url: string;
	token: any;
	params: any | any[];
}

export interface IHttpPOSTProps {
	url: string;
	token: any;
	data: any | any[];
}

export interface IHttpClient {
	get<T>(parameters: IHttpGETProps): Promise<T>;
	getExternal<T>(parameters: IHttpGETProps): Promise<T>;
	getLocal<T>(parameters: IHttpGETProps): Promise<T>;
	post<T>(parameters: IHttpPOSTProps): Promise<T>;
}

const API_BASE_URL = "https://nbaunderdogleagueapi.azurewebsites.net";

export default class HttpClient implements IHttpClient {
	get<T>(parameters: IHttpGETProps): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			const {url, token, params } = parameters;

			const axiosHeaders: AxiosRequestHeaders = {
				token: "Bearer " + token
			}

			const options: AxiosRequestConfig = {
				headers: token ?? axiosHeaders,
				params,
				withCredentials: true,
			}

			axios.get(API_BASE_URL + url, options).then((response: any) => {
				console.log(response);
				resolve(response as T);
			}).catch((reason: any) => {
				console.error(reason);
				reject(reason);
			});
		});
	}

	getExternal<T>(parameters: IHttpGETProps): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			const {url, token, params } = parameters;

			const axiosHeaders: AxiosRequestHeaders = {
				token: "Bearer " + token
			}

			const options: AxiosRequestConfig = {
				headers: token ?? axiosHeaders,
				params,
				withCredentials: true,
			}

			axios.get(url, options).then((response: any) => {
				console.log(response);
				resolve(response as T);
			}).catch((reason: any) => {
				console.error(reason);
				reject(reason);
			});
		});
	}

	getLocal<T>(parameters: IHttpGETProps): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			const {url, token, params } = parameters;

			const axiosHeaders: AxiosRequestHeaders = {
				token: "Bearer " + token
			}

			const options: AxiosRequestConfig = {
				headers: token ?? axiosHeaders,
				params,
				withCredentials: true,
			}

			axios.get("https://localhost:7161" + url, options).then((response: any) => {
				console.log(response);
				resolve(response as T);
			}).catch((reason: any) => {
				console.error(reason);
				reject(reason);
			});
		});
	}

	post<T>(parameters: IHttpPOSTProps): Promise<T> {
		throw new Error("Method not implemented.");
	}
}
