import ievAPI from "../config/api";

export async function addCharger(data){

    try {
        const response = await ievAPI.post('/chargers/new', data)
        //console.log(response.data)
        return response.data
    } catch (err) {
        console.log("Axios ERROR----")
        console.log(err.message)
    }
}

