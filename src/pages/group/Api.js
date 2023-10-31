
import axios from 'axios';
import { url } from '../../constants/Constant';
import RefeshToken from '../../../src/api/RefeshToken'
export function CreateGroup(accessToken,groupName,groupDescription,groupType)
{
    const headers = {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
      };
    const data = {
        groupName: groupName,
        groupDescription: groupDescription,
        groupType: groupType,
    };
   
    axios.post(url + 'api/v1/groups', data, { headers})
    .then((response) => {
        // Xử lý kết quả sau khi gửi thành công
        if (response.data.statusCode === 200) {
            return response.data;
        } else {
            return response.data;
        }
    })
    .catch((error) => {
        // Xử lý lỗi nếu có lỗi xảy ra
        if (error.response) {
            // lỗi khi access token hết hạn
            const status = error.response.status;
            if (status === 401) {
                let a=RefeshToken()
                if(a===200)
                {
                    CreateGroup(accessToken,groupName,groupDescription,groupType)
                }
                else if(a===401) // lỗi khi refresh token hết hạn
                {
                    return a;
                }
                // token không hợp lệ trả về mã lỗi

                return a;

            }
            return  error.response.data; 
            
        } else if (error.request) {
            // Lỗi không có phản hồi từ máy chủ
           return error.request.status;
        } else {
            // Lỗi trong quá trình thiết lập yêu cầu
            return 'Lỗi khi thiết lập yêu cầu.';
        }
    });

}