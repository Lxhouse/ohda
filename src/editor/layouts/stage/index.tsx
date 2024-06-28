import React from 'react';
import { Button, Space } from 'antd';

interface IComponent {
  id: string;
  name: string;
  props: any;
  children?: IComponent[];
}

const components: IComponent[] = [
  {
    id: '1',
    name: 'Button',
    props: {
      type: 'primary',
      children: '按钮',
    },
  },
  {
    id: '2',
    name: 'Space',
    props: {
      className: 'ml-10',
      size: 'large',
    },
    children: [
      {
        id: '3',
        name: 'Button',
        props: {
          type: 'primary',
          children: '按钮1',
        },
      },
      {
        id: '4',
        name: 'Button',
        props: {
          type: 'primary',
          children: '按钮2',
        },
      },
    ],
  },
];

const ComponentMap: Record<string, React.ElementType> = {
  Button,
  Space,
};

const renderComponents = (components: IComponent[]): React.ReactNode => {
  return components.map((component) => {
    const ComponentType = ComponentMap[component.name];
    if (!ComponentType) return null;

    return React.createElement(
      ComponentType,
      component.props,
      component.props.children || renderComponents(component.children || [])
    );
  });
};

const Stage: React.FC = () => {
  return <div className="p-[24px]">{renderComponents(components)}</div>;
};

export default Stage;
