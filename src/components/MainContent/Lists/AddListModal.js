import React from 'react'
import { Modal, Button, Form, ListGroup } from 'react-bootstrap'

export default function AddListModal(props) {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Add a New List
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder='Title' size='lg'></Form.Control>
                </Form>
                <div>
                    <Form.Control placeholder='Task'></Form.Control>
                    <Button variant='outline-secondary'>Add a List Task +</Button>
                </div>
                <ListGroup>

                </ListGroup>
                <Button>Submit</Button>
            </Modal.Body>
        </Modal>
    )
}
