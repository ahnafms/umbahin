import api from "../api";
import { getStore } from "../store";

export async function getUser () {
    const token = await getStore('token')
    const {data} = await api.get("/user/me", {headers: { Authorization: `Bearer ${token}`}})
    return data.data
}