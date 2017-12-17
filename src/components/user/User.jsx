import React from 'react'
import {Button,notification} from 'antd'
import EditableTable from '../common/editable/EditableTable'
import {axiosAjax,deepClone} from '../../service/getService';
import Profile from '../profile/Profile'

class User extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            data:[],
            pagination:{
                currentPage:1,
                pageSize:10,
                total:0
            },
            activeFn:{
                update:this.updateUser.bind(this),
                delete:this.deleteUser.bind(this)
            },
            addVisible:false
        }
    }
    async updateUser(user,index,callback){
        let isUpdate = false;
        for(let param in this.state.cacheData[index]){
            if(this.state.cacheData[index][param] != user[param]){
             isUpdate = true;
             break;
            }
         }
         if(!isUpdate) {
           notification['warn']({
               message: '修改失败',
               description: "未作任何修改！",
           });
           return;
         }
        user["isUpdate"] = true;
        user["valid"] = "name";
        let {data,messgage} = await axiosAjax(["user","update"],user,"post")
        if(data){
            this.state.cacheData = deepClone(this.state.data||{});
            callback(data)
        }else{
            notification['warn']({
                message: '修改失败',
                description: messgage,
            });
        }
    }
    async deleteUser(user,callback){
        let {data} = await axiosAjax(["user","delete"],user,"post")
        if(data){
            callback();
            notification['success']({
                message: '成功',
                description: "删除成功"
            });
        }
    }

    componentDidMount() {
        this.getUserList();
    }
    async getUserList(){
        let param = {
            currentPage:this.state.pagination.currentPage,
            pageSize:this.state.pagination.pageSize,
            table:"user"
        }
        let {data,total} = await axiosAjax(["user","list"],param,"post")
        let cacheData = deepClone(data||{});
        this.setState({
            data:data,
            cacheData:cacheData,
            pagination:{
                currentPage:param.currentPage,
                pageSize:param.pageSize,
                total:total
            }
        })
    }
    pageDataChange(page){

    }
    userProfileSet(flag){
        this.setState({
            addVisible:flag
        })
    }
    render(){
        return <div>
            <Button className="editable-add-btn" onClick={this.userProfileSet.bind(this,true)}>Add</Button>
            <Profile flag={"add"} sucFn={this.getUserList.bind(this)} visibleFn={this.userProfileSet.bind(this)} visible={this.state.addVisible}/>
            <EditableTable activeFn={this.state.activeFn} pagination={this.state.pagination} data={this.state.data}/>
        </div>
    }
}

export default User
