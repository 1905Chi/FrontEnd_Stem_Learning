import React from "react";
import { Layout, Col, Input, Button, Space, Avatar } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  VideoCameraOutlined,
  MenuOutlined,
  BellOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "./Header.css";
import { Link } from "react-router-dom";
const { Search } = Input;
export default function Header() {
  return (
    <Layout>
      <div className="navTop">
        <div className="block1">
          <Col>
            <Space>
              <span className="stem"> STEM </span>
              <Search placeholder="Tìm kiếm" />
            </Space>
          </Col>
        </div>
        <div className="block2">
          <Col>
            <Space>
              <Button
                shape="circle"
                icon={<HomeOutlined />}
                className="iconHome"
              >
                
              </Button>
              <Button
                shape="circle"
                icon={<VideoCameraOutlined />}
                className="iconHome"
              />
              <Button
                shape="circle"
                icon={<MenuOutlined />}
                className="iconHome"
              />
              <Button
                shape="circle"
                icon={<BellOutlined />}
                className="iconHome"
              />
            </Space>
          </Col>
        </div>
        <div className="block3">
          <Col>
            <Space>
              <Button size="circle" icon={<MailOutlined />} />
              <Button size="circle" icon={<BellOutlined />} />
              <Avatar size="circle" src="" />
            </Space>
          </Col>
        </div>
      </div>
    </Layout>
  );
}
