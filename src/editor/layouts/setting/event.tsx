import React from 'react';
import { ItemType } from '@/editor/item-type';
import { useComponents } from '@/editor/stores/components';
import { Collapse, Select, Input } from 'antd';
import { componentsEventMap } from '@/editor/utils/constants';

const ComponentEvent = () => {
  const { curComponent, curComponentId, updateComponentProps } =
    useComponents();
  // 事件类型改变
  function typeChange(eventName: string, value: string) {
    if (!curComponentId) return;
    updateComponentProps(curComponentId, { [eventName]: { type: value } });
  }

  // 消息类型改变
  function messageTypeChange(eventName: string, value: string) {
    if (!curComponentId) return;
    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        config: {
          ...curComponent?.props?.[eventName]?.config,
          type: value,
        },
      },
    });
  }
  // 消息文本改变
  function messageTextChange(eventName: string, value: string) {
    if (!curComponentId) return;
    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        config: {
          ...curComponent?.props?.[eventName]?.config,
          text: value,
        },
      },
    });
  }
  if (!curComponent || !componentsEventMap.has(curComponent.name))
    return <div>该组件暂无事件配置</div>;

  const eventSettings = componentsEventMap.get(curComponent.name)!;

  return (
    <div className="px-[12px]">
      {eventSettings.map((setting) => (
        <Collapse key={setting.name} defaultActiveKey={setting.name}>
          <Collapse.Panel header={setting.label} key={setting.name}>
            <div className="flex items-center gap-10">
              <div>动作：</div>
              <div>
                <Select
                  className="w-[160px]"
                  options={[{ label: '显示提示', value: 'showMessage' }]}
                  onChange={(value) => typeChange(setting.name, value)}
                  value={curComponent?.props?.[setting.name]?.type}
                />
              </div>
            </div>
            {curComponent?.props?.[setting.name]?.type === 'showMessage' && (
              <div className="flex flex-col gap-[12px] mt-[12px]">
                <div className="flex items-center gap-10">
                  <div>类型：</div>
                  <div>
                    <Select
                      className="w-[160px]"
                      options={[
                        { label: '成功', value: 'success' },
                        { label: '失败', value: 'error' },
                      ]}
                      onChange={(value) => {
                        messageTypeChange(setting.name, value);
                      }}
                      value={curComponent?.props?.[setting.name]?.config?.type}
                    ></Select>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div>文本：</div>
                  <div>
                    <Input
                      className="w-[160px]"
                      onChange={(e) => {
                        messageTextChange(setting.name, e.target.value);
                      }}
                      value={curComponent?.props?.[setting.name]?.config?.text}
                    ></Input>
                  </div>
                </div>
              </div>
            )}
          </Collapse.Panel>
        </Collapse>
      ))}
    </div>
  );
};

export default ComponentEvent;
