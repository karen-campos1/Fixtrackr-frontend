import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

axiosInstance.interceptors.request.use((request)=>{
    const access_token = localStorage.getItem('access_token');
    if (access_token){
        request.headers['Authorization'] = `JWT ${access_token}`
    }
    return request
},(error)=>{
    return Promise.reject(error)
});

axiosInstance.interceptors.response.use((response)=>{
    return response
},async(error)=>{
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;
        try{
            const refreshToken = localStorage.getItem("refresh_token");
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/refresh-token/`,{refresh:refreshToken});
            const { access, refresh } = response.data; 
            localStorage.setItem('access_token',access);
            localStorage.setItem('refresh_token',refresh);
            axiosInstance.defaults.headers.common['Authorization'] = `JWT ${access}`;
            return axiosInstance(originalRequest);
        }
        catch(err){
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
            localStorage.removeItem("user")
            window.location.href = "/login"
        }
    }
    return Promise.reject(error)
})