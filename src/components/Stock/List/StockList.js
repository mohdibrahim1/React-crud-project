import React, { useContext, useEffect } from 'react';
import { deleteStock, getStockList, PageContex } from '../service';
import { Table, Tag, Space, Button } from 'antd';

export const StockList = ( ) => {

    const Context = useContext(PageContex);
    useEffect(() => {

        getStockList().then((res) => {
            console.log("get stock list response", res.data.stockList)
            Context.dispatch({ type: 'List', data: res.data.stockList })
        })
    }, [])

    const onDelete = (id) => {
        deleteStock(id).then(res => {
            console.log("delete response", res)
        })
    }

    const onEdit = (obj) => {
        console.log("on edit",obj)
        Context.setformdata(obj);
        // console.log("onedit context",Context.formdata)
    }
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Start',
            dataIndex: 'start',
            key: 'start',
        },
        {
            title: 'End',
            dataIndex: 'end',
            key: 'end',
        },
        {
            title: 'YearHigh',
            dataIndex: 'yearHigh',
            key: 'yearHigh',
        },
        {
            title: 'YearLow',
            dataIndex: 'yearLow',
            key: 'yearLow',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record ) => (
                <Space size="middle">
                    {/* <a>Invite {record.name}</a> */}
                    <Button type="primary" onClick={() => onEdit(record)}>Edit</Button>
                    <Button type="danger" style={{marginLeft:12}} onClick={() => onDelete(record.id)}>Delete</Button>
                </Space>
            ),
        }
    ];
    return (
        <>
         <Table  rowKey="id" columns={columns} dataSource={Context.state.data} />
            {/* <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>YearHgh</th>
                        <th>YearLow</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                {!!Context.state.data ?
                    <tbody>
                        {
                            Context.state.data.map(el => {
                                return (
                                    <tr key={el.id}>
                                        <td>{el.id}</td>
                                        <td>{el.name}</td>
                                        <td>{el.start}</td>
                                        <td>{el.end}</td>
                                        <td>{el.yearHigh}</td>
                                        <td>{el.yearLow}</td>
                                        <td><button onClick={() => onEdit(el)}>Edit</button><Button type="danger" onClick={() => onDelete(el.id)}>Delete</Button> </td> </tr>
                                )
                            })
                        }
                    </tbody> : <div>No Record Found</div>
                }
            </table> */}
            {/* <button onClick={()=>onDelete(el.id)}>Delete</button> */}
        </>
    );
};
