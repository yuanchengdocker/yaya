import React from 'react';
import ReactDOM from 'react-dom'
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import EditableCell from './EditableCell'

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    let {hiddenOpt,columns} = this.props;
    let self = this;
    columns&&columns.map((item)=>{
        item.render = (text, record, index) => self.renderColumns(self.state.data, index, item.dataIndex, text)
    })
    this.columns = columns||[];

    if(!hiddenOpt){
        this.columns.push({
          title: 'operation',
          dataIndex: 'operation',
          width: '30%',
          render: (text, record, index) => {
            const editable = this.state.data[index].editable;
            return (
              <div className="editable-row-operations">
                {
                  editable ?
                    <span>
                      <Popconfirm title="Sure to Save?" onConfirm={() => this.editDone(index, 'save')}>
                        <a>Save</a>
                      </Popconfirm>
                      <Popconfirm title="Sure to cancel?" onConfirm={() => this.editDone(index, 'cancel')}>
                        <a>Cancel</a>
                      </Popconfirm>
                    </span>
                    :
                    <span>
                      <a onClick={() => this.edit(index)}>Edit</a>
                      <Popconfirm title="Sure to Delete?" onConfirm={() => this.delete(index)}>
                        <a>Delete</a>
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
    const value = data[index][key];
    const editable = data[index].editable;
    const status = data[index].status;
    
    return (<EditableCell
      editable={editable||false}
      value={value||""}
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