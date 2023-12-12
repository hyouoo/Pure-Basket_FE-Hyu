//Carts 페이지에 들어가는 axios 모듈
import axios from "axios";

//Carts 조회
const getCarts = async () => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/carts`
    );
    console.log("res", res.data);
    return res.data;
  } catch (error) {
    console.log("getCarts통신오류입니다.", error);
  }
};

//Cart 추가
const addCart = async ({ productId, amount }) => {
  // const accessToken = cookies.get("token");
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/carts/${productId}`,
      amount
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //     authorization: `Bearer ${accessToken}`,
      //   },
      // }
    );
    return res.data;
  } catch (error) {
    console.log("addCart통신오류입니다.", error);
  }
};

//Cart 수정
const putCart = async ({ productId, amount }) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/api/carts/${productId}`,
      amount
    );
    return res.data;
  } catch (error) {
    console.log("putCart통신오류입니다.", error);
  }
};

//Cart 삭제
const deleteCart = async (productId) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/api/carts/${productId}`
    );
    return res.data;
  } catch (error) {
    console.log("deleteCart통신오류입니다.", error);
  }
};

export { getCarts, addCart, putCart, deleteCart };
