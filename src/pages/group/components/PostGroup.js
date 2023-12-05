import React,{useEffect} from 'react';
import './PostGroup.css';
import Editor from "../../home/components/Editor"
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import  Api from '../../../api/Api';
import { url } from '../../../constants/Constant'; 
import PostItem from './../../home/components/PostItem'
import { useSelector } from 'react-redux';
import { selectSelectedPostGroup } from '../../../redux/Group';
export default function PostGroup() {
    const [open, setOpen] = useState(false);
	const postgroup = useSelector(selectSelectedPostGroup);
	

    const openEdttor = () => {
        setOpen(!open);
    }
	const { uuid } = useParams();
	
	return (
		<div>
			<div className="post-group">
				<h2 style={{ textAlign: 'start', margin: '15px', borderBottom: '3px solid', padding: '15px' }}>
					Bài viết{' '}
				</h2>
				{open && <Editor cancel={openEdttor}  type="post"/>}
				<button className="question-group__button" onClick={openEdttor} cancel={openEdttor}>
					Bài viết mới
				</button>
			</div>
			<div className="post-group__list">
				{postgroup && postgroup.map((item) => (
					<PostItem index={item.post.id} content={item.post.content} user={item.post.author} likes={item.post.reactions} type={item.post.type} refUrls={item.post.refUrls} />
				))}
				</div>
		</div>
	);
}
