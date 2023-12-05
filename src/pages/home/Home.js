import React, { useState, useEffect } from 'react';
import anh_logo_1 from '../../../src/assets/images/anh_logo_1.jpg';
import Post from './components/Post';
import PostItem from './components/PostItem';
import { ToastContainer, toast } from 'react-toastify';
import Editor from './components/Editor';
import { useSelector, useDispatch } from 'react-redux';
import { selectselectuser, selectuser } from '../../redux/User';
import Api from '../../api/Api';
import { url } from '../../constants/Constant';
import { Skeleton } from 'antd';
//import { verifyJwtToken } from '../../api/Jwt';
function Home() {
  
 
  const [ispost, setIspost] = useState(false);
  const dispatch = useDispatch();
 const [listpost, setListpost] = useState([]);
 const [page, setPage] = useState(1);
 const [size, setSize] = useState(30);
 
  useEffect(() => {
 
    //console.log(verifyJwtToken(localStorage.getItem('use')));
    if (localStorage.getItem('login')) {
      toast.success('Đăng nhập thành công');
      localStorage.removeItem('login');      
    }
    dispatch(selectuser(JSON.parse(localStorage.getItem('user'))));
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
    };
    Api.get(url+`api/v1/posts/home-posts?page=${page}&size=${size}`, {headers:headers}).then((response) => {
      if (response.data.statusCode === 200) {
        setListpost(response.data.result);
      } else {
        console.log(response.error);
      }
      
    }).catch((error) => {
      console.log(error);
    });
  }, []);
	useEffect(() => {
		homePostss();
	}, []);
	const fetchData = () => {
		// Tạo một Promise mới
		const myPromise = new Promise((resolve, reject) => {
			// Simulate an asynchronous task (e.g., fetching data from an API)
			setTimeout(() => {
				// Giả sử dữ liệu được lấy từ API
				const headers = {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
				};
				const apiData = Api.get(url + `api/v1/posts/home-posts?page=${page}&size=${size}`, {
					headers: headers,
				});
				// Gọi resolve khi công việc đã hoàn thành thành công
				resolve(apiData);
			}, 15000); // Giả định mất 2 giây để lấy dữ liệu
		});

		// Sử dụng Promise
		myPromise
			.then((result) => {
				// Xử lý kết quả khi Promise hoàn thành thành công
				if (result.data.statusCode === 200) {
					setListpost(result.data.result.posts);
					console.log('data', result.data.result.posts);
				} else {
					console.log(result.error);
				}
			})
			.catch((error) => {
				// Xử lý lỗi khi Promise không thành công
				console.error('Error fetching data:', error);
			});
	};

	const homePostss = async () => {
		try {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
				timeout: 15000,
			};

			// Create an array of promises for each API call
			const apiCalls = [];

			// Assuming page and size are defined somewhere in your code

			apiCalls.push(Api.get(url + `api/v1/posts/home-posts?page=${page}&size=${size}`, { headers }));
			// Add more API calls if needed

			// Wait for all promises to resolve
			const responses = await Promise.all(apiCalls);

			// Process responses
			responses.forEach((response, index) => {
				if (response.data.statusCode === 200) {
					console.log(`Data for API call ${index + 1}:`, response.data.result.posts);
					// Handle the data as needed, e.g., setListpost(response.data.result.posts);
				} else {
					console.log(`Error for API call ${index + 1}:`, response.error);
					// Handle errors as needed
				}
			});
		} catch (error) {
			console.log('Error:', error);
		}
	};

	const homePosts = async () => {
		try {
			const headers = {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user')).token,
				timeout: 15000,
			};
			const response = await Api.get(url + `api/v1/posts/home-posts?page=${page}&size=${size}`, {
				headers: headers,
			});
			if (response.data.statusCode === 200) {
				setListpost(response.data.result.posts);
				console.log('data', response.data.result.posts);
			} else {
				console.log(response.error);
			}
		} catch {
			console.log('error');
		}
	};

	let anh = '';
	const user = JSON.parse(localStorage.getItem('user'));
	if (user && user.profileImageUrl) {
		anh = user.profileImageUrl;
	} else {
		anh = anh_logo_1;
	}

	const openInput = () => {
		setIspost(!ispost);
	};

	const post = [
		{
			user: {
				name: 'John Doe',
				avatar: anh,
			},
			content: `<p>aaaaaaa</p>
     `,
			image: anh,
			likes: 42,
		},
		{
			user: {
				name: 'John Doe',
				avatar: anh,
			},
			content: `<p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>
      <p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>
      <p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>
      <p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>`,
			image: anh,
			likes: 42,
		},
		{
			user: {
				name: 'John Doe',
				avatar: anh,
			},
			content: `<p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>
      <p>This guide assumes that you are using the <a href="https://github.com/facebook/create-react-app">Create React App CLI</a> as your boilerplate and it goes through adjusting it to fit CKEditor&nbsp;5 needs. If you use your custom webpack setup, please read more about <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/advanced/alternative-setups/integrating-from-source-webpack.html">including CKEditor&nbsp;5 built from source</a>.</p><p>The configuration needs to be ejected to make it possible to customize the webpack configuration. In order to be able to build CKEditor&nbsp;5 from source, you need to tell webpack how to handle CKEditor&nbsp;5’s SVG and CSS files (by adding loaders configuration). Additionally, you need to exclude the CKEditor&nbsp;5 source from the existing loaders.</p><p>You can see all the changes described below in this example project: <a href="https://github.com/ckeditor/ckeditor5-react-example/">https://github.com/ckeditor/ckeditor5-react-example/</a>.</p><p>Create a sample application using create-react-app@3+ first:</p>
      <p>npx create-react-app ckeditor5-react-example</p>
      <p>&nbsp;</p><p>If you want to use TypeScript, choose the appropriate template:</p><p>npx create-react-app ckeditor5-react-example --template typescript
      </p><p>&nbsp;</p><p>Then, move to your freshly created project:</p><p>cd ckeditor5-react-example
      </p><p>&nbsp;</p><p>Now you can eject the configuration (you can find more information about ejecting <a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject">here</a>):</p>`,
			image: anh,
			likes: 42,
		},
	];
	return (
		<>
			<div className="home-page">
				{listpost.length === 0 ? <Skeleton active /> : null}
				{listpost.map((post, index) => {
					return (
						<PostItem
							key={index}
							user={post.user}
							content={post.content}
							image={post.image}
							likes={post.likes}
							index={index}
						/>
					);
				})}
				<ToastContainer />
			</div>
		</>
	);
}

export default Home;
