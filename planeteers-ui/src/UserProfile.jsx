import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';  // Make sure to install js-cookie

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = Cookies.get('token');
                const response = await axios.get('/api/user/currentUser', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
                setError('Unable to fetch user profile.');
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div>
            {error && <p>{error}</p>}
            {user ? <div>{`Welcome, ${user.email}`}</div> : <p>Loading...</p>}
        </div>
    );
};

export default UserProfile;
