// components/Modal.tsx
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    crypto: any;
  }
  
  const Modal: React.FC<ModalProps> = ({ isOpen, onClose, crypto }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>{crypto.symbol} Details</h2>
          <p>Price: {crypto.price}</p>
          <p>Timestamp: {new Date(crypto.timestamp).toLocaleString()}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  
  export default Modal;
  