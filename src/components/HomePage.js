import { BrowserRouter, Route, Routes, Link, useParams, useNavigate, Outlet, Navigate } from 'react-router-dom'
import "./HomePage.css"
import { useContext, useEffect, useState } from 'react';
import { ModeContext } from './ModeContextProvider';

const HomePage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // use for navigate to another pages
    const navigate = useNavigate();
    // use for save the mode user/admin
    const { toggleMode } = useContext(ModeContext);

    const handleSubmit = async (e) => {
        e.preventDefault();



        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.token) {
                    setSuccess("Login successful!");
                    setError("");
                    // Saving JWT for later
                    localStorage.setItem("token", data.token);
                    // set current username
                    localStorage.setItem("username", username);
                    // save mode
                    toggleMode(username);
                    // redirect to book lists
                    navigate('/');
                } else {
                    setSuccess(data.message);
                    setError("");
                }
            } else {
                setError("Invalid username or password");
                setSuccess("");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
            setSuccess("");
        }
    };

    return (
        <div className='divLogin'>

          




            <div class="pat">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='divSubLogin'>
                        <label htmlFor="username">Username</label>
                        <div>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className='input1'
                            /></div>
                    </div>
                    <label htmlFor="password">Password</label>
                    <div style={{ marginBottom: "10px" }}>

                        <div>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className='input2'
                            />
                        </div>
                    </div><br />
                    <div className='btnSubmit'><button className='submitButton' type="submit">
                        Login
                    </button></div>

                </form></div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <footer><br /></footer>
        </div>
    );
};

export default HomePage;
