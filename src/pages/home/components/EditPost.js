import {GiCancel} from 'react-icons/gi'
export default function EditPost({ onCancel }) {
	return (
		<div className="edit-post">
			<div className="form-edit-post">
				<div
					style={{
						display: 'flex',
						borderBottom: '1px solid black',
						justifyContent: 'space-between',
						flex: 10,
					}}
				>
					<h2 style={{ flex: 8, textAlign: 'end' }}>Chỉnh sửa bài viết</h2>
					<button
						style={{ flex: 3, height: '72.5px', backgroundColor: 'white', textAlign: 'end' }}
						onClick={onCancel}
					>
						<GiCancel style={{ color: 'black', fontSize: '30px' }}></GiCancel>
					</button>
				</div>

				
			</div>
		</div>
	);
}
