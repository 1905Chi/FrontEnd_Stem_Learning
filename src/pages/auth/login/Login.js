import React, { useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { url } from '../../../constants/Constant';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading';
import { AuthContext } from './AuthContext';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext); // Sử dụng context
  const [loading, setLoading] = useState(false);

  const notify = (message) => toast(message);

  const onFinish = (values) => {
    setLoading(true);
    dispatch({
      type: 'LOGIN_REQUEST',
    });

    const data = { email: values.email, password: values.password };
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    };

    axios
      .post(url + 'api/v1/auth/login', data, { headers: headers }, { withCredentials: true })
      .then((response) => {
        if (response.data.statusCode === 200) {
          const { accessToken, refreshToken, id, first_name, last_name, avatar_url, role } = response.data.result;

          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('login', true);

          axios
            .get(url + 'api/v1/users/profile', {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
              },
            })
            .then(async (profileResponse) => {
              if (profileResponse.data.statusCode === 200) {
                localStorage.setItem('user', JSON.stringify(profileResponse.data.result));

                dispatch({
                  type: 'LOGIN_SUCCESS',
                  payload: {
                    accessToken,
                    refreshToken,
                    user: profileResponse.data.result, // Cập nhật user
                  },
                });

                setTimeout(() => {
                  navigate('/home');
                }, 2000);
              } else {
                toast.error(profileResponse.data.message);
                dispatch({
                  type: 'LOGIN_FAIL',
                  payload: profileResponse.data.message,
                });
              }
            })
            .catch((error) => {
              dispatch({
                type: 'LOGIN_FAIL',
                payload: error,
              });
              toast.error(error.response?.data?.message || 'Error');
            });
        } else {
          dispatch({
            type: 'LOGIN_FAIL',
            payload: response.data.message,
          });
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        dispatch({
          type: 'LOGIN_FAIL',
          payload: error,
        });
        if (error.response) {
          const status = error.response.status;
          if (status === 503) {
            toast.error('Máy chủ hiện không khả dụng. Vui lòng thử lại sau.');
          } else if (status === 404) {
            toast.error('Không tìm thấy tài khoản này');
          } else {
            toast.error(error.response.data.message);
          }
        } else if (error.request) {
          toast.error('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
        } else {
          toast.error('Lỗi khi thiết lập yêu cầu.');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFinishFailed = () => {
    notify('Đăng nhập thất bại');
  };

  return (
    <div className="login-page">
      {loading && <Loading />}
      <div className="body-login">
        <div className="login-container">
          <div style={{ overflow: 'hidden', width: '75%' }} className='login-logo'>
            <img
              src="https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png"
              alt="logo"
              className="logo"
            />
          </div>
          <div className='login-content'>
            <h2 style={{ color: "#4949c1" }}>Đăng nhập</h2>
            <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
              <Form.Item
                name="email"
                rules={[
                  { type: 'email', message: 'Email không hợp lệ!' },
                  { required: true, message: 'Vui lòng nhập địa chỉ email của bạn!' },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Mật khẩu"
                />
              </Form.Item>
              <Form.Item>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Đăng nhập
                  </Button>
                </div>
              </Form.Item>
            </Form>
            <div className="login-footer">
              <Link to="/forgot-password" style={{ textDecoration: 'none', color: 'blue' }}>
                Quên mật khẩu?
              </Link>
              <br /><br />
              <div style={{ display: 'flex', justifyContent: 'center' }}>Chưa có tài khoản?</div>
              <br />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  type="primary"
                  onClick={()=>{navigate('/')}}
                  className="login-form-button"
                  style={{ backgroundColor: 'green' }}
                >
                  Đăng ký
                </Button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
