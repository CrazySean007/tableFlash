import React, {Component} from 'react';
import { SmileOutlined, FileTextOutlined, SettingOutlined, PieChartOutlined, MenuOutlined, ClockCircleOutlined, MessageOutlined, AccountBookOutlined, TransactionOutlined } from '@ant-design/icons';
import './index.less'
import {Menu} from 'antd'
import logo from '../../assets/images/logo1.png'
import {Link, withRouter} from "react-router-dom";
class LeftNav extends Component {

    render() {
        this.selectedKey = this.props.location.pathname;
        return (
            <div className="leftNav">
                <div className="left-nav-header">
                    <img src={logo} alt = ""/>
                    <h1 className="left-nav-title">backend</h1>
                </div>
                <Menu
                    theme='dark'
                    onClick={this.handleClick}
                    defaultSelectedKeys={['/tables']}
                    mode="inline"
                    selectedKeys = {this.selectedKey}
                >
                    <Menu.Item
                        key = "/dashboard"
                        icon={<PieChartOutlined />}
                    >
                        <Link to = '/dashboard'>
                            Dashboard
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        key = "/tables"
                        icon={<FileTextOutlined />}
                    >
                        <Link to = '/tables'>
                            Tables
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        key = "/orders"
                        icon={<FileTextOutlined />}
                    >
                        <Link to = '/orders'>
                            Orders
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        key = "/menu"
                        icon={<MenuOutlined />}
                    >
                        <Link to = '/menu'>
                            Menu
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        key = "/profile"
                        icon={<FileTextOutlined />}
                    >
                        <Link to = '/profile'>
                            Profile
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        key = "/hours"
                        icon={<ClockCircleOutlined />}
                    >
                        <Link to = '/hours'>
                            Hours
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        key = "/reviews"
                        icon={<MessageOutlined />}
                    >
                        <Link to = '/reviews'>
                            Reviews
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        key = "/bank"
                        icon={<AccountBookOutlined />}
                    >
                        <Link to = '/bank'>
                            Bank Account
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        key = "/transactions"
                        icon={<AccountBookOutlined />}
                    >
                        <Link to = '/transactions'>
                            Transactions
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        key = "/transfers"
                        icon={<TransactionOutlined />}
                    >
                        <Link to = '/transfers'>
                            Transfers
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        key = "/staff"
                        icon={<SmileOutlined />}
                    >
                        <Link to = '/staff'>
                            Staff
                        </Link>
                    </Menu.Item>
                    <Menu.Item
                        key = "/settings"
                        icon={<SettingOutlined />}
                    >
                        <Link to = '/settings'>
                            Settings
                        </Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav)