import {Card,Button, Container, Form, Row,Col, ListGroup, Alert} from 'react-bootstrap'
import { useState,useEffect } from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';


const baseURL = "http://127.0.0.1:5000"
function EachQuestionPage(){
	const [question,setQuestion] = useState({})
	const [answer,setanswer] = useState("")
	const [status,setStatus] = useState(0);
	const params = useParams()
	const getdata = async() => {
		const data = await axios.get(`${baseURL}/get/${params.id}`);
		console.log(data)
		setQuestion(data.data);
	}
	const handleChange = e => {
		setanswer(e.target.value)
	}
	const handlesubmit = async () => {
		const data = await axios.post(`${baseURL}/validate/${params.id}`,{answer})
		setStatus(0);
		if(data.data === "success")
		{
			setStatus(1);
		}
		else if(data.data === "failure")
		{
			setStatus(2);
		}
		console.log(status);
	}
	useEffect(() => {
		getdata();
	},[setStatus])
	return (
		<div>
			<Container>
				<h1>{question.question}</h1>
			</Container>
			<Container>
			<Form>
			<Form.Group className="mb-3">
				<Form.Control type="text" placeholder="Answer" onChange={handleChange} value={answer} required/>
			</Form.Group>
			</Form>
			<Button onClick={handlesubmit}> Submit </Button>
			</Container>
			<Container>
			{
				status===0?<h1></h1>:status===2?
				<Alert variant='danger'> Oops!!! Try Again!!! </Alert>:
				<Alert variant='success'> Well Done! </Alert>
			}
			</Container>
			{/* <Button variant="success" disabled={status===2 || status===0} onClick={handleNext}> Next </Button> */}
		</div>
	)
}
export default EachQuestionPage;