import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

const USE_LOCAL_BACKEND = false;
const BACKEND_ROOT_URL = USE_LOCAL_BACKEND ? "https://localhost:7161" : "https://nbaunderdogleagueapi.azurewebsites.net";

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
    post<T>(parameters: IHttpPOSTProps): Promise<T>;
}

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

            axios.get(BACKEND_ROOT_URL + url, options).then((response: any) => {
                resolve(response as T);
            }).catch((reason: any) => {
				console.error(reason);
            });
        });
    }

    getExternal<T>(parameters: IHttpGETProps): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const {url, token, params } = parameters;

            const axiosHeaders: AxiosRequestHeaders = {
                token: "Bearer " + token,
            }

            const options: AxiosRequestConfig = {
                headers: token ?? axiosHeaders,
                params,
                withCredentials: true,
            }

            axios.get(url, options).then((response: any) => {
                resolve(response as T);
            }).catch((reason: any) => {
				console.error(reason);
            });
        });
    }

    post<T>(parameters: IHttpPOSTProps): Promise<T> {
        throw new Error("Method not implemented.");
    }
}

