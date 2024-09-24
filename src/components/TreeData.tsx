import { Tree } from "antd";
import { useEffect, useState } from "react";
import { GetWithChild } from "@/app/api/services/Value/data";
import { UUID } from "crypto";
import type { TreeProps } from "antd";
import { GetAllFamily } from "@/app/api/services/Family/data";
import { GetAllProcess } from "@/app/api/services/Process/data";
import { TreeNode } from "antd/es/tree-select";

interface ExtendedDataNode extends TreeDataNode {
  id?: UUID;
  disabled?: boolean;
  familyId?: UUID;
  processId?: UUID;
  values?: UUID;
}

interface TreeNode {
  characteristic_display: string;
  characteristic_id: UUID;
  children_value_id: UUID[];
  parent_value_id: UUID | null;
  ds_Value?: string;
  value_id?: UUID;
  familyId?: UUID;
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
  checkedKeys?: any;
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

    setFormData((prevFormData: any) => {
      let newValueId;

      if (checked) {
        newValueId = Array.isArray(prevFormData.value_id)
          ? [...prevFormData.value_id, nodeId]
          : [prevFormData.value_id, nodeId];
      } else {
        newValueId = prevFormData.value_id.filter(
          (id: string) => id !== nodeId
        );
      }

      return {
        ...prevFormData,
        parent_value_id: nodeId,
        value_id: newValueId.filter((id: UUID) => id !== undefined),
      };
    });

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
  checkedKeys,
}) => {
  const [treeData, setTreeData] = useState<ExtendedDataNode[]>([]);
  const rootId: UUID = "49f0343a-60ab-473a-b167-d893f52e6c35";
  const [selectedNodes, setSelectedNodes] = useState<any[]>([]);

  function buildTree(
    nodes: TreeNode[],
    parentId: UUID | null = null
  ): TreeDataNode[] {
    return nodes
      .filter((node) => node.parent_value_id === parentId)
      .map((node) => ({
        values: node.value_id,
        parent_value_id: node.parent_value_id,
        title: node.characteristic_display + ": " + node.ds_Value,
        key: node.value_id ?? `default-key-${parentId}-${Math.random()}`,
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
      values: Array.isArray(prevFormData.values)
        ? [...prevFormData.values, info.node.values]
        : [info.node.values],
    }));
    console.log(info.node);
  };

  const onCheck: TreeProps<ExtendedDataNode>["onCheck"] = (
    checkedKeys,
    info
  ) => {
    const { checked } = info;
    const nodeId = info.node.values;

    if (checked) {
      setSelectedNodes([...selectedNodes, nodeId]);
    } else {
      setSelectedNodes(selectedNodes.filter((id) => id !== nodeId));
    }

    setFormData((prevFormData: any) => {
      let newProcessIds;

      if (checked) {
        newProcessIds = Array.isArray(prevFormData.values)
          ? [...prevFormData.values, nodeId]
          : [nodeId];
      }
      return {
        ...prevFormData,
        values: newProcessIds,
      };
    });
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
      checkedKeys={checkedKeys}
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
  checkedKeys,
}) => {
  const [treeData, setTreeData] = useState<ExtendedDataNode[]>([]);
  const [selectedNodes, setSelectedNodes] = useState<any[]>([]);

  const buildTree = (data: any) => {
    return data.map((item: { dsProcess: string; id: UUID }, index: number) => ({
      processId: item.id,
      title: item.dsProcess,
      key: item.id,
    }));
  };

  const fetchTree = async () => {
    try {
      const response = await GetAllProcess();
      const treeData = response.map(
        (process: { id: UUID; ds_Process: string }) => ({
          id: process.id,
          dsProcess: process.ds_Process,
        })
      );

      const tree = buildTree(treeData);

      setTreeData(tree);
      setFetchData(false);
    } catch (error) {
      console.error("Erro ao buscar processos:", error);
    }
  };

  const onCheck: TreeProps<ExtendedDataNode>["onCheck"] = (
    checkedKeys,
    info
  ) => {
    const { checked } = info;
    const nodeId = info.node.processId;

    if (checked) {
      setSelectedNodes([...selectedNodes, nodeId]);
    } else {
      setSelectedNodes(selectedNodes.filter((id) => id !== nodeId));
    }

    setFormData((prevFormData: any) => {
      let newProcessIds;

      if (checked) {
        newProcessIds = Array.isArray(prevFormData.processIds)
          ? [...prevFormData.processIds, nodeId]
          : [nodeId];
      } else {
        newProcessIds = prevFormData.processIds.filter(
          (id: UUID) => id !== nodeId
        );
      }
      return {
        ...prevFormData,
        processIds: newProcessIds,
      };
    });
  };

  useEffect(() => {
    if (fetchData) {
      fetchTree();
    }
  }, [fetchData]);

  return (
    <Tree
      checkedKeys={checkedKeys}
      checkable={checkable}
      treeData={treeData}
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
  checkedKeys,
}) => {
  const [treeData, setTreeData] = useState<ExtendedDataNode[]>([]);
  const [selectedNodes, setSelectedNodes] = useState<any[]>([]);

  const buildTree = (data: any) => {
    return data.map((item: { dsFamily: string; id: UUID }, index: number) => ({
      familyId: item.id,
      title: item.dsFamily,
      key: item.id,
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

  const onCheck: TreeProps<ExtendedDataNode>["onCheck"] = (
    checkedKeys,
    info
  ) => {
    const { checked } = info;
    const nodeId = info.node.familyId;

    if (checked) {
      setSelectedNodes([...selectedNodes, nodeId]);
    } else {
      setSelectedNodes(selectedNodes.filter((id) => id !== nodeId));
    }

    setFormData((prevFormData: any) => {
      let newFamilyIds;

      if (checked) {
        newFamilyIds = Array.isArray(prevFormData.familyIds)
          ? [...prevFormData.familyIds, nodeId]
          : [nodeId];
      } else {
        newFamilyIds = prevFormData.familyIds.filter(
          (id: UUID) => id !== nodeId
        );
      }
      console.log(info.node);
      return {
        ...prevFormData,
        familyIds: newFamilyIds,
      };
    });
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
      checkedKeys={checkedKeys}
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
