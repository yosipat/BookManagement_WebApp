import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './BookDetail.css';

import { ModeContext } from "./ModeContextProvider";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { mode } = useContext(ModeContext)

  const [book, setBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("username");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:8000/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setBook(data);
        } else if (response.status === 401) {
          setMessage("Unauthorized access.");
        } else {
          setMessage("Failed to fetch book details.");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id, token]);

  const handleEdit = async (e) => {
    e.preventDefault();

    if (user === "admin") {
      try {
        const response = await fetch(`http://localhost:8000/books/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: book.title,
            author: book.author,
            description: book.description,
            publicationDate: book.publicationDate,
            coverImage: book.coverImage
          }),
        });

        if (response.ok) {
          const updatedBook = await response.json();
          setBook(updatedBook);
          setMessage("Book updated successfully.");
          setIsEditing(false);
        } else {
          setMessage("Failed to update book.");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again.");
      }
    } else {
      setMessage("Unauthorized: Please log in as admin.");
    }
  };

  const handleDelete = async () => {
    if (user === "admin") {
      try {
        const response = await fetch(`http://localhost:8000/books/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setMessage("Book deleted successfully.");
          navigate("/");
        } else {
          setMessage("Failed to delete book.");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again.");
      }
    } else {
      setMessage("Unauthorized: Please log in as admin.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!book) {
    return <p>{message || "Book not found."}</p>;
  }

  return (
    <div className={`book-detail-container ${isEditing ? "editing-mode" : ""}`}>
      <h2 className="book-detail-title">Book Details</h2>

      {!isEditing ? (
        <div className="book-detail-content">
          <div className="book-image-container">
            <img
              className="book-cover-image"
              src={book.coverImage}
              alt={book.title}
            />
          </div>
          <div className="book-description">
            <p>
              <strong>Title:</strong> {book.title}
            </p>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Description:</strong> {book.description}
            </p>
            <p>
              <strong>Publication Date:</strong> {book.publicationDate}
            </p>

            <div className="buttons-container">
              <div className={mode}>
                <button className="edit-button" onClick={() => setIsEditing(true)}>
                  Edit
                </button>
                <button className="delete-button" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleEdit}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={book.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              value={book.author}
              onChange={(e) => setBook({ ...book, author: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={book.description}
              onChange={(e) =>
                setBook({ ...book, description: e.target.value })
              }
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="publicationDate">Publication Date</label>
            <input
              type="date"
              id="publicationDate"
              value={book.publicationDate}
              onChange={(e) =>
                setBook({ ...book, publicationDate: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="coverImage">Cover Image URL</label>
            <input
              type="url"
              id="coverImage"
              value={book.coverImage}
              onChange={(e) =>
                setBook({ ...book, coverImage: e.target.value })
              }
            />
          </div>
          <div className="book-btn-edit">
          <button type="submit" className="save-button" onClick={() => setIsEditing(false)}>Save Changes</button>
          <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>
            Cancel
          </button></div>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookDetail;
