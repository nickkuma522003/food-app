import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../app/slices/authSlice";
import { setCart } from "../app/slices/cartSlice";

const useFetchUser = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [setLoading] = useState(false)
  useEffect(() => {
    const getUserFromServer = async () => {
      try {
      
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user`, {
        
          headers: {

            "authorization": `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          dispatch(setUser(data.user));
          dispatch(setCart(data.user.cart))
        } else {
          dispatch(setUser(null));
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    if (token) {
      getUserFromServer();
    }
  }, [token]);
 
};

export default useFetchUser;
