import React, {useState} from "react";
import { Form, Input, Button ,Spin} from "antd";
import { ToastContainer, toast } from "react-toastify";
import "./PasswordForm.css";
import axios from "axios";
import { url } from "../../../../constants/Constant";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../components/Loading";
const PasswordForm = (props) => {
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  
  const handleResetPassword = (values) => {
    setLoading(true);
    const data = { password: values.password, confirmPassword: values.confirm };
    // Xử lý logic đặt lại mật khẩu ở đây (gửi yêu cầu đặt lại mật khẩu, lưu mật khẩu mới, vv.)
    axios
      .post(url + `api/v1/auth/reset-password?token=${props.uuid}`, data)
      .then((response) => {
        // Xử lý kết quả sau khi gửi thành công
        if (response.data.statusCode === 200) {
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
       
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
            toast.error(error.response.data.error);
          }
        } else if (error.request) {
          // Lỗi không có phản hồi từ máy chủ
          toast.error("Không thể kết nối đến máy chủ.");
        } else {
          // Lỗi trong quá trình thiết lập yêu cầu
          toast.error(error.response.error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
    {loading ? ( // Nếu đang loading thì hiển thị component loading
				<Loading></Loading>
			) : null}
    <div className="body-password-resetform">
      <div className="password-resetform">
      <img
						src="https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png"
						alt="logo"
						className="logo"
					/>
        <h2 style={{marginTop:'0px'}}> Đặt lại mật khẩu </h2> <p> Bước 2: Đặt lại mật khẩu </p>
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
              {
                min:8,
                message:'Mật khẩu phải có ít nhất 8 kí tự'
              },
            ]}
            hasFeedback
          >
            <Input.Password style={{width:'185px', marginLeft:'33px'}}/>
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
            <Button type="primary" htmlType="submit" style={{ width: "100%" ,height:'50px'}}>
              Gửi{" "}
            </Button>{" "}
          </Form.Item>{" "}
        </Form>{" "}
        <ToastContainer />
      </div>{" "}
    </div>
    </>
  );

 
};

export default PasswordForm;
