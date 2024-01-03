import React ,{useState} from 'react';
import { Galleria } from 'primereact/galleria';
import './LandingPage.css';
import { Button } from 'antd';
import { Carousel } from 'primereact/carousel';
import Register from '../auth/register/Register';
import RegisterParent from '../auth/register/RegisterParent';
import RegisterTeacher from '../auth/register/RegisterTeacher';
import Topbar from '../../components/Topbar';	
import { useRef } from 'react';
const LandingPage = () => {
	const images = [
		{
			itemImageSrc:
				'https://epe.brightspotcdn.com/dims4/default/78475c6/2147483647/strip/true/crop/2084x1414+0+0/resize/840x570!/format/webp/quality/90/?url=https%3A%2F%2Fepe-brightspot.s3.us-east-1.amazonaws.com%2F0e%2F42%2F24a47b3f408a88d55bebefb2c345%2Fsocial-studies-globe-geography-elementary-1421987025.jpg',
			thumbnailImageSrc:
				'https://epe.brightspotcdn.com/dims4/default/78475c6/2147483647/strip/true/crop/2084x1414+0+0/resize/840x570!/format/webp/quality/90/?url=https%3A%2F%2Fepe-brightspot.s3.us-east-1.amazonaws.com%2F0e%2F42%2F24a47b3f408a88d55bebefb2c345%2Fsocial-studies-globe-geography-elementary-1421987025.jpg',
			alt: 'Description for Image 1',
			title: 'Title 1',
		},
		{
			itemImageSrc:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_CcGrrFUm49uKBtiBs8AYqct6FH6tJGRAbQ&usqp=CAU',
			thumbnailImageSrc:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_CcGrrFUm49uKBtiBs8AYqct6FH6tJGRAbQ&usqp=CAU',
			alt: 'Description for Image 2',
			title: 'Title 2',
		},
	];
	const studies = [
		{
			id: 1,
			name: 'Ôn tập lịch sửa lớp 7',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVLaSxkoR4CKaIrA8N7yILeZRZJVf96XjsVg&usqp=CAU',
			examination: 123,
			comment: 18,
		},
		{
			id: 2,
			name: 'Ôn tập lịch sửa lớp 8',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVLaSxkoR4CKaIrA8N7yILeZRZJVf96XjsVg&usqp=CAU',
			examination: 123,
			comment: 18,
		},
		{
			id: 3,
			name: 'Ôn tập lịch sửa lớp 9',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVLaSxkoR4CKaIrA8N7yILeZRZJVf96XjsVg&usqp=CAU',
			examination: 123,
			comment: 18,
		},
		{
			id: 4,
			name: 'Ôn tập lịch sửa lớp 10',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVLaSxkoR4CKaIrA8N7yILeZRZJVf96XjsVg&usqp=CAU',
			examination: 123,
			comment: 18,
		},
		{
			id: 5,
			name: 'Ôn tập lịch sửa lớp 11',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVLaSxkoR4CKaIrA8N7yILeZRZJVf96XjsVg&usqp=CAU',
			examination: 123,
			comment: 18,
		},
		{
			id: 6,
			name: 'Ôn tập lịch sửa lớp 12',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVLaSxkoR4CKaIrA8N7yILeZRZJVf96XjsVg&usqp=CAU',
			examination: 123,
			comment: 18,
		},
		{
			id: 7,
			name: 'Ôn tập lịch sửa lớp 6',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVLaSxkoR4CKaIrA8N7yILeZRZJVf96XjsVg&usqp=CAU',
			examination: 123,
			comment: 18,
		},
		{
			id: 8,
			name: 'Ôn tập lịch sửa lớp 5',
			image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVLaSxkoR4CKaIrA8N7yILeZRZJVf96XjsVg&usqp=CAU',
			examination: 123,
			comment: 18,
		},
	];

	const itemTemplate = (item) => {
		return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', height: '50rem' }} />;
	};

	const thumbnailTemplate = (item) => {
		return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
	};
	const responsiveOptions = [
		{
			breakpoint: '1199px',
			numVisible: 1,
			numScroll: 1,
		},
		{
			breakpoint: '991px',
			numVisible: 2,
			numScroll: 1,
		},
		{
			breakpoint: '767px',
			numVisible: 1,
			numScroll: 1,
		},
	];
	const [isRegisterForParent, setIsRegisterForParent] = useState(false);
	const [isRegisterForStudent, setIsRegisterForStudent] = useState(false);
	const [isRegisterForTeacher, setIsRegisterForTeacher] = useState(false);
	
	const cancelRegister = () => {
		setIsRegisterForParent(false);
		setIsRegisterForStudent(false);
		setIsRegisterForTeacher(false);
	};
	const registerForParent = () => {
		setIsRegisterForParent(true);
		setIsRegisterForStudent(false);
		setIsRegisterForTeacher(false);
	};
	const registerForStudent = () => {
		setIsRegisterForParent(false);
		setIsRegisterForStudent(true);
		setIsRegisterForTeacher(false);
	};
	const registerForTeacher = () => {
		setIsRegisterForParent(false);
		setIsRegisterForStudent(false);	
		setIsRegisterForTeacher(true);
	};
	const scrollToSection = () => {
		// Check if the ref is available
		if (scrollRef.current) {
		  // Scroll to the section
		  scrollRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	  };
	  const scrollRef = useRef(null);
	const studiesTemplate = (item) => {
		return (
			
			<div className="card">
				<div className="card-image">
					<img src={item.image} alt="landing-page" />
				</div>
				<div className="card-content">
					<h4>{item.name}</h4>
					<div className="card-content-footer">
						<div className="card-content-footer-item">
							<i className="pi pi-user" />
							<span>Lượt thi {item.examination}</span>
						</div>
						<div className="card-content-footer-item">
							<i className="pi pi-comment" />
							<span>Bình luận {item.comment}</span>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<><Topbar scrollToSection={scrollToSection}/>
		<div className="landing-container">
			<div className="galleria-container">
				<Galleria
					value={images}
					numVisible={5}
					circular
					style={{ width: '100%', height: 'auto' }}
					showItemNavigators
					showItemNavigatorsOnHover
					showIndicators
					showThumbnails={false}
					item={itemTemplate}
					thumbnail={thumbnailTemplate}
				/>
			</div>
			<div className="register-container">
				<h1>Bạn là ?</h1>
				<div className="card-container">
					<div className="card-led-register" ref={scrollRef}>
						<div className="item-image" style={{ animation: 'colorChangeTeacher 0.2s infinite' }} />
						<div className="card-register">
							<h1 style={{ color: '#4d868a' }}>Giáo viên</h1>
							<h4>
								Công cụ giúp giảm tải công việc, truyền thông nhanh chóng, hiểu học lực của học sinh
							</h4>
							<Button type="primary" onClick={registerForTeacher} className='Button-register'>
								ĐĂNG KÍ TÀI KHOẢN
							</Button>
							{ isRegisterForTeacher && <RegisterTeacher cancelRegister={cancelRegister} />}
						</div>
					</div>
					<div className="card-led-register">
						<div className="item-image" style={{ animation: 'colorChangeStudent 0.2s infinite' }} />
						<div className="card-register">
							<h1 style={{ color: '#7e4d8a' }}>Học sinh</h1>
							<h4>
								Phương pháp mới giúp ôn tập kiến thức, tạo thói quen tự học và khai thác kiến thức trên
								mạng
							</h4>
							<Button type="primary" onClick={registerForStudent} className='Button-register'>
								ĐĂNG KÍ TÀI KHOẢN
							</Button>
							{ isRegisterForStudent && <Register cancelRegister={cancelRegister} />}
						</div>
					</div>
					<div className="card-led-register">
						<div className="item-image" style={{ animation: 'colorChangeParent 0.2s infinite' }} />
						<div className="card-register">
							<h1 style={{ color: '#9c1616' }}>Phụ huynh</h1>
							<h4>Phương tiện để có kế hoạch học tập cùng con, đồng cảm với ngành giáo dục </h4>
							<Button type="primary" onClick={registerForParent} className='Button-register'>
								ĐĂNG KÍ TÀI KHOẢN
							</Button>
							{ isRegisterForParent && <RegisterParent cancelRegister={cancelRegister} />}
						</div>
					</div>
				</div>
			</div>
			<div className="info-container">
				<div className="info-header-container">
					<div className="info-header-content">
						<h1>Bạn học được những gì trên STEM?</h1>
						<h4>
							STEM là Mạng xã hội học tập trực tuyến, được xây dựng nhằm mục tiêu đồng hành cùng
							các bạn học sinh trong quá trình học tập, trau dồi kiến thức, kỹ năng.
						</h4>
					</div>
					<div className="info-header-image">
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVLaSxkoR4CKaIrA8N7yILeZRZJVf96XjsVg&usqp=CAU"
							alt="landing-page"
						/>
					</div>
					<div className="info-header-image">
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVLaSxkoR4CKaIrA8N7yILeZRZJVf96XjsVg&usqp=CAU"
							alt="landing-page"
						/>
					</div>
				</div>
				<div className="info-body-container">
					<div className="info-body-content-class">
						<div className="info-body-content">
							<h3>Với cấp trung cấp phổ thông</h3>
							<h4>
								Các nội dung phù hợp với định hướng xây dựng giải pháp tự học và chống hổng kiến thức
								giúp các bạn học sinh đạt kết quả cao trong kỳ thi Trung học phổ thông quốc gia{' '}
							</h4>
						</div>
						<div className="info-body-content">
							<h3>Với cấp trung học cơ sở</h3>
							<h4>
								Chuẩn bị hành trang phù hợp để học sinh tập làm quen với hình thức học chủ động, đưa ra
								lộ trình học tập để đạt được mục tiêu cụ thể và rèn luyện kỹ năng thi chuyển cấp
							</h4>
						</div>
					</div>
					<div className="info-body-image">
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVLaSxkoR4CKaIrA8N7yILeZRZJVf96XjsVg&usqp=CAU"
							alt="landing-page"
						/>
					</div>
					<div className="info-body-content-class">
						<div className="info-body-content">
							<h3>Với cấp tiểu học</h3>
							<h4>
								Ứng dụng các phương pháp dạy và học mới, các mô hình học mô phỏng dưới dạng trò chơi
								ngắn. Bước đầu giúp các em làm quen với môi trường học mà chơi, chơi mà học hiểu quả
							</h4>
						</div>
						<div className="info-body-content">
							<h3>Nâng cao khả năng ngoại ngữ </h3>
							<h4>
								Nội dung được cung cấp bởi các đơn vị hàng đầu về ngoại ngữ tại Việt Nam đảm bảo các bạn
								học sinh đáp ứng đủ điều kiện thi đạt các chứng chỉ theo từng khung năng lực
							</h4>
						</div>
					</div>
				</div>
			</div>
			<div className="content-oustanding-container">
				<div className="content-oustanding">
					<h1>Nội dung tiêu biểu</h1>
					<h4>
						Những khóa học, kỳ thi với số lượng người tham gia nhiều nhất và được đánh giá cao nhất về chất
						lượng trên ViettelStudy
					</h4>
				</div>
				<div className="content-oustanding">
					<Carousel
						value={studies}
						numVisible={4}
						numScroll={4}
						responsiveOptions={responsiveOptions}
						className="custom-carousel"
						circular
						// autoplayInterval={3000}
						itemTemplate={studiesTemplate}
					/>
				</div>
			</div>
			<div className="content-partner-container">
				<h1>Nội dung đối tác</h1>
				<div className="partner-content">
					<div className="partner-image">
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVLaSxkoR4CKaIrA8N7yILeZRZJVf96XjsVg&usqp=CAU"
							alt="landing-page"
						/>
					</div>
					<div className="partner-image">
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVLaSxkoR4CKaIrA8N7yILeZRZJVf96XjsVg&usqp=CAU"
							alt="landing-page"
						/>
					</div>
					<div className="partner-image">
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVLaSxkoR4CKaIrA8N7yILeZRZJVf96XjsVg&usqp=CAU"
							alt="landing-page"
						/>
					</div>
					<div className="partner-image">
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVLaSxkoR4CKaIrA8N7yILeZRZJVf96XjsVg&usqp=CAU"
							alt="landing-page"
						/>
					</div>
				</div>
			</div>
		</div>
		</>
	);
};

export default LandingPage;
