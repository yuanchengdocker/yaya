import React from 'react'
import ReactDOM from 'react-dom'
import {Button,Modal,Icon,notification} from 'antd'
import {readFile} from '../../../utils/fileInportExport'
import style from './Creater.styl'
import EditableTable from '../../common/editable/EditableTable'
import {axiosAjax} from '../../../service/getService';

class Creater extends React.Component{
    constructor(props){
        super(props)
        let {sucFn, visibleFn, visible} = this.props;
        this.state={
            fileData:[],
            visible:visible,
            columns:[{
                title: '姓名',
                dataIndex: 'name',
                width: '20%',
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
                width: '20%',
                editable:true,
            },{
                title: '备注',
                dataIndex: 'remark',
                width: '20%',
                editable:true,
            }],
            colMatch:{name:"姓名",phone:"电话",integral:"积分",birthday:"生日",remark:"备注"},
            activeFn:{
                page:this.pageChange.bind(this)
            },
            pagination:{
                current:1,
                pageSize:10,
                total:0
            }
        }
    }
    componentWillReceiveProps (nextProps) {
        this.setState({
            visible:nextProps.visible
        })
    }

    fileLoadChange(e){
        var files = e.target.files;
        var f = files[0];
        if(!f) return;
        readFile(f,this);
    }
     
    async createrSubmit(){
        console.log(this.state.fileData)
        let param = {
            members:this.state.fileData
        }
        let {data} = await axiosAjax(["member","batchadd"],param,"post");
        if(data){
            this.props.sucFn();
            this.hiddenModule()
            notification['success']({
                message: '成功',
                description: "批量添加成功"
            });
        }
    }
    hiddenModule(){
        this.setState({
            visible:false
        })
        this.props.visibleFn(false)
    }
    colMateChange(col,e){
        this.state.colMatch[col] = e.target.value;
    }
    clearFile(){
        let file = $("#filexlf")[0];
        if (file.outerHTML) {
             file.outerHTML = file.outerHTML;
        } else { // FF(包括3.5)
             file.value = "";
        }
    }
    pageChange(page){
        this.setState({
            pagination:{
                current:page.current,
                pageSize:page.pageSize,
                total:this.state.fileData.length
            }
        })
    }
    render(){
        let {pagination,fileData} = this.state;
        let {current,pageSize} = pagination;
        let pageData = fileData.slice((current-1)*pageSize,current*pageSize)
        let columns = this.state.columns;
        return <div>
            <Modal
                visible={this.state.visible}
                title={"批量添加会员"}
                maskClosable={false}
                okText="保存"
                onCancel={this.hiddenModule.bind(this)}
                onOk={this.createrSubmit.bind(this)}>
                <p>
                <input className="ya-inline-block" type="file" name="xlfile" id="filexlf" onChange={this.fileLoadChange.bind(this)}/>
                <span className="ya-pointer" onClick={this.clearFile.bind(this)}><Icon type="close" />清除</span>
                </p>

                <div>
                    <p className="ya-mt10 ya-mb10 ya-font16">字段匹配</p>
                    {
                        columns.map((item,index)=>{
                            return <div key={index} className="ya-inline-block ya-mr20 ya-mb10">
                                <span className="batch-creat-member-col ">{item.title}</span> -- <input onChange={this.colMateChange.bind(this,item.dataIndex)}/>
                            </div>
                        })
                    }
                </div>
                <EditableTable activeFn={this.state.activeFn} pagination={this.state.pagination} data={pageData} columns={columns} hiddenOpt={true}/>

            </Modal>
        </div>
    }
}

export default Creater;
