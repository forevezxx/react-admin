/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import {
    Card, Form, Input, Tooltip, Icon, Cascader,
    Select, Row, Col, Checkbox, Button,
    Table, Menu, Tabs, Upload, Modal
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { supplierOne } from '../../axios';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;

const TabPane = Tabs.TabPane;


class WatchDocuments extends Component {
    state = {
        documentData: {},
        fileList: [
            // {
            //     uid: -1,
            //     name: 'xxx.png',
            //     status: 'done',
            //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            // }
        ],
    };
    componentDidMount() {
        this.getSupplierOne(this.props.match.params.id);
    }
    getSupplierOne(id) {
        let that = this;
        let data = {
            id
        }
        supplierOne(data).then(res => {
            that.setState({
                documentData: res.data.supplier,
                fileList: that.formartFileList(res.data.supplier.company_pic),
            })
        })
    }
    goBack() {
        this.props.history.push(`/app/shouldPay/document`);
    }
    formartFileList(fileList) {
        let imgList = [];
        fileList.forEach((item, index) => {
            imgList.push({
                uid: index,
                name: 'xxx.png',
                status: 'done',
                url: item,
            });
        });
        return imgList
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList }, () => {
        console.log(fileList);
        debugger;
        let x = [];
        for (var i = 0; i <= fileList.length - 1; i++) {
            if (fileList[i].status === 'done') {
                //x.push(fileList[i].response.data);
                x.push(fileList[i].url);
            }
        }
        console.log(x);
        this.setState({
            company_pic: x,
        })
    })
    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        console.log(fileList)
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const { documentData } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="应付管理" second="档案管理" third="查看供应商档案" />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="查看供应商档案" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                    <FormItem label="公司类型" colon={false}>
                                                        <input disabled value={documentData.company_type == 1 ? '运营商' : '同行公司' } />
                                                    </FormItem>
                                                    <FormItem label="公司名称" colon={false}>
                                                        <input disabled value={documentData.company_name} />
                                                    </FormItem>
                                                    <FormItem label="负责人" colon={false}>
                                                        <input disabled value={documentData.company_owner} />
                                                    </FormItem>
                                                    <FormItem label="职位" colon={false}>
                                                        <input disabled value={documentData.position} />
                                                    </FormItem>
                                                    <FormItem label="所属行业" colon={false}>
                                                        <input disabled value={documentData.industry == 1 ? '金融业' : '游戏业'} />
                                                    </FormItem>
                                                    <FormItem label="邮箱" colon={false}>
                                                        <input disabled value={documentData.email} />
                                                    </FormItem>
                                                    <FormItem label="地址" colon={false}>
                                                        <input disabled value={documentData.address} />
                                                    </FormItem>
                                                    <FormItem label="座机" colon={false}>
                                                        <input disabled value={documentData.tel} />
                                                    </FormItem>
                                                    <FormItem label="手机号码" colon={false}>
                                                        <input disabled value={documentData.phone} />
                                                    </FormItem>
                                                    <FormItem label="公司照片" colon={false}>
                                                        {/* <input disabled value={documentData.company_pic} /> */}
                                                        <Upload
                                                            action="http://backend.delcache.com/file/upload"
                                                            listType="picture-card"
                                                            fileList={fileList}
                                                            onPreview={this.handlePreview}
                                                            onChange={this.handleChange}
                                                        >
                                                            {fileList.length >= 3 ? null : uploadButton}
                                                        </Upload>
                                                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                                        </Modal>
                                                    </FormItem>
                                                    <FormItem label="合同编号" colon={false}>
                                                        <input disabled value={documentData.contract_num} />
                                                    </FormItem>
                                                    <FormItem label="来源" colon={false}>
                                                        <input disabled value={documentData.source == 1 ? '展会' : documentData.source == 2 ? "广告杂志": "客户转介绍"} />
                                                    </FormItem>
                                                    <FormItem label="建档人" colon={false}>
                                                        <input disabled value={documentData.maker} />
                                                    </FormItem>
                                                    <FormItem label="建档时间" colon={false}>
                                                        <input disabled value={moment(Number(documentData.make_time) * 1000).format('YYYY-MM-DD')} />
                                                    </FormItem>
                                                    <FormItem label="最后一次跟进" colon={false}>
                                                        <input disabled value={moment(Number(documentData.last_follow) * 1000).format('YYYY-MM-DD')} />
                                                    </FormItem>
                                                </Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={() => this.goBack()}>返回</Button></Col>
                                            </Row>
                                        </Form>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const WatchDocument = Form.create()(WatchDocuments);

export default WatchDocument;