import React, { useEffect } from 'react'
import { Avatar, Button, List, message, Modal } from 'antd';
import { getStore } from '../utils/store';
import { Command } from '@tauri-apps/api/shell'
import { showLoading, hideLoading } from './loading';
import { rmStoreData } from '../utils/store';
import { imageUrl } from '../config';

export default function ProjectList(props) {
    let dataSource;
    if (!getStore(props.prefix + 'ProjectNameList')) {
        dataSource = []
    } else {
        dataSource = JSON.parse(getStore(props.prefix + 'ProjectNameList'))
    }
    return (
        <List
            itemLayout="horizontal"
            dataSource={dataSource}
            renderItem={(item, index) => (
                <List.Item>
                    <List.Item.Meta
                        key={index}
                        avatar={<Avatar src={
                            props.prefix === 'react' ? imageUrl.react_img : props.prefix === 'vue2' ? imageUrl.vue2_img : imageUrl.express_img
                        } />}
                        title={<a onClick={() => {
                            // 打开 explorer
                            showLoading('打开中...');
                            new Command('explorer', [getStore('dir') + `\\${item.title}`]).execute().then(result => {
                                if (result.code === 1) {
                                    hideLoading();
                                }
                            })
                        }}>{item.title}</a>}
                        description={item?.desc ?? ''}
                    />
                    <Button type='primary' danger onClick={async () => {
                        Modal.confirm({
                            title: '确认删除',
                            closable: true,
                            mask: true,
                            maskClosable: false,
                            okText: '确定',
                            cancelText: '取消',
                            onOk: async () => {
                                let res = await new Command('bash', ['rmdir', '-r', getStore('dir') + `\\${item.title}`]).execute()
                                if (res.code === 0) {
                                    message.success('删除成功');
                                    rmStoreData(props.prefix + 'ProjectNameList', item.title)
                                    return false;
                                } else {
                                    message.error(res.stderr);
                                    return true;
                                }
                            }
                        })
                    }}>删除</Button>
                </List.Item>
            )}
        />
    )
}
