import React, {Component} from 'react'
import {Table, Modal, Button} from "antd";
import {MinusCircleTwoTone, PlusCircleTwoTone} from "@ant-design/icons";
import './index.less'
import PropTypes from 'prop-types';

export default class TableDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableOrder: props.tableOrder,
            tableName: props.tableName,
            column: [],
            totalPrice: this.getOrderPrice(),
            discount: 0
        }
    }

    getOrderPrice = () => {
        console.log("get Price!", this.props.tableOrder);
        let res = 0;
        const {tableOrder} = this.props;
        for(let i = 0; i < tableOrder.length; i++) {
            res += tableOrder[i].price * tableOrder[i].amount;
        }
        return res.toFixed(2);
    }

    tableInitializer = () => {
        const column = [
            {
                title: 'name',
                width: '12vw',
                render: item => {
                    return <div>
                        <span style = {{fontSize: '1rem'}}>{item.name}</span><br />
                        <span style = {{fontSize: '0.8rem', color: 'grey'}}>&nbsp;&nbsp;&nbsp;{item.desc}</span>
                    </div>
                }
            },
            {
                title: 'price',
                width: '6vw',
                render: item => {
                    let res = "$";
                    let price = this.getPrice(item.price).toString();
                    let length = price.length;
                    for(let i = 0; i < 6-length; i++)
                        res += " ";
                    res += price;
                    //console.log(res);
                    return res;
                }
            },
            {
                title: 'amount',
                width: '8vw',
                render: item => {
                    return <span>
                        <MinusCircleTwoTone twoToneColor='orange' onClick={() => this.props.decrementMenu(item)}/>
                        <span style={{marginLeft: '10px', marginRight: '10px'}}>{item.amount}</span>
                        <PlusCircleTwoTone twoToneColor='orange'  onClick={() => this.props.incrementMenu(item)}/>
                    </span>;
                }
            },
            {
                title: 'removeButton',
                render: item => {
                    return <Button type = 'link' style = {{color: 'red'}} onClick = {() => this.props.removeItem(item) }>Remove</Button>
                }
            }
        ];
        this.setState({
            column
        })
    }

    getDiscount = (event) => {
        let discount = event.target.value;
        console.log("discount", discount);
        this.setState({discount});
    }

    UNSAFE_componentWillMount() {
        this.tableInitializer();
    }


    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        console.log("nextProps:", nextProps);
        const {tableOrder} = nextProps;
        this.setState({
            tableOrder
        }, () => {
            this.setState({
                totalPrice: this.getOrderPrice()
            });
        });
    }

    render() {
        const closeIcon = <span style={{color: 'black', fontWeight: 'normal', marginRight: '1vw'}}>Open</span>;
        return (
                <Modal
                    visible={true}
                    title ={<span style = {{fontSize: '1.5rem', fontWeight: 'bold', marginTop: '20px', marginBottom: '20px'}}>Table:  {this.state.tableName}</span>}
                    cancelText="Cancel"
                    okText="OK"
                    onCancel={this.props.hideModal}
                    closeIcon={closeIcon}
                    width = {'50%'}
                    style = {{marginLeft: '20vw'}}
                    onOk={this.props.setOrder}
                >
                    <div className='left-part'>
                        Order Detail:<br />
                        <Table
                            noStyle
                            columns = {this.state.column}
                            dataSource = {this.props.tableOrder}
                            showHeader = {false}
                            rowKey = "name"
                            pagination = {false}
                            bordered = {false}
                        />

                        <div className="stats-part">
                            <p>
                                <span className='span-part'>Subtotal:</span><span>$&nbsp;&nbsp;&nbsp;&nbsp;{this.state.totalPrice}</span>
                            </p>
                            <p>
                                <span className='span-part'>Discount:</span><span>$&nbsp;-&nbsp;</span><input style = {{width: '3vw'}} onChange={this.getDiscount} name = "discountInput" defaultValue={0} />
                            </p>
                            <p>
                                <span className='span-part'>Tax:</span><span>$&nbsp;&nbsp;&nbsp;&nbsp;{(this.state.totalPrice*0.11).toFixed(2)}</span>
                            </p>
                            <p>
                                <span className='span-part'>Order Total:</span><span>$&nbsp;&nbsp;&nbsp;&nbsp;{(this.state.totalPrice*0.89-this.state.discount).toFixed(2) <= 0 ? 0 : (this.state.totalPrice*0.89-this.state.discount).toFixed(2)}</span>
                            </p>

                        </div>

                    </div>
                    <div className='right-part'>
                        <button onClick={this.printOrder} className="btn-array btn-start">Print Order</button>
                        <button onClick={this.printInvoice} className="btn-array">Print Invoice</button>
                        <button onClick={this.addItem} className="btn-array">Add Item</button>
                        <button onClick={this.endOrder} className="btn-array">End Order</button>
                        <button onClick={this.switchTable} className="btn-array">Switch Table</button>
                        <button onClick={this.tableSetting} className="btn-array btn-end">Table Setting</button>
                    </div>
                </Modal>
        );
    }

    printOrder = () => {
        console.log("print order");
    }

    printInvoice = () => {
        console.log("print invoice");
    }

    addItem = () => {
        console.log("Add Item");
    }

    endOrder = () => {
        console.log("end order");
    }

    switchTable = () => {
        console.log("switch table");
    }

    tableSetting = () => {
        this.props.tableSetting();
    }

    getPrice = (price) => {
        price = price.toFixed(2);
        return (price);
    }
}

TableDetail.propTypes = {
    tableOrder: PropTypes.array.isRequired,
    tableName: PropTypes.string.isRequired,
    hideModal: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    incrementMenu: PropTypes.func.isRequired,
    decrementMenu: PropTypes.func.isRequired,
    setOrder: PropTypes.func.isRequired
};