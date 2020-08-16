import React, { useState, useEffect } from "react";
import "./toast.styles.scss";

const Toast = ({
  toastList,
  position = "bottom-left",
  autoDelete,
  dismissTime = 2000
}) => {
  const [list, setList] = useState(toastList);

  useEffect(() => {
    setList(toastList);
  }, [toastList, list]);

  const deleteToast = (id) => {
    const index = list.findIndex((e) => e.id === id);
    list.splice(index, 1);
    setList([...list]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && list.length) {
        deleteToast(list[0].id);
      }
    }, dismissTime);

    return () => {
      clearInterval(interval);
    };
  }, [autoDelete, dismissTime, list]);

  return (
    <div className={`notification-container ${position}`}>
      {list.map((toast, i) => (
        <div
          key={i}
          className={`notification toast ${position}`}
          style={{ backgroundColor: toast.backgroundColor }}
        >
          <button onClick={() => deleteToast(toast.id)}>X</button>
          <div className="notification-body">
            <div className="notification-image">{toast.icon}</div>
            <div>
              <p className="notification-title">{toast.title}</p>
              <p className="notification-message">{toast.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toast;
