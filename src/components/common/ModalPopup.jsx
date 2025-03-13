import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Accessibility

const ModalPopup = ({ isOpen, onClose, title, children, mobileWidth, desktopWidth }) => {
    const [modalWidth, setModalWidth] = useState(
        window.innerWidth <= 768 ? mobileWidth : desktopWidth,
    );

    useEffect(() => {
        const handleResize = () => {
            setModalWidth(window.innerWidth <= 768 ? mobileWidth : desktopWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mobileWidth, desktopWidth]);

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: modalWidth,
            padding: '20px',
            borderRadius: '23px',
        },
        overlay: {
            backgroundColor: '#2C2C2C94',
            zIndex: 1000,
        },
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles} contentLabel={title}>
            <div>{children}</div>
        </Modal>
    );
};

export default ModalPopup;
