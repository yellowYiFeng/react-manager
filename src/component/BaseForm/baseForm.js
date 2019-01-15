import React from 'react'
import Utils from '../../utils/utils'
import {Form,Input,Select,Button,Checkbox,DatePicker } from 'antd'
class FilterForm extends React.Component{
    filtertable = () => {
        let fieldvalue = this.props.form.getFieldsValue();
        this.props.submitFilter(fieldvalue);
    }
    initFormList = () => {
        const {getFieldDecorator} = this.props.form;
        const filterList = this.props.filterList;
        let filterItemList = [];
        filterList.forEach((item) => {
            let label = item.label;
            let field = item.field;
            let initialValue = item.initialValue || '';
            let placeholder = item.placeholder;
            let width = item.width;
            if(item.type == '时间查询'){
                const start_time = <Form.Item label = {[label]} colon={false} key={field}> {
                    getFieldDecorator('start_time',)(
                        <DatePicker showTime={true} placeholder="选择开始时间" format="YYYY-MM-DD HH:mm:ss" />
                    )
                }
                </Form.Item>
                filterItemList.push(start_time);
                const end_time = <Form.Item label = "~" colon={false} key={field} > {
                    getFieldDecorator('end_time',)(
                        <DatePicker showTime={true} placeholder="选择结束时间" format="YYYY-MM-DD HH:mm:ss" />
                    )
                }
                </Form.Item>
                filterItemList.push(end_time);

            }else if(item.type == 'SELECT'){
                const SELECT = <Form.Item label = {[label]} key={field} colon={false} > {
                    getFieldDecorator([field], {
                        initialValue: initialValue
                    })(
                        <Select placeholder={placeholder} style={{ width: width }}>
                            {Utils.getOptionList(item.list)}
                        </Select>
                    )
                }
                </Form.Item>
                filterItemList.push(SELECT);
            }else if(item.type == 'INPUT'){
                const INPUT = <Form.Item label = {[label]} key={field} colon={false} > {
                    getFieldDecorator([field],{
                        initialValue: initialValue
                    })(
                        <Input type="text" placeholder={placeholder} />
                    )
                }
                </Form.Item>
                filterItemList.push(INPUT);
            }else if(item.type == 'CHECKBOX'){
                const CHECKBOX = <Form.Item label = {[label]} key={field} colon={false} > {
                    getFieldDecorator([field],{
                        valuePropName: 'checked',
                        initialValue: initialValue //true/false
                    })(
                        <Checkbox>
                            {label}
                        </Checkbox>
                    )
                }
                </Form.Item>
                filterItemList.push(CHECKBOX);
            }else if(item.type == 'DATE'){
                const DATE = <Form.Item label = {[label]} key={field} colon={false} > {
                    getFieldDecorator([field],)(
                        <DatePicker showTime={true} placeholder="选择日期" format="YYYY-MM-DD HH:mm:ss" />
                    )
                }
                </Form.Item>
                filterItemList.push(DATE);
            }
        })
        return filterItemList;
    }
    render () {
        return (
            <div>
                <Form layout="inline" className="mb10">
                    <Form.Item>{this.initFormList()}</Form.Item>
                    <Form.Item>
                        <Button type="primary" className="mr5" onClick={this.filtertable}>查询</Button>
                        <Button type="default">重置</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
export default Form.create({})(FilterForm)