import React,{useEffect,useState} from 'react';
import './LeftEditExam.css';
import Api from '../../../api/Api';
import { useParams } from 'react-router-dom';
import { url } from '../../../constants/Constant';
import { CiEdit } from "react-icons/ci";
import EditInforExam from '../exam/ExamItem/EditInforExam';
export default function LeftEditExam() {
    const { id } = useParams();
    const [exam, setExam] = useState();
    const [isEdit, setIsEdit] = useState(false);
   
    useEffect(() => {
        const headers = {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
            'Content-Type': 'application/json', // Đặt tiêu đề 'Content-Type' nếu bạn gửi dữ liệu dưới dạng JSON.
        };
        Api.get(url + 'api/v1/exams/' + id, { headers: headers })
        .then((response) => {
            if (response.data.statusCode === 200) {
                setExam(response.data.result.exam);   
            }   
        })
        .catch((error) => {
            console.log(error);
        });
        
    }, [])
    const cancel = () => {
        setIsEdit(false);
    }
	return(<div>
        {exam && (
            <div className='infor-exam'>
                <h1>Bài kiểm tra: {exam.name}</h1>
                <p>Mô tả: {exam.description}</p>
                <p>Thời gian làm bài: {exam.duration}</p>
                <p>Bắt đầu: {exam.staredAt}</p>
                <p>Kết thúc: {exam.endedAt}</p>
                <p>Số câu hỏi: {exam.numberOfQuestion}</p>
                <p>Mức độ: {exam.level}</p>
                <button className='edit-infor-exam-button' onClick={()=>{setIsEdit(true)}}><CiEdit/></button>
            </div>)}
            {   isEdit ? (<EditInforExam cancel={cancel} name={exam.name} description={exam.description}
                duration={exam.duration} staredAt={exam.staredAt} endedAt={exam.endedAt} numberOfQuestion={exam.numberOfQuestion} level={exam.level} id={exam.id}
            >

            </EditInforExam>) : null

            }
    </div>
    ) 
}
