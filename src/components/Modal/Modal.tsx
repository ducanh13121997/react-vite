import { ReactNode, useState, useEffect } from "react";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onSendAll: () => void;
  onDeleteAll: () => void;
  savedCommentsCount: number;
  onCheckAll: (checked: boolean) => void;
  allChecked: boolean;
  isLoading?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onSendAll,
  onDeleteAll,
  savedCommentsCount,
  onCheckAll,
  allChecked,
  isLoading = false,
}: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Match với thời gian animation
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isClosing ? 'closing' : ''}`}>
      <div className={`modal ${isClosing ? 'closing' : ''}`}>
        <div className="modal-header">
          <div className="modal-title">
            <h2>{title}</h2>
            <button className="close-button" onClick={handleClose} disabled={isLoading}>
              ×
            </button>
          </div>
          <div className="modal-subtitle">
            <div className="saved-comments">
              <span>Saved Comments</span>
              <span className="count">{savedCommentsCount}</span>
            </div>
            <div className="all-users-toggle">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={(e) => onCheckAll(e.target.checked)}
                  disabled={isLoading}
                />
                <span className="slider" />
              </label>
              <span>All Users</span>
            </div>
          </div>
        </div>

        <div className="modal-content">{children}</div>

        <div className="modal-footer">
          <button className="delete-all" onClick={onDeleteAll} disabled={isLoading}>
            Delete all
          </button>
          <div className="right-buttons">
            <button className="cancel" onClick={handleClose} disabled={isLoading}>
              Cancel
            </button>
            <button className="send-all" onClick={onSendAll} disabled={isLoading}>
              Send all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
