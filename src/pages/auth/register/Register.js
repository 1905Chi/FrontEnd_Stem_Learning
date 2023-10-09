import { Form, Input, Button, Select } from "antd";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "./Register.css";
import { url } from "../../../constants/Constant";
export default function Register() {
  const roles = ["STUDENT", "TEACHER", "PARENT"];
  const handleNext = (values) => {
    const data = {
      email: values.email,
      password: values.password,
      role: values.roles,
    };
    axios
      .post(url + "api/auth/register", data)
      .then((response) => {
        // Xử lý kết quả sau khi gửi thành công
        if (response.data.statusCode === 200) {
          toast.success(
            "Account created successfully , Plese check your email to verify your account"
          );
          
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        // Xử lý lỗi nếu có lỗi xảy ra
        toast.error(error);
      });

    // Xử lý logic xác thực email ở đây (gửi email xác thực, kiểm tra địa chỉ email, vv.)
    console.log(values);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="Register-form">
      <div className="enteremail-resetform">
        <h2> Register </h2>{" "}
        <Form name="register" onFinish={handleNext} scrollToFirstError>
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
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>{" "}
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>{" "}
          <Form.Item
            label="Roles"
            name="roles"
            rules={[
              {
                required: true,
                message: "Please select your roles!",
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
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
}
