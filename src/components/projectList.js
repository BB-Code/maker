import React from "react";
import { Avatar, Button, List, message, Modal } from "antd";
import { getStore } from "../utils/store";
import { Command } from "@tauri-apps/api/shell";
import { showLoading, hideLoading } from "./loading";
import { rmStoreData } from "../utils/store";
import { imageUrl } from "../config";
import { isDarwin } from "../utils/platform";

export default function ProjectList(props) {
  return (
    <List
      bordered={true}
      itemLayout="vertical"
      dataSource={props.dataSource}
      renderItem={(item, index) => (
        <List.Item extra={
          <Button
          size='small'
            type="primary"
            danger
            onClick={async () => {
              Modal.confirm({
                title: `确认删除 ${item.title} 吗`,
                closable: true,
                mask: true,
                maskClosable: false,
                okText: "确定",
                cancelText: "取消",
                onOk: async () => {
                  let isMac = await isDarwin();
                  if (isMac) {
                    let res = await new Command("rm", ["-rf",getStore("dir") + `${item.title}`,]).execute();
                    if (res.code === 0) {
                      message.success("删除成功");
                      let handlerData = rmStoreData(
                        props.prefix + "ProjectNameList",
                        item.title
                      );
                      console.log(handlerData);
                      props.setDataSource(handlerData);
                      return false;
                    } else {
                      message.error(res.stderr);
                      return true;
                    }
                  } else {
                    let res = await new Command("powershell", [
                      "rmdir",
                      "-r",
                      getStore("dir") + `\\${item.title}`,
                    ]).execute();
                    if (res.code === 0) {
                      message.success("删除成功");
                      let handlerData = rmStoreData(
                        props.prefix + "ProjectNameList",
                        item.title
                      );
                      console.log(handlerData);
                      props.setDataSource(handlerData);
                      return false;
                    } else {
                      message.error(res.stderr);
                      return true;
                    }
                  }
                },
              });
            }}
          >
            删除
          </Button>
        }>
          <List.Item.Meta
            key={index}
            avatar={
              <Avatar
                shape="circle"
                src={
                    props.prefix === "react"
                    ? imageUrl.react_img
                    : props.prefix === "vue2"
                    ? imageUrl.vue2_img
                    : props.prefix === "express"
                    ? imageUrl.express_img
                    : imageUrl.node_img
                }
              />
            }
            title={
              <a
                onClick={async () => {
                  // 打开 explorer
                  showLoading("打开中...");
                  let isMac = await isDarwin();
                  if (isMac) {
                    new Command("macOpen", [getStore("dir") + `/${item.title}`])
                      .execute()
                      .then((result) => {
                        if (result.code === 0) {
                          hideLoading();
                        }
                      });
                  } else {
                    console.log(getStore("dir") + `\\${item.title}`);
                    new Command("explorer", [
                      getStore("dir") + `\\${item.title}`,
                    ])
                      .execute()
                      .then((result) => {
                        if (result.code === 1) {
                          hideLoading();
                        }
                      });
                  }
                }}
              >
                {item.title}
              </a>
            }
            description={item?.desc ?? ""}
          />
          <p style={{width:'200px'}}>创建时间: {item?.ctime ?? ""}</p>
          
        </List.Item>
      )}
    />
  );
}
