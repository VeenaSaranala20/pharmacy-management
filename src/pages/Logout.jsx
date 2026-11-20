
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
    window.location.reload();

  }, [navigate]);

  return null;
}

export default Logout;
