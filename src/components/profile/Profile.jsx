import React from 'react'
import { Button, Modal, Form, Input,Select, Radio,notification } from 'antd';
const FormItem = Form.Item;
import ReactDOM from 'react-dom'
import {axiosAjax} from '../../service/getService'
import {ep} from '../../utils/create-events'
import {getUser,setUser,setToken,delUser} from '../userInit'

class Profile extends React.Component{
    constructor(props){
        super(props)
        const { visible,user,visibleFn,flag,sucFn } = this.props;
        this.state={
          visible:visible,
          flag:flag,
          user:user||{},
          isUpdateSecret:false,
          addrArr:[{
            value: '1',
            label: '1'},
            {
              value: '2',
              label: '2'}
          ]
        }
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
      const { visible,user } = nextProps;
      this.setState({
        visible:visible,
        user:user
      })
    }

    checkPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    }
    checkOldPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value) {
        form.validateFields(['password'], { force: true });
      }
      callback();
    }
    checkConfirm = (rule, value, callback) => {
      const form = this.props.form;
      if(value && value == form.getFieldValue("oldPass")){
        callback("输入新密码与原密码相同！");
      }
      if (value) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
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
          if(this.state.flag=="update"){
            let isUpdate = false;
            for(let param in values){
               if(values[param] != this.state.user[param]){
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
            values["id"] = this.state.user.id;
            values["updateSecreate"] = this.state.isUpdateSecret;
            user["isUpdate"] = true;
            user["valid"] = "name";
            let {data,messgage} = await axiosAjax(["user","update"],values,"post")
            if(data){
              let {data} = await axiosAjax(["user","info"],values,"post")
              setUser(data&&data.user)
              this.hiddenModule()
            }else{
              notification['warn']({
                  message: '修改失败',
                  description: messgage,
              });
            }

          }else{
            let {data} = await axiosAjax(["user","add"],values,"post")
            if(data){
              this.props.sucFn();
              this.hiddenModule()
            }
          }

        }
      });
    }
    showUpdateSecrete(){
      this.setState({
        isUpdateSecret:!this.state.isUpdateSecret
      })
    }
    nameValid = async (rule, value, callback) => {
      let param = {
        id : this.state.user?this.state.user.id:"",
        name : value,
        valid : "name"
      }
      let {data} = await axiosAjax(["user","info"],param,"post")
      if (data&&data.user) {
        callback('您输入用户名已存在');
      } else {
        callback();
      }
    }
    render(){
      let addrArr = []
      for (let i = 0; i < this.state.addrArr.length; i++) {
        let addr = this.state.addrArr[i]
        addrArr.push(<Select.Option key={i} value={addr.value}>{addr.label}</Select.Option>);
      }
      const { getFieldDecorator,resetFields } = this.props.form;
      let user = this.state.user||{};
      return (
        <Modal
          visible={this.state.visible}
          title={this.state.flag=="add"?"新增个人信息":"修改个人信息"}
          maskClosable={false}
          okText="保存"
          onCancel={this.hiddenModule.bind(this)}
          onOk={this.profileSubmit.bind(this)}
        >
          <Form layout="vertical">
            <FormItem label="姓名">
              {getFieldDecorator('name', {
                initialValue:user.name,
                rules: [{
                  required: true,
                  message: 'Please input your name',
                },{
                  validator: this.nameValid,
                }],
              })(
                <Input placeholder="Please input your name" />
              )}
            </FormItem>
            <FormItem label="电话号码">
              {getFieldDecorator('phone', {
                initialValue:user.phone,
                rules: [{ required: true, message: 'Please input your phone number!' }],
              })(
                <Input style={{ width: '100%' }} />
              )}
            </FormItem>
            <FormItem label="地址">
              {getFieldDecorator('address', {
                  initialValue: 2,
                  rules: [{ required: true, message: '请输入你所在店面地址!' }],
                })(
                  <Select
                    style={{ width: '100%' }}
                    placeholder="请选择地址"
                  >
                    {addrArr}
                  </Select>
                )}
            </FormItem>
            {
              this.state.flag=="update"?
              <a onClick={this.showUpdateSecrete.bind(this)} style={{marginBottom:20,display:"block"}}>
                {
                  this.state.isUpdateSecret?"关闭修改密码":"修改密码"
                }
              </a>
              :""
            }
            {
              this.state.isUpdateSecret?
              <div>
                <FormItem label="原密码">
                {getFieldDecorator('oldPass', {
                  rules: [{
                    required: true, message: 'Please input your password!',
                  },{
                    validator: this.checkOldPassword,
                  }],
                })(
                  <Input type="password" />
                )}
                </FormItem>
                <FormItem label="新密码">
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: 'Please input your password!',
                  }, {
                    validator: this.checkConfirm,
                  }],
                })(
                  <Input type="password" />
                )}
                </FormItem>
                <FormItem label="确认新密码">
                    {getFieldDecorator('confirm', {
                    rules: [{
                      required: true, message: 'Please confirm your password!',
                    }, {
                      validator: this.checkPassword,
                    }],
                  })(
                    <Input type="password" onBlur={this.handleConfirmBlur} />
                  )}
                </FormItem>
              </div>
              :""
            }
          </Form>
        </Modal>
      );
    }
}


const Profile2 = Form.create()(Profile)
export default Profile2;