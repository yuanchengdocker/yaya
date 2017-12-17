import React from 'react'
import {Button} from 'antd'
import EditableTable from '../common/editable/EditableTable'
import {axiosAjax} from '../../service/getService';

class Index extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return <div>
            <EditableTable/>
        </div>
    }
}

export default Index;
