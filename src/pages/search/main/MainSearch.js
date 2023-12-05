import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { selectSelectedOption, selectOption } from '../../../redux/Group';
import { selectselectclass, selectselectgroup, selectselectpost ,selectselectSearchpeople} from '../../../redux/Search';
import PostItem from '../../home/components/PostItem';
import './MainSearch.css';
import LableGroup from '../../group/components/LableGroup';
import { Avatar } from 'antd';
export default function MainSearch() {
	const selectedOption = useSelector(selectSelectedOption);
	const dispatch = useDispatch();
	const post = useSelector(selectselectpost);
	const group = useSelector(selectselectgroup);
	const classs = useSelector(selectselectclass);
    const people = useSelector(selectselectSearchpeople);
    
	return (
		<div className='search-main'>
			{selectedOption === 'all' && (
				<div >
					{post && post.length > 0 && (
						<div>
							<h1>Bài viết</h1>
							{post.map((item, index) => (
								  <PostItem index={item.id} content={item.content} user={item.author} likes={item.reactions} type={item.type} refUrls={item.refUrls} />
							))}
						</div>
					)}
					{group && group.length > 0 && (
						<div>
							<h1>Nhóm</h1>
							{group.map((item, index) => (
								  <LableGroup name={item.name} image={item.avatarUrl} id={item.id} type={item.subject} />
							))}
						</div>
					)}
					{classs && classs.length > 0 && (
						<div>
							<h1>Lớp</h1>
							{classs.map((item, index) => (
								  <LableGroup name={item.name} image={item.avatarUrl} id={item.id} type={item.subject} />
							))}
						</div>
					)}
				</div>
			)}
			{selectedOption === 'post' && (
                <div >
                    {post && post.length > 0 && (
                        <div>
                            <h1>Bài viết</h1>
                            {post.map((item, index) => (
                                <PostItem index={item.id} content={item.content} user={item.author} likes={item.reactions} type={item.type} refUrls={item.refUrls} />
                            ))}
                        </div>
                    )}
                </div>
            )}
			{selectedOption === 'people' && (
                <div >
                    {people && people.length > 0 ? (
                        <div>
                            <h1>Mọi người</h1>
                            {people.map((item, index) => (
                               <div className='user-search'>
                                    <Avatar size={64} src={item.avatarUrl} />
                                    <p>{item.firstName + ' ' + item.lastName}</p>
                                    <button>Thêm bạn</button>
                               </div>
                            ))}
                        </div>
                    ): <div>    
                        <h1>Không có kết quả</h1>
                        </div>}
                </div>
            )}
            
        
			{selectedOption === 'class' && (
                <div >
                    {classs && classs.length > 0 ? (
                        <div>
                            <h1>Lớp</h1>
                            {classs.map((item, index) => (
                                 <LableGroup name={item.name} image={item.avatarUrl} id={item.id} type={item.subject}/>
                            ))}
                        </div>
                    ): <div>
                        <h1>Không có kết quả</h1>
                        </div>}
                    
                </div>
            
            )}
			{selectedOption === 'group' && (
                <div >
                    {group && group.length > 0 ? (
                        <div>
                            <h1>Nhóm</h1>
                            {group.map((item, index) => (
                                 <LableGroup name={item.name} image={item.avatarUrl} id={item.id} type={item.subject} />
                            ))}
                        </div>
                    ): <div>
                        <h1>Không có kết quả</h1>
                        </div>}
                </div>
            )}
		</div>
	);
}
