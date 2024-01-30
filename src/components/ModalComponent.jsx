const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "red",
          padding: 20,
          margin: "100px auto",
          width: "50%",
          padding: 20,
          width: "50%",
          maxHeight: "80%", // Maximum height of the modal
          overflowY: "auto", // Scroll vertically if the content is too long
          borderRadius: "8px", // Optional: for rounded corners
          position: "relative", // To position the close button absolutely within the modal
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", // Position the button in the top-right corner of the modal
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          &times; {/* Stylish close (×) symbol */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
