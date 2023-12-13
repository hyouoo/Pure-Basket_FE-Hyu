import React, {useState} from "react";
import * as ST from "./style";
import {AiOutlineDelete} from "react-icons/ai";
import {Checkbox} from "antd";

const CartItem = ({cart}) => {
    console.log(cart);
    const [amount, setAmount] = useState(cart.amount);
    const [totalPrice, setTotalPrice] = useState(cart.price * cart.amount)
    const handleDelete = () => {
    };
    const onChange = (e) => {
    };
    const onClickMinus = () => {
        setAmount(prevAmount => {
            const newAmount = prevAmount - 1;
            setTotalPrice(cart.price * newAmount);
            return newAmount;
        })
    };
    const onClickPlus = () => {
        setAmount(prevAmount => {
            const newAmount = prevAmount + 1;
            setTotalPrice(cart.price * newAmount);
            return newAmount;
        })
    };

    return (
        <ST.CartItemRoot>
            <ST.CartItem>
                <Checkbox style={{marginLeft: '15px'}} onChange={onChange}/>
                <ST.ProductImage src={cart.imageUrl} alt=""/>
                <ST.Info>
                    <ST.ProductName>{cart.name}</ST.ProductName>
                    <ST.Price>{cart.price.toLocaleString('ko-KR')}원/EA</ST.Price>

                    <ST.HandleAmount>
                        <ST.Minus onClick={onClickMinus}/>
                        <ST.Amount>{amount}</ST.Amount>
                        <ST.Plus onClick={onClickPlus}/>
                    </ST.HandleAmount>
                </ST.Info>
                <ST.TotalPrice>{totalPrice.toLocaleString('ko-KR')}원</ST.TotalPrice>
                <AiOutlineDelete style={{marginRight: '25px'}} fontSize="20px" onClick={handleDelete}/>
            </ST.CartItem>
        </ST.CartItemRoot>
    );
};

export default CartItem;
