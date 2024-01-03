
import Api from "./../../../api/Api"
import { useParams } from "react-router-dom";
import {url} from "../../../constants/Constant"
const uploadToCloudinary = async (file,uuid) => {
 
  try {
 
    const formData = new FormData();
    formData.append('mediaFiles', file);
    formData.append('groupId', uuid);

    const token = localStorage.getItem('accessToken');

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };

    const response = await Api.post(url+'api/v1/files/posts', formData, { headers });

    if (response.status === 200) {
      const data = response.data;
      console.log(data);
      const url = data[0].refUrl;
      return url;
    } else {
      // Xử lý lỗi ở đây nếu cần.
      throw new Error('Failed to upload file');
    }
  } catch (error) {
    // Xử lý lỗi khác nếu cần.
    console.error(error);
    throw new Error('Failed to upload file');
  }
};

export default uploadToCloudinary;
