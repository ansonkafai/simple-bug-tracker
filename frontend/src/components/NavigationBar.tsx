/*
 * Tutorials:
 * https://medium.com/swlh/responsive-navbar-using-react-bootstrap-5e0e0bd33bd6
 * https://dev.to/sampurna/creating-responsive-navbar-using-react-bootstrap-5ajg
 *
 * IMPORTANT:
 * Require to install bootstrap css for padding/margin control. Command:
 * $ npm install bootstrap
 */

import React from 'react'

import { Container, Nav, Navbar, NavLink } from 'react-bootstrap'

const NavigationBar = () => {
    return (
        <Container>
            <Navbar collapseOnSelect fixed='top' bg='dark' variant='dark' expand='lg'>
                {/* Navbar title. */}
                <Navbar.Brand href='/'>&nbsp;Simple Bug Tracker</Navbar.Brand>

                <Navbar.Toggle aria-controls='responsive-navbar-nav' data-bs-target='responsive-navbar-nav'/>
                <Navbar.Collapse id='responsive-navbar-nav'>
                    {/* Link to bug page. */}
                    <Nav>
                        <NavLink href='/bug'>Bug</NavLink>
                    </Nav>

                    {/* Link to user page. */}
                    <Nav className='me-auto'>
                        <NavLink href='/user'>User</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    )
}

export default NavigationBar
