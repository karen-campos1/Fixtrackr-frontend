import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import leftChevronIcon from '../assets/left-chevron.png';
import axios from 'axios';

const EditUnitCard = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Fetch the ID from the URL params

  const [formData, setFormData] = useState({
    unitTitle: '',
    unitAddress: '',
    primaryTenant: '',
    tenantEmail: '',
    notes: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('access_token'); // Ensure the token is retrieved

  // Fetch the unit details when the component mounts
  useEffect(() => {
    const fetchUnitDetails = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch unit details from the backend using the correct ID
        const response = await axios.get(`http://localhost:8000/api/units/${id}/`, config);

        const unitData = response.data.unit; // The backend response contains the unit details

        // Update the form state with the fetched unit data
        setFormData({
          unitTitle: unitData.title,
          unitAddress: unitData.address,
          primaryTenant: unitData.tenant_full_name, // Use tenant_full_name
          tenantEmail: unitData.tenant_email, // Use tenant_email
          notes: unitData.notes,
        });

        setLoading(false); // Stop loading after data is fetched
      } catch (err) {
        console.error('Error fetching unit details:', err);
        setError('Failed to load unit details. Please try again later.');
        setLoading(false);
      }
    };

    fetchUnitDetails();
  }, [id, token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFinish = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Use the correct update path from your urls.py
      const response = await axios.put(`http://localhost:8000/api/units/update/${id}/`, formData, config);
  
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
          name="unitTitle"
          value={formData.unitTitle}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded border-gray-border"
        />

        <label className="text-enlarged-text-sb text-primary-text mb-2">Unit Address</label>
        <input
          type="text"
          name="unitAddress"
          value={formData.unitAddress}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded border-gray-border"
        />

        <label className="text-enlarged-text-sb text-primary-text mb-2">Primary Tenant</label>
        <input
          type="text"
          name="primaryTenant"
          value={formData.primaryTenant}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded border-gray-border"
        />

        <label className="text-enlarged-text-sb text-primary-text mb-2">Primary Tenant’s Email</label>
        <input
          type="email"
          name="tenantEmail"
          value={formData.tenantEmail}
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





// const EditUnitCard = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();  // Fetch the ID directly from the URL params

//   const [formData, setFormData] = useState({
//     unitTitle: '',
//     unitAddress: '',
//     primaryTenant: '',
//     tenantEmail: '',
//     notes: '',
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const token = localStorage.getItem('access_token'); // Ensure you have the token

//   // Fetch the unit details when the component mounts
//   useEffect(() => {
//     const fetchUnitDetails = async () => {
//       try {
//         const accessToken = await getAccessToken(); // If using utility for token
//         const response = await fetch(`http://localhost:8000/api/units/${id}/`, {
//           headers: {
//             Authorization: `Bearer ${accessToken || token}`,  // Include the correct token
//           },
//         });

//         if (response.ok) {
//           const unitData = await response.json(); // Fetch the correct unit data

//           // Update the form with the fetched unit data
//           setFormData({
//             unitTitle: unitData.title,
//             unitAddress: unitData.address,
//             primaryTenant: unitData.primary_tenant_name,
//             tenantEmail: unitData.primary_tenant_email,
//             notes: unitData.notes,
//           });

//           setLoading(false);  // Set loading to false after fetching
//         } else {
//           throw new Error('Failed to fetch unit details');
//         }
//       } catch (err) {
//         console.error(err);
//         setError('Failed to fetch unit details');
//         setLoading(false);  // Set loading to false on error
//       }
//     };

//     fetchUnitDetails();
//   }, [id, token]);  // Re-run if `id` or `token` changes

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle the form submission to update the unit
//   const handleFinish = async () => {
//     try {
//       const accessToken = await getAccessToken(); // If using utility for token
//       const response = await fetch(`http://localhost:8000/api/units/update/${id}/`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken || token}`,
//         },
//         body: JSON.stringify({
//           unit_title: formData.unitTitle,
//           unit_address: formData.unitAddress,
//           primary_tenant_name: formData.primaryTenant,
//           primary_tenant_email: formData.tenantEmail,
//           notes: formData.notes,
//         }),
//       });

//       if (response.ok) {
//         navigate('/account');  // Navigate back to the account page upon success
//       } else {
//         console.error('Failed to update unit');
//       }
//     } catch (error) {
//       console.error('Error updating unit:', error);
//     }
//   };

//   // Handle delete unit logic
//   const handleDelete = async () => {
//     try {
//       const accessToken = await getAccessToken(); // If using utility for token
//       const response = await fetch(`http://localhost:8000/api/units/delete/${id}/`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${accessToken || token}`,
//         },
//       });

//       if (response.ok) {
//         alert('Unit deleted successfully');
//         navigate('/account');  // Redirect back to account page after deleting the unit
//       } else {
//         console.error('Failed to delete unit');
//       }
//     } catch (error) {
//       console.error('Error deleting unit:', error);
//     }
//   };

//   // Show loading screen while fetching data
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Show error message if there was an issue fetching the unit details
//   if (error) {
//     return <div>{error}</div>;
//   }

//   // Render the form with the unit details
//   return (
//     <div style={{ backgroundColor: '#F3F5F9', minHeight: '100vh', padding: '24px 32px' }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#0466C8', padding: '24px 32px', margin: '-24px -32px 0' }}>
//         <img
//           src={leftChevronIcon}
//           alt="Go back"
//           className="cursor-pointer"
//           onClick={() => navigate('/account')}
//         />
//       </div>

//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mt-8" style={{ paddingLeft: '32px', paddingRight: '32px', marginTop: '27.5px' }}>
//         <h1 className="text-heading-2 font-bold mb-6 text-primary-text">Unit #{id}</h1>

//         <label className="text-enlarged-text-sb text-primary-text mb-2">Unit Title</label>
//         <input
//           type="text"
//           name="unitTitle"
//           value={formData.unitTitle}
//           onChange={handleChange}
//           className="w-full p-2 mb-4 border rounded border-gray-border"
//         />

//         <label className="text-enlarged-text-sb text-primary-text mb-2">Unit Address</label>
//         <input
//           type="text"
//           name="unitAddress"
//           value={formData.unitAddress}
//           onChange={handleChange}
//           className="w-full p-2 mb-4 border rounded border-gray-border"
//         />

//         <label className="text-enlarged-text-sb text-primary-text mb-2">Primary Tenant</label>
//         <input
//           type="text"
//           name="primaryTenant"
//           value={formData.primaryTenant}
//           onChange={handleChange}
//           className="w-full p-2 mb-4 border rounded border-gray-border"
//         />

//         <label className="text-enlarged-text-sb text-primary-text mb-2">Primary Tenant’s Email</label>
//         <input
//           type="email"
//           name="tenantEmail"
//           value={formData.tenantEmail}
//           onChange={handleChange}
//           className="w-full p-2 mb-4 border rounded border-gray-border"
//         />

//         <label className="text-enlarged-text-sb text-primary-text mb-2">Notes</label>
//         <textarea
//           name="notes"
//           value={formData.notes}
//           onChange={handleChange}
//           className="w-full p-2 mb-4 border rounded border-gray-border"
//           rows="4"
//         />

//         <button
//           onClick={handleFinish}
//           className="w-full py-3 text-white bg-[#0466c8] rounded-[25px] mb-4"
//           style={{ height: '54px' }}
//         >
//           Finish
//         </button>

//         <button
//           onClick={handleDelete}
//           className="w-full text-center text-red-600 underline"
//         >
//           Delete Unit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditUnitCard;
