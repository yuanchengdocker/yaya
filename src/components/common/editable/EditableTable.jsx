import React from 'react';
import ReactDOM from 'react-dom'
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import EditableCell from './EditableCell'

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    let {hiddenOpt,columns} = this.props;
    let self = this;
    this.editableCol = {}
    columns&&columns.map((item)=>{
      this.editableCol[item.dataIndex] = item.editable;
        item.render = (text, record, index) => self.renderColumns(self.state.data, index, item.dataIndex, text)
    })
    this.columns = columns||[];

    if(!hiddenOpt){
        this.columns.push({
          title: '操作',
          dataIndex: 'operation',
          width: '30%',
          render: (text, record, index) => {
            const editable = this.state.data[index].editable;
            return (
              <div className="editable-row-operations">
                {
                  editable ?
                    <span>
                      <Popconfirm title="是否确定保存?" onConfirm={() => this.editDone(index, 'save')}>
                        <a>保存</a>
                      </Popconfirm>
                      <Popconfirm title="是否确定取消?" onConfirm={() => this.editDone(index, 'cancel')}>
                        <a>取消</a>
                      </Popconfirm>
                    </span>
                    :
                    <span>
                      <a onClick={() => this.edit(index)}>修改</a>
                      <Popconfirm title="是否确定删除?" onConfirm={() => this.delete(index)}>
                        <a>删除</a>
                      </Popconfirm>
                    </span>
                }
              </div>
            );
          },
        })
    }
    this.state = {
      pagination:this.props.pagination||{},
      data:this.props.data||[],
      activeFn:this.props.activeFn||{}
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pagination:nextProps.pagination||{},
      data:nextProps.data||[]
    }) 
  }

  renderColumns(data, index, key, text) {
    let value = data[index][key];
    const editable = data[index].editable&&this.editableCol[key];
    const status = this.editableCol[key]?data[index].status:"";
    
    if(typeof value == null || typeof value == "undefined"){
        value = "";
    }
    return (<EditableCell
      editable={editable||false}
      value={value}
      onChange={value => this.handleChange(key, index, value)}
      status={status}
    />);
  }
  handleChange(key, index, value) {
    const { data } = this.state;
    data[index][key] = value;
    this.setState({ data });
  }
  edit(index) {
    const { data } = this.state;
    data[index].editable = true;
    data[index].status = "";
    this.setState({ data });
  }
  delete(index){
    let self = this;
    const { data,activeFn } = this.state;
    activeFn.delete(data[index])
  }
  editDone(index, type) {
    const { data,activeFn } = this.state;
    let self = this;
    if(type == "save"){
      activeFn.update(data[index],index,function(){
        data[index].editable = false;
        data[index].status = "save";
        self.setState({ data });
      })
    }else{
      data[index].editable = false;
      data[index].status = "cancel";      
      this.setState({ data });
    }
  }
  
  showTabelsChange(page){
    this.state.activeFn.page(page);
  }
  render() {
    const { data,pagination } = this.state;
    const dataSource = data.map((item,index) => {
      item.key = index;
      return item;
    });
    const columns = this.columns;

    return <div>
      <Table bordered dataSource={dataSource} columns={columns} pagination={pagination} onChange={this.showTabelsChange.bind(this)}/>
    </div>
  }
}

export default EditableTable;