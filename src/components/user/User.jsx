import React from 'react'
import {Button} from 'antd'
import EditableTable from '../common/editable/EditableTable'
import {axiosAjax} from '../../service/getService';

class User extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentPage:1,
            pageSize:10,
            total:0
        }
    }
    componentDidMount() {
        this.getUserList();
    }
    async getUserList(){
        let param = {
            currentPage:this.state.currentPage,
            pageSize:this.state.pageSize,
            table:"user"
        }
        let {data} = await axiosAjax(["user","list"],param,"post")
        console.log(data)
    }
    render(){
        return <div>
            <EditableTable pagination/>
        </div>
    }
}

export default User
