import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

export const Popup = ({ open, onClose, children, title, onConfirm, confirmedDisabled }) => {

    return (
        <Modal show={open} onHide={onClose}>
            {title && <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>}

            <Modal.Body>
                {children}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    No
                </Button>
                <Button disabled={confirmedDisabled} variant="" className="btn-mkh" onClick={onConfirm}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}