import store from 'store'
import {message} from "antd";

const TABLE_KEY = 'table_key';
const order = [
    {
        name: "Pork Feet Noodles",
        price: 9.5,
        desc: "Egg soup, less spicy",
        amount: 2
    },
    {
        name: "Twice Cooked Pork blah",
        price: 8.34,
        desc: "Egg soup, less spicy",
        amount: 2
    },
    {
        name: "test test test",
        price: 2.10,
        desc: "test test",
        amount: 2
    },
    {
        name: "test 4",
        price: 2.10,
        desc: "test test",
        amount: 2
    }
];
export default {
    addTable(table) {
        let current = this.getTable();
        table.order = order;
        console.log("current: "+current);
        const searchTable = current.find(tmp => tmp.name === table.name);
        if(!searchTable) {
            current.push(table);
            console.log("updated: "+current);
            store.set(TABLE_KEY, current);
        } else
            message.error("table name already existed! Please use a new name");

    },

    getTable() {
        return store.get(TABLE_KEY)||[];
    },

    clearTable() {
        store.remove(TABLE_KEY);
    },

    deleteTable(table) {
        let tableList = this.getTable();
        for(let i = 0; i < tableList.length; i++) {
            if(table.name === tableList[i].name) {
                tableList.splice(i, 1);
                break;
            }
        }
        this.clearTable();
        for(let i = 0; i < tableList.length; i++) {
            this.addTable(tableList[i]);
        }
    },

    alterTable(index, table) {
        let tableList = this.getTable();
        this.clearTable();
        let mark = false;
        if(!this.judgeName(index, tableList, table)) {
            //repeat name exist
            table.name = tableList[index].name;
        }
        for(let i = 0; i < tableList.length; i++) {
            if(i !== index)
                this.addTable((tableList[i]));
            else {
                this.addTable(table);
                mark = true;
                message.success("Alteration successful!");
            }
        }
        if(!mark)
            message.warn("The table you wanna alter does not exist!");
        return this.getTable();
    },

    judgeName(index, tableList, table) {
        for(let i = 0; i < tableList.length; i++) {
            if(i !== index && table.name === tableList[i].name)
                return false;
        }
        return true;
    }
}