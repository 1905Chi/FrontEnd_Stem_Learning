import React from 'react';
import { Spin } from 'antd';

export default function Loading() {
  return (
    <div className="content-loading-wrapper">
      <Spin tip="Loading" size="small">
      </Spin>
    </div>
  );
}
