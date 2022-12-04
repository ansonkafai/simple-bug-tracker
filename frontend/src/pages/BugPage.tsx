import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { BugForm } from '../components/BugForm'
import { BugsList } from '../components/BugsList'

const BugPage = () => {
    const [triggerBugsListReload, setTriggerBugsListReload] = useState<number>(0)

    // Callback function to capture the bug form submit status.
    const onBugFormSubmitSuccess = () => {
        // Reload bugs list in child component.
        // Call child function from parent. See - https://timmousk.com/blog/react-call-function-in-child-component/
        setTriggerBugsListReload(triggerBugsListReload + 1)
    }

    // Page rendering.
    return (
        <Container>
            <Row>
                <Col className='m-1'>
                    {/*
                    Bug form component.
                    To capture the bug form submit status, pass the callback function as a prop to BugForm.
                    */}
                    <BugForm onBugFormSubmitSuccess={onBugFormSubmitSuccess}/>
                </Col>
                <Col className='m-1'>
                    {/* Bugs listing component. */}
                    <BugsList triggerBugsListReload={triggerBugsListReload}/>
                </Col>
            </Row>
        </Container>
    )
}

export default BugPage
