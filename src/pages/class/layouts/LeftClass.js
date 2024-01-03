import { Input } from 'antd';
import React from 'react';
import './LeftClass.css';
export default function LeftClass() {
	return (
		<div className="LeftClass">
			<div className="MonHoc">
				<div style={{ display: 'flex', }}>
					<h3>Môn học</h3>
					<button style={{backgroundColor:'white'}}>Tất cả</button>
				</div>
				<div className="MonHoc__item">
					<input type="checkbox"></input>
					<p> Toán </p>
				</div>
				<div className="MonHoc__item">
					<input type="checkbox"></input>
					<p> Ngữ văn </p>
				</div>
				<div className="MonHoc__item">
					<input type="checkbox"></input>
					<p> Tiếng Anh </p>
				</div>
				<div className="MonHoc__item">
					<input type="checkbox"></input>
					<p> Vật lý </p>
				</div>
				<div className="MonHoc__item">
					<input type="checkbox"></input>
					<p> Hóa học </p>
				</div>
				<div className="MonHoc__item">
					<input type="checkbox"></input>
					<p> Sinh học </p>
				</div>
			</div>
            <div className="LopHoc">
				<div style={{ display: 'flex' }}>
					<h3>Khối học</h3>
					<button style={{backgroundColor:'white'}}>Tất cả</button>
				</div>
				<div className="MonHoc__item">
					<input type="checkbox"></input>
					<p> 1 </p>
				</div>
				<div className="MonHoc__item">
					<input type="checkbox"></input>
					<p> 2</p>
				</div>
				<div className="MonHoc__item">
                <input type="checkbox"></input>
					<p> 3 </p>
				</div>
				<div className="MonHoc__item">
					<input type="checkbox"></input>
					<p> 4</p>
				</div>
				<div className="MonHoc__item">
                <input type="checkbox"></input>
					<p> 5 </p>
				</div>
				<div className="MonHoc__item">
                <input type="checkbox"></input>
					<p> 6</p>
				</div>
			</div>
		</div>
	);
}
