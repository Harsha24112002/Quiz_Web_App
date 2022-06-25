import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import { Link } from 'react-router-dom';
import {Navbar,Container,Nav,Button} from 'react-bootstrap'
function Header(){
	 return (
	 	<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="/">Quiz</Navbar.Brand>
					<Nav className="me-auto">
					<Nav.Link href="/">Home</Nav.Link>
					<Nav.Link href='/login'>Login</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	 )
};
export default Header;