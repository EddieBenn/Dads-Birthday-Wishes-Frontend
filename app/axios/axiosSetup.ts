import axios, { AxiosResponse, AxiosError } from "axios";

const apiHost = "https://dads-birthday-wishes.onrender.com"
// const apiHost = "http://localhost:3000"

const customAxios = axios.create({
    baseURL: `${apiHost}`,
    // timeout: 30000,
});

const responseHandler = (response: AxiosResponse): AxiosResponse => {
    if (response?.status === 403) {
        localStorage.clear();
        window.location.href = "/";
    }
    return response;
};

const errorHandler = (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === 403) {
        localStorage.clear();
        window.location.href = "/";
    }
    return Promise.reject(error);
};

customAxios.interceptors.response.use(
    (response: AxiosResponse) => responseHandler(response),
    (error: AxiosError) => errorHandler(error)
);

export default customAxios;