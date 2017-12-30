import React from 'react'
import ReactDOM from 'react-dom'
import {Button,notification,Input} from 'antd'
const Search = Input.Search;
import MemeberCreater from './member/Creater'
import {getUser,delUser,getUserFlag} from '../userInit'
import EditableTable from '../common/editable/EditableTable'
import {axiosAjax} from '../../service/getService';
import {formatDateTime} from '../../utils/optTime'
import SingleAdd from './member/SingleAdd'
import {ep} from '../../utils/create-events'
import {downloadExl} from '../../utils/fileInportExport'

class Index extends React.Component{
    constructor(props){
        super(props)
        let userFlag = getUserFlag();
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
            },
            colMatch:{name:"姓名",phone:"电话",integral:"积分",birthday:"生日"},
            isRoot:userFlag=="root"
        }
        
    }
    async updateMember(member,index,callback){
        
        let {data,messgage} = await axiosAjax(["member","update"],member,"post")
        if(data){
            callback(data)
            notification['success']({
                message: '成功',
                description: "修改成功"
            });
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
    componentWillUpdate () {
        let userFlag = getUserFlag();
        this.state.isRoot = (userFlag=="root")
    }
    componentDidMount(){
        let self = this;
        ep.on("is_login_flag",function(user){
			if(user){
                let userFlag = getUserFlag();
                self.state.isRoot = (userFlag=="root")
                self.getMemberList();
            }
		});
        let user = getUser();
        if(user){
            self.getMemberList();
        }
    }
    async exportMembers(){
        let param = {
            currentPage:1,
            pageSize:10000,
            table:"member"
        }
        let {data,total,code,messgage} = await axiosAjax(["member","list"],param,"post")
        let downdata = [];
        data&&data.map((item)=>{
            let eitem = {};
            for(let key in this.state.colMatch){
                eitem[this.state.colMatch[key]] = item[key]
            }
            downdata.push(eitem)
        })
        downloadExl(downdata)
    }
    async getMemberList(page,param2){
        let param = {
            currentPage:(page&&page.current)||this.state.pagination.current,
            pageSize:(page&&page.pageSize)||this.state.pagination.pageSize,
            table:"member",
            param:param2||{}
        }
        let {data,total,code,messgage} = await axiosAjax(["member","list"],param,"post")
        if(code != 1000){
            notification['error']({
                message: '失败',
                description: messgage
            });
            if(code == 1009){
                delUser();
            }
        }
        data&&data.map((item)=>{
            item.create_time = formatDateTime(item.create_time)
        })
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
            title: '姓名',
            dataIndex: 'name',
            width: '12%',
            editable:true,
        }, {
            title: '电话',
            dataIndex: 'phone',
            width: '20%',
            editable:true,
        }, {
            title: '积分',
            dataIndex: 'integral',
            width: '10%',
            editable:true,
        }, {
            title: '生日',
            dataIndex: 'birthday',
            width: '19%',
            editable:true,
        },{
            title: '创建时间',
            dataIndex: 'create_time',
            width: '19%',
            editable:false,
        }];
        
        return <div>
            <a href="" download="会员全部信息.xlsx" id="hf"></a>
            <Button type="primary" size="large" className="editable-add-btn ya-mt10 ya-mb10 ya-mr10" onClick={this.memberSingleAddVisibal.bind(this,true)}>单个新增</Button>
            <SingleAdd flag={"add"} sucFn={this.getMemberList.bind(this)} visibleFn={this.memberSingleAddVisibal.bind(this)} visible={this.state.singleVisibal}/>
            <Button type="primary" size="large" className="editable-add-btn ya-mt10 ya-mb10 ya-mr10" onClick={this.memberCreaterVisibal.bind(this,true)}>批量新增</Button>
            {
                this.state.isRoot?
                <Button type="primary" size="large" className="editable-add-btn ya-mt10 ya-mb10 ya-mr10" onClick={this.exportMembers.bind(this)}>批量导出</Button>
                :""
            }
            <div className="ya-mb10 ya-inline-block" style={{width:"46%"}}>
            <Search
                placeholder="您可通过会员 ’姓名’ 或 ‘电话号码’ 进行查找"
                onSearch={this.memberSearch.bind(this)}
                style={{height: 32}}
                enterButton/></div>
            {
                this.state.batchVisibal?
                <MemeberCreater sucFn={this.getMemberList.bind(this)} visibleFn={this.memberCreaterVisibal.bind(this)} visible={this.state.batchVisibal}/>
                :""
            } 
            <EditableTable isCanDel={this.state.isRoot} activeFn={this.state.activeFn} columns={columns} pagination={this.state.pagination} data={this.state.data}/>
        </div>
    }
}

export default Index;
