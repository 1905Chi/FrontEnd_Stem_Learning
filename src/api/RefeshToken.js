import axios from 'axios';
import { url } from '../constants/Constant';
export default function RefeshToken() {

    let accessToken = localStorage.getItem('accessToken');
    let refreshToken = localStorage.getItem('refreshToken');

    
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const data=
    {
        accessToken:accessToken,
        refreshToken:refreshToken
    }
    axios.post(url+'api/v1/auth/refresh-access-token',data,config)
    .then((response)=>{
        if(response.data.statusCode===200)
        {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.setItem('accessToken',response.data.result.accessToken);
            localStorage.setItem('refreshToken',response.data.result.refreshToken);

            console.log(response.data.result.accessToken);
            console.log(response.data.result.refreshToken);
            return response.data.statusCode;
        }
        else
        {
            return response.data.statusCode;
        }

    })
    .catch((error)=>{
        if (error.response) {
            // Lỗi từ phía máy chủ
            return  error.response.status;                    
        } else if (error.request) {
            // Lỗi không có phản hồi từ máy chủ
            return error.request.status;
        } else {
            // Lỗi trong quá trình thiết lập yêu cầu
            return 'Lỗi khi thiết lập yêu cầu.'
        }
    })

}