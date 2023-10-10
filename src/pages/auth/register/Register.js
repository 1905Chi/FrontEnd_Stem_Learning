import { Form, Input, Button, Select ,Spin} from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import './Register.css';
import { url } from '../../../constants/Constant';

export default function Register() {
	const roles = ['STUDENT', 'TEACHER', 'PARENT'];
  const [loading, setLoading] = useState(false); // Trạng thái loading
	const handleNext = (values) => {
    setLoading(true);
		const data = {
			email: values.email,
			password: values.password,
			role: values.roles,
		};  
    const config = {
      headers: {
          'Content-Type': 'application/json',
      },
  };
		axios
			.post(url + 'api/auth/register', data,config)
			.then((response) => {
				// Xử lý kết quả sau khi gửi thành công
				if (response.data.statusCode === 200) {
					toast.success('Account created successfully , Plese check your email to verify your account');
				} else {
					toast.error(response.data.message);
				}
			})
			.catch((error) => {
				// Xử lý lỗi nếu có lỗi xảy ra
				 // Xử lý lỗi nếu có lỗi xảy ra
         if (error.response) {
          // Lỗi từ phía máy chủ
          const status = error.response.status;
          if (status === 503) {
            // Xử lý lỗi 503 Service Unavailable
            toast.error("Máy chủ hiện không khả dụng. Vui lòng thử lại sau.");
          } else if (status === 404) {
            toast.error("Không tìm thấy tài khoản này");
          } else {
            toast.error(error.response.data.message);
          }
        } else if (error.request) {
          // Lỗi không có phản hồi từ máy chủ
          toast.error("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
        } else {
          // Lỗi trong quá trình thiết lập yêu cầu
          toast.error("Lỗi khi thiết lập yêu cầu.");
        }
			})
      .finally(() => {
        setLoading(false);
      });

		// Xử lý logic xác thực email ở đây (gửi email xác thực, kiểm tra địa chỉ email, vv.)
		console.log(values);
	};
	const handleChange = (value) => {
		console.log(`selected ${value}`);
	};

	return (
    <>
    
      <Spin tip="Loading" size="large" spinning={loading} className="Loading-register" >
        
        </Spin>
		<div className="Register-form">
    

			<div className="enteremail-resetform">
				<h2> ĐĂNG KÝ </h2>{' '}
				<Form name="register" onFinish={handleNext} scrollToFirstError>
					<Form.Item
						name="email"
						label="E-mail"
						rules={[
							{
								type: 'email',
								message: 'Email không hợp lệ!',
							},
							{
								required: true,
								message: 'Vui lòng nhập email của bạn!',
							},
						]}
					>
						<Input />
					</Form.Item>{' '}
					<Form.Item
						name="password"
						label="Mật khẩu"
						rules={[
							{
								required: true,
								message: 'vui lòng nhập mật khẩu!',
							},
              {
                min:8,
                message:'Mật khẩu phải có ít nhất 8 kí tự'
              },
						]}
						hasFeedback
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						name="confirm"
						label="Xác thực mật khẩu"
						dependencies={['password']}
						hasFeedback
						rules={[
							{
								required: true,
								message: 'Vui lòng xác nhận lại mật khẩu!',
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve();
									}
									return Promise.reject(new Error('Mật khẩu xác thực không đúng!'));
								},
							}),
						]}
					>
						<Input.Password />
					</Form.Item>{' '}
					<Form.Item
						label="Vài trò"
						name="roles"
						rules={[
							{
								required: true,
								message: 'Chọn vai trò của bạn!',
							},
						]}
					>
	<Select
						showSearch
						ptionfilterprop="label"
						options={roles.map((item) => ({ label: item, value: item }))}
					/>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" style={{ width: '100%' }}>
							Gửi
						</Button>
           <a href="/login"> Đăng nhập! </a>{" "}
					</Form.Item>
				</Form>
			</div>
			<ToastContainer />
		</div>
    </>
	);
}
