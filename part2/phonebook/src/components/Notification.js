const Notification = ({ message, messageType }) => {
  if (message === null || messageType === null) return null;
  const styleClass = messageType === 'error' ? 'error' : 'success';
  return (
    <div className={styleClass}>
      {message}
    </div>
  );
};

export default Notification;