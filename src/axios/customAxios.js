import axios from "axios";

export const baseUrl = "http://3.70.156.253:8080/api/v1/";

export default function CustomAxios(){

    return axios.create({
        baseURL: baseUrl,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
}