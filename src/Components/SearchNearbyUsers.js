import React, { useState } from "react";
import { backendUrl } from './config';

const SearchNearbyUsers = () => {
    const [shopName, setShopName] = useState("");
    const [nearbyUsers, setNearbyUsers] = useState([]);
    const [error, setError] = useState("");  // To manage any error messages

    const handleSearch = () => {
        // Ensure the shop name is properly encoded to prevent issues with special characters
        fetch(`${backendUrl}/api/search/shop?shopName=${encodeURIComponent(shopName)}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            // Check if the response is OK (status code 200)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Check the Content-Type of the response
            const contentType = response.headers.get('Content-Type');
            console.log('Content-Type:', contentType);  // For debugging

            // If the response is JSON, parse it, otherwise throw an error
            if (contentType && contentType.includes('application/json')) {
                return response.json();  // Parse the response as JSON
            } else {
                return response.text().then(text => {
                    throw new Error(`Unexpected response type: ${contentType}. Response: ${text}`);
                });
            }
        })
        .then((data) => {
            // If we receive the data, update the nearbyUsers state
            setNearbyUsers(data);
            setError("");  // Clear error if fetch is successful
        })
        .catch((error) => {
            // Set error state to display user-friendly message
            console.error("Error during fetch:", error);
            setNearbyUsers([]);  // Clear any previous data
            setError("Something went wrong. Please try again."); // Show user-friendly error
        });
    };

    return (
        <div>
            <h1>Search Nearby Users</h1>
            <input
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="Enter shop name"
            />
            <button onClick={handleSearch}>Search</button>

            {/* Display error message if there's any */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {nearbyUsers.length > 0 ? (
                <ul>
                    {nearbyUsers.map((user, index) => (
                        <li key={index}>{user.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No users found near the shop</p>
            )}
        </div>
    );
};

export default SearchNearbyUsers;
