import React from 'react'
import {Avatar, Table} from 'antd'
import { useState, useEffect } from 'react';
import Api from '../../api/Api';
import { url } from '../../constants/Constant';
import { useNavigate } from 'react-router-dom';

export default function Parent() {
    const [listChild, setListChild] = useState();
    const navigate = useNavigate();
    const columns = [
        {
            title:'Số thứ tự',
            dataIndex:'key',
            key:'key',
            render: (key) => Number(key) + 1,
        },
        {
            title:'Họ và tên đệm',
            dataIndex:'firstName',
            key:'firstName',
        },
        {
            title:'Tên',
            dataIndex:'lastName',
            key:'lastName',
        },
        
    ];
    

    useEffect(() => {
        CallSubmitsionChild();
    }, []);

    const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    };
    const CallSubmitsionChild = () => {
        Api.get(url + 'api/v1/submissions/list/children', { headers: { headers } })
        .then((response) => {
            if (response.data.statusCode === 200 && response.data.result.length > 0) {
                const newData = response.data.result.map((item, index) => {
                    const { submissions, user } = item;
                
                    // Thêm giá trị key vào mỗi phần tử của submissions
                    const newSubmissions = submissions.map((submission) => ({
                      ...submission,
                      key: index,
                    }));
                
                    // Trả về đối tượng mới với key, user và submissions đã được cập nhật
                    return {
                      key: index,
                      firstName:user.firstName,
                      lastName:user.lastName,
                      submissions: newSubmissions,
                    };
                  });
                  setListChild(newData);    
                
            } else {
                console.log(response.error);
            }
        })
        .catch((error) => {
            console.log(error);
        });
        
    };
    const ReviewTest = (record) => {
      localStorage.setItem('typesubmit', 'review');
      localStorage.setItem('StartAt', record.startedAt);
      localStorage.setItem('submissionId', record.id);
      
      setTimeout(() => {
        navigate('/exam/' + record.id + '/submit');
      }, 1000);
    }
    const expandedRowRender = (record) => {
        const columns = [
            {title:'Số thứ tự', dataIndex:'key', key:'key', render: (key) => Number(key) + 1,},
          {title:'Bắt đầu lúc', dataIndex:'startedAt', key:'startedAt'},
          { title: 'Ngày nộp', dataIndex: 'createdAt', key: 'createdAt' },
          {title:'Điểm', dataIndex:'score', key:'score'},
          
          {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
              <div>
              <button  onClick={() => ReviewTest(record)}> 
                  Xem bài nộp
                  </button>
              </div>
            ),
          },
        ];
        return (
          <Table
            columns={columns}
            dataSource={record.submissions}
            pagination={false}
          />
        );
    }
    return (
        <div style={{textAlign:'center'}} >
            <h1>Kết quả học tập của học sinh</h1>
            <Table columns={columns} dataSource={listChild} expandable={{
					expandedRowRender,
					
				}}/>
           
        </div>
    )
}