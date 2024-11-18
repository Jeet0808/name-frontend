import React, { useEffect, useState } from "react";

const UserLocation = ({ mobileno }) => {
    const [nearbyUsers, setNearbyUsers] = useState([]); // Default to empty array

    // Define sendLocationToBackend function outside of useEffect
    const sendLocationToBackend = (latitude, longitude) => {
        fetch("http://localhost:8080/api/user/location", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ latitude, longitude, mobileno }), // Pass mobileno here
        })
            .then((response) => response.json())
            .then((data) => {
                // Ensure the response is an array
                if (Array.isArray(data)) {
                    setNearbyUsers(data); // Set the list of nearby users
                } else {
                    setNearbyUsers([]); // If the response isn't an array, set empty array
                    console.error("Unexpected response format", data);
                }
            })
            .catch((error) => console.error("Error sending location:", error));
    };

    useEffect(() => {
        // Get user location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // Send location to the backend
                    sendLocationToBackend(latitude, longitude);
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    }, []); // No need for dependencies here since sendLocationToBackend is defined outside

    return (
        <div>
            <h1>Nearby Users</h1>
            <ul>
                {Array.isArray(nearbyUsers) && nearbyUsers.length > 0 ? (
                    nearbyUsers.map((user, index) => (
                        <li key={index}>{user.name}</li>
                    ))
                ) : (
                    <li>No nearby users found</li> // Handle case when no users are nearby
                )}
            </ul>
        </div>
    );
};

export default UserLocation;
