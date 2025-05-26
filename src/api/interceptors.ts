import { getAccessToken, removeTokenFromStorage } from '@/services/auth-token.service';
import axios, { CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';
import { errorCatch } from './error';
import { authService } from '@/services/auth.service';

const DEFAULT_AXIOS_CONFIG: CreateAxiosDefaults = {
    baseURL: process.env.API_URL || 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
};

const axiosClassic = axios.create(DEFAULT_AXIOS_CONFIG);
const axiosWithAuth = axios.create(DEFAULT_AXIOS_CONFIG);

const injectAuthHeader = (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();

    if(config?.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config;
}

axiosWithAuth.interceptors.request.use(injectAuthHeader);

axiosWithAuth.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            (error?.response?.status === 401 ||
                errorCatch(error) === 'jwt expired' ||
                errorCatch(error) === 'jwt must be provided'
            ) && 
            error.config && 
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                await authService.getNewTokens();
                return axiosWithAuth.request(originalRequest);
            } catch (error) {
                if (errorCatch(error) === 'jwt expired') {
                    removeTokenFromStorage()
                }
            }
        }

        throw error
    }
    )

export  { axiosClassic, axiosWithAuth };