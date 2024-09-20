export const ConfirmDeleteModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h3 className="text-lg font-semibold">Confirm Deletion</h3>
        <p>Are you sure you want to delete this comment?</p>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 mr-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
