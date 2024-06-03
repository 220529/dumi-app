import React, { useCallback, useEffect, useState } from 'react';
import { Root, createRoot } from 'react-dom/client';
import './index.less';

interface UseModalReturn {
  open: (message: string) => void;
  close: () => void;
}

const useModal = (): UseModalReturn => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [root, setRoot] = useState<Root | null>(null);

  useEffect(() => {
    const idName = 'ns-dumi-modal-root';
    let el = document.getElementById(idName);
    if (!el) {
      el = document.createElement('div');
      el.id = idName;
      document.body.appendChild(el);
    }
    setRoot(createRoot(el));
    return () => {
      if (root) {
        root.unmount();
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

  const renderModal = () => {
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
    if (root) {
      root.render(visible ? renderModal() : null);
    }
  }, [root, visible]);

  return { open, close };
};

export default useModal;
