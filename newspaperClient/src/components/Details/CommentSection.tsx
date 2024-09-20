import React, { useState, useEffect, useCallback, useContext } from "react";
import Allcomment from "../Comment/Allcomment";
import { Comment } from "../../utils/interface";
import { handleFetch } from "../../utils/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CommentForm } from "./CommentForm";
import { ConfirmDeleteModal } from "../Modal/ConfirmDeleteModal";
import { LoginModal } from "../Modal/LoginModal";
import { useNavigate } from "react-router-dom";
import userContext from "../../context/UserContext";

interface CommentsSectionProps {
  newsId: number;
  comments: Comment[];
}

const API_BASE_URL = "http://localhost:3000/api";

const CommentsSection: React.FC<CommentsSectionProps> = ({
  comments,
  newsId,
}) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allComments, setAllComments] = useState<Comment[]>(comments);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user } = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    setAllComments(comments);
  }, [comments]);

  const handleCommentSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!user) {
        setIsLoginModalOpen(true);
        return;
      }
      setIsSubmitting(true);

      try {
        const endpoint =
          editingCommentId !== null
            ? `${API_BASE_URL}/news/${newsId}/comments/${editingCommentId}`
            : `${API_BASE_URL}/news/${newsId}/comments`;

        const method = editingCommentId !== null ? "PUT" : "POST";
        const response = await handleFetch(endpoint, method, {
          comment: newComment,
        });

        if (response.ok) {
          const data = await response.json();
          if (editingCommentId !== null) {
            setAllComments((prevComments) =>
              prevComments.map((comment) =>
                comment.id === editingCommentId
                  ? { ...comment, comment: data.comment.comment }
                  : comment
              )
            );
            toast.success("Comment updated successfully!");
          } else {
            setAllComments((prevComments) => [...prevComments, data.comment]);
            toast.success("Comment added successfully!");
          }
          setNewComment("");
          setEditingCommentId(null);
        } else {
          toast.error(
            editingCommentId !== null
              ? "Failed to update comment"
              : "Failed to add comment"
          );
        }
      } catch (error) {
        console.error("Error submitting comment:", error);
        toast.error(`Error submitting comment: ${error}`);
      } finally {
        setIsSubmitting(false);
      }
    },
    [newComment, editingCommentId, newsId]
  );

  const handleDeleteComment = useCallback(
    async (commentId: number) => {
      try {
        const response = await handleFetch(
          `${API_BASE_URL}/news/${newsId}/comments/${commentId}`,
          "DELETE"
        );

        if (response.ok) {
          setAllComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== commentId)
          );
          toast.success("Comment deleted successfully!");
        } else {
          toast.error("Failed to delete comment");
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
        toast.error("Error deleting comment");
      }
    },
    [newsId]
  );

  const handleEditClick = (comment: Comment) => {
    if (user?.id !== comment.userId) {
      toast.error("You can only edit your own comments!");
      return;
    }
    setEditingCommentId(comment.id);
    setNewComment(comment.comment);
  };

  const handleDeleteClick = (comment: Comment) => {
    if (user?.id !== comment.userId) {
      toast.error("You can only delete your own comments!");
      return;
    }
    setCommentToDelete(comment.id);
    setIsModalOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setNewComment("");
  };

  const confirmDeleteComment = useCallback(async () => {
    if (commentToDelete !== null) {
      await handleDeleteComment(commentToDelete);
      setCommentToDelete(null);
      setIsModalOpen(false);
    }
  }, [commentToDelete, handleDeleteComment]);

  const onLogin = () => {
    navigate("/login");
  };

  return (
    <div className="comments-section">
      <ToastContainer />
      <h3 className="text-xl font-semibold">Comments</h3>

      <CommentForm
        newComment={newComment}
        setNewComment={setNewComment}
        onSubmit={handleCommentSubmit}
        isSubmitting={isSubmitting}
        editingCommentId={editingCommentId}
        onCancel={handleCancelEdit}
      />

      {allComments.length === 0 ? (
        <p className="mt-4">No comments yet.</p>
      ) : (
        <Allcomment
          allComment={allComments}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      )}

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDeleteComment}
      />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={onLogin}
      />
    </div>
  );
};

export default CommentsSection;


