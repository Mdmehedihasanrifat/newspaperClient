import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import CommentButton from '../Buttons/CommentButton'; // Assuming this is correctly implemented elsewhere
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

interface Author {
  id: number;
  firstName: string;
  profile?: string;
  email?:string
}

interface Category {
  id: number;
  name: string;

}

interface NewsDetails {
  id: number;
  headline: string;
  details: string;
  image: string;
  author: Author;
  categories: Category[];
}

interface Comment {
  id: number;
  text: string;
  createdAt: string;
  user: Author;
}

const DetailsNews = () => {
  const detailsNews = useLoaderData() as NewsDetails;
  const { id } = useParams();
  const [allComment, setAllComment] = useState<Comment[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch comments when the component mounts
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/api/news/${id}/comments`)
        .then((res) => res.json())
        .then((data) => setAllComment(data.comments))
        .catch((err) => {
          console.error('Fetch error:', err);
          setAllComment([]); // Set to empty array in case of fetch error
        });
    }
  }, [id]);

  // Open modal for adding or editing comments
  const handleOpenModal = (commentToEdit?: Comment) => {
    setComment(commentToEdit?.text || '');
    setEditingCommentId(commentToEdit?.id || null);
    setModalOpen(true);
    setError(null);
    setSuccessMessage(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingCommentId(null);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // Add or update a comment
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newsId = detailsNews.id;
    const commentData = { comment };
    const token = localStorage.getItem('token');

    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      let response;
      if (editingCommentId !== null) {
        // Update existing comment
        response = await fetch(`http://localhost:3000/api/news/${newsId}/comments/${editingCommentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(commentData),
        });
      } else {
        // Add new comment
        response = await fetch(`http://localhost:3000/api/news/${newsId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(commentData),
        });
      }

      if (response.ok) {
        const result = await response.json();
        if (editingCommentId !== null) {
          // Update the existing comment in state
          setAllComment((prev) =>
            prev.map((cmt) => (cmt.id === editingCommentId ? result.comment : cmt))
          );
          setSuccessMessage('Comment updated successfully!');
        } else {
          // Add new comment to state
          setAllComment((prev) => [...prev, result.comment]);
          setSuccessMessage('Comment submitted successfully!');
        }
        setComment('');
        setTimeout(() => {
          handleCloseModal();
        }, 1500);
      } else {
        const errorText = await response.text();
        setError(`Error submitting comment: ${errorText}`);
      }
    } catch (error) {
      setError(`Error submitting comment: ${error}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete a comment
  const handleDelete = async (commentId: number) => {
    const token = localStorage.getItem('token');
  
    // Show confirmation popup
    const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
  
    if (!confirmDelete) {
      return; // If the user cancels, do nothing
    }
  
    try {
      const response = await fetch(
        `http://localhost:3000/api/news/${detailsNews.id}/comments/${commentId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `${token}`, // Ensure correct Bearer format
          },
        }
      );
  
      if (response.ok) {
        setAllComment((prev) => prev.filter((cmt) => cmt.id !== commentId));
        setSuccessMessage('Comment deleted successfully!');
      } else {
        const errorText = await response.text();
        setError(`Error deleting comment: ${errorText}`);
      }
    } catch (error) {
      setError(`Error deleting comment: ${error}`);
    }
  };
  
  return (
    <div className="w-full">
      <div className="text-center my-6 w-full">
        <h2 className="text-2xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-3xl sm:leading-none md:text-4xl">
          {detailsNews.headline}
        </h2>
      </div>

      <div
        className="w-full h-96 bg-cover bg-center my-6"
        style={{ backgroundImage: `url(${detailsNews.image})` }}
      />

      <div className="w-full px-4 lg:px-16 text-left">
        <p className="mt-3 mb-5 text-base text-black-500 sm:mt-5 sm:text-lg sm:max-w-full md:mt-5 md:text-xl lg:mx-0">
          {detailsNews.details}
        </p>
        <CommentButton onClick={() => handleOpenModal()} />
      </div>

      {isModalOpen && (
        <dialog id="comment-modal" open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {editingCommentId ? 'Edit Comment' : 'Add a Comment'}
            </h3>
            <form onSubmit={handleCommentSubmit} className="mt-4">
              <textarea
                value={comment}
                onChange={handleCommentChange}
                className="textarea textarea-bordered w-full h-32"
                placeholder="Write your comment here..."
                required
                disabled={isSubmitting}
              />
              <div className="modal-action mt-4">
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : editingCommentId ? 'Update' : 'Submit'}
                </button>
                <button type="button" onClick={handleCloseModal} className="btn">
                  Close
                </button>
              </div>
              {error && <p className="text-red-500 mt-4">{error}</p>}
              {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
            </form>
          </div>
        </dialog>
      )}

      <div className="comments-section mt-8 px-4 lg:px-16">
        <h3 className="text-xl font-semibold">Comments</h3>
        {allComment.length === 0 ? (
          <p className="mt-4">No comments yet.</p>
        ) : (
          <ul className="mt-4">
            {allComment.map((cmt) => (
              <li
                key={cmt.id}
                className="mb-4 p-4 border rounded-lg shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold">{cmt.user?.firstName}</p>
                  <p>{cmt.comment}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(cmt.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleOpenModal(cmt)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(cmt.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DetailsNews;
