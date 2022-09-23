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
    post<T>(parameters: IHttpPOSTProps): Promise<T>;
}

const apiURL = "https://nbaunderdogleagueapi.azurewebsites.net";

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

            axios.get(apiURL + url, options).then((response: any) => {
                resolve(response as T);
            }).catch((reason: any) =>{
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
                resolve(response as T);
            }).catch((reason: any) =>{
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
                resolve(response as T);
            }).catch((reason: any) =>{
            });
        });
    }

    post<T>(parameters: IHttpPOSTProps): Promise<T> {
        throw new Error("Method not implemented.");
    }
}

