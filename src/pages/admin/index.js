import React, {Component} from "react";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Bank from '../bank';
import Dashboard from "../dashboard";
import Hours from "../hours";
import Menu from "../menu";
import Orders from "../orders";
import Profile from "../profile";
import Reviews from "../Reviews";
import Settings from "../settings";
import Staff from "../staff";
import Tables from "../tables";
import Transactions from "../transactions";
import Transfers from "../transfers";
import { Layout } from 'antd';
import LeftNav from "../../components/left-navigation";
import './index.less'
const { Header, Sider, Content } = Layout;
export default class Admin extends Component {
    render() {
        return (
            <Layout style={{height: '100%'}}>
                <BrowserRouter>
                    <Sider width = '15%'>
                        <LeftNav />
                    </Sider>
                    <Layout className="site-layout" style={{backgroundColor: 'rgba(0,0,0,0.1)'}}>
                        <Header style = {{height: '5%', textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.5rem'}}><span>Header Part</span></Header>
                        <Content className="site-layout-background"
                                 style={{
                                     margin: '24px 16px',
                                     padding: 24,
                                     minHeight: 280,
                                     backgroundColor: 'white'
                                 }}>
                            <Switch>
                                <Route path = '/bank' component = {Bank} />
                                <Route path = '/dashboard' component = {Dashboard} />
                                <Route path = '/hours' component = {Hours} />
                                <Route path = '/menu' component = {Menu} />
                                <Route path = '/orders' component = {Orders} />
                                <Route path = '/profile' component = {Profile} />
                                <Route path = '/reviews' component = {Reviews} />
                                <Route path = '/settings' component = {Settings} />
                                <Route path = '/staff' component = {Staff} />
                                <Route path = '/tables' component = {Tables} />
                                <Route path = '/transactions' component = {Transactions} />
                                <Route path = '/transfers' component = {Transfers} />
                                <Redirect to = '/tables' />
                            </Switch>
                        </Content>
                    </Layout>
                </BrowserRouter>
            </Layout>

        )
    }
}