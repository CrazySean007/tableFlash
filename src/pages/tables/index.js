import React, {Component} from "react";
import {Tabs, Card, Button, Row, Col, Modal, Form, Input, message, InputNumber} from 'antd';
import chair from '../../assets/images/chair32.svg'
import {MinusCircleTwoTone, PlusCircleTwoTone} from '@ant-design/icons'
import './index.less'
import TableDetail from "./tableDetail";
import tableStore from '../../utils/storeUtils'

const {TabPane} = Tabs;

export default class Tables extends Component {

    tableformRef = React.createRef();
    tableModify = React.createRef();

    state = {
        showState: 0,
        seatNumber: 1,
        table: {},
        tableOrder: [],
        tableList: []
    };



    UNSAFE_componentWillMount() {
        this.setState({
            tableList: this.getTableList()
        });
    }

    render() {

        const addTable = () => {
            this.tableformRef.current.resetFields();
            this.setState({
                showState: 1,
                seatNumber: 1
            })
        }

        const title = <Button type = 'primary' onClick = {addTable} style={{width: '150px'}}>
            Add Table
        </Button>;

        const DemoBox = props => <p style={{ height: props.value }} className="tableStyle" onClick={() => this.setTable(props)}>{props.children}</p>;
        return (
            <div>
                <Tabs defaultActiveKey = "dine">
                    <TabPane tab = "Dine In" key = "dine">
                        <Card title={title} bordered={false}>
                            <Form ref = {this.tableformRef} name="addTable">
                                <Modal
                                    visible={this.state.showState === 1}
                                    title = "Add Table"
                                    cancelText = "Cancel"
                                    okText = "OK"
                                    onCancel = {() => this.setState({showState: 0})}
                                    onOk = {this.handleOK}
                                >
                                    <Form.Item name='name' label="Table#:">
                                        <Input bordered={false}/>
                                    </Form.Item>
                                    <Form.Item label="Seat Capacity:">
                                        <span>
                                            <span style={{marginLeft: '20px', width: '50px', fontSize: '1rem'}}>
                                                <MinusCircleTwoTone twoToneColor='orange' onClick = {this.decrementCapacity} disabled = {true}/>
                                                    <span style={{marginLeft: '10px', marginRight: '10px'}}>{this.state.seatNumber}</span>
                                                <PlusCircleTwoTone twoToneColor='orange' onClick = {this.incrementCapacity}/>
                                            </span>
                                        </span>
                                    </Form.Item>
                                    <Form.Item  label="Table Size:">
                                        &nbsp;&nbsp;&nbsp;Length:&nbsp;&nbsp;<Form.Item name="length" noStyle initialValue={1}>
                                            <InputNumber min = {1} max={12} step={1}/>
                                        </Form.Item>
                                        &nbsp;&nbsp;&nbsp;Width:&nbsp;&nbsp;<Form.Item name="width" noStyle initialValue={1} >
                                            <InputNumber min={1} max={12} step={1}/>
                                        </Form.Item>
                                    </Form.Item>
                                </Modal>
                            </Form>

                            <Form ref = {this.tableModify} name="editTable">
                                <Modal
                                    visible={this.state.showState === 3}
                                    title = "Edit table"
                                    footer = {[
                                        // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
                                        <Button key="removeTable" type = "primary" style = {{backgroundColor: 'red', display: 'inline-block', float: 'left', marginLeft: '15px'}} onClick={() => this.removeCurrentTable()}>Remove Table</Button>,
                                        <Button key="cancel" onClick={this.hideModal}>Cancel</Button>,
                                        <Button key="submit" type="primary" onClick={this.setCurrentTable}>OK</Button>,
                                    ]}
                                    closable={true}
                                    onCancel={this.hideModal}
                                >
                                    <Form.Item name='name' label="Table#:">
                                        <Input bordered={false}/>
                                    </Form.Item>
                                    <Form.Item label="Seat Capacity:">
                                        <span>
                                            <span style={{marginLeft: '20px', width: '50px', fontSize: '1rem'}}>
                                                <MinusCircleTwoTone twoToneColor='orange' onClick = {this.decrementCapacity}/>
                                                    <span style={{marginLeft: '10px', marginRight: '10px'}}>{this.state.seatNumber}</span>
                                                <PlusCircleTwoTone twoToneColor='orange' onClick = {this.incrementCapacity}/>
                                            </span>
                                        </span>
                                    </Form.Item>
                                    <Form.Item  label="Table Size:">
                                        &nbsp;&nbsp;&nbsp;Length:&nbsp;&nbsp;<Form.Item name="length" noStyle initialValue={1}>
                                        <InputNumber min = {1} max={12} step={1}/>
                                    </Form.Item>
                                        &nbsp;&nbsp;&nbsp;Width:&nbsp;&nbsp;<Form.Item name="width" noStyle initialValue={1} >
                                        <InputNumber min={1} max={12} step={1}/>
                                    </Form.Item>
                                    </Form.Item>
                                </Modal>
                            </Form>

                            <Row justify="space-around" align="middle">
                                {
                                    this.state.tableList.map(
                                        table => (
                                            <Col span={table.length * 2+1} key = {table.name}>
                                                <DemoBox value = {table.width*80} tableInfo = {table}>
                                                    <span>
                                                        {table.name}
                                                        <br />
                                                        <img src = {chair} alt = ""/>
                                                            <span style={{fontSize: '1rem', fontWeight: 'normal'}}>
                                                                x {table.capacity}
                                                            </span>
                                                    </span>
                                                </DemoBox>
                                            </Col>
                                        )
                                    )
                                }
                            </Row>
                            {this.state.showState === 2 &&
                                <TableDetail
                                    tableOrder={this.state.currentOrder}
                                    tableName = {this.state.table.tableInfo.name}
                                    hideModal = {this.hideModal}
                                    removeItem = {this.removeItem}
                                    incrementMenu={this.incrementMenu}
                                    decrementMenu={this.decrementMenu}
                                    setOrder={this.setOrder}
                                    tableSetting = {this.tableSetting}
                                />}
                        </Card>
                    </TabPane>
                    <TabPane tab = "Pick Up" key = "pickup">
                        Pick Up Information
                    </TabPane>
                </Tabs>
            </div>
        );
    }

    getTableList = () => {
        return tableStore.getTable();
    };

    handleOK = ()=> {
        //add new elements to localstorage array
        let formRes = this.tableformRef.current.getFieldsValue();
        if(formRes.name) {
            formRes.key = formRes.name;
            formRes.capacity = this.state.seatNumber;
            console.log(formRes);
            tableStore.addTable(formRes);
            console.log(tableStore.getTable());
            this.setState({showState: 0, tableList: this.getTableList()});
        } else {
            message.error("The name cannot be empty! Please input a unique name for the table.");
        }

    };

    incrementCapacity = () => {
        this.setState(state => ({
            seatNumber: state.seatNumber + 1
        }));
    };

    decrementCapacity = () => {
        if(this.state.seatNumber === 1) {
            message.warn("The minimum number of capacity is 1!");
        } else {
            this.setState(state => ({
                seatNumber: state.seatNumber - 1
            }));
        }
    };

    hideModal = () => {
        this.setState({
            showState: 0
        })
    }

    setCurrentTable = () => {
        let formRes = this.tableModify.current.getFieldsValue();
        formRes.key = formRes.name;
        formRes.capacity = this.state.seatNumber;
        let i = 0;
        for(; i < this.state.tableList.length; i++)
            if(this.state.table.tableInfo.name === this.state.tableList[i].name)
                break;
        const tableRes = tableStore.alterTable(i, formRes);
        console.log("tableRes", tableRes);
        console.log(i);
        this.setState({
            tableList: tableRes,
            showState: 0
        });
    };

    setTable = (table) => {
        // console.log("setTable: ", table);
        this.setState({
            table,
            showState: 2,
            currentOrder: table.tableInfo.order,
        });
    }

    removeItem = (item) => {
        // console.log(item);
        const {currentOrder} = this.state;
        const newOrder = [...currentOrder];
        // console.log(currentOrder);
        for(let i = 0; i < newOrder.length; i++) {
            if(item.name === newOrder[i].name) {
                // console.log('Got it! '+ newOrder[i].name);
                newOrder.splice(i,1);
                // console.log('new table: ',newOrder);
                break;
            }
        }
        this.setState({
            currentOrder: newOrder
        });
    }

    decrementMenu = (item) => {

        const {currentOrder} = this.state;
        const newOrder = [...currentOrder];
        for(let i = 0; i < newOrder.length; i++) {
            if(item.name === newOrder[i].name) {
                //console.log('Got it! '+ newOrder[i].name);
                let prev = newOrder[i].amount;
                if(prev === 1) {
                    message.warning("The number cannot be under 1! If you want to cancel this meal, please click on the remove Button!");
                    return;
                }
                newOrder[i].amount = prev - 1;
                break;
            }
        }
        this.setState({
            currentOrder: newOrder
        });
    }

    incrementMenu = (item) => {
        const {currentOrder} = this.state;
        const newOrder = [...currentOrder];
        for(let i = 0; i < newOrder.length; i++) {
            if(item.name === newOrder[i].name) {
                //console.log('Got it! '+ newOrder[i].name);
                let prev = newOrder[i].amount;
                newOrder[i].amount = prev + 1;
                break;
            }
        }
        this.setState({
            currentOrder: newOrder
        });
    }

    setOrder = () => {
        const {currentOrder, table, tableList} = this.state;
        // console.log("currentOrder:", currentOrder);
        // console.log("table:", table);
        // console.log("tableList:", tableList);
        table.tableInfo.order = currentOrder;
        for(let i = 0; i < tableList.length; i++) {
            if(table.name === tableList[i].name) {
                //console.log("Find the altered table!");
                tableList[i] = {...table.tableInfo};
                break;
            }
        }
        this.setState({tableList, showState: 0});
    }

    tableSetting = () => {
        //modify tableModify component value using table information
        console.log("table Setting: ",this.state.table.tableInfo);
        const {name, length, width, capacity} = this.state.table.tableInfo;
        this.setState({seatNumber: capacity})
        this.tableModify.current.setFieldsValue({
            capacity,
            name,
            length,
            width,
        });
        this.setState({showState: 3});
    }

    removeCurrentTable() {
        tableStore.deleteTable(this.state.table.tableInfo);
        this.setState({
            tableList: tableStore.getTable(),
            showState: 0
        }, () => {
            console.log("new table list: ",this.state.tableList);
        });

    }
}