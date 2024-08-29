import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Comments = () => {
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [comments, setComments] = useState([]); // Assuming you have a list of comments
    const history = useNavigate();

    const handleSubmit = async (e) => {
            e.preventDefault();
            try {
            const response = await axios.post("http://localhost:8080/comments/create", { description });
                setComments([...comments, response.data]); // Add the new comment to the list
                setDescription(""); // Clear the comment box
            } catch (error) {
                setError("Failed to submit comment");
            }
        };

    const handleDelete = async (commentId) => {
            try {
                await axios.delete(`http://localhost:8080/comments/${commentId}`);
                setComments(comments.filter(comment => comment.id !== commentId));
            } catch (error) {
                setError("Failed to delete comment");
            }
        };

    const handleUpdate = async (commentId, newDescription) => {
            try {
            const response = await axios.put(`http://localhost:8080/comments/${commentId}`, { description: newDescription });
                setComments(comments.map(comment => comment.id === commentId ? response.data : comment));
            } catch (error) {
                setError("Failed to update comment");
            }
        };

        return (
                <div>
            <form onSubmit={handleSubmit}>
                <textarea
                value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write your comment here"
                ></textarea>
                <button type="submit">Submit</button>
            </form>

                {error && <p>{error}</p>}

            <ul>
                {comments.map((comment) => (
                        <li key={comment.id}>
                <p>{comment.description}</p>
                        <button onClick={() => handleDelete(comment.id)}>Delete</button>
                        <button onClick={() => handleUpdate(comment.id, description)}>Update</button>
                    </li>
                ))}
            </ul>
        </div>
    );
    };

    export default Comments;