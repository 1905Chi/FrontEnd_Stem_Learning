import Header from "./Header";
import Left from "./Left";
import React from "react";
import { Layout } from "antd";
import "./DefaultLayout.css";
const { Sider, Content } = Layout;
export default function DefaultLayout({ children }) {
  return (
    <>
      <Layout className="header">
        <Header> </Header>{" "}
      </Layout>{" "}
      <Layout className="content">
        <Sider width="20%" theme="light">
          {" "}
          <Left> </Left>{" "}
        </Sider>{" "}
        <Content style={{ margin: "16px", flex: 5 }}> {children} </Content>{" "}
        <Sider width="20%" theme="light">
          {" "}
          {/* Đặt nội dung thanh right ở đây */}{" "}
        </Sider>{" "}
      </Layout>{" "}
    </>
  );
}
