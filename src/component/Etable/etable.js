import React from 'react'
import {Table} from 'antd'
import utils from '../../utils/utils';
export default class Etable extends React.Component{
    state = {}
    onRowClick = (record,index) => {
        let rowSelection = this.props.rowSelection;
        if(rowSelection == 'checkbox'){
            let selectedRowKeys = this.props.selectedRowKeys;
            let selectedIds = this.props.selectedIds;
            let selectedItem = this.props.selectedItem || [];
            if (selectedIds) {
                const i = selectedIds.indexOf(record.id);
                if (i == -1) {//避免重复添加
                    selectedIds.push(record.id)
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                }else{
                    selectedIds.splice(i,1);
                    selectedRowKeys.splice(i,1);
                    selectedItem.splice(i,1);
                }
            } else {
                selectedIds = [record.id];
                selectedRowKeys = [index]
                selectedItem = [record];
            }
            this.props.updateSelectedItem(selectedRowKeys,selectedItem || {},selectedIds);
        }else{
            let selectKey = [index];
            let selectedRowKeys = this.props.selectedRowKeys;
            if(selectedRowKeys && selectedRowKeys[0] == index){
                return
            }
            this.props.updateSelectedItem(selectKey,record || {})

            
        }
    }
    //radio/checkbox改变
    onSelectChange = (selectedRowKeys,selectedRows) => {
        debugger
        let rowSelection = this.props.rowSelection;
        let selectedIds = [];
        if(rowSelection == 'checkbox'){
            selectedRows.map((item,index) => {
                selectedIds.push(item.id);
            })
        }
        this.setState({
            selectedItem: selectedRows[0],
            selectedRowKeys,
            selectedIds
        })
        this.props.updateSelectedItem(selectedRowKeys,selectedRows[0],selectedIds)
    }
    //初始化表格内容
    getOptions = () => {
        let p = this.props;
        let columns = p.columns;
        let data = p.dataSource;
        let {selectedRowKeys} = this.props
        const rowSelection = {
            type: 'radio', //默认为radio
            onchange: this.onSelectChange,
            onSelect: (record, selected, selectedRows) => {
                console.log('...')
            },
            onSelectAll: this.onSelectAll,
            selectedRowKeys
            
        }
        let row_selection  = p.rowSelection;
        if(row_selection == false || row_selection == null){
            row_selection = false
        }else if(row_selection == 'checkbox'){
            rowSelection.type = 'checkbox';
        }else if(row_selection == 'radio'){
            rowSelection.type = 'radio';
        }
        return (
            <div>
                <Table columns = { columns }
                    dataSource = { data }
                    bordered
                    rowSelection = {row_selection ? rowSelection : null}
                    onRow = {(record,index) => {
                        return {
                            onClick : () => {
                                if(!row_selection){
                                    return
                                }
                                this.onRowClick(record,index)
                            }
                        }
                    }}
                 />
            </div>
        )
    }
    render(){
        return (
            <div>
                {this.getOptions()}
            </div>
        )
    }
}