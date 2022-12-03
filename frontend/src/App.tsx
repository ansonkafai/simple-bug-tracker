import React from 'react';
import './App.css';
import { Container } from 'react-bootstrap'

import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import NavigationBar from './components/NavigationBar'
import UserPage from './pages/UserPage'
import BugPage from './pages/BugPage'

export const App = () => {
  return (
    <Router basename={'/'}>
        {/* Page top navigation bar. */}
        <NavigationBar/>

        {/* Space for making body showing below navbar. */}
        <Container className='mt-4 pt-4'>&nbsp;</Container>

        {/* Main body. */}
        <Container>
            <Container>
                <Routes>
                    <Route path='/' element={<BugPage/>} />
                    <Route path='/user' element={<UserPage/>} />
                    <Route path='/bug' element={<BugPage/>} />
                </Routes>
            </Container>
        </Container>
    </Router>
  )
}
