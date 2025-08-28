const MessageAlert = ({ message }) => {
  return (
    <div className="alert">
      <p>{message}</p>
      <button
        type="button"
        className="dismiss"
        onClick={(event) => {
          event.target.parentNode.remove();
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default MessageAlert;
