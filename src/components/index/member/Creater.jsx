import React from 'react'
import {Button,Modal,Icon} from 'antd'
import XLSX from 'xlsx'
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
                width: '25%',
                editable:true,
            }, {
                title: '年龄',
                dataIndex: 'age',
                width: '15%',
                editable:true,
            }, {
                title: '电话',
                dataIndex: 'phone',
                width: '40%',
                editable:true,
            }],
            colMatch:{name:"姓名",age:"年龄",phone:"电话"}
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
        this.readFile(f);
    }
     readFile(file) {
        let self = this;
        var resultData = [];
        var name = file.name;
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;
            var wb = XLSX.read(data, { type: "binary" });
            if(wb&&wb.Sheets){
                for(let sheet in wb.Sheets){
                    var sheetData = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
                    console.log(sheetData)
                    if(sheetData&&sheetData.length>0){
                        resultData = resultData.concat(sheetData)
                    }
                }
            }
            
            let colMatch = self.state.colMatch
            for(let param in colMatch){
                if(colMatch[param] == "" || typeof(colMatch[param]) == "undefined")
                    delete colMatch[param]
            }

            resultData&&resultData.map((item)=>{
                for(let param in colMatch){
                    item[param] = item[colMatch[param]]
                    if(param == "age"){
                        item[param] = parseInt(item[param])
                    }
                }
            })

            self.setState({
                fileData:resultData
            })

        };
        reader.readAsBinaryString(file);
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
    render(){
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
                <EditableTable data={this.state.fileData} columns={columns} hiddenOpt={true}/>

            </Modal>
        </div>
    }
}

export default Creater;
