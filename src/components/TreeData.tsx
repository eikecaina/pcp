import { Tree } from "antd";
import { useEffect, useState } from "react";
import { GetDataFromId, GetWithChild } from "@/app/api/services/Value/data";
import { UUID } from "crypto";
import type { TreeProps } from "antd";
import { GetAllFamily } from "@/app/api/services/Family/data";
import { GetAllProcess } from "@/app/api/services/Process/data";
import { TreeNode } from "antd/es/tree-select";

interface ExtendedDataNode extends TreeDataNode {
  id?: UUID;
  disabled?: boolean;
}

interface TreeNode {
  characteristic_display: string;
  characteristic_id: UUID;
  children_value_id: UUID[];
  parent_value_id: UUID | null;
  ds_Value: string;
  value_id: UUID;
}

interface TreeDataNode {
  title: string;
  key: string;
  children?: TreeDataNode[];
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
  const rootId: UUID = "49f0343a-60ab-473a-b167-d893f52e6c35";

  function buildTree(
    nodes: TreeNode[],
    parentId: UUID | null = null
  ): TreeDataNode[] {
    return nodes
      .filter((node) => node.parent_value_id === parentId)
      .map((node, index) => ({
        id: node.value_id,
        title: node.characteristic_display + ": " + node.ds_Value,
        key: `${parentId ? parentId : "root"}-${index}`,
        children: buildTree(nodes, node.value_id),
      }));
  }

  const fetchTree = async (): Promise<void> => {
    try {
      const response: TreeNode[] = await GetWithChild();

      const data = buildTree(response, rootId);
      setTreeData(data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
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
  const [selectedNodes, setSelectedNodes] = useState<any[]>([]);
  const rootId: UUID = "49f0343a-60ab-473a-b167-d893f52e6c35";

  function buildTree(
    nodes: TreeNode[],
    parentId: UUID | null = null
  ): TreeDataNode[] {
    return nodes
      .filter((node) => node.parent_value_id === parentId)
      .map((node, index) => ({
        title: node.characteristic_display + ": " + node.ds_Value,
        key: `${parentId ? parentId : "root"}-${index}`,
        children: buildTree(nodes, node.value_id),
      }));
  }

  const fetchTree = async (): Promise<void> => {
    try {
      const response: TreeNode[] = await GetWithChild();

      const data = buildTree(response, rootId);
      setTreeData(data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
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

export const TreeProcessFamily: React.FC<TreeValuesProps> = ({
  setFormData,
  fetchData,
  setFetchData,
  checkable,
}) => {
  const [treeData, setTreeData] = useState<ExtendedDataNode[]>([]);

  const buildTree = (data: any) => {
    return data.map((item: { dsFamily: string }, index: number) => ({
      title: item.dsFamily,
      key: `0-${index}`,
    }));
  };

  const fetchTree = async () => {
    try {
      const response = await GetAllFamily();
      console.log(response);

      const treeData = response.map(
        (family: { id: string; ds_Family: string }) => ({
          id: family.id,
          dsFamily: family.ds_Family,
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
