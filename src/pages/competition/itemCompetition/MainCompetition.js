import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import './MainCompetition.css';
import HomeCompetition from './HomeCompetition';
import RankCompetition from './RankCompetition';
import InstructCompetition from './InstructCompetition';
import { useParams } from 'react-router-dom';
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function MainCompetition() {
    const [activeKey, setActiveKey] = useState('1');
    const { uuid } = useParams();
    const [group, setGroup] = useState(null);  // Chỉnh sửa state để khởi tạo là null
    const [role, setRole] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        // Thêm class vào tab đang hoạt động
        const activeTab = document.querySelector(`[data-tab-key="${activeKey}"]`);
        if (activeTab) {
            activeTab.classList.add('custom-tab-label-active');
        }
        
        // Cleanup khi component sẽ được cập nhật
        return () => {
            if (activeTab) {
                activeTab.classList.remove('custom-tab-label-active');
            }
        };
    }, [activeKey]);

    useEffect(() => {
        if (uuid) {
            getGroup();
        } else {
            toast.error('Không tìm thấy UUID.');
        }
    }, [uuid]);

    const getGroup = async () => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        };

        try {
            const response = await Api.get(url + 'api/v1/groups/' + uuid, { headers: headers });
            if (response.data.statusCode === 200) {
                if (response.data.result.user) {
                    setRole(response.data.result.user.role);
                }
                setGroup(response.data.result.group);
            } else {
                toast.error(response.data.message);
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }
        } catch (error) {
            toast.error('Không tồn tại cuộc thi này.');
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }
    };

    const items = [
        {
            key: '1',
            label: (
                <div className="custom-tab-label" data-tab-key="1">
                    <h1>Trang chủ</h1>
                </div>
            ),
            children: <HomeCompetition />,
        },
        {
            key: '2',
            label: (
                <div className="custom-tab-label" data-tab-key="2">
                    <h1>Xếp hạng</h1>
                </div>
            ),
            children: <RankCompetition />,
        },
        {
            key: '3',
            label: (
                <div className="custom-tab-label" data-tab-key="3">
                    <h1>Hướng dẫn / Lịch thi</h1>
                </div>
            ),
            children: <InstructCompetition />,
        },
    ];

    return (
        <div className="main-competition">
            <img
                src={group ? group.avatarUrl : ''} 
                alt="anh"
                className="img-baner"
                style={{ display: group ? 'block' : 'none' }} // Chỉ hiển thị khi group có giá trị
            />
            <Tabs
                defaultActiveKey="1"
                items={items}
                centered
                tabBarGutter={16}
                onChange={(key) => setActiveKey(key)}
            />
            <ToastContainer />
        </div>
    );
}

export default MainCompetition;
