// 백엔드에서 access token 만료 시간 및 http-only, secure(https://) 정해주면(근데 http-only는 secure도 같이 설정해야 유의미한 보안 설정인 듯) 거기에 따라 설정, 아니면 임의로
import axios from 'axios';
import Instance from '../axiosConfig';

const LoginFunc = async ( id, password ) => {

    try {
        const res = await Instance.post('/세부링크', {
            id: id,
            password: password
        });

        // 오는 데이터 확인
        // refreshToken 조회해보기
        const { accessToken, expiresAt } = res.data;
        // 잘 왔는지 확인 후 아래는 지우기
        console.log('accessToken', accessToken);
        // 로컬 스토리지에 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('expiredTime', expiresAt); // 이름 확인 필요
        // 로그인 후에 보내는 요청의 헤더에 공통적으로 accessToken을 추가함
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        }

    catch (err) {
        console.log('err message: ', err)
    }
}

export default LoginFunc;