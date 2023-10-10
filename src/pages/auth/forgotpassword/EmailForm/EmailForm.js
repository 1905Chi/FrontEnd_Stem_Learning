import React,{ useState } from "react";
import { Form, Input, Button ,Spin} from "antd";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./EmailForm.css";
import { url } from "../../../../constants/Constant";

const EmailForm = () => {
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const handleNext = (values) => {
    setLoading(true);
    const data = { email: values.email };
    axios
      .post(url + "api/tokens/reset-password", data)
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
          toast.error("Không thể kết nối đến máy chủ.");
        } else {
          // Lỗi trong quá trình thiết lập yêu cầu
          toast.error(error);
        }
      })
      .finally(() => {
        setLoading(false);
      });

  };

  return (
    <>
    <Spin spinning={loading} tip="Loading..." className="Loading-email-forgot"> 
    </Spin>
    <div className="body-enteremail-resetform">
      <div className="enteremail-resetform">
        <h2> Reset Password </h2> <p> Bước 1: Nhập địa chỉ email để lấy lại mật khẩu</p>{" "}
        <p> Hệ thống sẽ gửi link cấp lại mật khẩu cho bạn </p>{" "}
        <Form name="Enter your email" onFinish={handleNext} scrollToFirstError>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "Email không hợp lệ!",
              },
              {
                required: true,
                message: "Vui lòng nhập email của bạn!",
              },
            ]}
          >
            <Input />
          </Form.Item>{" "}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Kế tiếp{" "}
            </Button>{" "}
          </Form.Item>{" "}
          <ToastContainer />
        </Form>{" "}
      </div>{" "}
     
    </div>
    </>
  );
};
export default EmailForm;
