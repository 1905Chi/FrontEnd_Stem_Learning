import React from "react";
import { Form, Input, Button } from "antd";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./EmailForm.css";
import { url } from "../../../../constants/Constant";

const EmailForm = () => {
  const handleNext = (values) => {
    axios
      .post(url + "api/tokens/reset-password", values.email)
      .then((response) => {
        // Xử lý kết quả sau khi gửi thành công
        if (response.data.statusCode === 200) {
          toast.success("Vui lòng kiểm tra mail để đặt lại mật khẩu");
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
          toast.error(error.request.error);
        } else {
          // Lỗi trong quá trình thiết lập yêu cầu
          toast.error(error);
        }
      });
  };

  return (
    <div className="body-enteremail-resetform">
      <div className="enteremail-resetform">
        <h2> Reset Password </h2> <p> Step 1: Enter your email </p>{" "}
        <p> We will send you a link to reset your password </p>{" "}
        <Form name="Enter your email" onFinish={handleNext} scrollToFirstError>
          <Form.Item
            name="email"
            label="E-mail"
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
            <Input />
          </Form.Item>{" "}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Next{" "}
            </Button>{" "}
          </Form.Item>{" "}
        </Form>{" "}
      </div>{" "}
      <ToastContainer />
    </div>
  );
};
export default EmailForm;
