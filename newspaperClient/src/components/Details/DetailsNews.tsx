import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import CommentButton from "../Buttons/CommentButton"; // Assuming this is correctly implemented elsewhere
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Allcomment from "../Comment/Allcomment";
import userContext from "../../context/UserContext";

interface Author {
  id: number;
  firstName: string;
  profile?: string;
  email?: string;
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
  const [comment, setComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const context = useContext(userContext);
  const { user } = context;
  const navigate = useNavigate();
  let localUser = localStorage.getItem("user");
  localUser = JSON.parse(localUser);

  // Fetch comments when the component mounts
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/api/news/${id}/comments`)
        .then((res) => res.json())
        .then((data) => setAllComment(data.comments))
        .catch((err) => {
          console.error("Fetch error:", err);
          setAllComment([]); // Set to empty array in case of fetch error
        });
    }
  }, [id]);

  // Open modal for adding or editing comments
  const handleOpenModal = (commentToEdit?: Comment) => {
    if (user?.id) {
      // If the user is logged in, open the modal
      setComment(commentToEdit?.text || "");
      setEditingCommentId(commentToEdit?.id || null);
      setModalOpen(true);
      setError(null);
      setSuccessMessage(null);
    } else {
      // If user is not logged in, navigate to login
      alert("guest user can't comment ,login first");
      navigate("/login");
    }
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
    const token = localStorage.getItem("token");

    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      let response;
      if (editingCommentId !== null) {
        // Update existing comment
        response = await fetch(
          `http://localhost:3000/api/news/${newsId}/comments/${editingCommentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify(commentData),
          }
        );
      } else {
        // Add new comment
        response = await fetch(
          `http://localhost:3000/api/news/${newsId}/comments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
            body: JSON.stringify(commentData),
          }
        );
      }

      if (response.ok) {
        const result = await response.json();
        if (editingCommentId !== null) {
          // Update the existing comment in state
          setAllComment((prev) =>
            prev.map((cmt) =>
              cmt.id === editingCommentId ? result.comment : cmt
            )
          );
          setSuccessMessage("Comment updated successfully!");
        } else {
          // Add new comment to state
          setAllComment((prev) => [...prev, result.comment]);
          setSuccessMessage("Comment submitted successfully!");
        }
        setComment("");
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

  // handleDeleteNews
const handleDeleteNews=async(id:number)=>{

  const token = localStorage.getItem("token");

  // Show confirmation popup
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this comment?"
  );

  if (!confirmDelete) {
    return; // If the user cancels, do nothing
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/news/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${token}`, // Ensure correct Bearer format
        },
      }
    );

    if (response.ok) {
      setSuccessMessage("deleted successfully!");
      navigate("/")
    } else {
      const errorText = await response.text();
      setError(`Error deleting news: ${errorText}`);
    }
  } catch (error) {
    setError(`Error deleting news: ${error}`);
  }
};




  // Delete a comment
  const handleDelete = async (commentId: number) => {
    const token = localStorage.getItem("token");

    // Show confirmation popup
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmDelete) {
      return; // If the user cancels, do nothing
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/news/${detailsNews.id}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `${token}`, // Ensure correct Bearer format
          },
        }
      );

      if (response.ok) {
        setAllComment((prev) => prev.filter((cmt) => cmt.id !== commentId));
        setSuccessMessage("deleted successfully!");
        
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
      <div className="grid grid-cols-12 gap-2 ">
        <div className="col-span-2 mt-32 px-4">
          <div className="bg-gray-100 p-4 mb-4 border border-gray-300 rounded shadow">
            <h3 className="font-bold text-lg">
              Author:{detailsNews.author.name}
            </h3>

            <h3 className="font-bold text-lg">
              {new Date(detailsNews.createdAt).toLocaleDateString()}
            </h3>
          </div>
        </div>

        <div className="col-span-8">
          <div className="text-center my-6 w-full">
            <h2 className="text-2xl font-sans tracking-tight leading-10 font-bold text-gray-900 sm:text-3xl sm:leading-none md:text-4xl">
              {detailsNews.headline}
            </h2>
          </div>
          <div
            className="4/5 h-96 bg-cover bg-center align-middle  my-6 rounded"
            style={{ backgroundImage: `url(${detailsNews.image})` }}
          />

          <div className="w-full px-2 lg:px-2 text-left">
            <p className="mt-3 mb-5 text-base text-black-500 sm:mt-5 sm:text-lg sm:max-w-full md:mt-5 md:text-xl lg:mx-0 font-serif">
              {detailsNews.details}
            </p>
            <div />

            <div className="w-full flex gap-2">
              <CommentButton
                onClick={() => {
                  handleOpenModal();
                }}
              />

              {localUser?.id == detailsNews.author.id ? (
                <>
                  <button onClick={()=>handleDeleteNews(detailsNews.id)} className="flex items-center gap-2 text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded">
                    <FaTrashAlt />
                    News Delete
                  </button>

                  <button className="flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded">
                    <FaEdit />
                    News Edit
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-2 mt-14 mx-6">
          <h2>Related News</h2>
        </div>
      </div>

      {isModalOpen && (
        <dialog id="comment-modal" open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {editingCommentId ? "Edit Comment" : "Add a Comment"}
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
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : editingCommentId
                    ? "Update"
                    : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn"
                >
                  Close
                </button>
              </div>
              {error && <p className="text-red-500 mt-4">{error}</p>}
              {successMessage && (
                <p className="text-green-500 mt-4">{successMessage}</p>
              )}
            </form>
          </div>
        </dialog>
      )}

      <div className="comments-section mt-8 mx-56  py-7 lg:px-2">
        <h3 className="text-xl font-semibold">Comments</h3>
        {allComment.length === 0 ? (
          <p className="mt-4">No comments yet.</p>
        ) : (
          <Allcomment
            allComment={allComment}
            handleOpenModal={handleOpenModal}
            handleDelete={handleDelete}
          ></Allcomment>
        )}
      </div>
    </div>
  );
};

export default DetailsNews;
