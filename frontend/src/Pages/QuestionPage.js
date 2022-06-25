import {Card, Container, Form, Row,Col, ListGroup} from 'react-bootstrap'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const baseURL = "http://127.0.0.1:5000"
function QuestionPage(){
	const [questions,setQuestions] = useState([])
	const getdata = async() => {
		const data = await axios.get(`${baseURL}/add`);
		setQuestions(data.data.questions);
	}
	useEffect(() => {
		getdata();
	},[])
	return (
		{questions}?
		<ListGroup>
			{questions.map(e => {
				return (
				<Link to={`/Question/${e.id}`} className='btn'>
				{e.question}
				</Link>)
			})}
		</ListGroup>:<h1>No Questions yet!</h1>
	)
}
export default QuestionPage;