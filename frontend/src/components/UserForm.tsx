import React, { useState } from 'react'
import { Container, Button, Form, Alert } from 'react-bootstrap'
import axios from 'axios'

// Type to define arguments passing between pages and components.
interface UserFormProps {
    onUserFormSubmitSuccess: () => void
}

export const UserForm = (props: UserFormProps) => {
    const [validated, setValidated] = useState(false)
    const [error, setError] = useState<string>('') // Mainly to show error msg.
    const [isSubmitting, setIsSubmitting] = useState(false) // Mainly to control elements disabled status.
    const [submitSuccess, setSubmitSuccess] = useState(false) // Mainly to show user create success msg.
    const [email, setEmail] = useState('') // User email.
    const [first_name, setFirst_name] = useState('') // User first name.
    const [last_name, setLast_name] = useState('') // User last name.
    const [id, setId] = useState('') // User id.

    const fieldChgHandlerEmail = (e: any) => {
        // Update email field value.
        setEmail(e.target.value)
    }

    const fieldChgHandlerFirst_name = (e: any) => {
        // Update first_name field value.
        setFirst_name(e.target.value)
    }

    const fieldChgHandlerLast_name = (e: any) => {
        // Update last_name field value.
        setLast_name(e.target.value)
    }

    const resetFormValues = () => {
        // Clear form values.
        setEmail('')
        setFirst_name('')
        setLast_name('')
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
                // Call API for user creation. For swagger doc, refer to http://127.0.0.1:5000/swagger-ui
                const jsonValue = {'email': email, 'first_name': first_name, 'last_name': last_name}
                const settings = {headers: {Accept: 'application/json', 'Content-Type': 'application/json'}}
                setIsSubmitting(true)
                axios.post("http://127.0.0.1:5000/user", jsonValue, settings)
                    .then(r => {
                        // Show success message to <Alert> component.
                        setSubmitSuccess(true)
                        // Set the returned user id to states.
                        setId(r.data.id)
                        // Pass submit status back to parent page.
                        props.onUserFormSubmitSuccess()
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
                <Form.Label className='label'><h3>Create User</h3></Form.Label>

                {/* Email. */}
                <Form.Group className='mb-3'>
                    <Form.Label className='label' htmlFor='email'>Email address</Form.Label>
                    <Form.Control id='email' name='email'
                        as='input'
                        type='email'
                        required
                        placeholder='Enter email'
                        value={email}
                        onChange={fieldChgHandlerEmail}
                        disabled={isSubmitting} />
                    <Form.Control.Feedback type="invalid">
                        Please provide valid email address.
                    </Form.Control.Feedback>
                </Form.Group>

                {/* First name. */}
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='first_name'>First name</Form.Label>
                    <Form.Control as='input' type='text'
                        required
                        id='first_name'
                        name='first_name'
                        placeholder='Enter first name'
                        value={first_name}
                        onChange={fieldChgHandlerFirst_name}
                        disabled={isSubmitting} />
                    <Form.Control.Feedback type="invalid">
                        Please provide first name.
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Last name. */}
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor='last_name'>Last name</Form.Label>
                    <Form.Control as='input' type='text'
                        required
                        id='last_name'
                        name='last_name'
                        placeholder='Enter last name'
                        value={last_name}
                        onChange={fieldChgHandlerLast_name}
                        disabled={isSubmitting} />
                    <Form.Control.Feedback type="invalid">
                        Please provide last name.
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
                    <Alert variant='success' className="mt-3">User [id: {id}] created successfully.</Alert>
                }
            </Form>
        </Container>
    )
}
