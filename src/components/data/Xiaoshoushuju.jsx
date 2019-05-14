/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { saleDataAll, saleDataSearch, saleDataExport} from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;



class Xiaoshoushujus extends Component {
    state = {
        confirmDirty: false,
        dataSource: [],//表格数据源
        count: '',//表格数据源总条数
        pageSize: 5,//每页显示条数
        current: 1,//当前所在页数

        sales_name: '',
        date: '',
        month_target: '',
    };
    componentDidMount() {
        this.getUserAll();
    }
    getUserAll() {//获取用户信息
        let data = {
            pageNum: this.state.current - 1,
            pageSize: this.state.pageSize,
        }
        saleDataAll(data).then(res => {
            console.log(res);
            this.setState({
                dataSource: res.data.data,
                count: res.data.count,
            })
        })
    }
    getUserSearch() {
        let data = {
            search_json: JSON.stringify({
            sales_name: this.state.sales_name,
            date: this.state.date,
            month_target: this.state.month_target,
            })
        }
        saleDataSearch(data).then(res => {
            this.setState({
                dataSource: res.data.data,
                count: res.data.count,
            })
        })
    }
    newUserManagement() {//新建
        this.props.history.push('/app/data/newXiaoshoushuju');
    }
    WatchUserManagement(id) {
        this.props.history.push(`/app/data/watchXiaoshoushuju/${id}`);
    }
    EditUserManagement(id) {
        this.props.history.push(`/app/data/editXiaoshoushuju/${id}`);
    }
    changePageSize(pageSize, current) {
        let that = this;
        this.setState({
            pageSize,
            current,
        },()=>{
            that.getUserAll();
        })
    }
    changePage(current) {
        let that = this;
        that.setState({
            current
        },()=>{
            that.getUserAll();
        })
    }
    handleSelectChange(value) {
        console.log(value)
        this.setState({
            date: value
        });
    }
    handleSelectChangeMonth(value) {
        console.log(value)
        this.setState({
            month_target: value
        });
    }
    supplierExport() {
        let data = {
            search_json: JSON.stringify({
            sales_name: this.state.sales_name,
            date: this.state.date,
            month_target: this.state.month_target,
            }),
        }
        saleDataExport(data).then(res => {
            console.log(res);
            if(res.status === 0){
                window.location.href = res.url;
            }
        })
    }
    render() {
        const { dataSource, count } = this.state;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const columns = [{
            title: '编号',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '销售员',
            dataIndex: 'sales_name',
            key: 'sales_name',
        }, {
            title: '当前排名',
            dataIndex: 'rank',
            key: 'rank',
        }, {
            title: '考核月份',
            dataIndex: 'date',
            key: 'date',
        }, {
            title: '月度指标',
            dataIndex: 'month_target',
            key: 'month_target',
            render: (text, record) => record.month_target == 0 ? '未达成' : '已达成'
        }, {
            title: '月度回款金额(元)',
            dataIndex: 'month_repay',
            key: 'month_repay',
        }, {
            title: '提成金额(元)',
            dataIndex: 'reback_money',
            key: 'reback_money',
        }, {
            title: '所属部门',
            dataIndex: 'department',
            key: 'department',
        }, {
            title: '入职时间',
            dataIndex: 'employee_time',
            key: 'employee_time',
        }, {
            title: '操作',
            // dataIndex: 'operating',
            key: 'operating',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" className="document_a" onClick={()=>this.WatchUserManagement(record.id)}>查看</a>
                    <a href="javascript:;" className="document_a" onClick={()=>this.EditUserManagement(record.id)}>编辑</a>
                </span>
            )
        }];
        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: () => `共${count}条`,
            pageSize: this.state.pageSize,
            current: this.state.current,
            total: Number(count),
            onShowSizeChange: (current, pageSize) => this.changePageSize(pageSize, current),
            onChange: (current) => this.changePage(current),
            size: "small",
        };
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="数据管理" second="销售数据" />

                <Row gutter={0}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form {...formItemLayout}>
                                    <Row>
                                        <Col md={6}>
                                            <FormItem label="销售员" colon={false}>
                                                <input placeholder="请输入销售员姓名" onChange={event=>{
                                                    this.setState({
                                                        sales_name: event.target.value
                                                      });
                                                }}/>
                                            </FormItem>
                                        </Col>
                                        <Col md={6}>
                                            <FormItem label="考核月份" colon={false}>
                                                <Select
                                                    placeholder="请选择"
                                                    onChange={this.handleSelectChange.bind(this)}
                                                >
                                                    <Option value="1">1月</Option>
                                                    <Option value="2">2月</Option>
                                                    <Option value="3">3月</Option>
                                                    <Option value="4">4月</Option>
                                                    <Option value="5">5月</Option>
                                                    <Option value="6">6月</Option>
                                                    <Option value="7">7月</Option>
                                                    <Option value="8">8月</Option>
                                                    <Option value="9">9月</Option>
                                                    <Option value="10">10月</Option>
                                                    <Option value="11">11月</Option>
                                                    <Option value="12">12月</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                        <Col md={6}>
                                            <FormItem label="月度指标" colon={false}>
                                                <Select
                                                    placeholder="请选择"
                                                    onChange={this.handleSelectChangeMonth.bind(this)}
                                                >
                                                    <Option value="1">已达成</Option>
                                                    <Option value="0">未达成</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={()=> this.getUserSearch()}><Icon type="search" />查询</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={() => this.newUserManagement()}><Icon type="plus" />新建</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={() => this.supplierExport()}><Icon type="upload" />导出</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24} >
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Table columns={columns} dataSource={dataSource} rowKey={record => record.id} pagination={paginationProps} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const Xiaoshoushuju = Form.create()(Xiaoshoushujus);

export default Xiaoshoushuju;