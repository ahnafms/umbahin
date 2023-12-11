import api from "../api";

export async function getLaundryList () {
    const res = await api.get("/service/lsp")
    return res.data.data
}

export async function getLaundryDetail (lspId) {
    const res = await api.get("/service/lsp/" + lspId)
    return res.data.data
}