import { Tree } from "antd";
import { useEffect, useState } from "react";
import { GetDataFromId, GetWithChild } from "@/app/api/services/Value/data";
import { UUID } from "crypto";
import type { TreeDataNode, TreeProps } from "antd";
import { TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd';

interface ExtendedDataNode extends TreeDataNode {
  id?: UUID;
}

interface TreeValuesProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  fetchData: boolean;
  setFetchData: React.Dispatch<React.SetStateAction<boolean>>;
  checkable?: boolean;
}

export const TreeValues: React.FC<TreeValuesProps> = ({
  setFormData,
  fetchData,
  setFetchData,
  checkable,
}) => {
  const [treeData, setTreeData] = useState<ExtendedDataNode[]>([]);

  const fetchTree = async () => {
    try {
      const response = await GetWithChild();
      const targetParentId = "49f0343a-60ab-473a-b167-d893f52e6c35";
      let nodeCount = 0;
      let parentKey = "0";

      const buildTreeNode = async (
        parentId: UUID,
        parentKey: string
      ): Promise<ExtendedDataNode[]> => {
        const treeData: ExtendedDataNode[] = [];

        for (const item of response) {
          if (item.parent_value_id === parentId) {
            const node: ExtendedDataNode = {
              id: item.value_id,
              title: `${item.characteristic_display}: ${item.value_description}`,
              key: `${parentKey}-${nodeCount++}`,
              children: [],
            };
            if (item.children_value_id && item.children_value_id.length > 0) {
              const childrenNodes = await Promise.all(
                item.children_value_id.map(
                  async (childValueId: UUID, index: number) => {
                    const responseChildren = await GetDataFromId(childValueId);
                    const childNodes = await buildTreeNode(
                      childValueId,
                      `${parentKey}-${node.key}-${index}`
                    );
                    return {
                      id: responseChildren.value_id,
                      title: `${responseChildren.characteristic_display}: ${responseChildren.value_description}`,
                      key: `${parentKey}-${node.key}-${index}`,
                      children: childNodes,
                    };
                  }
                )
              );
              node.children = childrenNodes;
            }
            treeData.push(node);
          }
        }
        return treeData;
      };
      const treeData = await buildTreeNode(targetParentId, parentKey);

      setTreeData(treeData);
      setFetchData(false);
    } catch (error) {
      console.error("Erro ao buscar restritivos:", error);
    }
  };

  const onSelect: TreeProps<ExtendedDataNode>["onSelect"] = (
    selectedKeys,
    info
  ) => {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      parent_value_id: info.node.id,
    }));
    console.log(info.node);
  };

  const onDrop: TreeProps<ExtendedDataNode>["onDrop"] = (info) => {
    const dropKey = info.node.key as string;
    const dragKey = info.dragNode.key as string;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const data = [...treeData];

    let dragObj: ExtendedDataNode;
    const loop = (
      data: ExtendedDataNode[],
      key: string,
      callback: (
        node: ExtendedDataNode,
        i: number,
        arr: ExtendedDataNode[]
      ) => void
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          callback(data[i], i, data);
          return;
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };

    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.push(dragObj!);
      });
    } else if (
      (info.node.children || []).length > 0 &&
      info.node.expanded &&
      dropPosition === 1
      
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj!);
      });
    } else {
      let ar: ExtendedDataNode[] = [];
      let i: number;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }

    setTreeData(data);
  };

  useEffect(() => {
    if (fetchData) {
      fetchTree();
    }
  }, [fetchData]);

  return (
    <Tree
      checkable={checkable}
      treeData={treeData}
      onSelect={onSelect}
      style={{
        height: "100%",
        maxHeight: 607,
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
      showLine={true}
    />
  );
};
