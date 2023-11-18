import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import BannerGroup from '../components/BannerGroup';
import Post from '../../home/components/Post';
import PostItem from '../../home/components/PostItem';
import { useSelector } from 'react-redux';
import { selectSelectedOption } from '../../../redux/Group';
import { selectselectGroup } from './../../../redux/GetItemGroup';
import PostGroup from '../components/PostGroup';
import QuestionGroup from '../components/QuestionGroup';
import MemberGroup from '../components/MemberGroup';
import EventGroup from '../components/EventGroup';

export default function MainGroup() {
  const selectedOption = useSelector(selectSelectedOption);
  const inforGroup = useSelector(selectselectGroup);

  console.log(inforGroup);

  const { uuid } = useParams();
  const anh =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwoon_hT7QiYmBsL0F9ydjogk-wzvXtwp0Ef_1M6E-Kw&s';
  const post = [
    {
      user: {
        name: 'John Doe',
        avatar: anh,
      },
      content: 'Đây là bài viết mẫu về ReactJS.',
      image: anh,
      likes: 42,
    },
    {
      user: {
        name: 'John Doe',
        avatar: anh,
      },
      content: 'Đây là bài viết mẫu về ReactJS.',
      image: anh,
      likes: 42,
    },
    {
      user: {
        name: 'John Doe',
        avatar: anh,
      },
      content: 'Đây là bài viết mẫu về ReactJS.',
      image: anh,
      likes: 42,
    },
  ];
  const [isAdmin1, setisAdmin1] = useState(false);
  const [isMember1, setisMember1] = useState(false);
  const [isprivate1, setisprivate1] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apifake1 = localStorage.getItem('apifake');
    if (apifake1) {
      const apifakeparse = JSON.parse(apifake1);
      setisAdmin1(apifakeparse.isAdmin);
      setisMember1(apifakeparse.isMember);
      setisprivate1(apifakeparse.isPrivate);
    }
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? <Loading /> : null}
      <div>
        <BannerGroup />

        {(selectedOption === 'introduce' && inforGroup!== null) ? (
          <div>
            <div style={{ margin: '25px', borderRadius: '10px', padding: '5px', background: 'aliceblue' }}>
              <h3 style={{ borderBottom: '0.5px solid black' }}>Giới thiệu về nhóm này</h3>
              <h4>Đây là nhóm: {inforGroup.config.accessibility ==='PUBLIC'? ('Công Khai') : 'Riêng tư'}</h4>
              <h4>Thành viên: 100</h4>
              <h4>Ngày tạo: {inforGroup.createdAt}</h4>
            </div>
            <div style={{ margin: '25px', borderRadius: '10px', padding: '5px', background: 'aliceblue' }}>
              <h3 style={{ borderBottom: '0.5px solid black' }}>Quy tắc của quản trị viên:</h3>
              <p>{inforGroup.config.description}</p>
            </div>
          </div>
        ) : null}
        {selectedOption === 'post' ? <PostGroup /> : null}
        {selectedOption === 'member' ? <MemberGroup /> : null}
        {selectedOption === 'event' ? <EventGroup /> : null}
        {selectedOption === 'question' ? <QuestionGroup /> : null}

        {isMember1 ? <Post /> : null}

        {isMember1 || !isprivate1
          ? post.map((post, index) => (
              <PostItem
                key={index}
                user={post.user}
                content={post.content}
                image={post.image}
                likes={post.likes}
              />
            ))
          : null}
      </div>
    </>
  );
}
