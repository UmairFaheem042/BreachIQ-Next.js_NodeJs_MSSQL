import axios from "axios";
import { api_url } from "./constants.js";


export const LeakCheckAPI = async (email) => {
    try {
        const resp = await axios.get(`${api_url}?check=${email}`);
        return resp.data;

    } catch (apiError) {
        console.log(apiError)
        return {
            error: apiError.message
        }
    }
}
