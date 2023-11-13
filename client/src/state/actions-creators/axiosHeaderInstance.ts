import axios from "axios";

const storedData = localStorage.getItem('loggedUser');
var access_token: any;

if (storedData !== null) {
    const parsedData = JSON.parse(storedData);
    access_token = parsedData.access_token;
}

export const axiosInstance =
    axios.create({
        headers: {
            'Authorization': `Bearer ${access_token}`, // Send the token in the 'Authorization' header
            'Content-Type': 'application/json', // Set the content type if needed
        },
    });