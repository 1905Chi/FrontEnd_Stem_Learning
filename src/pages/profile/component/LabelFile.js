import React from 'react';
import logo_word from '../../../assets/images/logo_word.jpg';
import PDF_file_icon from '../../../assets/images/PDF_file_icon.svg.png';
import ppt from '../../../assets/images/ppt.png';
import other from '../../../assets/images/other.jpg';
import { GiCancel } from 'react-icons/gi';
export default function LabelFile({ type, filename, onDelete ,link}) {
	return (
		<div style={{ display: 'flex', backgroundColor: '#e8e7f0', borderRadius: '10px', margin: '15px 0 0 0' }}>
			<div style={{ width: '50px' }}>
				{type === 'doc' || type==='docx' ? (
					<img src={logo_word} alt="logo_word" style={{ width: '50px', height: '100%' }} />
				) : null}
				{type === 'pdf' ? (
					<img src={PDF_file_icon} alt="PDF_file_icon" style={{ width: '50px', height: '100%' }} />
				) : null}
				{type === 'ppt'|| type==='pptx' ? <img src={ppt} alt="ppt" style={{ width: '50px', height: '100%' }} /> : null}
				{type === 'other' ? <img src={other} alt="other" style={{ width: '50px', height: '100%' }} /> : null}
			</div>
			<a href={link} style={{  textDecoration: 'none'}}>
				<div style={{ margin: '0 0 0 15px', textAlign: 'start', flex: 6 }}>
					<p style={{ margin: '5px 0 0 0' }}>{filename}</p>

					<p style={{ margin: '2px 0 0 0' }}>type: {type}</p>
				</div>
				
			</a>
			{onDelete ? (
					<div style={{ textAlign: 'end', flex: 1 }}>
						<button style={{ margin: '0 0 0 15px', background: '#e8e7f0' }} onClick={onDelete}>
							<GiCancel style={{ fontSize: '30px' }}></GiCancel>
						</button>
					</div>
				) : null}
		</div>
	);
}
