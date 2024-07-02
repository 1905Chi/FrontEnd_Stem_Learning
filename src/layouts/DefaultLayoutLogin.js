import React from "react";

export default function DefaultLayoutLogin({ children, UpdateIsLogin }) {
  return (
    <div style={{ overflowY: 'auto', height: '100vh' }}>
      {React.cloneElement(children, { UpdateIsLogin })}
    </div>
  );
}
