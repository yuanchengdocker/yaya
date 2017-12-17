import React from 'react';
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import EditableCell from './EditableCell'

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'name',
      dataIndex: 'name',
      width: '25%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'name', text),
    }, {
      title: 'age',
      dataIndex: 'age',
      width: '15%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'age', text),
    }, {
      title: 'address',
      dataIndex: 'address',
      width: '40%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'address', text),
    }, {
      title: 'operation',
      dataIndex: 'operation',
      width: '30%',
      render: (text, record, index) => {
        const { editable } = this.state.data[index].name;
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
    }];
    this.state = {
      pagination:this.props.pagination,
      count:1,
      data: [{
        key: '0',
        name: {
          editable: false,
          value: 'Edward King 0',
        },
        age: {
          editable: false,
          value: '32',
        },
        address: {
          value: 'London, Park Lane no. 0',
        },
      }],
    };
  }
  renderColumns(data, index, key, text) {
    const { editable, status } = data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (<EditableCell
      editable={editable}
      value={text}
      onChange={value => this.handleChange(key, index, value)}
      status={status}
    />);
  }
  handleChange(key, index, value) {
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data });
  }
  edit(index) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true;
      }
    });
    this.setState({ data });
  }
  delete(index){
    const { data } = this.state;
    let newData = data&&data.filter((item)=>{
      return item.key != index;
    })
    this.setState({ data:newData });
  }
  editDone(index, type) {
    const { data } = this.state;
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
    this.setState({ data }, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status;
        }
      });
    });
  }
  handleAdd = () => {
    const { count, data } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,

      key: count,
      name: {
        editable: false,
        value: `Edward King ${count}`,
      },
      age: {
        editable: false,
        value: '32',
      },
      address: {
        value: 'London, Park Lane no. 0',
      },


    };
    this.setState({
      data: [...data, newData],
      count: count + 1,
    });
  }
  showTabelsChange(){
    console.log(arguments)
  }
  render() {
    const { data } = this.state;
    const dataSource = data.map((item) => {
      const obj = {};
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value;
      });
      return obj;
    });
    const columns = this.columns;

    return <div>
      <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
      <Table bordered dataSource={dataSource} columns={columns} pagination={this.state.pagination} onChange={this.showTabelsChange.bind(this)}/>
    </div>
  }
}

export default EditableTable;