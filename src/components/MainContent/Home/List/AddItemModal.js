import React from 'react'
import { Form, Modal, Button, ListGroup, Card } from 'react-bootstrap'
import '../../../../css/MainContent/Home/List/AddModal.css'

export default function AddItemModal(props) {
    return (
        <Modal centered show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Add Item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control size='lg' placeholder='Title' />
                    <div id='add-subtasks-header'>
                        <h4>Sub-Tasks</h4>
                    </div>
                    <div id='add-subtasks-row'>
                        <Form.Control placeholder='Sub-Task' id='add-subtasks-input' />
                        <div className='small-spacer'></div>
                        <Card id='add-subtasks-btn'>
                            <span>Add a Sub-Task +</span>
                        </Card>
                    </div>
                    <ListGroup id='add-subtasks-list'>
                        
                    </ListGroup>
                    <Button variant='primary' type='submit'>Submit</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
