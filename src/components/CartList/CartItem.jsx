import React, { useState } from "react";
import * as ST from "./style";
import { AiOutlineDelete } from "react-icons/ai";
import { Checkbox } from "antd";

const CartItem = ({ instance, cart }) => {
  const [amount, setAmount] = useState(cart.amount);
  const totalPrice = cart.price * amount;

  const onChange = () => {};
  const onClickMinus = () => {
    setAmount(amount - 1);
  };
  const onClickPlus = () => {
    setAmount(amount + 1);
  };
  const handleChange = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await instance.put(`/api/carts/${cart.id}`, { amount });
  };
  const handleDelete = async () => {
    await instance.delete(`/api/carts/${cart.id}`);
  };

  return (
    <ST.CartItemRoot>
      <ST.CartItem>
        <Checkbox style={{ marginLeft: "15px" }} onChange={onChange} />
        <ST.ProductImage src={cart.imageUrl} alt="" />
        <ST.Info>
          <ST.ProductName>{cart.name}</ST.ProductName>
          <ST.Price>{cart.price.toLocaleString("ko-KR")}원/EA</ST.Price>

          <ST.HandleAmount>
            <ST.Minus onClick={onClickMinus} />
            <ST.Amount onChange={handleChange}>{amount}</ST.Amount>
            <ST.Plus onClick={onClickPlus} />
          </ST.HandleAmount>
        </ST.Info>
        <ST.TotalPrice>{totalPrice.toLocaleString("ko-KR")}원</ST.TotalPrice>
        <AiOutlineDelete
          style={{ marginRight: "25px" }}
          fontSize="20px"
          onClick={handleDelete}
        />
      </ST.CartItem>
    </ST.CartItemRoot>
  );
};

export default CartItem;
