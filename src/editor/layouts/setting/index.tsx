import React, { useEffect } from 'react';
import { useComponents } from '@/editor/stores/components';
import { ItemType } from '@/editor/item-type';
import { Form, Select, Input } from 'antd';
const componentSettingMap = {
  [ItemType.Button]: [
    {
      name: 'type',
      label: '按钮类型',
      type: 'select',
      options: [
        { label: '主按钮', value: 'primary' },
        { label: '次按钮', value: 'default' },
      ],
    },
    {
      name: 'children',
      label: '文本',
      type: 'input',
    },
  ],
  [ItemType.Space]: [
    {
      name: 'size',
      label: '间距大小',
      type: 'select',
      options: [
        { label: '大', value: 'large' },
        { label: '中', value: 'middle' },
        { label: '小', value: 'small' },
      ],
    },
  ],
};
const Setting: React.FC = () => {
  const [form] = Form.useForm();
  const { curComponentId, curComponent, updateComponentProps } =
    useComponents();

  useEffect(() => {
    // 初始化表单
    form.setFieldsValue(curComponent?.props);
  }, [curComponent]);

  // 监听表单值变化，更新组件属性
  function valueChange(changeValues: any) {
    if (curComponentId) {
      updateComponentProps(curComponentId, changeValues);
    }
  }
  function renderFormElement(setting: any) {
    const { type, options } = setting || {};
    if (type === 'select') {
      return <Select options={options} />;
    } else if (type === 'input') {
      return <Input />;
    }
  }
  if (!curComponentId || !curComponent) return null;

  return (
    <div className="pt-[20px]">
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        onValuesChange={valueChange}
      >
        {(componentSettingMap[curComponent.name] || []).map((setting) => {
          return (
            <Form.Item name={setting.name} label={setting.label}>
              {renderFormElement(setting)}
            </Form.Item>
          );
        })}
      </Form>
    </div>
  );
};

export default Setting;
