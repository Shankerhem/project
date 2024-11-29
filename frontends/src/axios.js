import axios from "axios";

const axiosInstance = axios.create({
    baseURL : "http://127.0.0.1:8000/",
    headers : {
        common:{
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        }
    },
    timeout : process.env.HTTP_CALL_TIMEOUT
})

export default axiosInstance