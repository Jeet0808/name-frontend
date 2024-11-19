import React, { useState } from 'react';
import { backendUrl } from './config';
import { useNavigate } from 'react-router-dom';
function SignUp({ setMobileno }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileno: '',
        classno: '',
        scholarno: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Hook to navigate to different pages

    const classOptions = ['C-11']; // Add more class options if needed

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '', // Clear error for the field being edited
        }));
      
    };

    const validateFields = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required.';
        }

        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email.';
        }

        if (!/^\d{10}$/.test(formData.mobileno)) {
            newErrors.mobileno = 'Mobile number must be exactly 10 digits.';
        }

        if (!formData.classno) {
            newErrors.classno = 'Please select a class number.';
        }

        if (!/^\d{7}$/.test(formData.scholarno)) {
            newErrors.scholarno = 'Scholar number must be exactly 7 digits.';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fieldErrors = validateFields();
        if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors);
            return;
        }

        setLoading(true);

        try {
            setMobileno(formData.mobileno); // Update mobileno in parent component

            const response = await fetch(`${backendUrl}/api/Signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            const data = await response.json();
            console.log('Success:', data);
            navigate('/UserLocation');

            // Reset form
            setFormData({
                name: '',
                email: '',
                mobileno: '',
                classno: '',
                scholarno: '',
            });
            setErrors({});
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                    />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="mobileno">Mobile No</label>
                    <input
                        type="text"
                        id="mobileno"
                        name="mobileno"
                        value={formData.mobileno}
                        onChange={handleChange}
                        placeholder="Enter your 10-digit mobile no"
                        maxLength="10"
                    />
                    {errors.mobileno && <p style={{ color: 'red' }}>{errors.mobileno}</p>}
                </div>
                <div>
                    <label htmlFor="classno">Class No</label>
                    <select
                        id="classno"
                        name="classno"
                        value={formData.classno}
                        onChange={handleChange}
                    >
                        <option value="" disabled>
                            Select Class No
                        </option>
                        {classOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    {errors.classno && <p style={{ color: 'red' }}>{errors.classno}</p>}
                </div>
                <div>
                    <label htmlFor="scholarno">Scholar No</label>
                    <input
                        type="text"
                        id="scholarno"
                        name="scholarno"
                        value={formData.scholarno}
                        onChange={handleChange}
                        placeholder="Enter your 7-digit scholar no"
                        maxLength="7"
                    />
                    {errors.scholarno && <p style={{ color: 'red' }}>{errors.scholarno}</p>}
                </div>
                <button type="submit" disabled={loading} >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default SignUp;
