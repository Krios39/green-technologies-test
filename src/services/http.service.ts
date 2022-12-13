import axios from "axios";

class HttpServiceImpl {
    private url: string

    constructor(url: string) {
        this.url = url
    }

    async get<T>(url: string, params?: URLSearchParams): Promise<T> {
        return await axios.get<T>(`${this.url}/${url}`, {params}).then(response => response.data)
    }

}

export const HttpService = new HttpServiceImpl('http://195.210.47.140:8000')