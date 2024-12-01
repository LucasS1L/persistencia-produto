import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3333/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export async function create(data: object | string, endpoint: string) {
    const response = await api.post(endpoint, data);
    return response.data;
}


export async function get(endpoint: string) {
    const response = await api.get(endpoint);
    return response.data;
}

export async function update(id: number | string |null, data: object | string, endpoint: string) {

    if(id){
        await api.patch(`${endpoint}/${id}`, data);
    }else{
        await api.patch(`${endpoint}`, data);
    }
}

export async function deleteResource(id: number, endpoint: string) {

        const response = await api.delete(`${endpoint}/${id}`);
        return response.data;
}

