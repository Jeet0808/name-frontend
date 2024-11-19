import React, { useState } from "react";
import { backendUrl } from './config';

const SearchNearbyUsers = () => {
    const [shopName, setShopName] = useState("");
    const [nearbyUsers, setNearbyUsers] = useState([]);
    const [error, setError] = useState(""); // To manage any error messages

    const handleSearch = () => {
        if (!shopName.trim()) {
            setError("Please enter a shop name.");
            return;
        }

        // Ensure the shop name is properly encoded to prevent issues with special characters
        fetch(`${backendUrl}/api/search/shop?shopName=${encodeURIComponent(shopName)}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Check the Content-Type of the response
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return response.json(); // Parse the response as JSON
            } else {
                return response.text().then(text => {
                    throw new Error(`Unexpected response type: ${contentType}. Response: ${text}`);
                });
            }
        })
        .then((data) => {
            setNearbyUsers(data);
            setError(""); // Clear error if fetch is successful
        })
        .catch((error) => {
            console.error("Error during fetch:", error);
            setNearbyUsers([]); // Clear any previous data
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

            {/* Display list of nearby users */}
            {nearbyUsers.length > 0 ? (
                <ul>
                    {nearbyUsers.map((user, index) => (
                        <li key={index}>{user.name}</li>
                    ))}
                </ul>
            ) : (
                !error && <p>No users found near the shop.</p>
            )}
        </div>
    );
};

export default SearchNearbyUsers;
