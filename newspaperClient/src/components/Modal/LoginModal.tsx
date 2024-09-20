export const LoginModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onLogin: () => void;
  }> = ({ isOpen, onClose, onLogin }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-md">
          <h3 className="text-lg font-semibold">Login Required</h3>
          <p>You need to log in to add a comment.</p>
          <div className="flex justify-end mt-4">
            <button onClick={onClose} className="px-4 py-2 mr-2 bg-gray-500 text-white rounded">
              Cancel
            </button>
            <button onClick={onLogin} className="px-4 py-2 bg-blue-500 text-white rounded">
              Login
            </button>
          </div>
        </div>
      </div>
    );
  };
  