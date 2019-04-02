/**
 * Created by hao.cheng on 2017/4/13.
 */
import React, { Component } from 'react';
import { Card, Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import EditableTable from '../tables/EditableTable';
const FormItem = Form.Item;
const Option = Select.Option;


class UserManagements extends Component {
    state = {
        confirmDirty: false,
    };
    render() {
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="表单" second="基础表单" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="固定列" bordered={false}>
                                <EditableTable />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

const UserManagement = Form.create()(UserManagements);

export default UserManagement;