import { useState } from 'react';
import { useComponents } from '@/editor/stores/components';
import { getComponentById } from '@/editor/utils';
import { IComponent } from '@/editor/utils/types';
import { Collapse, Select, Input, TreeSelect } from 'antd';
import {
  componentsEventMap,
  componentsMethodsMap,
} from '@/editor/utils/constants';

const ComponentEvent = () => {
  const [selectedComponent, setSelectedComponent] =
    useState<IComponent | null>();
  const { curComponent, curComponentId, components, updateComponentProps } =
    useComponents();
  // 事件类型改变
  function typeChange(eventName: string, value: string) {
    if (!curComponentId) return;
    updateComponentProps(curComponentId, { [eventName]: { type: value } });
  }

  // 消息类型改变
  function messageTypeChange(eventName: string, value: string) {
    if (!curComponentId) return;
    setSelectedComponent(null);
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

  function componentMethodChange(eventName: string, value: string) {
    if (!curComponentId) return;

    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        config: {
          ...curComponent?.props?.[eventName]?.config,
          method: value,
        },
      },
    });
  }

  /** 选择组件改变 */

  function componentChange(eventName: string, value: string) {
    if (!curComponentId) return;

    setSelectedComponent(getComponentById(value, components));

    updateComponentProps(curComponentId, {
      [eventName]: {
        ...curComponent?.props?.[eventName],
        config: {
          ...curComponent?.props?.[eventName]?.config,
          componentId: value,
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
                  options={[
                    { label: '显示提示', value: 'showMessage' },
                    { label: '组件方法', value: 'componentFunction' },
                  ]}
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
            {curComponent?.props?.[setting.name]?.type ===
              'componentFunction' && (
              <div className="flex flex-col gap-[12px] mt-[12px]">
                <div className="flex items-center gap-10">
                  <div>组件：</div>
                  <div>
                    <TreeSelect
                      style={{ width: 160 }}
                      treeData={components}
                      fieldNames={{
                        label: 'name',
                        value: 'id',
                      }}
                      onChange={(value) => componentChange(setting.name, value)}
                      value={
                        curComponent?.props?.[setting?.name]?.config
                          ?.componentId
                      }
                    />
                  </div>
                </div>

                {componentsMethodsMap.has(selectedComponent?.name || '') && (
                  <div className="flex items-center gap-10">
                    <div>方法：</div>
                    <div>
                      <Select
                        className="w-[160px]"
                        options={componentsMethodsMap
                          .get(selectedComponent?.name || '')
                          ?.map((method) => ({
                            label: method.label,
                            value: method.name,
                          }))}
                        value={
                          curComponent?.props?.[setting.name]?.config?.method
                        }
                        onChange={(value) => {
                          componentMethodChange(setting.name, value);
                        }}
                      ></Select>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Collapse.Panel>
        </Collapse>
      ))}
    </div>
  );
};

export default ComponentEvent;
