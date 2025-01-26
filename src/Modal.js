import React from "react";
import ReactModal from "react-modal";

const Modal = ({ isOpen, onRequestClose, children }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Modal"
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                content: {
                    top: "50%",
                    left: "50%",
                    right: "auto",
                    bottom: "auto",
                    marginRight: "-50%",
                    transform: "translate(-50%, -50%)",
                    width: "400px",
                    maxWidth: "90%",
                    borderRadius: "8px",
                    padding: "20px",
                },
            }}
        >
            {children}
        </ReactModal>
    );
};

export default Modal;