import React, { useState } from "react";
import * as ST from "./style";
import { AiOutlineDelete } from "react-icons/ai";
import { Checkbox } from "antd";

const CartItem = (props) => {
  const price = 1000;
  const [amount, setAmount] = useState(1);
  const [totalPrice, setTotalPrice ] = useState(price)
  const handleDelete = () => {};
  const onChange = (e) => {};
  const onClickMinus = () => {
    setAmount(amount - 1)
    setTotalPrice(price * amount)
  };
  const onClickPlus = () => {
    setAmount(amount + 1)
    setTotalPrice(price * this.amount)
  };
  return (
    <ST.CartItemRoot>
      <ST.CartItem>
        <Checkbox style={{marginLeft: '15px'}} onChange={onChange} />
        <ST.ProductImage src={props.imgUrl} alt="" />
        <ST.Info>
          <ST.ProductName>name{props.name}</ST.ProductName>
          <ST.Price>price{props.price}</ST.Price>

          <ST.HandleAmount>
            <ST.Minus onClick={onClickMinus} />
            <ST.Amount>{amount}</ST.Amount>
            <ST.Plus onClick={onClickPlus}/>
          </ST.HandleAmount>
        </ST.Info>
        <ST.TotalPrice>{totalPrice}</ST.TotalPrice>
        <AiOutlineDelete style={{marginRight: '15px'}}fontSize="20px" onClick={handleDelete} />
      </ST.CartItem>
    </ST.CartItemRoot>
  );
};

export default CartItem;
