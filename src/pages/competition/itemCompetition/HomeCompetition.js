import React from 'react';
import './HomeCompetition.css';
export default function HomeCompetition() {
	return (
		<div className="home-competition">
			<div className="col-md-10" style={{ margin: '0 auto' }}>
				<div className="result">
					
					<p className="titleHeader">
						KIỂM TRA, ĐÁNH GIÁ KẾT QUẢ NGHIÊN CỨU, HỌC TẬP, QUÁN TRIỆT
						<br />
						<b>Nghị quyết Đại hội đại biểu toàn quốc Hội Sinh viên Việt Nam lần thứ XI,</b>
						<br />
						nhiệm kỳ 2023 - 2028
					</p>
					<div>
						<div className="groupInfo">
							<p>
								<span>Họ và tên</span>: Bùi Đặng Quốc Chí.
							</p>
							<p>
								<span>Email</span>: 20110614@student.hcmute.edu.vn
							</p>
							<p>
								<span>Số điện thoại</span>: 0362858058
							</p>
							<p>
								<span>Tỉnh / TP</span>: Thành phố Hồ Chí Minh
							</p>
							<p>
								<span>Trường</span>: TRƯỜNG ĐẠI HỌC SƯ PHẠM KỸ THUẬT TPHCM
							</p>
							<p>
								<span>Lớp</span>: 20110ST4
							</p>
						</div>
						<div className="groupInfo">
							<p>
								<span>Tuần thi</span>: <span className="checked">2</span>
							</p>
							<p>
								<span>Điểm cao nhất</span>: <span className="checked">31</span> điểm
							</p>
							<p>
								<span>Thời gian</span>: <span className="checked">14:52.630</span>
							</p>
							<p>
								<span>Số lần đã thi</span>: <span className="checked">2</span>/2
							</p>
						</div>
					</div>
					<p>Bạn đã dự thi đủ 2 lần.</p>
				</div>
			</div>
		</div>
	);
}
