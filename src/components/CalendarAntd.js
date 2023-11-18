import React,{useState } from 'react';
import { Badge, Calendar } from 'antd';
import './CalendarAntd.css';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import dayLocaleData from 'dayjs/plugin/localeData';
import {Col, Radio, Row, Select, Typography } from 'antd';
dayjs.extend(dayLocaleData);
const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: 'warning',
          content: 'Đây là sự kiện cảnh báo.',
        },
        {
          type: 'success',
          content: 'Đây là sự kiện thường.',
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: 'warning',
          content: 'Đây là sự kiện cảnh báo.',
        },
        {
          type: 'success',
          content: 'Đây là sự kiện thường.',
        },
        {
          type: 'error',
          content: 'Đây là sự kiện lỗi.',
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: 'warning',
          content: 'Đây là sự kiện cảnh báo.',
        },
        {
          type: 'success',
          content: 'Đây là sự kiện thường và dài......',
        },
        {
          type: 'error',
          content: 'Đây là sự kiện lỗi 1.',
        },
        {
          type: 'error',
          content: 'Đây là sự kiện lỗi 2.',
        },
        {
          type: 'error',
          content: 'Đây là sự kiện lỗi 3.',
        },
        {
          type: 'error',
          content: 'Đây là sự kiện lỗi 4.',
        },
      ];
      break;
    default:
  }
  return listData || [];
};



const CalendarAntd = () => {
  


  const dateCellRender = (value) => {
    const listData = getListData(value);
    
    return (
      <div
        className={`events ${listData.length > 0 ? 'has-event' : ''} 
        `}
        onClick={() => openEvent(value)}
        onMouseEnter={() => openEvent(value)}
        onMouseLeave={() => openEvent(null)}
      >
        {listData.length > 0 && <div className="event-day" />}
      </div>
    );
  };
  const Onpanelchange = (value, mode) => {
    console.log(value, mode);
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
  
    return null;
  };
  const  openEvent = (value) => {
   
    if(value===null) return;
    const listData = getListData(value);
    if (listData.length > 0) {
      console.log('Sự kiện của ngày:', listData);
      // Hiển thị sự kiện của ngày bằng cách nào đó
    }
  }


  return <Calendar cellRender={cellRender} fullscreen={false} onSelect={openEvent} onPanelChange={Onpanelchange} headerRender={({ value, type, onChange, onTypeChange }) => {
    const start = 0;
    const end = 12;
    const monthOptions = [];
    let current = value.clone();
    const localeData = value.localeData();
    const months = [];
    for (let i = 0; i < 12; i++) {
      current = current.month(i);
      months.push(localeData.monthsShort(current));
    }
    
    for (let i = start; i < end; i++) {
      monthOptions.push(
        <Select.Option key={i} value={i} className="month-item">
          {months[i % 12]} {/* Sử dụng i % 12 để tránh lặp lại */}
        </Select.Option>,
      );
    }
    const year = value.year();
    const month = value.month();
    const options = [];
    for (let i = year - 10; i < year + 10; i += 1) {
      options.push(
        <Select.Option key={i} value={i} className="year-item">
          {i}
        </Select.Option>,
      );
    }
    return (
      <div
        style={{
          padding: 8,
        }}
      >
        <Typography.Title level={4}>Lịch</Typography.Title>
        <Row gutter={8}>
          <Col>
            <Radio.Group
              size="small"
              onChange={(e) => onTypeChange(e.target.value)}
              value={type}
            >
              <Radio.Button value="month">Month</Radio.Button>
              <Radio.Button value="year">Year</Radio.Button>
            </Radio.Group>
          </Col>
          <Col>
            <Select
              size="small"
              dropdownMatchSelectWidth={false}
              className="my-year-select"
              value={year}
              onChange={(newYear) => {
                const now = value.clone().year(newYear);
                onChange(now);
              }}
            >
              {options}
            </Select>
          </Col>
          <Col>
            <Select
              size="small"
              dropdownMatchSelectWidth={false}
              value={month}
              onChange={(newMonth) => {
                const now = value.clone().month(newMonth);
                onChange(now);
              }}
            >
              {monthOptions}
            </Select>
          </Col>
        </Row>
      </div>
    );
  }} />;
};

export default CalendarAntd;
