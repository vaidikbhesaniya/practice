import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';


const Home: React.FC = () => {
    const [date, setDate] = useState(new Date());
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get(`/api/candidates?date=${date.toISOString().split('T')[0]}`);
                const data = Array.isArray(response.data) ? response.data : [];
                setCandidates(data);
            } catch (error) {
                console.error('Error fetching candidates:', error);
                setCandidates([]); // Ensure candidates is always an array
            }
        };

        fetchCandidates();
    }, [date]);

    const handleAttendance = async (id, attended) => {
        try {
            await axios.post('/api/candidates/attendance', { id, attended });
            setCandidates((prev) =>
                prev.map((candidate) =>
                    candidate._id === id ? { ...candidate, attended } : candidate
                )
            );
        } catch (error) {
            console.error('Error updating attendance:', error);
        }
    };
    
    const handleLogout = async () => {
        try {
            await axios.post('/api/logout', {}, { withCredentials: true });
            window.location.href = '/signin';
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-indigo-600 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-white">Attendance Dashboard</h1>
                    <nav className="mt-4">
                        <Link to="/signin" className="text-white hover:text-gray-300" onClick={() => handleLogout()}>Logout</Link>
                    </nav>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                        <p className="text-gray-500 text-lg">Welcome to the Attendance Dashboard</p>
                    </div>
                </div>
                <div className="home bg-white shadow rounded-lg p-6 mt-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Interview Schedule</h1>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        className="border rounded-lg shadow-md"
                    />
                    <h2 className="text-xl font-semibold text-gray-700 mt-4">Candidates for {date.toDateString()}</h2>
                    <ul className="mt-4 space-y-2">
                        {candidates.map((candidate) => (
                            <li
                                key={candidate._id}
                                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
                            >
                                <span className="text-gray-800 font-medium">{candidate.name}</span>
                                <input
                                    type="checkbox"
                                    checked={candidate.attended}
                                    onChange={(e) => handleAttendance(candidate._id, e.target.checked)}
                                    className="form-checkbox h-5 w-5 text-indigo-600"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default Home;