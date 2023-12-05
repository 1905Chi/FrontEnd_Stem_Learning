import React from 'react'
import './LeftSubmit.css'
import { selectselectexam } from '../../../redux/Exam'
import { useSelector } from 'react-redux'
export default function LeftSubmit() {
    const exam = useSelector(selectselectexam)

    return(
        <div>
            {exam && exam[0].name}
        </div>
    )
}
