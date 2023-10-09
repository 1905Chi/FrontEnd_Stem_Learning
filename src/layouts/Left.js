import React from 'react';
import { Layout, Menu } from 'antd';
import { FaUserFriends } from 'react-icons/fa';
import { HiOutlineUserGroup } from 'react-icons/hi';
import {
    MessageOutlined,
    BellOutlined,
    CalendarOutlined,
} from '@ant-design/icons';
import './Left.css';
import { Link } from 'react-router-dom';
export default function Left() {
    return ( <
            >
            <
            Menu mode = "vertical"
            theme = "light"
            defaultSelectedKeys = {
                ['0'] } >
            <
            Menu.Item key = "1"
            icon = { < MessageOutlined style = {
                    { fontSize: '24px', color: 'blue' } }
                />} >
                { ' ' } <
                span > Tin nhắn < /span>{' '} <
                Link
                to = "/messages
                " >
                { ' ' } <
                /Link>{' '} <
                /Menu.Item>{' '} <
                Menu.Item
                key = "2"
                icon = { < FaUserFriends style = {
                        { fontSize: '24px', color: 'blue' } }
                    />} >
                    { ' ' } <
                    span > Bạn bè < /span>{' '} <
                    Link
                    to = "/friends
                    " >
                    { ' ' } <
                    /Link>{' '} <
                    /Menu.Item>{' '} <
                    Menu.Item
                    key = "3"
                    icon = { < BellOutlined style = {
                            { fontSize: '24px', color: 'blue' } }
                        />} >
                        { ' ' } <
                        span > Thông báo < /span>{' '} <
                        Link
                        to = "/notifications
                        " >
                        { ' ' } <
                        /Link>{' '} <
                        /Menu.Item>{' '} <
                        Menu.Item
                        key = "4"
                        icon = { < HiOutlineUserGroup style = {
                                { fontSize: '24px', color: 'blue' } }
                            />} >
                            { ' ' } <
                            span > Nhóm < /span>{' '} <
                            Link
                            to = "/groups
                            " >
                            { ' ' } <
                            /Link>{' '} <
                            /Menu.Item>{' '} <
                            Menu.Item
                            key = "5"
                            icon = { <
                                CalendarOutlined style = {
                                    { fontSize: '24px', color: 'blue' } }
                                />
                            } >
                            <
                            span > Sự kiện < /span>{' '} <
                            Link
                            to = "/events
                            " >
                            { ' ' } <
                            /Link>{' '} <
                            /Menu.Item>{' '} <
                            /Menu>{' '} <
                            />
                        );
                    }