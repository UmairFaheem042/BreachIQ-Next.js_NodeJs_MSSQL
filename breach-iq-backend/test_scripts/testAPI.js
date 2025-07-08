import { api_url } from "../lib/constants.js";
import axios from "axios";


export const LeakCheckAPI = async (email) => {
    try {
        const resp = await axios.get(`${api_url}?check=${email}`);
        console.log(resp);
        // {
        //     "success": false,
        //     "message": "An error occurred while tracking an email",
        //     "error": "Cannot read properties of undefined (reading '0')"
        // }
        
        console.log("response data:", resp.data);
        return resp.data;

    } catch (apiError) {
        console.log(apiError)
        return {
            error: apiError.message
        }
    }
}

let result = await LeakCheckAPI("ahasanjan25@gmail.com")

console.log(result)