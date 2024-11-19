import React, { useEffect, useState } from "react";
import { backendUrl } from './config';

const UserLocation = ({ mobileno }) => {
    // State to store the coordinates
    const [location, setLocation] = useState({ latitude: null, longitude: null });

    // Define sendLocationToBackend function outside of useEffect
    const sendLocationToBackend = (latitude, longitude) => {
        fetch(`${backendUrl}/api/user/location`, {
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
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // Update location state
                setLocation({ latitude, longitude });
                // Send location to the backend
                sendLocationToBackend(latitude, longitude);
                console.log("lat", latitude, "lon", longitude);
            },
            (error) => {
                console.error("Error getting location:", error);
            }
        );

        // Cleanup the geolocation watcher when the component is unmounted
        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []); // No need for dependencies here since sendLocationToBackend is defined outside

    return (
        <div>
            <h1>Your Coordinates:</h1>
            {location.latitude && location.longitude ? (
                <ul>
                    <li>Latitude: {location.latitude}</li>
                    <li>Longitude: {location.longitude}</li>
                </ul>
            ) : (
                <p>Loading location...</p>
            )}
        </div>
    );
};

export default UserLocation;
