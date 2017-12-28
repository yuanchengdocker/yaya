import React from 'react'
import { Button, Modal, Form, Input,Select, Radio,notification,DatePicker } from 'antd';
const FormItem = Form.Item;
import ReactDOM from 'react-dom'
import {axiosAjax} from '../../../service/getService'
import {ep} from '../../../utils/create-events'
import {formatDateTime} from '../../../utils/optTime'

class SingleAdd extends React.Component{
    constructor(props){
        super(props)
        const { visible,member,visibleFn,flag,sucFn } = this.props;
        this.state={
          visible:visible,
          flag:flag,
          member:member||{},
        }
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
      const { visible,member } = nextProps;
      this.setState({
        visible:visible,
        member:member
      })
    }

    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    hiddenModule(){
      const { resetFields } = this.props.form;
      this.setState({
        visible:false
      })
      resetFields();
      this.props.visibleFn(false);
    }
    profileSubmit(e){
      e.preventDefault();
      this.props.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          values.birthday = formatDateTime(values.birthday._d.getTime());

          let {data} = await axiosAjax(["member","add"],values,"post")
          if(data){
            this.props.sucFn();
            this.hiddenModule()
            notification['success']({
                message: '成功',
                description: "添加成功"
            });
          }

        }
      });
    }
    showUpdateSecrete(){
      this.setState({
        isUpdateSecret:!this.state.isUpdateSecret
      })
    }
    phoneValid = async (rule, value, callback) => {
      let param = {
        phone : value,
        valid : "phone"
      }
      let {data} = await axiosAjax(["member","info"],param,"post")
      if (data&&data.member) {
        callback('您输入电话号码已存在');
      } else {
        callback();
      }
    }
    render(){
      const { getFieldDecorator,resetFields } = this.props.form;
      let member = this.state.member||{};
      return (
        <Modal
          visible={this.state.visible}
          title={"新增单个会员"}
          maskClosable={false}
          okText="保存"
          onCancel={this.hiddenModule.bind(this)}
          onOk={this.profileSubmit.bind(this)}
        >
          <Form layout="vertical">
            <FormItem label="姓名">
              {getFieldDecorator('name', {
                initialValue:member.name,
                rules: [{
                  required: true,
                  message: '姓名不能为空',
                }],
              })(
                <Input placeholder="请输入姓名！" />
              )}
            </FormItem>
            <FormItem label="电话号码">
              {getFieldDecorator('phone', {
                initialValue:member.phone,
                rules: [{ required: true, message: '电话不能为空' },{
                  validator: this.phoneValid,
                }],
              })(
                <Input style={{ width: '100%' }} placeholder="请输入电话号码！"/>
              )}
            </FormItem>
            <FormItem label="生日">
              {getFieldDecorator('birthday', {
                initialValue:"",
                rules: [{ required: true, message: '请选择生日 '}],
              })(
                <DatePicker style={{ width: '100%' }} />
              )}
            </FormItem>
           
          </Form>
        </Modal>
      );
    }
}


const Profile2 = Form.create()(SingleAdd)
export default Profile2;