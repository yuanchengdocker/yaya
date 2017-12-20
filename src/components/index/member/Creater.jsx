import React from 'react'
import {Button,Modal} from 'antd'
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
            }],
            colMatch:{}
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
                }
            })

            self.setState({
                fileData:resultData
            })

        };
        reader.readAsBinaryString(file);
    }
    createrSubmit(){
        console.log(this.state.fileData)
        this.props.sucFn();
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
                <Button onClick={this.clearFile.bind(this)}>清除</Button>
                </p>

                <div>
                    <p>字段匹配</p>
                    {
                        columns.map((item,index)=>{
                            return <div className="ya-inline-block">
                                <span className="">{item.title}</span> -- <input onChange={this.colMateChange.bind(this,item.dataIndex)}/>
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
