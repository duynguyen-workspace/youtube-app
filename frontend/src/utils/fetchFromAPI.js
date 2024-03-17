import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';

const options = {
    params: {
        maxResults: 50,
    },
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
        // 'token': localStorage.getItem("LOGIN_USER")
    },
};

export const fetchFromAPI = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);

    return data;
};


export const getVideoAPI = async () => {
    const { data } = await axios.get(`${BASE_URL}/video/get-video`);

    return data;
};

export const getVideoByIdAPI = async (id) => {
    const { data } = await axios.get(`${BASE_URL}/video/get-video-by-id/${id}`);

    return data;
};

export const getVideoTypeAPI = async () => {
    const { data } = await axios.get(`${BASE_URL}/video/get-video-type`);

    return data;
};

export const getVideoByTypeAPI = async (typeId) => {
    const { data } = await axios.get(`${BASE_URL}/video/get-video-by-type/${typeId}`);

    return data;
};

export const searchVideoAPI = async (searchTerm) => {
    const { data } = await axios.get(`${BASE_URL}/video/get-video-by-name/${searchTerm}`);

    return data;
};

export const loginAPI = async (info) => {
    const { data } = await axios.post(`${BASE_URL}/user/login`, info);

    return data;
};

export const registerAPI = async (info) => {
    const { data } = await axios.post(`${BASE_URL}/user/register`, info);

    return data;
};