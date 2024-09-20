import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom'; // Import hooks from React Router
import userContext from '../../context/UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const context = useContext(userContext);
    const { setUser } = context;  // Get setUser from the context
    const navigate = useNavigate(); // Initialize useNavigate hook
    const location = useLocation(); // Get the current location

    // Get the URL the user was trying to access before login (default to "/")
    const from = location.state?.from?.pathname || '/';

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');  // Clear any previous errors

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('user', JSON.stringify(data.user));
               
                setUser({ id: data.user.id, name: data.user.name, email: data.user.email });
                
                // Show SweetAlert2 success message
                Swal.fire({
                    title: 'Login Successful',
                    text: 'You have logged in successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#3085d6',
                }).then(() => {
                    // Redirect the user back to the page they were trying to access
                    navigate(from, { replace: true });
                });

                // Clear form fields
                setEmail('');
                setPassword('');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                        exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleLogin}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
