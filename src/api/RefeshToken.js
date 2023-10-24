import axios from 'axios';
import { url } from '../constants/Constant';
export default function RefeshToken() {

    let accessToken = localStorage.getItem('accessToken');
    let refreshToken = localStorage.getItem('refreshToken');
    let message='';
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let data=
    {
        accessToken:accessToken,
        refreshToken:refreshToken
    }
    axios.post(url+'api/v1/auth/refresh-access-token',data,config)
    .then((response)=>{
        if(response.data.statusCode===200)
        {
            localStorage.setItem('accessToken',response.data.accessToken);
            localStorage.setItem('refreshToken',response.data.refreshToken);
            return response.data.statusCode;
        }
        else
        {
            return response.data.message;
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