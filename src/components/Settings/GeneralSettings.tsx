import { CalendarOutlined, MenuOutlined } from "@ant-design/icons";
import { Drawer, FloatButton } from "antd";
import { useState } from "react";
import { CalendarSettings, PageTabs } from "./CalendarSettings";

const GeneralSettings: React.FC = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const openDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };
  return (
    <>
      <FloatButton.Group
        trigger="hover"
        icon={<MenuOutlined />}
        style={{ right: 50, bottom: 90 }}
      >
        <FloatButton
          icon={<CalendarOutlined />}
          tooltip={<div>Calendario</div>}
          onClick={openDrawer}
        />
      </FloatButton.Group>

      <Drawer
        placement="right"
        open={isDrawerVisible}
        onClose={closeDrawer}
        width={"100%"}
        title="Calendários"
      >

        <PageTabs/>
      </Drawer>
    </>
  );
};

export default GeneralSettings;
