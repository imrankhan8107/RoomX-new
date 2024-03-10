import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUserEmail = async (authtoken) => {
        try {
          const decodedToken = atob(authtoken.split(".")[1]);
          const userData = await JSON.parse(decodedToken);
          console.log(userData);
        //   console.log(typeof userData.user.userId, typeof selectedRoom._id);
          return userData.user.email;
        } catch (error) {
          console.error("Error decoding authToken:", error);
          return null;
        }
      };

    useEffect(() => {
        // Function to fetch user bookings
        async function fetchUserBookings() {
            try {
                // Retrieve auth token from localStorage (or wherever you store it)
                const authToken = localStorage.getItem('authToken');

                

                // Extract user email from response
                const userEmail = getUserEmail(authToken);

                // Now, you can use userEmail to fetch user bookings
                const bookingsResponse = await axios.get(`/api/auth/bookings?email=${userEmail}`);

                setBookings(bookingsResponse.data.bookings);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user bookings:', error);
            }
        }

        fetchUserBookings();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Bookings</h1>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <ul>
                    {bookings.map((booking, index) => (
                        <li key={index}>
                            Provider: {booking.provider_name}, Room: {booking.room_name}, Start Date: {booking.start_date}, End Date: {booking.end_date}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Bookings;
