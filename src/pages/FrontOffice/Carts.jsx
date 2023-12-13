import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Button, Table} from 'antd';
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms';
import { createJwtInstance, defaultInstance } from '../../network/axios';
import CartItem from "../../components/CartList/CartItem";


const Carts = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [carts, setCarts] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const navigate = useNavigate();
    const {token} = useRecoilValue(userState);
    const jwtInstance = createJwtInstance(token);
    const getCarts = async () => {
        const { data } = await jwtInstance.get(`/api/carts`)
        setCarts(data);
        setIsLoading(false);
    }

    useEffect(() => {
        getCarts();
    }, []);

    return (
        <div>
            <div style={{marginBottom: 16,}}>
                <Button
                    type="primary"
                    onClick={start}
                    disabled={!hasSelected}
                    loading={loading}
                >
                    Reload
                </Button>
                <span style={{marginLeft: 8,}}>
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>
            <div>
                {/*<Table rowSelection={rowSelection} columns={columns} dataSource={data}/>*/}
                {isLoading || (
                    carts.map(cart => {
                        return <CartItem cart={cart} />
                    })
                )}
            </div>
        </div>
    );
};

export default Carts;
