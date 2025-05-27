import Cookies from 'js-cookie';

export enum EnumTokens {
    ACCESS_TOKEN = 'accessToken',
    REFRESH_TOKEN = 'refreshToken',
}

export const getAccessToken = () => {
    const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
    return accessToken || null;
}

export const saveTokenStorage = (accessToken: string) => {
    Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, { 
        domain: '95.163.229.128',
        sameSite: 'strict',
        expires: 1,
    });
}

export const removeTokenFromStorage = () => {
    Cookies.remove(EnumTokens.ACCESS_TOKEN);
}