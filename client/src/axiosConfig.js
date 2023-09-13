import axios from 'axios';
import Cookie from 'js-cookie';

axios.defaults.withCredentials = true;

const Instance = axios.create({
    baseURL: 'http://52.78.145.37:8080',
});

export const refresh = async (config) => {

    const refreshToken = Cookie.get('refreshToken');
    const expiresAt = localStorage.getItem('expiresAt');
    const currentTime = Math.floor(Date.now() / 1000);

    if (expiresAt < currentTime) {
        console.log("토큰 만료, 재발급 요청");
        const res = await Instance.post("/refresh", {
            headers: { Refresh: refreshToken, }
        });
        const { newAccessToken } = res.data;
        console.log("accessToken 재발급 성공: ", newAccessToken) // 확인하고 지우기
        localStorage.setItem('accessToken: ', newAccessToken);
        localStorage.setItem() // expiresAt 받아오기
        config.headers["Authorization"] = `Bearer ${newAccessToken}`; // 토큰 교체
    }
    return config;
}

Instance.interceptors.request.use(refresh)

export default Instance;