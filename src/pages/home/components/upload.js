import axios from 'axios';
import Api from "./../../../api/Api"
const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append('mediaFiles', file);

    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhMmJlYmIwNS02ZjdmLTQ4ZDgtOWMyNi0xYjNlZjJlNzViNjAiLCJpYXQiOjE2OTk1MDg2NDEsImV4cCI6MTY5OTUxMjI0MX0.0IGEaOdAtvlwc7-OqBUlvX0WHp-rfZsyJ9RVu6BYPZ8Wzf50BkDIDeG2IUBUxDyCu1tbF6jYhv36lLL3D4MwuA';

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };

    const response = await Api.post('http://localhost:8080/api/v1/files/posts', formData, { headers });

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
    console.error(error.message);
    throw new Error('Failed to upload file');
  }
};

export default uploadToCloudinary;
