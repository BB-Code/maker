import React, { useRef, useState, useEffect } from 'react'
import { Image, Button, message, Modal, Drawer } from 'antd';
import { ProCard, ProForm, ProFormText } from '@ant-design/pro-components';
import { Command, open } from '@tauri-apps/api/shell'
import { isPermissionGranted, sendNotification } from '@tauri-apps/api/notification';
import { showLoading, hideLoading } from './loading';
import { getStore, saveProjectNames } from '../utils/store';
import ProjectList from '../components/projectList';
import proCardList from '../mock';

export default function Card() {
    let ref = useRef();
    let [visible, setVisible] = useState(false);
    let [prefixName, setPrefixName] = useState('');
    let [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        if (!getStore(prefixName + "ProjectNameList")) {
            setDataSource([])
        } else {
            setDataSource(JSON.parse(getStore(prefixName + "ProjectNameList")))
        }
    }, [visible])
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
            content:
                <ProForm formRef={ref} submitter={false}>
                    <ProFormText name='projectName' label="项目名" placeholder='请输入项目名' required></ProFormText>
                    <ProFormText name='projectDesc' label="项目描述" placeholder='请输入项目描述' ></ProFormText>
                </ProForm>,
            onOk: () => {
                // 自动化安装
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
                    console.log("🚀 ~ file: card.js ~ line 53 ~ createTemplate ~ projectPath", projectPath)
                    new Command('run-git-clone', ['clone', template, projectPath]).execute().then(result => {
                        hideLoading();
                        if (result.code === 0) {
                            message.success('下载成功');
                            if (getStore('isAuto')) {
                                showLoading('npm install 中...')
                                new Command("powershell", ['Set-Location', '-Path', "F:/demos/demo2", ';', 'npm', 'install']).execute().then(async (res) => {
                                    if (res.code === 0) {
                                        hideLoading();
                                        //通知
                                        let permissionGranted = await isPermissionGranted();
                                        if (permissionGranted) {
                                            sendNotification({ title: '项目安装步骤', body: 'npm install 完成!' });
                                            showLoading('npm run start 中...');
                                            let result = await new Command("powershell", ['Set-Location', '-Path', "F:/demos/demo2", ';', 'npm', 'run', 'start']).execute();
                                            hideLoading();
                                            if (result.code === 0) {
                                                if (permissionGranted) {
                                                    sendNotification({ title: '项目安装步骤', body: 'npm run start 完成!' });
                                                }
                                                await open('http://localhost:5000');
                                            }
                                        }
                                    }
                                })
                            } else {
                                setVisible(true);
                            }
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
    const onClose = () => {
        setVisible(false);
    }
    return (
        <div id='container'>
            <ProCard gutter={[10, 10]} wrap={true} type='inner'>
                {
                    proCardList?.map((item, index) => {
                        return (
                            <ProCard key={item.id} title={item.title} tooltip={item.tooltip} extra={
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    <Button type='ghost' onClick={async () => {
                                        createTemplate(item.title, item.templdate_url)
                                    }}>创建</Button>
                                    <Button type='primary' onClick={() => {
                                        setVisible(true);
                                        setPrefixName(item.title);
                                    }}>列表</Button>
                                </div>
                            } colSpan={8} layout="center" bordered>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160 }}>
                                    <Image preview={false} width={100} height={100} src={item.img_url} />
                                </div>
                            </ProCard>
                        )
                    })
                }
            </ProCard>
            <Drawer title="项目列表" placement="right" onClose={onClose} visible={visible}>
                <ProjectList prefix={prefixName} dataSource={dataSource} setDataSource={setDataSource} />
            </Drawer>
        </div>
    )
}
