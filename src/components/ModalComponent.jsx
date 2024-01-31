const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className='overlay'>
            <div className='modal'>
                <button className='closeButton' onClick={onClose}>
                    &times; {/* Stylish close (×) symbol */}
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
