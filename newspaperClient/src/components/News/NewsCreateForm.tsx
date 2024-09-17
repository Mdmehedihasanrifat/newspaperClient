import React, { useState } from 'react';

const NewsCreateForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    const formErrors = {};
    if (!title) formErrors.title = 'Title is required';
    if (!content) formErrors.content = 'Content is required';
    if (!image) formErrors.image = 'Image is required';
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return;

    // Create form data for submission
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('categories', categories.join(','));  // Join categories array into a comma-separated string
    formData.append('image', image);

    try {
      // Example: Replace with your actual API call for news creation
      const response = await fetch('/api/news', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        alert('News created successfully!');
      } else {
        alert('Failed to create news: ' + result.message);
      }
    } catch (error) {
      alert('An error occurred: ' + error.message);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setCategories(value);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold">Create News Article</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-lg shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-control">
              <label className="label" htmlFor="title">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter news title"
                className="input input-bordered"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="content">
                <span className="label-text">Content</span>
              </label>
              <textarea
                id="content"
                placeholder="Enter news content"
                className="textarea textarea-bordered"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="categories">
                <span className="label-text">Categories</span>
              </label>
              <select
                id="categories"
                className="select select-bordered"
                multiple
                onChange={handleCategoryChange}
              >
                <option value="Politics">Politics</option>
                <option value="Sports">Sports</option>
                <option value="Technology">Technology</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label" htmlFor="image">
                <span className="label-text">Upload Image</span>
              </label>
              <input
                type="file"
                id="image"
                className="file-input file-input-bordered"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Submit News
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsCreateForm;
