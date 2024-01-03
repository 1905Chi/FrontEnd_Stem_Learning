import React from 'react';

const CustomEvent = ({ event }) => {
  return (
    <div>
      <strong>{event.title}</strong>
      <p>{event.start.toLocaleString()} - {event.end.toLocaleString()}</p>
      {/* Thêm các thông tin khác cần hiển thị */}
    </div>
  );
};

export default CustomEvent;
