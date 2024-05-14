import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';
export const BASE_URL_IMAGE = `${BASE_URL}/public/img/`

const options = {
    params: {
        maxResults: 50,
    },
    headers: {
        // 'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        // 'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
        'token': localStorage.getItem("LOGIN_USER")
    },
};

//! REFRESH TOKEN
axios.interceptors.response.use((response) => {
    // console.log(response)
    return response
}, (error) => {
    // console.log(error.response)

    if (error.response.data === "TokenExpiredError") {
        // reset token api
        resetTokenAPI().then(result => {
            localStorage.setItem("LOGIN_USER", result)
        }).catch(err => {
            localStorage.removeItem("LOGIN_USER")
        }).finally(() => {
            window.location.reload()
        })
    } else if (error.response.status === "401") {
        // remove current token
        localStorage.removeItem("LOGIN_USER")
    }

    return Promise.reject(error);
})

export const fetchFromAPI = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);

    return data;
};


export const getVideoAPI = async () => {
    const { data } = await axios.get(`${BASE_URL}/videos/get-video`);

    return data;
};

export const getVideoByIdAPI = async (id) => {
    const { data } = await axios.get(`${BASE_URL}/videos/get-video-by-id/${id}`, options);

    return data;
};

export const getVideoTypeAPI = async () => {
    const { data } = await axios.get(`${BASE_URL}/videos/get-video-type`);

    return data;
};

export const getVideoByTypeAPI = async (typeId) => {
    const { data } = await axios.get(`${BASE_URL}/videos/get-video-by-type/${typeId}`);

    return data;
};

export const searchVideoAPI = async (searchTerm) => {
    const { data } = await axios.get(`${BASE_URL}/videos/get-video-by-name/${searchTerm}`);

    return data;
};

export const loginAPI = async (info) => {
    const { data } = await axios.post(`${BASE_URL}/users/login`, info);

    return data;
};

export const loginFacebookAPI = async (info) => {
    const { data } = await axios.post(`${BASE_URL}/users/login-facebook`, info);

    return data;
};

export const registerAPI = async (info) => {
    const { data } = await axios.post(`${BASE_URL}/users/register`, info);

    return data;
};

export const getVideoCommentsAPI = async (id) => {
    const { data } = await axios.get(`${BASE_URL}/videos/get-video-comments/${id}`, options);

    return data;
};

export const commentAPI = async (info) => {
    const { data } = await axios.post(`${BASE_URL}/videos/create-video-comment`, info, options);

    return data;
};

export const resetTokenAPI = async () => {
    const { data } = await axios.post(`${BASE_URL}/users/reset-token`, null, options);

    return data;
};

export const checkEmailAPI = async (info) => {
    const { data } = await axios.post(`${BASE_URL}/users/check-email`, info, options);

    return data;
};

export const checkCodeAPI = async (info) => {
    const { data } = await axios.post(`${BASE_URL}/users/check-code`, info, options);

    return data;
};

export const uploadCloudAPI = async (formData) => {
    const { data } = await axios.post(`https://api.cloudinary.com/v1_1/dhwmroe6u/upload`, formData);

    return data;

}

export const uploadAvatarAPI = async (formData) => {
    const { data } = await axios.put(`${BASE_URL}/users/upload-avatar`, formData, options);

    return data;
};

export const getUsersAPI = async () => {
    const { data } = await axios.get(`${BASE_URL}/users/get-users`);

    return data;
};
