import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { UserForm } from '../components/UserForm'
import { UsersList } from '../components/UsersList'

const UserPage = () => {
    const [triggerUsersListReload, setTriggerUsersListReload] = useState<number>(0)

    // Callback function to capture the user form submit status.
    const onUserFormSubmitSuccess = () => {
        // Reload users list in child component.
        // Call child function from parent. See - https://timmousk.com/blog/react-call-function-in-child-component/
        setTriggerUsersListReload(triggerUsersListReload + 1)
    }

    // Page rendering.
    return (
        <Container>
            <Row>
                <Col className='m-1'>
                    {/*
                    User form component.
                    To capture the user form submit status, pass the callback function as a prop to UserForm.
                    */}
                    <UserForm onUserFormSubmitSuccess={onUserFormSubmitSuccess}/>
                </Col>
                <Col className='m-1'>
                    {/* Users listing component. */}
                    <UsersList triggerUsersListReload={triggerUsersListReload}/>
                </Col>
            </Row>
        </Container>
    )
}

export default UserPage
