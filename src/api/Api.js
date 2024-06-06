import axios from 'axios';
import { url } from './../constants/Constant';
import { useNavigate } from 'react-router-dom';


const Api = axios.create({
	baseURL: url,
});

// Thêm interceptor để kiểm tra và cập nhật token
Api.interceptors.request.use(
	(config) => {
		// Kiểm tra token và cập nhật nếu cần
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken) {
			config.headers['Authorization'] = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

const handleTokenRefreshError = (error) => {
	// Xử lý lỗi khi cập nhật token không thành công
	console.error('Error refreshing token:', error);

	

	// Xóa token và thực hiện các xử lý khác (ví dụ: đăng xuất người dùng)
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
	window.location='/login';
};

// Thêm interceptor để xử lý lỗi token hết hạn và cập nhật token
Api.interceptors.response.use(
	(response) => {
		return response;
	},

	async (error) => {
		const originalRequest = error.config;
		
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			// Kiểm tra sự tồn tại của refreshToken
			const refreshToken = localStorage.getItem('refreshToken');
			if (refreshToken) {
				// Thực hiện yêu cầu cập nhật token
				const data = {
					accessToken: localStorage.getItem('accessToken'),
					refreshToken: refreshToken,
				};
				const config = {
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
					},
				};
				try {
					const response = await axios.post(url + 'api/v1/auth/refresh-access-token', data, config);

					if (response.data.statusCode === 200) {
						// Lưu token mới và thử lại yêu cầu gốc
						localStorage.setItem('accessToken', response.data.result.accessToken);
						return Api(originalRequest);
					} else {
						// Xử lý lỗi khi cập nhật token không thành công
						handleTokenRefreshError(response);
					}
				} catch (error) {
					// Xử lý lỗi khi gửi yêu cầu cập nhật token
					console.error('Error refreshing token:', error);
					// Xóa token và thực hiện các xử lý khác (ví dụ: đăng xuất người dùng)
					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
					window.location='/login';
				}
			} else {
				// Xử lý lỗi khi không có refreshToken
				handleTokenRefreshError();
			}
		}

		// Xử lý các trường hợp lỗi khác (ví dụ: 403, 404, ...)
		// ...

		return Promise.reject(error);
	}
);

export default Api;
