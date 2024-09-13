import React, { useContext, useState } from 'react';
import userContext from '../../context/UserContext';

const Register = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useContext(userContext);  // Get setUser from the context

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');  // Clear any previous errors

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({firstName,lastName,email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.access_token);
                setUser({ name: data.user.name, email: data.user.email });  // Update user context
                alert('Register successful');
                setEmail('');  // Clear the email field
                setPassword('');  // Clear the password field
            } else {
                setError(data.message || 'Register failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                        exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleRegister}>

                    <div className="form-control">
                            <label className="label">
                                <span className="label-text">FirstName</span>
                            </label>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="input input-bordered"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">LastName</span>
                            </label>
                            <input
                                type="text"
                                placeholder="First Name"
                                className="input input-bordered"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                            </div>
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

export default Register;
