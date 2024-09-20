import { useState, useEffect, useContext } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import userContext from "../../context/UserContext";

const NewsCreateForm = () => {
  const { newsId } = useParams<{ newsId: string }>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { categories, setCategories } = useContext(userContext); // Categories context
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const detailNews = useLoaderData(); // Data from news details

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/news"); // Adjust the URL
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load categories!",
        });
      }
    };

    fetchCategories();
  }, []);

  // Pre-fill form data if updating an existing news
  useEffect(() => {
    if (detailNews) {
      setTitle(detailNews.headline || "");
      setDescription(detailNews.details || "");
      setSelectedCategories(detailNews.categories?.map((cat: any) => cat.id) || []);
    }
  }, [detailNews]);

  // Category selection handler
  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  // Image file change handler with preview support
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file || null);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Frontend validation
    const formErrors: any = {};
    if (!title) formErrors.title = "Title is required";
    if (!description) formErrors.description = "Content is required";
    if (!image && !newsId) formErrors.image = "Image is required"; // Ensure image for creation
    setErrors(formErrors);
  
    if (Object.keys(formErrors).length > 0) return;
  
    // Create form data for submission
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categoryIds", selectedCategories.join(",")); // Send category IDs as CSV
    if (image) formData.append("image", image as Blob); // Handle image upload only if an image is provided
  
    try {
      const token = localStorage.getItem("token");
  
      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Unauthorized",
          text: "User is not authenticated!",
        });
        return;
      }
  
      setLoading(true); // Start loading state
  
      // Decide the method and URL based on whether we are creating or updating
      const method = newsId ? "PUT" : "POST";
      const url = newsId
        ? `http://localhost:3000/api/news/${newsId}` // Update an existing news
        : "http://localhost:3000/api/news"; // Create a new news
  
      const response = await fetch(url, {
        method, // Use POST for creating and PUT for updating
        body: formData,
        headers: {
          Authorization: `${token}`,
        },
      });
  
      const result = await response.json();
      if (response.ok) {
        setTitle("");
        setDescription("");
        setSelectedCategories([]);
        setImage(null);
  
        // Show success SweetAlert
        Swal.fire({
          icon: "success",
          title: "Success",
          text: newsId ? "News updated successfully!" : "News created successfully!",
        });
        navigate("/"); // Redirect after creating or updating
      } else {
        // Show error SweetAlert
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to ${newsId ? "update" : "create"} news: ${result.message}`,
        });
      }
    } catch (error: any) {
      // Show error SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `An error occurred: ${error.message}`,
      });
    } finally {
      setLoading(false); // End loading state
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6 px-4 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {newsId ? "Update News Article" : "Create News Article"}
        </h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          {/* Title Input */}
          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 ${
                errors.title ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-300"
              }`}
              placeholder="Enter news title"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          {/* Description Input */}
          <div className="space-y-1">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-opacity-50 ${
                errors.description ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-indigo-300"
              }`}
              placeholder="Enter news content"
              rows={4}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          {/* Categories Select */}
          <div className="space-y-1">
            <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
              Categories
            </label>
            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm max-h-40 overflow-y-auto">
              {categories.map((category) => (
                <div key={category.id} className="mb-1">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="mr-2"
                  />
                  <label htmlFor={`category-${category.id}`} className="cursor-pointer">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-1">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-300 focus:ring-opacity-50"
              accept="image/*"
              onChange={handleImageChange}
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
            {previewImage && (
              <div className="mt-4">
                <img src={previewImage} alt="Preview" className="max-w-full h-auto" />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : newsId ? "Update News" : "Submit News"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsCreateForm;
