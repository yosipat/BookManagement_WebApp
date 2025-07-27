import "./BookAdd.css"
import React, { useState } from "react";


function BookAdd() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [publicationDate, setPublicationDate] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token"); // NOT WORKING YET BUT SHOULD get JWT token from localStorage

        if (!token) {
            setMessage("Unauthorized: Please log in as admin.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // NOT WORKING YET BUT SHOULD include the token in the Authorization header
                },
                body: JSON.stringify({
                    title,
                    author,
                    description,
                    publicationDate,
                    coverImage,
                }),
            });

            if (response.status === 201) {
                const data = await response.json();
                setMessage(`Book added successfully: ${data.title}`);
                // Clear form fields
                setTitle("");
                setAuthor("");
                setDescription("");
                setPublicationDate("");
                setCoverImage("");
            } else if (response.status === 401) {
                setMessage("Unauthorized: Only admin can add books.");
            } else {
                setMessage("Failed to add book. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="divBookAdd">
            <h2>Add Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="subDivBookAdd">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div className="subDivBookAdd">
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        className="inputBookAdd"
                    />
                </div>
                <div className="subDivBookAdd">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="inputBookAdd"
                    ></textarea>
                </div>
                <div className="subDivBookAdd">
                    <label htmlFor="publicationDate">Publication Date</label>
                    <input
                        type="date"
                        id="publicationDate"
                        value={publicationDate}
                        onChange={(e) => setPublicationDate(e.target.value)}
                        required
                        className="inputBookAdd"
                    />
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="coverImage">Cover Image URL</label>
                    <input
                        type="url"
                        id="coverImage"
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        className="inputBookAdd"
                    />
                </div>
                <button type="submit" className="buttonBookAdd">
                    Add Book
                </button>
            </form>
            {message && <p style={{ marginTop: "10px" }}>{message}</p>}
        </div>
    );
};

export default BookAdd