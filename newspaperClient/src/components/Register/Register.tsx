import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import registerImage from "../../assets/bwink_bld_03_single_03.jpg";  // Import your register image

const Register = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();  // To redirect the user after successful registration

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');  // Clear any previous errors

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    title: 'Registration Successful',
                    text: 'You have registered successfully! Redirecting to the login page...',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#3085d6',
                }).then(() => {
                    navigate('/login');  // Redirect to login page after successful registration
                });

                setEmail('');
                setFirstName('');
                setLastName('');
                setPassword('');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError(`An error occurred. Please try again. ${err}`);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-base-200">
            <div className="flex flex-col lg:flex-row w-full lg:w-3/4 h-[500px] shadow-lg">
                {/* Image Div */}
                <div className="lg:w-1/2 w-full h-full mr-3">
                    <img 
                        src={registerImage} 
                        alt="Register" 
                        className="object-cover h-full w-full rounded-lg lg:rounded-l-lg" 
                    />
                </div>

                {/* Card Div */}
                <div className="lg:w-1/2 w-full bg-base-100 flex py-8  px-6 lg:px-12 flex-col justify-center h-full rounded-lg lg:rounded-r-lg">
                    <h1 className="text-4xl font-bold text-center text-black mb-2">Register Now!</h1>
                    <form className="w-full" onSubmit={handleRegister}>
                        <div className="form-control mb-1">
                            <label className="label">
                                <span className="label-text font-semibold">First Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control mb-1">
                            <label className="label">
                                <span className="label-text font-semibold">Last Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control mb-1">
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

                        <div className="form-control mb-1">
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
                                <Link to="/login" className="label-text-alt link link-hover text-blue-500">
                                    Already have an account? Login here
                                </Link>
                            </label>
                        </div>

                        {error && <p className="text-red-500 text-center mb-1">{error}</p>}

                        <div className="form-control">
                            <button className="btn btn-primary bg-black text-white w-full" type="submit">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
