import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { url } from "../../../constants/Constant";

import "./Login.css";

function Login() {
  const notify = (string) => toast(string); // Hàm hiển thị thông báo

  const onFinish = (values) => {
    // Thực hiện kiểm tra đăng nhập tại đây
    const data = { email: values.email, password: values.password };
    axios
      .post(url + "api/auth/login", data)
      .then((response) => {
        // Xử lý kết quả sau khi gửi thành công
        if (response.data.statusCode === 200) {
          localStorage.setItem("token", "yourtoken"); // Lưu token vào localStorage
          localStorage.setItem("login", true); // Lưu thông tin user vào localStorage
          // navigate('/');
          // Chuyển hướng về trang chủ
          window.location.href = "/";
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
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
          toast.error(error.request);
        } else {
          // Lỗi trong quá trình thiết lập yêu cầu
          toast.error("Lỗi khi thiết lập yêu cầu.");
        }
      });
  };

  const onFinishFailed = (errorInfo) => {
    notify("Đăng nhập thất bại");
  };

  return (
    <div className="body-login">
      <div className="login-container">
        <h2> Đăng nhập </h2>{" "}
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="Email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>{" "}
          <Form.Item
            label="Password"
            name="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>{" "}
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox> Remember me </Checkbox>{" "}
            </Form.Item>{" "}
            <a className="login-form-forgot" href="">
              Forgot password{" "}
            </a>{" "}
          </Form.Item>{" "}
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit{" "}
            </Button>{" "}
            Or <a href=""> register now! </a>{" "}
          </Form.Item>{" "}
        </Form>{" "}
      </div>{" "}
      <ToastContainer />{" "}
    </div>
  );
}

export default Login;
