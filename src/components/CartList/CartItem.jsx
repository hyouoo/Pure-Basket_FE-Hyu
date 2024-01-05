import React, { useState } from "react";
import * as ST from "./style";
import { AiOutlineDelete } from "react-icons/ai";
import { InputNumber } from "antd";
import { Link } from "react-router-dom";
import { userState } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";
import { createJwtInstance } from "../../network/axios";

const CartItem = ({ cart, changeAmounts, onDelete }) => {
    const [amount, setAmount] = useState(cart.amount);
    const { token } = useRecoilValue(userState);
    
    const jwtInstance = createJwtInstance(token);
    const totalPrice = cart.price * amount;


    const onChange = (newAmount) => {
        setAmount(newAmount);
        changeAmounts(cart, newAmount);
        setTimeout(() => {
            jwtInstance.put(`carts/${cart.id}`, { amount });
        }, 1500);
    };

    const handleDelete = async () => {
        await jwtInstance.delete(`carts/${cart.id}`);
        onDelete(cart.id);
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
