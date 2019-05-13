/**
 * Created by zhengxinxing on 2019/04/11.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, 
    Select, Row, Col, Checkbox, Button, 
    Table, Menu, Tabs, Upload, message, Modal
} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import { supplierAdd } from '../../axios';
const FormItem = Form.Item;
const Option = Select.Option;

const TabPane = Tabs.TabPane;


class NewShouldPays extends Component {
    state = {
        confirmDirty: false,
        company_type: '',
        company_name: '',
        company_owner: '',
        position: '',
        industry: '',
        email: '',
        address: '',
        tel: '',
        phone: '',
        company_pic: '',
        contract_num: '',
        source: '',

        loading: false,

        previewVisible: false,
        previewImage: '',
        fileList: [
            // {
            //     uid: -1,
            //     name: 'xxx.png',
            //     status: 'done',
            //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            // }
        ],
    };
    handleSelectChangeCompanyType(value){
        console.log(value)
        this.setState({
            company_type: value
        });
    }
    handleSelectChangeIndustry(value) {
        console.log(value)
        this.setState({
            industry: value
        });
    }
    handleSelectChangeSource(value) {
        console.log(value)
        this.setState({
            source: value
        });
    }
    goBack() {
        this.props.history.push(`/app/shouldPay/document`);
    }

    newSupplier() {
        const { 
            company_type,
            company_name,
            company_owner,
            position,
            industry,
            email,
            address,
            tel,
            phone,
            company_pic,
            contract_num,
            source,
            fileList
        } = this.state;
        const token = localStorage.getItem('user_token');
        let data = {
            company_type,
            company_name,
            company_owner,
            position,
            industry,
            email,
            address,
            tel,
            phone,
            company_pic: fileList,
            contract_num,
            source,
            token
        }
        supplierAdd(data).then(res => {
            console.log(res);
            if (res.msg === "success") {
                this.props.history.push(`/app/shouldPay/document`);
            }
        })
    }
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    // beforeUpload(file) {
    //     const isJPG = file.type === 'image/jpeg';
    //     if (!isJPG) {
    //         message.error('You can only upload JPG file!');
    //     }
    //     const isLt2M = file.size / 1024 / 1024 < 2;
    //     if (!isLt2M) {
    //         message.error('Image must smaller than 2MB!');
    //     }
    //     return isJPG && isLt2M;
    // }
    // handleChange = (info) => {
    //     if (info.file.status === 'uploading') {
    //         this.setState({ loading: true });
    //         return;
    //     }
    //     if (info.file.status === 'done') {
    //         // Get this url from response in real world.
    //         this.getBase64(info.file.originFileObj, imageUrl => this.setState({
    //         imageUrl,
    //         loading: false,
    //         }));
    //     }
    // }
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList },()=>{
        let x = [];
        for ( var i = 0; i <= fileList.length-1; i++){
            if(fileList[i].status === 'done'){
                x.push(fileList[i].response.data);
            }
        }
        console.log(x);
        // this.setState({
        //     fileList
        // })
        console.log(fileList);
    })
    render() {
        // const uploadButton = (
        //     <div>
        //         <Icon type={this.state.loading ? 'loading' : 'plus'} />
        //         {/* <div className="ant-upload-text">Upload</div> */}
        //     </div>
        // );
        // const imageUrl = this.state.imageUrl;
        
        const { previewVisible, previewImage, fileList } = this.state;
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
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="应付管理" second="档案管理" third="新增供应商档案"/>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="新增供应商档案" key="1">
                        <Row>
                            <Col className="gutter-row" md={24}>
                                <div className="gutter-box">
                                    <Card bordered={false}>
                                        <Form {...formItemLayout}>
                                            <Row>
                                                <Col md={24}>
                                                    <FormItem label="公司类型" colon={false}>
                                                        <Select
                                                            placeholder="请选择"
                                                            onChange={this.handleSelectChangeCompanyType.bind(this)}
                                                        >
                                                            <Option value="1">运营商</Option>
                                                            <Option value="2">同行公司</Option>
                                                        </Select>
                                                    </FormItem>
                                                    <FormItem label="公司名称" colon={false}>
                                                        <input placeholder="请输入公司名称" onChange={event => {
                                                            this.setState({
                                                                company_name: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="负责人" colon={false}>
                                                        <input placeholder="请输入负责人名称" onChange={event => {
                                                            this.setState({
                                                                company_owner: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="职位" colon={false}>
                                                        <input placeholder="请输入负责人职位" onChange={event => {
                                                            this.setState({
                                                                position: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="所属行业" colon={false}>
                                                        <Select
                                                            placeholder="请选择"
                                                            onChange={this.handleSelectChangeIndustry.bind(this)}
                                                        >
                                                            <Option value="1">金融业</Option>
                                                            <Option value="2">游戏业</Option>
                                                        </Select>
                                                    </FormItem>
                                                    <FormItem label="邮箱" colon={false}>
                                                        <input placeholder="请输入联系邮箱" onChange={event => {
                                                            this.setState({
                                                                email: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="地址" colon={false}>
                                                        <input placeholder="请输入公司地址，省、市、区、详细地址" onChange={event => {
                                                            this.setState({
                                                                address: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="座机" colon={false}>
                                                        <input placeholder="请输入公司座机" onChange={event => {
                                                            this.setState({
                                                                tel: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="手机号码" colon={false}>
                                                        <input placeholder="请输入联系人手机号码" onChange={event => {
                                                            this.setState({
                                                                phone: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <Form.Item
                                                        label="公司照片"
                                                        // extra="33333"
                                                    >
                                                        {/* <Upload
                                                            name="avatar"
                                                            listType="picture-card"
                                                            className="avatar-uploader"
                                                            showUploadList={false}
                                                            action="http://backend.delcache.com/file/upload"
                                                            //beforeUpload={this.beforeUpload.bind(this)}
                                                            onChange={this.handleChange.bind(this)}
                                                        >
                                                            {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                                                        </Upload> */}

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
                                                    </Form.Item>
                                                    <FormItem label="合同编号" colon={false}>
                                                        <input placeholder="请输入合同编号" onChange={event => {
                                                            this.setState({
                                                                contract_num: event.target.value
                                                            });
                                                        }}/>
                                                    </FormItem>
                                                    <FormItem label="来源" colon={false}>
                                                        <Select
                                                            placeholder="请选择"
                                                            onChange={this.handleSelectChangeSource.bind(this)}
                                                        >
                                                            <Option value="1">展会</Option>
                                                            <Option value="2">广告杂志</Option>
                                                            <Option value="3">客户转介绍</Option>
                                                        </Select>
                                                    </FormItem>
                                                </Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={() => this.goBack()}>返回</Button></Col>
                                                <Col md={8}>
                                                    <Button type="primary" htmlType="submit" onClick={() => this.newSupplier()}>保存</Button></Col>
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

const NewShouldPay = Form.create()(NewShouldPays);

export default NewShouldPay;