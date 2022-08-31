import React, { useRef } from 'react'
import { Image, Button, message, Modal } from 'antd';
import { ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { Command } from '@tauri-apps/api/shell'
import { templateUrl } from '../config';
import { showLoading,hideLoading } from './loading';
export default function Card() {
    let ref = useRef();
    const createTemplate = (template) => {
        Modal.confirm({
            title: '项目信息',
            closable: true,
            mask: true,
            maskClosable: false,
            okText: '确定',
            cancelText: '取消',
            centered: true,
            content: <ProForm formRef={ref} submitter={false}>
                <ProFormText name='projectName' label="项目名" placeholder='请输入项目名' required></ProFormText>
            </ProForm>,
            onOk: () => {
                if (!ref.current.getFieldValue('projectName')) {
                    message.info('请输入项目名称!')
                    return true;
                } else {
                    showLoading();
                    new Command('run-git-clone', ['clone', template, localStorage.getItem('dir') + `\\${ref.current.getFieldValue('projectName')}`]).execute().then(result => {
                        hideLoading();
                        if (result.code === 0) {
                            message.success('下载成功');
                            return false;
                        } else if (result.code === 128) {
                            message.error('项目已经存在');
                            return true;
                        } else {
                            message.info(result.stderr)
                            return true;
                        }
                    })
                }
            }
        })
    }
    return (
        <div id='container'>
            <ProCard gutter={8}>
                <ProCard title="React" tooltip={'基于 create-react-app new [appname] 创建应用'} extra={
                    <Button type='ghost' onClick={async () => {
                        createTemplate(templateUrl.react_template)
                    }}>创建</Button>
                } colSpan={8} layout="center" bordered>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160 }}>
                        <Image preview={false} width={100} height={100} src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" />
                    </div>
                </ProCard>
                <ProCard title="Vue3" tooltip={'基于  npm init vue@latest 创建应用'} extra={
                    <Button type='ghost' onClick={async () => {
                        createTemplate(templateUrl.vue2_template)
                    }}>创建</Button>
                } colSpan={8} layout="center" bordered>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160 }}>
                        <Image preview={false} src="https://blog-img-1252233196.cos.ap-guangzhou.myqcloud.com/vue.svg" />
                    </div>
                </ProCard>
                <ProCard title="Express" tooltip={'基于  express-generator 创建应用'} extra={
                    <Button type='ghost' onClick={async () => {
                        createTemplate(templateUrl.express_template)
                    }}>创建</Button>
                } colSpan={8} layout="center" bordered>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160 }}>
                        <Image preview={false} src="https://blog-img-1252233196.cos.ap-guangzhou.myqcloud.com/expess.png" />
                    </div>
                </ProCard>
            </ProCard>
        </div>
    )
}
