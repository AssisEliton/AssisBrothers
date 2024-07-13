import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

let pendingRequests = 0;

const updateLoadingIndicator = () => {
    if (pendingRequests > 0)
        document.body.classList.add('loading-indicator');
    else
        document.body.classList.remove('loading-indicator');
};


axios.interceptors.request.use(

    async config => {
        pendingRequests++;
        updateLoadingIndicator();

        return config;
    },
    error => {
        pendingRequests--;
        updateLoadingIndicator();
        return Promise.reject(error);
    }
);


axios.interceptors.response.use(
    response => {
        pendingRequests--;
        updateLoadingIndicator();
        return (response as AxiosResponse)
    },
    error => {
        pendingRequests--;
        updateLoadingIndicator();
        return Promise.reject(error);
    }
);

async function Http_delete<T>(API: string, config?: AxiosRequestConfig): Promise<T> {
    return await axios.delete(API, config);
} 
async function Http_get<T>(API: string, config?: AxiosRequestConfig): Promise<T> {
    return await axios.get(API, config);
}
async function Http_post<T>(API: string, body?: any, config?: AxiosRequestConfig): Promise<T> {
    return await axios.post(API, body, config);
}
async function Http_put<T>(API: string, body?: any, config?: AxiosRequestConfig): Promise<T> {
    return await axios.put(API, body, config);
}


export default { Http_delete, Http_get, Http_post, Http_put } 

