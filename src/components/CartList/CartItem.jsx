import React, { useState } from "react";
import * as ST from "./style";
import { AiOutlineDelete } from "react-icons/ai";
import { InputNumber } from "antd";
import { Link } from "react-router-dom";

const CartItem = ({ instance, cart, changeAmounts }) => {
  const [amount, setAmount] = useState(cart.amount);
  const totalPrice = cart.price * amount;

  const onChange = (newAmount) => {
    setAmount(newAmount);
    changeAmounts(cart, newAmount);
    setTimeout(() => {
      instance.put(`/api/carts/${cart.id}`, { amount });
    }, 1500);
  };

  const handleDelete = async () => {
    await instance.delete(`/api/carts/${cart.id}`);
    window.location.reload();
  };

  return (
    <ST.CartItemRoot>
      <ST.CartItem>
        <Link to={`/products/${cart.id}`}>
          <ST.ProductImage src={cart.imageUrl} alt="" />
        </Link>
        <ST.Info>
          <ST.ProductName>{cart.name}</ST.ProductName>
          <ST.Price>{cart.price.toLocaleString("ko-KR")}원/EA</ST.Price>
          <InputNumber min={1} defaultValue={amount} onChange={onChange} />
        </ST.Info>
        <ST.TotalPrice>{totalPrice.toLocaleString("ko-KR")}원</ST.TotalPrice>
        <AiOutlineDelete
          type="button"
          cursor="pointer"
          style={{ marginRight: "25px" }}
          fontSize="20px"
          onClick={handleDelete}
        />
      </ST.CartItem>
    </ST.CartItemRoot>
  );
};

export default CartItem;
