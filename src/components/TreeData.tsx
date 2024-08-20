import { Tree } from "antd";
import { useEffect, useState } from "react";
import { GetDataFromId, GetWithChild } from "@/app/api/services/Value/data";
import { UUID } from "crypto";
import type { TreeDataNode, TreeProps } from "antd";
import { GetAllFamily } from "@/app/api/services/Family/data";
import { GetAllProcess } from "@/app/api/services/Process/data";

interface ExtendedDataNode extends TreeDataNode {
  id?: UUID;
  disabled?: boolean;
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
  const [selectedNodes, setSelectedNodes] = useState<any[]>([]);

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
              title: `${item.characteristic_display}: ${item.ds_Value}`,
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
                      title: `${responseChildren.characteristic_display}: ${responseChildren.ds_Value}`,
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

  const onCheck: TreeProps<ExtendedDataNode>["onCheck"] = (
    checkedKeys,
    info
  ) => {
    const { checked } = info;
    const nodeId = info.node.id;

    if (checked) {
      setSelectedNodes([...selectedNodes, nodeId]);
    } else {
      setSelectedNodes(selectedNodes.filter((id) => id !== nodeId));
    }

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      parent_value_id: nodeId,
    }));
    console.log(info.node);
  };

  useEffect(() => {
    if (fetchData) {
      fetchTree();
    }
  }, [fetchData]);

  useEffect(() => {
    const updateDisabledNodes = (
      nodes: ExtendedDataNode[],
      parentDisabled: boolean = false
    ): ExtendedDataNode[] => {
      return nodes.map((node) => {
        const isDisabled =
          parentDisabled ||
          (selectedNodes.includes("e4ede3b9-62fb-47fe-9ab5-3210f8137a1f") &&
            node.id === "312d9f38-7cdb-48ce-94bb-fedfc504682c") ||
          (selectedNodes.includes("312d9f38-7cdb-48ce-94bb-fedfc504682c") &&
            node.id === "e4ede3b9-62fb-47fe-9ab5-3210f8137a1f");

        return {
          ...node,
          disabled: isDisabled,
          children: node.children
            ? updateDisabledNodes(node.children, isDisabled)
            : undefined,
        };
      });
    };

    setTreeData((prevTreeData) => updateDisabledNodes(prevTreeData));
  }, [selectedNodes]);

  return (
    <Tree
      checkable={checkable}
      treeData={treeData}
      onSelect={onSelect}
      onCheck={onCheck}
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

export const TreeFamily: React.FC<TreeValuesProps> = ({
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
              title: `${item.characteristic_display}: ${item.ds_Value}`,
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
                      title: `${responseChildren.characteristic_display}: ${responseChildren.ds_Value}`,
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
      valueId: info.node.id,
    }));
    console.log(info.node.id);
  };

  const onCheck: TreeProps<ExtendedDataNode>["onCheck"] = () => {};

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
      onCheck={onCheck}
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

export const TreeProcess: React.FC<TreeValuesProps> = ({
  setFormData,
  fetchData,
  setFetchData,
  checkable,
}) => {
  const [treeData, setTreeData] = useState<ExtendedDataNode[]>([]);

  const buildTree = (data: any) => {
    return data.map((item: { dsProcess: string }, index: number) => ({
      title: item.dsProcess,
      key: `0-${index}`,
    }));
  };

  const fetchTree = async () => {
    try {
      const response = await GetAllProcess();
      console.log(response);

      const treeData = response.map(
        (process: { id: string; ds_Process: string }) => ({
          id: process.id,
          dsProcess: process.ds_Process,
        })
      );

      const tree = buildTree(treeData);

      setTreeData(tree);
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

  const onCheck: TreeProps<ExtendedDataNode>["onCheck"] = () => {};

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
      onCheck={onCheck}
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
