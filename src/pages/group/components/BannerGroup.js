export default function BannerGroup() {
	return (
		<>
			<div className="banner-group" style={{margin:'0 0 35px 0'}}>
				<div className="banner-group__image" >
					<img src="https://in3ds.com/wp-content/uploads/2019/04/y-tuong-giao-duc-STEM.png" alt="" style={{width:'100%',height:'50%'}} />
				</div>
				<div className="banner-group__name">
					<h1>Group Name</h1>
				</div>
				<div>{}</div>
				<div style={{display:'flex',justifyContent:'start'}}>
                    <span>Giới thiệu</span>
                    <span style={{margin:'0 15px 0 15px'}}>Bài Viết</span>
                    <span style={{margin:'0 15px 0 15px'}}>Thành viên</span>
                    <span>Sự kiện</span>
       
                </div>
			</div>
		</>
	);
}
