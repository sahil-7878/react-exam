import axios from "axios";

 const apiIntance = axios.create({
    baseURL : 'http://localhost:3000/'
})

export default apiIntance;