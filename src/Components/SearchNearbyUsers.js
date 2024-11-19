import React, { useState } from "react";
import { backendUrl } from './config';
const SearchNearbyUsers = () => {
    const [shopName, setShopName] = useState("");
    const [nearbyUsers, setNearbyUsers] = useState([]);

    const handleSearch = () => {
        fetch(`${backendUrl}/api/search/shop?shopName=${shopName}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Shop not found");
            })
            .then((data) => setNearbyUsers(data))
            .catch((error) => alert(error.message));
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
