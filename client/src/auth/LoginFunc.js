// 백엔드에서 access token 만료 시간 및 http-only, secure(https://) 정해주면(근데 http-only는 secure도 같이 설정해야 유의미한 보안 설정인 듯) 거기에 따라 설정, 아니면 임의로
import axios from 'axios';
import jwtDecode from 'jwt-decode';
// import Instance from '../axiosConfig';

const LoginFunc = async ( id, password ) => {

    try {
        const data = {
            userUseId: id,
            password: password
        }
        const res = await axios.post('http://52.78.145.37:8080/auth/login', data, {
            headers: {
                'Content-Type': 'application/json'
              }
        });

        console.log(res)
        const authHeader = res.headers.Authorization;
        console.log(authHeader);
        const accessToken = authHeader.split(' ')[1]
        localStorage.setItem('accessToken', accessToken);
        
        // 로그인 후에 보내는 요청의 헤더에 공통적으로 accessToken을 추가함
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        }

    catch (err) {
        console.log('err message: ', err)
    }
}

export default LoginFunc;