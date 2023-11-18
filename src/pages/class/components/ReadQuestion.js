import React, { useState } from 'react';
import PizZip from 'pizzip';
import { DOMParser } from '@xmldom/xmldom';

function str2xml(str) {
	if (str.charCodeAt(0) === 65279) {
		// BOM sequence
		str = str.substr(1);
	}
	return new DOMParser().parseFromString(str, 'text/xml');
}

function getParagraphs(content) {
	const zip = new PizZip(content);
	const xml = str2xml(zip.files['word/document.xml'].asText());
	const paragraphsXml = xml.getElementsByTagName('w:p');
	const paragraphs = [];

	for (let i = 0, len = paragraphsXml.length; i < len; i++) {
		let fullText = '';
		const textsXml = paragraphsXml[i].getElementsByTagName('w:t');

		for (let j = 0, len2 = textsXml.length; j < len2; j++) {
			const textXml = textsXml[j];
			if (textXml.childNodes) {
				fullText += textXml.childNodes[0].nodeValue;
			}
		}

		if (fullText) {
			paragraphs.push(fullText);
		}
	}
	console.log(paragraphs);
	let questions = [];
	let currentQuestion = {};
    const data=paragraphs

	for (let i = 0; i < data.length; i++) {
		let item = data[i];

		if (item.includes('[Câu hỏi]')) {
			//
            currentQuestion={
                content: item.replace('[Câu hỏi] ', ''),
                level:'Easy',
                typeCode:'one_choice',
                answers:[],

            }
            // Xử lý câu hỏi
            questions=[
                ...questions,
                currentQuestion
            ]                
            } else if (item.includes('[Đáp án đúng]')) {
			// Xử lý đáp án đúng
			const correctAnswers = item.replace('[Đáp án đúng] ', '').split(',');
			correctAnswers.map((correctAnswers,index) => {
               if(correctAnswers==='a'){
                   let lenght= questions.length
                     questions[lenght-1].answers[0].isCorrect=true
                }
                if(correctAnswers==='b'){
                    let lenght= questions.length
                     questions[lenght-1].answers[1].isCorrect=true
                }
                if(correctAnswers==='c'){
                    let lenght= questions.length
                     questions[lenght-1].answers[2].isCorrect=true
                }
                if(correctAnswers==='d'){
                    let lenght= questions.length
                     questions[lenght-1].answers[3].isCorrect=true
                }
                if(correctAnswers==='e'){
                    let lenght= questions.length
                     questions[lenght-1].answers[4].isCorrect=true
                }
                if(correctAnswers==='f'){
                    let lenght= questions.length
                     questions[lenght-1].answers[5].isCorrect=true
                }
                if(correctAnswers==='g'){
                    let lenght= questions.length
                     questions[lenght-1].answers[6].isCorrect=true
                }
                if(correctAnswers==='h'){
                    let lenght= questions.length
                     questions[lenght-1].answers[7].isCorrect=true
                }
                if(correctAnswers==='i'){
                    let lenght= questions.length
                     questions[lenght-1].answers[8].isCorrect=true
                }
        }
            );
		} else {
			// Xử lý các đáp án
            let lenght= questions.length
            if(lenght>0){
                if (!questions[lenght - 1].answers) {
                    questions[lenght - 1].answers = [];
                }
                
                // Thêm đối tượng đáp án mới vào mảng
                questions[lenght - 1].answers.push({
                    content: item.replace('[] ', ''),
                    isCorrect: false
                });
            }
            else{
                console.log('Không có câu hỏi')
            }
                
            
			
		}
	}
    if(questions.length>0){
        console.log(questions)
    }

	

	return paragraphs;
}

const ReadQuestion = () => {
	const [paragraphs, setParagraphs] = useState([]);

	const onFileUpload = (event) => {
		const reader = new FileReader();
		const file = event.target.files[0];
		reader.onload = (e) => {
			const content = e.target.result;
			
			const paragraphs = getParagraphs(content);

			setParagraphs(paragraphs);
		};

		reader.onerror = (err) => console.error(err);
		reader.readAsArrayBuffer(file);
	};

	return <input type="file" onChange={onFileUpload} name="docx-reader" />;
};

export default ReadQuestion;
