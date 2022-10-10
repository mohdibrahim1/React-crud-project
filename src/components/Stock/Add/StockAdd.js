import React, { useContext } from 'react';
import { PageContex, postStock, putStock } from '../service';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 6,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 8,
    },
};
export const StockAdd = () => {
    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onSearch(val) {
        console.log('search:', val);
    }
    const Context = useContext(PageContex);
    console.log("context.form data", Context.formdata)
    const addStock = (data) => {
        postStock(data).then(res => {
            console.log("post data response", res.data);
        })
    }
    const updateStock = (data) => {
        putStock(data).then(res => {
            console.log("updated record", res.data)
        })
    }
    const onFieldChange = (field, value) => {
        Context.setformdata({ ...Context.formdata, [field]: value });

    }

    const onSave = () => {
        // e.preventDefault()
        if (!!Context.formdata.id) {
            updateStock(Context.formdata);
        } else {
            addStock(Context.formdata);
        }
    }
    //    const onFinish = () => {
    //         console.log(Context.formdata);
    //       };
    const formRef = React.createRef();

    const onReset = () => {
        formRef.current.resetFields();
    };
    return (
        <>
            {/* <form action="" onSubmit={(e) => onSave(e)}>
                <label htmlFor="name">Stock Name:</label>
                <input type="text"  value={Context.formdata.name} onChange={(e)=>onFieldChange('name',e.target.value)}/> <br />
                <label htmlFor="start">Start:</label>
                <input type="number" value={Context.formdata.start} onChange={(e)=>onFieldChange('start',+(e.target.value))}/> <br />
                <label htmlFor="end">End:</label>
                <input type="number" value={Context.formdata.end} onChange={(e)=> onFieldChange('end',+(e.target.value))}/> <br />
                <label htmlFor="yearHigh">YearHigh:</label>
                <input type="number" value={Context.formdata.yearHigh} onChange={(e)=>onFieldChange('yearHigh',+(e.target.value))}/> <br />
                <label htmlFor="yearLow">YearLow:</label>
                <input type="number" value={Context.formdata.yearLow} onChange={(e)=> onFieldChange('yearLow',+(e.target.value))}/><br />
                <button type='submit'>submit</button>
            </form> */}
            <Form {...layout} ref={formRef} name="control-ref" onFinish={onSave}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input type="text"
                        value={Context.formdata.name}
                        onChange={(e) => onFieldChange('name', e.target.value)} />
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.Search type="text"
                        value={Context.formdata.name}
                        onChange={(e) => onFieldChange('name', e.target.value)} />
                    <Select
                        value={Context.formdata.name}
                        onChange={(e) => onFieldChange('name', e.target.value)}
                        showSearch
                        placeholder="Select a stock"
                        optionFilterProp="children"
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        

                        <Option value={Context.formdata.name}>{Context.formdata.name}</Option>

                    </Select>,
                </Form.Item>
                <Form.Item
                    name="start"
                    label="Start"
                >
                    <Input type="number"
                        value={Context.formdata.start}
                        onChange={(e) => onFieldChange('start', Number(e.target.value))} />
                </Form.Item>
                <Form.Item
                    name="end"
                    label="End"
                >
                    <Input type="number"
                        value={Context.formdata.end}
                        onChange={(e) => onFieldChange('end', +(e.target.value))} />
                </Form.Item>
                <Form.Item
                    name="yearHigh"
                    label="YearHigh"
                >
                    <Input type="number"
                        value={Context.formdata.yearHigh}
                        onChange={(e) => onFieldChange('yearHigh', +(e.target.value))} />
                </Form.Item>
                <Form.Item
                    name="yearLow"
                    label="YearLow"
                >
                    <Input type="number"
                        value={Context.formdata.yearLow}
                        onChange={(e) => onFieldChange('yearLow', +(e.target.value))} />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
