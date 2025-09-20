import api from "./api";

export async function create<T> (url: string, body: Partial<T>): Promise<T> {
    const {data} = await api.post(url, body)
    return data;
}

export async function getAll<T>(url: string):Promise<T[]> {
    const {data} = await api.get(url);
    return data;
}

export async function getOne<T>(url: string, id: number | string): Promise<T> {
    const {data} = await api.get(`${url}/${id}`)
    return data;
}

export async function update<T> (url: string, id: number|string, body: Partial<T>): Promise<T> {
    const {data} = await api.put(`${url}/${id}`, body);
    return data;
}


export async function remove (url: string, id: number | string): Promise<void> {
    await api.delete(`${url}/${id}`)
}