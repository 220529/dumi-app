import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.less';

interface UseModalReturn {
  open: (message: string) => void;
  close: () => void;
}

const useModal = (): UseModalReturn => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [rootEl, setRootEl] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const idName = 'ns-dumi-modal-root';
    let el = document.getElementById(idName);
    if (!el) {
      el = document.createElement('div');
      el.id = idName;
      document.body.appendChild(el);
    }
    setRootEl(el);
    return () => {
      if (el) {
        document.body.removeChild(el);
      }
    };
  }, []);

  const open = useCallback((newMessage: string) => {
    setMessage(newMessage);
    setVisible(true);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
  }, []);

  const renderModel = () => {
    return (
      <div className="ns-dumi-modal">
        <div className="ns-dumi-modal-content">
          <p>{message}</p>
          <button onClick={close}>Close</button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (rootEl) {
      if (visible) {
        ReactDOM.render(renderModel(), rootEl);
      } else {
        ReactDOM.unmountComponentAtNode(rootEl);
      }
    }
  }, [rootEl, visible]);

  return { open, close };
};

export default useModal;
