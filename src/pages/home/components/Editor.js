import { useCallback, useRef, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import uploadToCloudinary from './upload';
import { GiCancel } from 'react-icons/gi';
import Api from '../../../api/Api';
import { useParams } from 'react-router-dom';
import { url } from '../../../constants/Constant';
import { useDispatch } from 'react-redux';
import {editPostGroup} from '../../../redux/Group'
import { toast, ToastContainer } from 'react-toastify';
import Loading from '../../../components/Loading';
import { selectPostGroup } from '../../../redux/Group';
import { useSelector } from 'react-redux';
import { selectSelectedPostGroup } from '../../../redux/Group';
export default function Editor(props) {
	const [value, setValue] = useState(props.data || '');
	const { uuid } = useParams();
	const headers = {
		Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
		'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
	};
	const reactQuillRef = useRef(null);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const onChange = (content) => {	
		setValue(content);
		if (props.editcontent) {
			props.editcontent(value);
		}
	};
	const cancel = () => {
		if (props.cancel) props.cancel();
	};
	const Save = async (e) => {
		setIsLoading(true);
		e.preventDefault();
		if(props.isQuiz){
			props.editcontent(value);
			props.cancel();
			return ;
		}
		if(props.idComment)
		{
			const stringValue = value.toString();
			console.log(stringValue);
			setIsLoading(true);
			const data = {
				commentId: props.idComment,
				content: stringValue,
				
			}
			const headers = {
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				'Content-Type': 'multipart/form-data', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
			};
			Api.post(url + 'api/v1/comments', data, { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						console.log(response.data.message);
						dispatch(editPostGroup(response.data.result));
						if(props.homePosts)
						{
							props.homePosts();
						}
						setValue('');
					} else {
						console.log(response.error);
					}
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(()=>{
					setIsLoading(false);
				});
				return ;
		}

		if(props.idPost){
			const stringValue = value.toString();
			console.log(stringValue);
			setIsLoading(true);
			const data = {
				postId: props.idPost,
				content: stringValue,
				
			}
			const headers = {
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
			};
			Api.post(url + 'api/v1/comments/commentPost', data, { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						toast.success('Bình luận thành công');
						if(props.homePosts)
						{
							props.homePosts();
						}
					} else {
						console.log(response.error);
					}
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(()=>{
					setIsLoading(false);
				});
		}
		else if (props.editcontent != null) {
			props.editcontent(value);
			const stringValue = value.toString();
			
			const data = {
				content: stringValue,
				postId: props.index,
				postType:props.type,
				mediaFiles:[],
			};
			const headers = {
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				'Content-Type': 'multipart/form-data', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
			};
			Api.put(url + 'api/v1/posts', data, { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						toast.success('Sửa bài thành công');
						if(props.homePosts)
						{
							props.homePosts();
						}
						callapiPost();
					} else {
						console.log(response.error);
					}
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(()=>{
					setIsLoading(false);
				});

		} else {
		
			const stringValue = value.toString();
			console.log(props.type);
			const data = {
				content: stringValue,
				groupId: uuid,
				typeName:props.type,
				
			};
			const headers = {
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				'Content-Type': 'multipart/form-data',

			};
			Api.post(url + 'api/v1/posts', data, { headers: headers })
				.then((response) => {
					if (response.data.statusCode === 200) {
						console.log(response.data.post);
						 callapiPost();
						setTimeout(() => {
							toast.success('Đăng bài thành công');
						}, 1000);
						if(props.homePosts)
						{
							props.homePosts();
						}
						
						
					} else {
						console.log(response.error);
						toast.error('Đăng bài thất bại');
					}
				})
				.catch((error) => {
					console.log(error);
					toast.error('Đăng bài thất bại');
				})
				.finally(()=>{
					setIsLoading(false);
				});

		}
		const parser = new DOMParser();
		const doc = parser.parseFromString(value, 'text/html');

		
		// Lấy tất cả các thẻ img trong DOM
		const images = doc.querySelectorAll('img');

		// Duyệt qua mỗi thẻ img và thực hiện điều gì đó với chúng
		images.forEach((img) => {
			// Thực hiện các thao tác bạn muốn với mỗi thẻ img
			console.log(img.src);
		});
		props.cancel();
	};
	const callapiPost = async () => {
		Api.get(url + 'api/v1/posts?' + 'groupId=' + uuid, { headers: headers })
			.then((response) => {
				if (response.data.statusCode === 200) {
					dispatch(selectPostGroup(response.data.result));
				} else {
					console.log(response.error);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}
	
	const imageHandler = useCallback(() => {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.click();
		input.onchange = async () => {
			if (input !== null && input.files !== null) {
				const file = input.files[0];
				const url = await uploadToCloudinary(file, uuid);
				const quill = reactQuillRef.current;
				if (quill) {
					const range = quill.getEditorSelection();
					range && quill.getEditor().insertEmbed(range.index, 'image', url);
				}
			}
		};
	}, []);

	return (
		<div
			className="Editor"
			style={{
				position: 'absolute',
				width: '50%',
				position: 'fixed',
				zIndex: '150',
				backgroundColor: 'aliceblue',
				border: '1px solid',
				top:'25%',
				left:'25%',
				overFlow: 'auto',
			}}
		>
			{isLoading && <Loading></Loading>}
			<div
				style={{
					display: 'flex',
					borderBottom: '1px solid black',
					justifyContent: 'space-between',
					flex: 10,
				}}
			>
				<button style={{ height: '72.5px', backgroundColor: 'aliceblue', textAlign: 'end' }} onClick={cancel}>
					<GiCancel style={{ color: 'black', fontSize: '30px' }}></GiCancel>
				</button>
			</div>
			<ReactQuill
				ref={reactQuillRef}
				style={{height:'50vh',overflow:'scroll',width:'100%'}}
				theme="snow"
				placeholder="Start writing..."
				modules={{
					toolbar: {
						container: [
							[{ header: '1' }, { header: '2' }, { font: [] }],
							[{ size: [] }],
							['bold', 'italic', 'underline', 'strike', 'blockquote'],
							[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
							['link', 'image', 'video'],
							['code-block'],
							['clean'],
						],
						handlers: {
							image: imageHandler,
						},
					},
					clipboard: {
						matchVisual: false,
					},
				}}
				formats={[
					'header',
					'font',
					'size',
					'bold',
					'italic',
					'underline',
					'strike',
					'blockquote',
					'list',
					'bullet',
					'indent',
					'link',
					'image',
					'video',
					'code-block',
				]}
				value={value}
				onChange={onChange}
			/>
			<button style={{ width: '90%', margin: '5px 32px', borderRadius: '10px' }} onClick={Save}>
				Lưu
			</button>
		</div>
	);
}
