import axios from "axios";

const Header = axios.create({
    baseURL: "http://localhost:3300"
})

export async function login(email: string, password: string) {
    return await Header.post("/auth/login", { email, password })
        .then(response => response.data)
        .catch(error =>  { throw error});
}
export async function register(email: string, name: string, password: string) {
    return await Header.post("/auth/register", { email, name, password})
        .then(response => response.data)
        .catch(error => { throw error});
}