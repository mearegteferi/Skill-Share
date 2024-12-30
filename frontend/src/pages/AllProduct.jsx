import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";
import FilterProduct from "./FilterProduct";

const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.menu.menuList);

  // Extract the category list from the product data
  const categoryList = productData.map((category) => category.name);

  // State for filtering and display
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  // Update filtered data whenever the productData or filter changes
  useEffect(() => {
    if (filterby) {
      const category = productData.find(
        (cat) => cat.name.toLowerCase() === filterby.toLowerCase()
      );
      setDataFilter(category ? category.menu_items : []);
    } else {
      // If no filter selected, combine all items from all categories
      const allItems = productData.flatMap((category) => category.menu_items);
      setDataFilter(allItems);
    }
  }, [filterby, productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category);
  };

  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>

      {/* Category Filters */}
      <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
        {categoryList.length > 0 ? (
          categoryList.map((el) => (
            <FilterProduct
              category={el}
              key={el}
              isActive={el.toLowerCase() === filterby.toLowerCase()}
              onClick={() => handleFilterProduct(el)}
            />
          ))
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="flex flex-wrap justify-center gap-4 my-4">
        {dataFilter.length > 0 ? (
          dataFilter.map((el, index) => (
            <CardFeature
              key={index} // Replace this with a unique identifier if available
              id={index}
              ingredients={el.ingredients}
              image={el.image}
              name={el.name}
              category={filterby || "All Categories"}
              price={el.price}
              preparation_time={el.preparation_time}
            />
          ))
        ) : (
          loadingArrayFeature.map((_, index) => (
            <CardFeature loading="Loading..." key={index + "allProduct"} />
          ))
        )}
      </div>
    </div>
  );
};

export default AllProduct;
