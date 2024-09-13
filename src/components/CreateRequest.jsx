import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import leftChevronIcon from '../assets/left-chevron.png';
import paperclipIcon from '../assets/paperclip-icon.png'; // Assuming this exists in your assets folder
import { axiosInstance } from '../auth/privateAxios';

const CreateRequest = () => {
  const [loading,setLoading] = useState(true)
  const [units,setUnits] = useState(null)
  const navigate = useNavigate();
  const [data,setData] = useState({unit:null,subject:"",message:"",availability:"",priority:"",status:"",contractor_name:"",contractor_phone:"",images:[]})
  const [error,setError] = useState("")
  const fetching = useRef(true)

  // Hardcoded status options
  const statusOptions = [
    "Pending",
    "Contractor Called",
    "Appointment Set",
    "Request Complete"
  ];

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axiosInstance.get(`${import.meta.env.VITE_API_BASE_URL}/units/`);
        setUnits(response.data.units);
        setLoading(false)
      } catch (err) {
        console.log("Error - ",err)
        // console.error('Error fetching units:', err);
        setError('Failed to load units. Please try again later.');
        setLoading(false); // Even if there is an error, stop loading
      }
    };

    if (fetching.current){
      fetching.current = false
      fetchUnits();
    }
  }, []); 

  const handleImageUpload = (e) => {
    const files = e.target.files;
    setData({...data,images:[...data.images,...files]})
    e.target.value = ""
  };

  const handleFinish = async() => {
    try{
      const formData = new FormData();
      formData.append('unit',data.unit)
      formData.append('subject',data.subject)
      formData.append('property_manager_message',data.property_manager_message)
      formData.append('availability',data.availability)
      formData.append('priority',data.priority)
      formData.append('status',data.status)
      formData.append('contractor_name',data.contractor_name)
      formData.append('contractor_phone',data.contractor_phone)
      data.images.forEach((file) => {
        formData.append("images", file);
      });
      const response = await axiosInstance.post(`${import.meta.env.VITE_API_BASE_URL}/submit-request/`,formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      }});
      console.log("Response = ",response.data)
      navigate('/task-list')
    }
    catch(err){
      console.log("Error - ",err)
      // console.error('Error fetching units:', err);
      setError('Failed to save maintenance request. Please try again later.');
    }
  };

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setData({...data,[name]:value})
  }

  const deleteFile = (index) => {
    setData((prevData)=>{
      let copy = [...prevData.images]
      copy.splice(index,1)
      return {...prevData,images:copy}
    })
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  } 

  return (
    <div className="bg-[#F3F5F9] min-h-screen pb-24">
      {/* Top Banner */}
      <header className="bg-[#0466C8] h-[96px] flex items-center px-6 relative">
        <img
          src={leftChevronIcon}
          alt="Back"
          className="cursor-pointer absolute left-[17px] top-[24px]"
          onClick={() => navigate('/task-list')}
        />
      </header>

      {/* Form Container */}
      <div className="bg-white p-6 mx-8 mt-8 rounded-lg shadow-lg">
  <div className="bg-[#7BB8FA40] px-0 py-4 -mx-6 -mt-6 rounded-t-lg">
    <h2 className="text-[#005BBD] font-semibold text-[18px] pl-6">
      Property Manager&lsquo;s Input
    </h2>
  </div>

        <div className="mt-4">
          <h3 className="text-[#333333] font-semibold text-[24px]">
            New Request
          </h3>
        </div>

        {/* Unit Dropdown */}
        <div className="mt-6">
          <label className="text-[#333333]">Unit</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            value={data.unit}
            name = "unit"
            onChange={handleChange}
          >
            <option value="">Select Unit</option>
            {units.map((option, idx) => (
              <option key={idx} value={option.id}>
                {option.title}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Input */}
        <div className="mt-6">
          <label className="text-[#333333]">Subject</label>
          <input
            type="text"
            placeholder="Subject"
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            name = "subject"
            value={data.subject}
            onChange={handleChange}
          />
        </div>

        {/* Notes Input */}
        <div className="mt-6">
          <label className="text-[#333333]">Notes</label>
          <textarea
            placeholder="Notes"
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            rows="3"
            name = "property_manager_message"
            value={data.property_manager_message}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Tenant Availability Input */}
        <div className="mt-6">
          <label className="text-[#333333]">Tenant Availability</label>
          <input
            type="text"
            placeholder="Availability"
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            name = "availability"
            value={data.availability}
            onChange={handleChange}
          />
        </div>

        {/* Priority Dropdown */}
        <div className="mt-6">
          <label className="text-[#333333]">Set Priority</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            name = "priority"
            value={data.priority}
            onChange={handleChange}
          >
            <option value="">Select Priority</option>
            <option value="high">High Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        {/* Status Dropdown */}
        <div className="mt-6">
          <label className="text-[#333333]">Current Status</label>
          <select
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            name = "status"
            value={data.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            {statusOptions.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Contractor Input */}
        <div className="mt-6">
          <label className="text-[#333333]">Contractor</label>
          <input
            type="text"
            placeholder="Contractor"
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            name = "contractor_name"
            value={data.contractor_name}
            onChange={handleChange}
          />
        </div>

        {/* Contractor Contact Info Input */}
        <div className="mt-6">
          <label className="text-[#333333]">Contractor&lsquo;s Contact Info</label>
          <input
            type="text"
            placeholder="(000) 000-0000"
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            name = "contractor_phone"
            value={data.contractor_phone}
            onChange={handleChange}
          />
        </div>

        {/* Attach Images */}
        <div className="mt-6">
          {data.images.map((image,index)=>(
            <div key = {index} className = "flex items-center w-full border border-gray-300 rounded-lg p-2 mb-2.5">
                <div className="font-poppins flex-grow text-xs">{image.name}</div>
                <div className = "text-lg cursor-pointer" onClick = {()=>deleteFile(index)}>&times;</div>
            </div>
          ))}
          <label style={{ display: 'block', cursor: 'pointer', background: '#F3F5F9', color: '#5C5D6D', padding: '8px 16px', borderRadius: '8px', border: 'none', position: 'relative' }}>
            Attach Images
            <img src={paperclipIcon} alt="Attach" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="file" style={{ display: 'none' }} onChange={handleImageUpload} multiple accept="image/*" />
          </label>
        </div>

        {/* Finish Button */}
        <button 
          style={{ 
            background: '#0466C8', 
            color: '#FFFFFF', 
            padding: '12px 24px', 
            borderRadius: '25px', 
            border: 'none', 
            cursor: 'pointer', 
            marginTop: '24px', 
            width: '100%' 
          }} 
          onClick={handleFinish}>
          Finish
        </button>
      </div>
    </div>
  );
};

export default CreateRequest;
