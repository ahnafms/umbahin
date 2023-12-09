import api from "../api";

export async function getLaundryList () {
    const res = await api.get("/service/lsp")
    return res.data.data
}