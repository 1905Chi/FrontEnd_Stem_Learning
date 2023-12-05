import React from 'react';
import BannerGroup from '../components/BannerGroup';
import Post from '../../home/components/Post';
export default function CreateGroup() {
	const disabledStyle = {
		pointerEvents: 'none',
        
		opacity: 0.4, // Điều này làm cho phần bị vô hiệu hóa trông mờ đi một chút
	};
	return (
		<div style={disabledStyle}>
            
			<BannerGroup></BannerGroup>
			
		</div>
	);
}
