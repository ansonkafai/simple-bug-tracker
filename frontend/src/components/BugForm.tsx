import React, { useState } from 'react'
import { Container, Button, Form, Alert } from 'react-bootstrap'
import axios from 'axios'

// Type to define arguments passing between pages and components.
interface BugFormProps {
    onBugFormSubmitSuccess: () => void
}

export const BugForm = (props: BugFormProps) => {
    const [validated, setValidated] = useState(false)
    const [error, setError] = useState<string>('') // Mainly to show error msg.
    const [isSubmitting, setIsSubmitting] = useState(false) // Mainly to control elements disabled status.
    const [submitSuccess, setSubmitSuccess] = useState(false) // Mainly to show submit success msg.
    const [id, setId] = useState('') // Bug id.
    const [title, setTitle] = useState('') // Bug title.
    const [description, setDescription] = useState('') // Bug description.
    const [assignee, setAssignee] = useState('') // Assignee user id.

    const fieldChgHandlerTitle = (e: any) => {
        // Update title field value.
        setTitle(e.target.value)
    }

    const fieldChgHandlerDescription = (e: any) => {
        // Update description field value.
        setDescription(e.target.value)
    }

    const fieldChgHandlerAssignee = (e: any) => {
        // Update assignee field value.
        setAssignee(e.target.value)
    }

    const resetFormValues = () => {
        // Clear form values.
        setTitle('')
        setDescription('')
        setAssignee('')
        setValidated(false)
    }

    const resetStates = () => {
        // Clear states.
        setError('')
        setIsSubmitting(false)
        setSubmitSuccess(false)
    }

    const onClear = (e: any) => {
        // Clear everything.
        resetStates()
        resetFormValues()
    }

    const onSubmit = (e: any) => {
        resetStates()
        const form = e.currentTarget
        e.preventDefault()
        e.stopPropagation()

        if (form.checkValidity() === true) {
            try {
                // Call API for bug creation. For swagger doc, refer to http://127.0.0.1:5000/swagger-ui
                const jsonValue = {'title': title, 'description': description, 'assignee': assignee}
                const settings = {headers: {Accept: 'application/json', 'Content-Type': 'application/json'}}
                setIsSubmitting(true)
                axios.post("http://127.0.0.1:5000/bug", jsonValue, settings)
                    .then(r => {
                        // Show success message to <Alert> component.
                        setSubmitSuccess(true)
                        // Set the returned bug id to states.
                        setId(r.data.id)
                        // Pass submit status back to parent page.
                        props.onBugFormSubmitSuccess()
                    })
                    .catch(e => {
                        // Show error message to <Alert> component.
                        setError(`${e.response.status} ${e.response.data}`)
                    })
            } catch (e) {
                // Show error message to <Alert> component.
                setError((e as Error).message)
            } finally {
                setIsSubmitting(false)
            }
        }

        setValidated(true)
    }

    // Page rendering.
    return (
        <Container className='card rounded-lg p-3'>
            {/*
            Browsers provide their own validation UI by default on forms.
            So here we disable the default UI by adding the HTML noValidate attribute to the <Form> element.
            */}
            <Form noValidate validated={validated} onSubmit={onSubmit}>
                {/* Form title. */}
                <Form.Label className='label'><h3>Create Bug</h3></Form.Label>

                {/* Bug title. */}
                <Form.Group className='mb-3'>
                    <Form.Label className='label' htmlFor='email'>Title</Form.Label>
                    <Form.Control id='title' name='title'
                        as='input'
                        type='text'
                        required
                        placeholder='Enter title'
                        value={title}
                        onChange={fieldChgHandlerTitle}
                        disabled={isSubmitting} />
                    <Form.Control.Feedback type="invalid">
                        Please provide title.
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Bug description. */}
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='description'>Description</Form.Label>
                    <Form.Control as='input' type='text'
                        required
                        id='description'
                        name='description'
                        placeholder='Enter description'
                        value={description}
                        onChange={fieldChgHandlerDescription}
                        disabled={isSubmitting} />
                    <Form.Control.Feedback type="invalid">
                        Please provide description.
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Bug assignee user id. */}
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='assignee'>Assignee user id</Form.Label>
                    <Form.Control as='input' type='text'
                        id='assignee'
                        name='assignee'
                        placeholder='Enter assignee user id'
                        value={assignee}
                        onChange={fieldChgHandlerAssignee}
                        disabled={isSubmitting} />
                    <Form.Control.Feedback type="invalid">
                        Please provide assignee user id.
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Submit button. */}
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                    Submit
                </Button>

                {/* Reset button. */}
                &nbsp;
                <Button onClick={onClear} disabled={isSubmitting}>
                    Clear
                </Button>

                {/* Alert error message. */}
                {error &&
                    <Alert variant='danger' className="mt-3">{error}</Alert>
                }
                {/* Alert success message. */}
                {submitSuccess &&
                    <Alert variant='success' className="mt-3">Bug [id: {id}] created successfully.</Alert>
                }
            </Form>
        </Container>
    )
}
