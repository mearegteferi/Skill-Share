import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CartProduct from './cartProduct';
import emptyCartImage from '../assets/empty.gif';
import { toast } from 'react-hot-toast';

const Cart = () => {
  const productCartItem = useSelector((state) => state.cart.cartItem);

  const [UserData, setUserData] = useState({
    full_name: '',
    address: '',
    phone: '',
  });

  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total, 10),
    0,
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty, 10),
    0,
  );

  const cartItem = productCartItem.map((item) => ({
    name: item.name,
    qty: item.qty,
  }));

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { full_name, address, phone } = UserData;

    if (full_name && address && phone) {
      try {
        // Sending data to backend to get the payment URL
        const response = await axios.post(
          'http://127.0.0.1:8000/order/',
          {
            UserData,
            cartItem,
            totalPrice,
            totalQty,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        console.log('Backend Response:', response.data);
        
        if (response.data.payment_url) {
          // Redirect to the payment URL
          window.location.href = response.data.payment_url;
        } else {
          toast('Failed to retrieve payment URL.');
        }
      } catch (error) {
        console.error(error);
        toast('Failed to place order. Please try again.');
      }
    } else {
      toast('Please fill in all required fields.');
    }
  };

  return (
    <div className="p-2 md:p-4">
      <h2 className="text-lg font-bold text-slate-600 md:text-2xl">
        Your Cart Items
      </h2>

      {productCartItem.length > 0 ? (
        <div className="my-4 flex gap-3">
          <div className="w-full max-w-3xl">
            {productCartItem.map((el) => (
              <CartProduct
                key={el._id}
                id={el._id}
                name={el.name}
                image={el.image}
                category={el.category}
                qty={el.qty}
                total={el.total}
                price={el.price}
              />
            ))}
          </div>
          <div className="ml-auto w-full max-w-md">
            <h2 className="bg-blue-500 p-2 text-lg text-white">Summary</h2>
            <div className="flex w-full border-b py-2 text-lg">
              <p>Total Qty :</p>
              <p className="ml-auto w-32 font-bold">{totalQty}</p>
            </div>
            <div className="flex w-full border-b py-2 text-lg">
              <p>Total Price</p>
              <p className="ml-auto w-32 font-bold">
                <span className="text-red-500">₹</span> {totalPrice}
              </p>
            </div>
            <form className="flex w-full flex-col py-3" onSubmit={handleSubmit}>
              <label htmlFor="full_name">Name</label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                className="mb-2 mt-1 w-full rounded bg-slate-200 px-2 py-1 focus-within:outline-blue-300"
                value={UserData.full_name}
                onChange={handleOnChange}
              />

              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                className="mb-2 mt-1 w-full rounded bg-slate-200 px-2 py-1 focus-within:outline-blue-300"
                value={UserData.address}
                onChange={handleOnChange}
              />

              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="mb-2 mt-1 w-full rounded bg-slate-200 px-2 py-1 focus-within:outline-blue-300"
                value={UserData.phone}
                onChange={handleOnChange}
              />

              <button
                className="m-auto mt-4 w-full max-w-[150px] cursor-pointer rounded-full bg-blue-300 py-1 text-center text-xl font-medium text-white hover:bg-blue-600"
              >
                Order
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center justify-center">
          <img
            src={emptyCartImage}
            className="w-full max-w-sm"
            alt="Empty Cart"
          />
          <p className="text-3xl font-bold text-slate-500">Empty Cart</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
