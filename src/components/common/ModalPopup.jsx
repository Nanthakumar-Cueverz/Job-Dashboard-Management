import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

// Custom Styles for Modal

Modal.setAppElement('#root'); // Accessibility

const ModalPopup = ({ isOpen, onClose, title, children, width }) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: width,
            padding: '20px',
            borderRadius: '23px',
        },
        overlay: {
            backgroundColor: '#2C2C2C94', // Black overlay with 70% opacity
            zIndex: 1000, // Ensure it appears on top
        },
    };
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles} contentLabel={title}>
            <div>{children}</div>
        </Modal>
    );
};

export default ModalPopup;
