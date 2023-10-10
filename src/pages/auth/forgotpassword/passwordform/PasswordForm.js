import React, {useEffect} from "react";
import { Form, Input, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "./PasswordForm.css";
import axios from "axios";
import { url } from "../../../../constants/Constant";
import { useNavigate } from "react-router-dom";
const PasswordForm = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(url + `api/auth/reset-password?token=${props.uuid}`).then((response) => {
      // Xử lý kết quả sau khi gửi thành công
      if (response.data.statusCode === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    })
    .catch((error) => {
      toast.error("Đường dẫn không đúng hoặc đã hết hạn.");
			navigate('/forgot-password/');
    });
  
  }, []);
  
  const handleResetPassword = (values) => {
    const data = { password: values.password, confirmPassword: values.confirm };
    // Xử lý logic đặt lại mật khẩu ở đây (gửi yêu cầu đặt lại mật khẩu, lưu mật khẩu mới, vv.)
    axios
      .post(url + `api/auth/reset-password?token=${props.uuid}`, data)
      .then((response) => {
        // Xử lý kết quả sau khi gửi thành công
        if (response.data.statusCode === 200) {
          toast.success(response.data.message);
          navigate("/login");
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
          } else {
            toast.error(error.response.error);
          }
        } else if (error.request) {
          // Lỗi không có phản hồi từ máy chủ
          toast.error("Không thể kết nối đến máy chủ.");
        } else {
          // Lỗi trong quá trình thiết lập yêu cầu
          toast.error(error.response.error);
        }
      });
  };

  return (
    <div className="body-password-resetform">
      <div className="password-resetform">
        <h2> Reset Password </h2> <p> Bước 2: Đặt lại mật khẩu </p>
        <Form
          name="Reset password"
          onFinish={handleResetPassword}
          scrollToFirstError
        >
          <Form.Item
            name="password"
            label="Mật khẩu mới"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu mới!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>{" "}
          <Form.Item
            name="confirm"
            label="Xác nhận mật khẩu"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhập lại mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác thực không khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>{" "}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Gửi{" "}
            </Button>{" "}
          </Form.Item>{" "}
        </Form>{" "}
        <ToastContainer />
      </div>{" "}
    </div>
  );
};

export default PasswordForm;
