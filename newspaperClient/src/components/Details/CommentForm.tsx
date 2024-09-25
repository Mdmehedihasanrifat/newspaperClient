export const CommentForm: React.FC<{
  newComment: string;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
  editingCommentId: number | null;
  onCancel: () => void;
}> = ({ newComment, setNewComment, onSubmit, isSubmitting, editingCommentId, onCancel }) => (
  <form onSubmit={onSubmit} className="mt-4">
    <textarea
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      rows={3}
      placeholder="Add or edit a comment..."
      className="w-full border border-gray-300 rounded"
      required
    />
    <div className="flex gap-2 mt-2">
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : editingCommentId ? "Update Comment" : "Add Comment"}
      </button>
      {editingCommentId && (
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      )}
    </div>
  </form>
);