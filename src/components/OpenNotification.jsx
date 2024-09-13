import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import leftChevronIcon from '../assets/left-chevron.png'; 
import infoIcon from '../assets/info-icon.png';
import paperclipIcon from '../assets/paperclip-icon.png';
import { axiosInstance } from '../auth/privateAxios';

const OpenNotification = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showTenantInfo, setShowTenantInfo] = useState(false);
  const [showTenantImages, setShowTenantImages] = useState(false)
  const [data,setData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const token = localStorage.getItem('access_token'); // Ensure the token is retrieved
  const fetching = useRef(true)

  // Fetch the unit details when the component mounts
  useEffect(() => {
    const fetchUnitDetails = async () => {
      try {
        const response = await axiosInstance.get(`${import.meta.env.VITE_API_BASE_URL}/maintenance/${id}/`);
        setData({...response.data,new_files:[],deleted_files:[],priority:response.data.priority === "Low Priority" ? "low": "high"})
        setLoading(false);
      } catch (err) {
        console.error('Error fetching request details:', err);
        setError('Failed to load request details. Please try again later.');
        setLoading(false);
      }
    };

    if (fetching.current){
      fetching.current = false
      fetchUnitDetails();
    }
  }, [id]);


  const handleInfoClick = () => {
    setShowTenantInfo(!showTenantInfo);
  };

  const handleFinish = async () => {
    const formData = new FormData();
    formData.append('property_manager_message',data.property_manager_message)
    formData.append('priority',data.priority)
    formData.append('status',data.status)
    formData.append('contractor_name',data.contractor_name)
    formData.append('contractor_phone',data.contractor_phone)
    data.new_files.forEach((file) => {
      formData.append("new_files", file);
    });
    if (data.deleted_files.length > 0){
      formData.append('deleted_files',JSON.stringify(data.deleted_files))
    }
    axiosInstance.put(`/maintenance/update/${id}/`,formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    .then(()=>{
      navigate('/task-list');
    })
    .catch((err)=>{
      console.log("Error = ",err)
      setError("Unable to edit maintenance request")
    })
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    setData({...data,
      new_files:[...data.new_files,...files],
      property_manager_images: [...data.property_manager_images, ...files]
    })
    e.target.value = ""
  };

  const deleteFile = (image,index) => {
    setData((prevData)=>{
      let copy = [...prevData.property_manager_images]
      copy.splice(index,1)
      if (image.id){
        return {
          ...data,
          property_manager_images:copy,
          deleted_files:[...data.deleted_files,image.id]
        }
      }
      else{
        return {
          ...data,
          property_manager_images:copy,
          // deleted_files:[...data.deleted_files,index]
        }
      }
    })
  }

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setData({...data,[name]:value})
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ backgroundColor: '#F3F5F9', padding: '24px 32px', minHeight: '100vh',}}>
<div style={{ 
  display: 'flex', 
  justifyContent: 'space-between', 
  backgroundColor: '#0466C8', 
  padding: '24px 32px', 
  margin: '0', 
  zIndex: '1000', 
  position: 'fixed', 
  top: '0', 
  left: '0', 
  width: '100%',
}}>
      <img src={leftChevronIcon} alt="Back" style={{ cursor: 'pointer' }} onClick={() => navigate('/notifications')} />
      </div>
      
      <div style={{ marginTop: '24px',  paddingTop: '85px' }}>
        {/* Tenant's Input Section */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h3 style={{ fontFamily: 'Work Sans', fontSize: '24px', fontWeight: 600, color: '#333333' }}>
              {data.unit_title}
            </h3>
            <img src={infoIcon} alt="Info" style={{ cursor: 'pointer' }} onClick={handleInfoClick} />
          </div>
          {showTenantInfo && (
            <div style={{ marginTop: '16px', color: '#5C5D6D' }}>
              {data.unit_address}<br />
              Primary Email: {data.tenant_email}<br />
              Notes: {data.notes}
            </div>
          )}
          <div style={{ marginTop: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontFamily: 'Open Sans', fontWeight: 500, color: '#5C5D6D' }}>Unit Title</label>
              <input type="text" value= {data.unit_title} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CCCCCC' }} disabled />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontFamily: 'Open Sans', fontWeight: 500, color: '#5C5D6D' }}>Subject</label>
              <input type="text" value= {data.subject} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CCCCCC' }} disabled />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontFamily: 'Open Sans', fontWeight: 500, color: '#5C5D6D' }}>Tenant’s Message</label>
              <textarea value = {data.tenant_message} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CCCCCC', minHeight: '120px' }} disabled />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontFamily: 'Open Sans', fontWeight: 500, color: '#5C5D6D' }}>Tenant’s Availability</label>
              <input type="text" value= {data.availability} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CCCCCC' }} disabled />
            </div>
            {data.tenant_images.length > 0 && 
              (showTenantImages ?
                <div>
                  {data.tenant_images.map((image,index)=>(
                    <div key = {index} className = "flex items-center w-full border border-gray-300 rounded-lg p-2 mb-2.5">
                        <div className="font-poppins flex-grow text-xs">{image.name ? image.name : image.file.split('/').pop()}</div>
                    </div>
                  ))}
                  <button style={{ background: '#F3F5F9', color: '#5C5D6D', padding: '8px 56px', borderRadius: '8px', border: 'none', cursor: 'pointer'}} onClick = {()=>setShowTenantImages(false)}>
                    Hide Images By Tenant
                  </button> 
                </div> : 
                <button style={{ background: '#F3F5F9', color: '#5C5D6D', padding: '8px 56px', borderRadius: '8px', border: 'none', cursor: 'pointer'}}  onClick = {()=>setShowTenantImages(true)}>
                  See Images By Tenant ({data.tenant_images.length})
                </button>
              )
            }
          </div>
        </div>
        
        {/* Property Manager's Input Section */}
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '12px', padding: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontFamily: 'Open Sans', fontWeight: 500, color: '#333333' }}>Set Priority</label>
            <select style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CCCCCC' }} name = "priority" value = {data.priority} onChange = {handleChange}>
              <option value="high" style={{ color: '#DC3545' }}>High Priority</option>
              <option value="low" style={{ color: '#FFC107' }}>Low Priority</option>
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontFamily: 'Open Sans', fontWeight: 500, color: '#333333' }}>Current Status</label>
            <select style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CCCCCC' }}  name = "status" value = {data.status} onChange = {handleChange}>
              <option value="Request Sent">Received Request</option>
              <option value="Request Read">Request Read</option>
              <option value="Contractor Called">Contractor Called</option>
              <option value="Appointment Set">Appointment Set</option>
              <option value="Request Complete">Request Complete</option>
            </select>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontFamily: 'Open Sans', fontWeight: 500, color: '#333333' }}>Contractor</label>
            <input type="text" placeholder="Contractor" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CCCCCC' }} name = "contractor_name" value = {data.contractor_name} onChange = {handleChange}/>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontFamily: 'Open Sans', fontWeight: 500, color: '#333333' }}>Contractor’s Contact Info</label>
            <input type="text" placeholder="(000)000-0000" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CCCCCC' }} name = "contractor_phone" value = {data.contractor_phone} onChange = {handleChange}/>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontFamily: 'Open Sans', fontWeight: 500, color: '#333333' }}>Your Message to Tenant</label>
            <textarea placeholder="Message" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CCCCCC' }}  name = "property_manager_message" value = {data.property_manager_message} onChange = {handleChange} />
          </div>
          {data.property_manager_images.map((image,index)=>(
            <div key = {index} className = "flex items-center w-full border border-gray-300 rounded-lg p-2 mb-2.5">
                <div className="font-poppins flex-grow text-xs">{image.name ? image.name : image.file.split('/').pop()}</div>
                <div className = "text-lg cursor-pointer" onClick = {()=>deleteFile(image,index)}>&times;</div>
            </div>
          ))}
          <label style={{ display: 'block', cursor: 'pointer', background: '#F3F5F9', color: '#5C5D6D', padding: '8px 16px', borderRadius: '8px', border: 'none', position: 'relative' }}>
            Attach Images
            <img src={paperclipIcon} alt="Attach" style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="file" style={{ display: 'none' }} onChange={handleImageUpload} />
          </label>
        </div>

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

export default OpenNotification;