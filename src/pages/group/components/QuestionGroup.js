import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "../../home/components/Editor"
import "./QuestionGroup.css"
import Api from '../../../api/Api';
import { url } from '../../../constants/Constant';
import PostItem from "../../home/components/PostItem"
import { useSelector, useDispatch } from "react-redux";
import { selectSelectedPostGroup, selectPostGroup } from "../../../redux/Group";
export default function QuestionGroup() {
    const [open, setOpen] = useState(false);

	const postgroup = useSelector(selectSelectedPostGroup);
	const dispatch = useDispatch();
	const [post, setPost] = useState([]);
	const { uuid } = useParams();
    const openEdttor = () => {
        setOpen(!open);
    }
    const headers = {
		Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
		'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
	};
	
	const callBackApi = () => {
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

    return (
        <div>
            <div className="question-group">
                <h2 style={{ textAlign: 'center', margin: '15px', borderBottom: '3px solid', padding: '15px' }}>Câu hỏi </h2>
                
                {open && <Editor cancel={openEdttor} type ="QUESTION" />}
                <button className="question-group__button" onClick={openEdttor} cancel={openEdttor}>Đặt câu hỏi</button>
                
            </div>
            <div className="post-group__list">
				{postgroup &&
					postgroup.posts.map((item) => (
                        item.post.type === "QUESTION" ? (
                            <PostItem
							id={item.post.id}
							authorId={item.post.authorId}
							authorFirstName={item.post.authorFirstName}
							authorLastName={item.post.authorLastName}
							authorAvatar={item.post.authorAvatar}
							content={item.post.content}
							type={item.post.type}
							refUrls={item.post.refUrls}
							totalReactions={item.post.totalReactions}
							totalComments={item.post.totalComments}
							comments={item.post.comments}
							reaction={item.reaction}
							callBackApi={callBackApi}
						/>): null
						
						
					))}
			</div>
        </div>
    )

}