import React from 'react'
import {Button} from 'antd'
import EditableTable from '../common/editable/EditableTable'

class Index extends React.Component{
    constructor(props){
        super(props)
    }
    openCreateUserBox(){

    }
    render(){
        return <div>
            <EditableTable/>
        </div>
    }
}

export default Index;
