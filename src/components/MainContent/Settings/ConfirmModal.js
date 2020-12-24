import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function ConfirmModal(props) {
    
    let confirm = () => {
        props.confirm(true);
        props.onHide();
    }
    let cancel = () => {
        props.confirm(false);
        props.onHide();
    }
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
                <Button onClick={confirm}>Confirm</Button>
                <Button variant='danger' onClick={cancel}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
