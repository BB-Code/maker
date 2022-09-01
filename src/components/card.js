import React, { useRef, useState,useEffect } from 'react'
import { Image, Button, message, Modal, Drawer } from 'antd';
import { ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { Command } from '@tauri-apps/api/shell'
import { templateUrl, imageUrl } from '../config';
import { showLoading, hideLoading } from './loading';
import { getStore, saveProjectNames } from '../utils/store';
import ProjectList from '../components/projectList';
import { isDarwin } from '../utils/platform';

export default function Card() {
    let ref = useRef();
    let [visible, setVisible] = useState(false);
    let [prefixName, setPrefixName] = useState('');
    let [dataSource,setDataSource] = useState([]);
    useEffect(()=>{
      if (!getStore(prefixName + "ProjectNameList")) {
        setDataSource([])
      } else {
        setDataSource(JSON.parse(getStore(prefixName + "ProjectNameList")))
      }
    },[visible])
    const createTemplate = (prefix, template) => {
        if (!getStore('dir')) {
            message.info('请设置项目保存路劲');
            return;
        }
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
                <ProFormText name='projectDesc' label="项目描述" placeholder='请输入项目描述' ></ProFormText>
            </ProForm>,
            onOk: () => {
                if (!ref.current.getFieldValue('projectName')) {
                    message.info('请输入项目名称!')
                    return true;
                } else {
                    // 保存项目名称
                    saveProjectNames(prefix, 'ProjectNameList', {
                        title: ref.current.getFieldValue('projectName'),
                        desc: ref.current.getFieldValue('projectDesc'),
                        ctime: new Date().toLocaleString()
                    })
                    showLoading('下载中...');
                    let projectPath = getStore('dir') + `/${ref.current.getFieldValue('projectName')}`
                    isDarwin().then(res => {
                        if (res) {
                            new Command('run-git-clone', ['clone', template, projectPath]).execute().then(result => {
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
                        } else {
                            new Command('run-git-clone', ['clone', template, projectPath]).execute().then(result => {
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
                    })

                }
            }
        })
    }
    const onClose = () => {
        setVisible(false);
    }
    return (
        <div id='container'>
            <ProCard gutter={8}>
                <ProCard title="React" tooltip={'基于 create-react-app new [appname] 创建应用'} extra={
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Button type='ghost' onClick={async () => {
                            createTemplate('react', templateUrl.react_template)
                        }}>创建</Button>
                        <Button type='primary' onClick={() => {
                            setVisible(true);
                            setPrefixName('react');
                        }}>列表</Button>
                    </div>
                } colSpan={8} layout="center" bordered>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160 }}>
                        <Image preview={false} width={100} height={100} src={imageUrl.react_img} />
                    </div>
                </ProCard>
                <ProCard title="Vue3" tooltip={'基于  npm init vue@latest 创建应用'} extra={
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Button type='ghost' onClick={async () => {
                            createTemplate('vue2', templateUrl.vue2_template)
                        }}>创建</Button>
                        <Button type='primary' onClick={() => {
                            setVisible(true);
                            setPrefixName('vue2');
                        }}>列表</Button>
                    </div>
                } colSpan={8} layout="center" bordered>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160 }}>
                        <Image preview={false} src={imageUrl.vue2_img} />
                    </div>
                </ProCard>
                <ProCard title="Express" tooltip={'基于  express-generator 创建应用'} extra={
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Button type='ghost' onClick={async () => {
                            createTemplate('express', templateUrl.express_template)
                        }}>创建</Button>
                        <Button type='primary' onClick={() => {
                            setVisible(true);
                            setPrefixName('express');
                        }}>列表</Button>
                    </div>
                } colSpan={8} layout="center" bordered>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160 }}>
                        <Image preview={false} src={imageUrl.express_img} />
                    </div>
                </ProCard>
            </ProCard>
            <Drawer title="项目列表" placement="right" onClose={onClose} visible={visible}>
                <ProjectList prefix={prefixName} dataSource={dataSource} setDataSource={setDataSource}/>
            </Drawer>
        </div>
    )
}
