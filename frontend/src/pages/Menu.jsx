import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AllProduct from './AllProduct';
import { setMenu } from "../features/MenuSlice";

const Menu = () => {

    const dispatch = useDispatch();
    const menuList = useSelector((state) => state.menu.menuList);
  
    useEffect(() => {
      const fetchMenuItems = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/menu/"); 
          console.log(response.data)
          dispatch(setMenu(response.data));
        } catch (error) {
          console.error("Failed to fetch menu items:", error);
        }
      };
  
      fetchMenuItems();
    }, [dispatch]);

  return (
    <div className="p-2 md:p-4">
      <AllProduct heading={'Your Product'} />
    </div>
  );
};

export default Menu;
