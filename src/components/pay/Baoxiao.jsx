/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Table } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { baoxiaoAll, baoxiaoSearch, baoxiaoExport } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;


class Baoxiaos extends Component {
    state = {
        confirmDirty: false,
        dataSource: [],//表格数据源
        count: '',//表格数据源总条数
        pageSize: 5,//每页显示条数
        current: 1,//当前所在页数

        principalName: '',
        companyName: '',
        contractNum: '',
        telNum: '',
        archiver: '',
    };
    
    componentDidMount(){
        this.getDocumentAll()
    }
    getDocumentAll() {//获取用户信息
        let data = {
            pageNum: this.state.current - 1,
            pageSize: this.state.pageSize,
            token: localStorage.getItem('user_token'),
        }
        baoxiaoAll(data).then(res => {
            console.log(res);
            this.setState({
                dataSource: res.data.data,
                count: res.data.count,
            })
        })
    }
    getDocumentSearch() {
        let data = {
            search_json: JSON.stringify({
            principalName: this.state.principalName,
            companyName: this.state.companyName,
            contractNum: this.state.contractNum,
            telNum: this.state.telNum,
            archiver: this.state.archiver,
            })
        }
        baoxiaoSearch(data).then(res=>{
            this.setState({
                dataSource: res.data.supplier,
                count: res.data.count,
            })
        })
    }
    supplierExport() {
        let data = {
            search_json: JSON.stringify({
            principalName: this.state.principalName,
            companyName: this.state.companyName,
            contractNum: this.state.contractNum,
            telNum: this.state.telNum,
            archiver: this.state.archiver,
            })
        }
        baoxiaoExport(data).then(res => {
            console.log(res);
            if (res.status === 0) {
                window.location.href = res.url;
            }
        })
    }
    changePageSize(pageSize, current) {
        let that = this;
        this.setState({
            pageSize,
            current,
        }, () => {
            that.getDocumentAll();
        })
    }
    changePage(current) {
        let that = this;
        that.setState({
            current
        }, () => {
            that.getDocumentAll();
        })
    }
    onChange(date, dateString) {
        let that = this;
        console.log(date, dateString);
        console.log(dateString);
        that.setState({
            checkedTime: dateString
        })
    }
    handleSelectChange(value) {
        console.log(value)
        this.setState({
            principalName: value
        });
    }
    newbaoxiao() {//新建
        this.props.history.push('/app/pay/newbaoxiao');
    }
    WatchBaoxiao(id) {//查看
        this.props.history.push(`/app/pay/watchBaoxiao/${id}`);
    }
    EditBaoxiao(id) {//编辑
        this.props.history.push(`/app/pay/editBaoxiao/${id}`);
    }
    render() {
        const { dataSource, count } = this.state;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        const columns = [{
            title: '编号',
            dataIndex: 'userId',
            key: 'userId',
        }, {
            title: '报销人',
            dataIndex: 'createPerson',
            key: 'createPerson',
        }, {
            title: '报销时间',
            dataIndex: 'userType',
            key: 'userType',
        }, {
            title: '报销金额(元)',
            dataIndex: 'stuffName',
            key: 'stuffName',
        }, {
            title: '报销项目',
            dataIndex: 'position',
            key: 'position',
        }, {
            title: '报销方式',
            dataIndex: 'telNum',
            key: 'telNum',
        }, {
            title: '审核人',
            dataIndex: 'jobNum',
            key: 'jobNum',
        }, {
            title: '复核人',
            dataIndex: 'accountName',
            key: 'accountName',
        }, {
            title: '操作',
            // dataIndex: 'operating',
            key: 'operating',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" onClick={()=>this.WatchBaoxiao(record.id)}>查看</a>
                    <a href="javascript:;" onClick={()=>this.EditBaoxiao(record.id)}>编辑</a>
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
                <BreadcrumbCustom first="出纳管理" second="报销管理" />

                <Row gutter={0}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <Form {...formItemLayout}>
                                    <Row>
                                        <Col md={6}>
                                            <FormItem label="报销时间" colon={false}>
                                                <input placeholder="请选择" />
                                            </FormItem>
                                        </Col>
                                        <Col md={6}>
                                            <FormItem label="报销人" colon={false}>
                                                <input placeholder="请输入报销人" />
                                            </FormItem>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={()=> this.getDocumentSearch()}><Icon type="search" />查询</Button>
                                        </Col>
                                        <Col md={2}>
                                            <Button type="primary" htmlType="submit" onClick={()=>this.newbaoxiao()}><Icon type="plus" />新建</Button>
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
                                <Table columns={columns} dataSource={dataSource} rowKey={record => record.id} pagination={paginationProps}/>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const Baoxiao = Form.create()(Baoxiaos);

export default Baoxiao;