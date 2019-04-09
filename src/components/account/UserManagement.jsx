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
                <BreadcrumbCustom first="账户管理" second="用户管理" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card bordered={false}>
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