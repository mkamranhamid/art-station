import React, { useEffect } from 'react';

export const Popup = ({ open, title, body, footer }) => {

    return (
        <Modal.Dialog>
            {title && <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>}

            <Modal.Body>
                {body}
            </Modal.Body>

            {footer && <Modal.Footer>
                {footer}
            </Modal.Footer>}
        </Modal.Dialog>
    )
}