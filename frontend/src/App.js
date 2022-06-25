import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './Components/Header';
import EachQuestionPage from './Pages/EachQuestionPage';
import HomePage from './Pages/HomePage'
import Login from './Pages/Login';
import QuestionPage from './Pages/QuestionPage';
import UpdatePage from './Pages/UpdatePage';

function App() {
  return (
    <Router>
      <Header />
      <div className='Main'>
        <Routes>
          <Route path='/' element={<QuestionPage />} />
          <Route path='/Questions' element={<QuestionPage />}/>
          <Route path='/Question'>
            <Route path=':id' element={<EachQuestionPage />}/>
          </Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/update' element={<UpdatePage />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
