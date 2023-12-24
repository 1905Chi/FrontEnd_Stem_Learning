import React, { useState } from "react";
import Editor from "../../home/components/Editor"
import "./QuestionGroup.css"
import PostItem from "../../home/components/PostItem"
import { useSelector } from "react-redux";
import { selectSelectedPostGroup } from "../../../redux/Group";
export default function QuestionGroup() {
    const [open, setOpen] = useState(false);

	const postgroup = useSelector(selectSelectedPostGroup);
	
	const [post, setPost] = useState([]);

    const openEdttor = () => {
        setOpen(!open);
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
						/>): null
						
						
					))}
			</div>
        </div>
    )

}