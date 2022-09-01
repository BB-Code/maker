import React, { useEffect, useState } from "react";
import { Avatar, Button, List, message, Modal } from "antd";
import { getStore } from "../utils/store";
import { Child, Command } from "@tauri-apps/api/shell";
import { showLoading, hideLoading } from "./loading";
import { rmStoreData } from "../utils/store";
import { imageUrl } from "../config";
import { isDarwin } from "../utils/platform";

export default function ProjectList(props) {
  let [dataSource,setDataSource] = useState([]);
  useEffect(()=>{
    if (!getStore(props.prefix + "ProjectNameList")) {
      setDataSource([])
    } else {
      setDataSource(JSON.parse(getStore(props.prefix + "ProjectNameList")))
    }
  },[dataSource])
  return (
    <List
      itemLayout="horizontal"
      dataSource={dataSource}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            key={index}
            avatar={
              <Avatar
                src={
                  props.prefix === "react"
                    ? imageUrl.react_img
                    : props.prefix === "vue2"
                    ? imageUrl.vue2_img
                    : imageUrl.express_img
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
                    console.log(getStore("dir") + `\\${item.title}`)
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
          <Button
            type="primary"
            danger
            onClick={async () => {
              Modal.confirm({
                title: "确认删除",
                closable: true,
                mask: true,
                maskClosable: false,
                okText: "确定",
                cancelText: "取消",
                onOk: async () => {
                //   let isMac = await isDarwin();
                //   if (isMac) {
                //     console.log(getStore("dir") + `${item.title}`);
                //     let chmod = await new Command("bash", [
                //       "chmod",
                //       "775",
                //       getStore("dir") + `${item.title}`,
                //     ]).execute();
                //     console.log(chmod);
                //     if (chmod.code === 0) {
                    //   let res = await new Command("bash", [
                    //     "rm",
                    //     "-r",
                    //     getStore("dir") + `${item.title}`,
                    //   ]).execute();
                    //   if (res.code === 0) {
                    //     message.success("删除成功");
                    //     rmStoreData(
                    //       props.prefix + "ProjectNameList",
                    //       item.title
                    //     );
                    //     return false;
                    //   } else {
                    //     message.error(res.stderr);
                    //     return true;
                    //   }
                    // }
                //   } else {
                    let res = await new Command("powershell", [
                      "rmdir",
                      "-r",
                      getStore("dir") + `\\${item.title}`,
                    ]).execute();
                    if (res.code === 0) {
                      message.success("删除成功");
                      rmStoreData(props.prefix + "ProjectNameList", item.title);
                      return false;
                    } else {
                      message.error(res.stderr);
                      return true;
                    }
                  }
                //},
              });
            }}
          >
            删除
          </Button>
        </List.Item>
      )}
    />
  );
}
