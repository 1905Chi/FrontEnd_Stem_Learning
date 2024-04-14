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
import DocumentGroup from '../components/DocumentGroup';
import Exam from '../../class/exam/Exam';
import Rank from '../../class/components/Rank';
import { selectselectMemberGroup } from '../../../redux/MemberGroup';
import ManagerMemberGroup from '../components/ManagerMemberGroup';
import Servey from '../components/Survey';
export default function MainGroup() {
  const selectedOption = useSelector(selectSelectedOption);
  const inforGroup = useSelector(selectselectGroup);
  const { uuid } = useParams();
  const memberGroup = useSelector(selectselectMemberGroup);
  return (
    <>
    
      <div>
        <BannerGroup />

       
        {selectedOption === 'post' ? <PostGroup /> : null}
        {selectedOption === 'member' ? <MemberGroup /> : null}
        {selectedOption === 'event' ? <EventGroup /> : null}
        {selectedOption === 'question' ? <Servey /> : null}
        {selectedOption === 'document' ? <DocumentGroup /> : null}
        {selectedOption === 'exam' ? <Exam /> : null} 
        {selectedOption === 'manager-member' ? <ManagerMemberGroup /> : null}
        {selectedOption === 'rank' ? <Rank /> : null}

       

       
      </div>
    </>
  );
}
