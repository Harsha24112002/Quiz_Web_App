import React from "react";
import { useState,useEffect } from "react";
import { Button, Container, Form, InputGroup, ListGroup } from "react-bootstrap";
import axios from "axios"

const baseURL = "http://127.0.0.1:5000"
function UpdatePage()
{
	const [question,setquestion] = useState("")
	const [answer, setanswer] = useState("")
	const [questions,setQuestions] = useState([])
	const getdata = async() => {
		const data = await axios.get(`${baseURL}/add`);
		setQuestions(data.data.questions);
	}
	useEffect(() => {
		getdata();
	},[])
		
	const handlequestionchange = e => {
		setquestion(e.target.value)
	}

	const handleanswerchange = e => {
		setanswer(e.target.value)
	}
	const handleadd = async() => {
		const data = await axios.post(`${baseURL}/add`,{question,answer})
		const q = [...questions,data.data]
		setQuestions(q);
		setquestion("")
		setanswer("")
	}

	const handledelete = async(e) => {
		const data = await axios.delete(`${baseURL}/delete/${e}`);
		setQuestions(questions.filter((q)=>(q.id!=e)))
	}
	return (
		<div>
		<Container>
			<Form>
				<Form.Group className="mb-3" controlId="Question">
				<Form.Label>Question</Form.Label>
				<Form.Control type="text" placeholder="Question" onChange={handlequestionchange} value={question} required/>
				</Form.Group> 

				<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Answer</Form.Label>
				<Form.Control type="text" placeholder="Answer" onChange={handleanswerchange} value={answer} required/>
				</Form.Group>
			</Form>
			<Button onClick={handleadd} variant="success">Add</Button>  
		</Container>
		<Container>
			<ListGroup>
				{questions.map(e => {
					return (<ListGroup.Item> {e.id}. {e.question} <Button onClick={() => (handledelete(e.id))} variant="danger" className="float-end">Delete</Button> </ListGroup.Item>)
				})}
			</ListGroup>
		</Container>	

		</div>
	)
}
export default UpdatePage;