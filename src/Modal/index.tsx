import React, { useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
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
      const root = createRoot(rootEl); // createRoot(container!) if you use TypeScript
      if (visible) {
        root.render(renderModel());
      } else {
        root.unmount();
      }
    }
  }, [rootEl, visible]);

  return { open, close };
};

export default useModal;
