import styled from "styled-components";
import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";

export const CartItemRoot = styled.div`
position: relative;
border: 2px solid gainsboro;
border-radius: 20px;
background-color: whitesmoke;
box-sizing: border-box;
width: 550px;
display: flex;
flex-direction: row;
overflow: hidden;
`;

export const CartItem = styled.div`
position: relative;
width: 100%;
height: 120px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-start;

`;

export const Info = styled.div`
flex-grow: 3;
height: 110px;
display: flex;
flex-direction: column;
justify-content: space-evenly;
`;

export const Summary = styled.div`

`;

export const ProductImage = styled.img`
margin: 10px;
width: 100px;
height: 100px;
`;

export const ProductName = styled.div`
font-size: 20px;
`;

export const Price = styled.div`
flex-basis: 40px;
font-size: 15px;
`;

export const HandleAmount = styled.div`
width: 80px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

export const Minus = styled.div`
display: inline-block;
width: 20px;
height: 20px;
background: linear-gradient(#000, #000), linear-gradient(#000, #000);
background-position: center;
background-size: 40% 2px;
background-repeat: no-repeat;
border: 1px solid rgba(0, 0, 0, 0.3);
border-radius: 50%;
cursor: pointer;
`;

export const Plus = styled(Minus)`
background-size: 40% 2px, 2px 40%;
`;

export const MinusNoClick = styled(Minus)`
opacity: 0.15;
border: 1px solid rgba(0, 0, 0, 0.8);
cursor: default;
`;

export const Amount = styled.div`
font-size: 15px;
`;

export const Delete = styled.img`

`;

export const TotalPrice = styled.p`
font-size: 20px;
flex-grow: 1;
`;






