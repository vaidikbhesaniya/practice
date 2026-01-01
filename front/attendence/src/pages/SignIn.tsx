import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const [isChecking, setIsChecking] = React.useState(true);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = (form.email as HTMLInputElement).value;
        const password = (form.password as HTMLInputElement).value;
        try {
            const response = await axios.post('/api/login', 
                { email, password },
                { withCredentials: true }
            );
            
            console.log('Login response:', response.data);
            
            if (response.data.success) {
                // Successfully logged in, navigate to home
                navigate('/home');
            } else {
                alert(response.data.error || 'Login failed');
            }
        } catch (err: any) {
            console.error('Login error:', err);
            if (err.response) {
                // Server responded with error status
                const errorMsg = err.response.data?.error || `Login failed with status ${err.response.status}`;
                alert(errorMsg);
            } else if (err.request) {
                // Request was made but no response
                alert('Network error - please check if the server is running');
            } else {
                // Something else happened
                alert('An error occurred during login');
            }
        }
    };

    // Check if already logged in (cookie)
    useEffect(() => {
        axios.get('/api/check-auth', { withCredentials: true })
            .then(({ data }) => {
                if (data.authenticated) {
                    navigate('/home', { replace: true });
                } else {
                    setIsChecking(false);
                }
            })
            .catch(() => {
                // Not authenticated, show login page
                setIsChecking(false);
            });
    }, [navigate]);

    if (isChecking) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
                {/* Left Side Illustration or Info */}
                <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-700 p-12">
                    <h2 className="text-4xl font-bold text-white mb-4">Welcome Back!</h2>
                    <p className="text-lg text-blue-100 mb-8 text-center">Sign in to access your attendance dashboard and manage your records easily.</p>
                    {/* You can add an SVG or image here */}
                    <svg width="120" height="120" fill="none" viewBox="0 0 24 24" stroke="white" className="mb-4">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12A4 4 0 1 1 8 12a4 4 0 0 1 8 0ZM12 14v7m0 0H9m3 0h3" />
                    </svg>
                </div>
                {/* Right Side Form */}
                <div className="flex flex-col justify-center p-8 md:p-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">Sign in to your account</h2>
                    <p className="text-center text-sm text-gray-600 mb-6">
                        Or{' '}
                        <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            create a new account
                        </Link>
                    </p>
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full py-3 px-4 border border-transparent text-base font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;