import axios from 'axios' ;

const BASE_URL = 'http://ec2-13-201-98-117.ap-south-1.compute.amazonaws.com:3000';

export const  fetchAPI = async (url) =>{
    const { data } =  await axios.get(`${BASE_URL}/${url}` );  

    return data; }