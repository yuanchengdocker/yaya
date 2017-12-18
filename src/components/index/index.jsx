import React from 'react'
import {Button} from 'antd'
import MemeberCreater from './member/Creater'
import EditableTable from '../common/editable/EditableTable'
import {axiosAjax} from '../../service/getService';

class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            singleVisibal:false,
            batchVisibal:false
        }
    }
    memberSingleAdd(){

    }
    memberBatchAdd(){

    }
    getMemberList(){
        console.log("getMemberList")
    }
    memberCreaterVisibal(flag){
        this.setState({
            batchVisibal:flag
        })
    }
    render(){
        let columns = [{
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            editable:true,
        }, {
            title: 'age',
            dataIndex: 'age',
            width: '15%',
            editable:true,
        }, {
            title: 'address',
            dataIndex: 'address',
            width: '40%',
            editable:true,
        }];

        return <div>
            <Button className="editable-add-btn" onClick={this.memberSingleAdd.bind(this,true)}>单个新增</Button>
            <Button className="editable-add-btn" onClick={this.memberCreaterVisibal.bind(this,true)}>批量新增</Button>
            {
                this.state.batchVisibal?
                <MemeberCreater sucFn={this.getMemberList.bind(this)} visibleFn={this.memberCreaterVisibal.bind(this)} visible={this.state.batchVisibal}/>
                :""
            }
            <EditableTable columns={columns}/>
        </div>
    }
}

export default Index;
