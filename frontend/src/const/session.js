import {jwtDecode} from "jwt-decode";

const IsSessionExpired = (token) => {
    console.log("yoken :", token)
    try {
        const { exp } = jwtDecode(token);  
        console.log("exp : ", exp)
        const currentTime = Date.now() / 1000;  
        console.log(currentTime,"CT")
        return exp < currentTime;  
    } catch (error) {
        console.error("Invalid token:", error);
        return true;  
    }
};

export default IsSessionExpired;
