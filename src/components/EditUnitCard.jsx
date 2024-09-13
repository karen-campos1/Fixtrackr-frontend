import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import leftChevronIcon from '../assets/left-chevron.png';
import axios from 'axios';
import { axiosInstance } from '../auth/privateAxios';

const EditUnitCard = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Fetch the ID from the URL params

  const [formData, setFormData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const token = localStorage.getItem('access_token'); // Ensure the token is retrieved
  const fetching = useRef(true)

  // Fetch the unit details when the component mounts
  useEffect(() => {
    const fetchUnitDetails = async () => {
      try {
        // Fetch unit details from the backend using the correct ID
        const response = await axiosInstance.get(`${import.meta.env.VITE_API_BASE_URL}/units/${id}/`);

        // const unitData = response.data.unit; // The backend response contains the unit details

        // Update the form state with the fetched unit data
        setFormData({
          title:response.data.title,
          address:response.data.address,
          tenant_full_name:response.data.tenant_full_name,
          tenant_email:response.data.tenant_email,
          notes: response.data.notes
        })

        setLoading(false); // Stop loading after data is fetched
      } catch (err) {
        console.error('Error fetching unit details:', err);
        setError('Failed to load unit details. Please try again later.');
        setLoading(false);
      }
    };

    if (fetching.current){
      fetching.current = false
      fetchUnitDetails();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFinish = async () => {
    try {
      // Use the correct update path from your urls.py
      const response = await axiosInstance.put(`${import.meta.env.VITE_API_BASE_URL}/units/${id}/`, formData);
  
      if (response.status === 200) {
        console.log('Updated Unit Details:', response.data);
        navigate('/account'); // Navigate back to the account page on success
      }
    } catch (error) {
      console.error('Failed to update unit:', error);
    }
  };
  

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('access_token');
  
      if (!token) {
        alert('Authorization token is missing.');
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure the token is included
        },
      };
  
      // Call the correct delete endpoint
      const response = await axios.delete(`http://localhost:8000/api/units/delete/${id}/`, config);
  
      if (response.status === 204) {
        alert('Unit deleted successfully');
        navigate('/account'); // Navigate after successful deletion
      } else {
        alert('Failed to delete unit');
      }
    } catch (error) {
      console.error('Failed to delete unit:', error);
      alert('An error occurred while trying to delete the unit.');
    }
  };
  

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while fetching
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an error
  }

  return (
    <div style={{ backgroundColor: '#F3F5F9', minHeight: '100vh', padding: '24px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#0466C8', padding: '24px 32px', margin: '-24px -32px 0' }}>
        <img
          src={leftChevronIcon}
          alt="Go back"
          className="cursor-pointer"
          onClick={() => navigate('/account')}
        />
      </div>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-8" style={{ paddingLeft: '32px', paddingRight: '32px', marginTop: '27.5px' }}>
        <h1 className="text-heading-2 font-bold mb-6 text-primary-text">Unit #{id}</h1>

        <label className="text-enlarged-text-sb text-primary-text mb-2">Unit Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded border-gray-border"
        />

        <label className="text-enlarged-text-sb text-primary-text mb-2">Unit Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded border-gray-border"
        />

        <label className="text-enlarged-text-sb text-primary-text mb-2">Primary Tenant</label>
        <input
          type="text"
          name="tenant_full_name"
          value={formData.tenant_full_name}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded border-gray-border"
        />

        <label className="text-enlarged-text-sb text-primary-text mb-2">Primary Tenant’s Email</label>
        <input
          type="email"
          name="tenant_email"
          value={formData.tenant_email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded border-gray-border"
        />

        <label className="text-enlarged-text-sb text-primary-text mb-2">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded border-gray-border"
          rows="4"
        />

        <button
          onClick={handleFinish}
          className="w-full py-3 text-white bg-[#0466c8] rounded-[25px] mb-4"
          style={{ height: '54px' }}
        >
          Finish
        </button>

        <button
          onClick={handleDelete}
          className="w-full text-center text-red-600 underline"
        >
          Delete Unit
        </button>
      </div>
    </div>
  );
};

export default EditUnitCard;

