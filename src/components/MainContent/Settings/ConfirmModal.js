import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function ConfirmModal(props) {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Are you Sure?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span>{props.msg}</span>
            </Modal.Body>
            <Modal.Footer>
                <Button>Confirm</Button>
                <Button variant='danger'>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
