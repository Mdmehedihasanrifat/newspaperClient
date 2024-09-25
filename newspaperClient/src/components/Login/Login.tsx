import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import userContext from '../../context/UserContext';
import login from "../../assets/bwink_bld_03_single_03.jpg";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const context = useContext(userContext);
    const { setUser } = context;
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

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

                Swal.fire({
                    title: 'Login Successful',
                    text: 'You have logged in successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#3085d6',
                }).then(() => {
                    navigate(from, { replace: true });
                });

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
        <div className="hero bg-gradient-to-r from-grey-200 to-grey-00 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse h-full">
                {/* Image div */}
                <div className="hidden lg:flex w-1/2 h-1/2">
                    <img src={login} alt="Login" className="rounded-lg shadow-lg object-cover h-full" />
                </div>
                {/* Card div */}
                <div className="card bg-white shadow-lg w-full max-w-sm p-6 rounded-lg h-1/2 flex flex-col justify-center">
                    <h1 className="text-4xl font-bold text-center mb-6 text-black">Login Here!</h1>
                    <form className="card-body" onSubmit={handleLogin}>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text font-semibold">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text font-semibold">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover text-blue-500">Forgot password?</a>
                            </label>
                        </div>
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                        <div className="form-control">
                            <button className="btn btn-primary w-full" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
