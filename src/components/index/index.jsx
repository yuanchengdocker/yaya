import React from 'react'
import ReactDOM from 'react-dom'
import {Button,notification,Input} from 'antd'
const Search = Input.Search;
import MemeberCreater from './member/Creater'
import EditableTable from '../common/editable/EditableTable'
import {axiosAjax} from '../../service/getService';
import SingleAdd from './member/SingleAdd'

class Index extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            singleVisibal:false,
            batchVisibal:false,
            pagination:{
                current:1,
                pageSize:10,
                total:0
            },
            activeFn:{
                update:this.updateMember.bind(this),
                delete:this.deleteMember.bind(this),
                page:this.getMemberList.bind(this)
            }
        }
    }
    async updateMember(member,index,callback){
        
        let {data,messgage} = await axiosAjax(["member","update"],member,"post")
        if(data){
            callback(data)
        }else{
            notification['warn']({
                message: '修改失败',
                description: messgage,
            });
        }
    }
    async deleteMember(member,callback){
        let {data} = await axiosAjax(["member","delete"],member,"post")
        if(data){
            this.getMemberList();
            callback&&callback();
            notification['success']({
                message: '成功',
                description: "删除成功"
            });
        }
    }
    componentDidMount(){
        this.getMemberList();
    }
    memberSingleAdd(){

    }
    memberBatchAdd(){

    }
    async getMemberList(page,param2){
        let param = {
            currentPage:(page&&page.current)||this.state.pagination.current,
            pageSize:(page&&page.pageSize)||this.state.pagination.pageSize,
            table:"member",
            param:param2||{}
        }
        let {data,total} = await axiosAjax(["member","list"],param,"post")
        console.log(data)
        this.setState({
            data:data,
            pagination:{
                current:param.currentPage,
                pageSize:param.pageSize,
                total:total
            }
        })
    }
    memberCreaterVisibal(flag){
        this.setState({
            batchVisibal:flag
        })
    }
    memberSingleAddVisibal(flag){
        this.setState({
            singleVisibal:flag
        })
    }
    memberSearch(value){
        this.getMemberList(this.state.pagination,{
            name:value,
            phone:value
        })
    }
    render(){
        let columns = [{
            title: 'name',
            dataIndex: 'name',
            width: '15%',
            editable:true,
        }, {
            title: 'phone',
            dataIndex: 'phone',
            width: '25%',
            editable:true,
        }, {
            title: 'address',
            dataIndex: 'address',
            width: '40%',
            editable:true,
        }];

        return <div>
            <Button className="editable-add-btn" onClick={this.memberSingleAddVisibal.bind(this,true)}>单个新增</Button>
            <SingleAdd flag={"add"} sucFn={this.getMemberList.bind(this)} visibleFn={this.memberSingleAddVisibal.bind(this)} visible={this.state.singleVisibal}/>
            <Button className="editable-add-btn" onClick={this.memberCreaterVisibal.bind(this,true)}>批量新增</Button>
            {
                this.state.batchVisibal?
                <MemeberCreater sucFn={this.getMemberList.bind(this)} visibleFn={this.memberCreaterVisibal.bind(this)} visible={this.state.batchVisibal}/>
                :""
            }
            <Search
                placeholder="input search text"
                onSearch={this.memberSearch.bind(this)}
                enterButton/>
            <EditableTable activeFn={this.state.activeFn} columns={columns} pagination={this.state.pagination} data={this.state.data}/>
        </div>
    }
}

export default Index;
