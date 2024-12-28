import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");   
    localStorage.removeItem("usertype");   
    navigate("/login");
  }, [navigate]);   

  return null;   
};

export default Logout;
