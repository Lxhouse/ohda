import React from 'react';
import { useDrop } from 'react-dnd';
import { Button, Space } from 'antd';
import { ItemType } from '@/editor/item-type';

interface IComponent {
  id: string;
  name: string;
  props: any;
  children?: IComponent[];
}

const ComponentMap: Record<string, React.ElementType> = {
  Button,
  Space,
};

const Stage: React.FC = () => {
  const components: IComponent[] = [];
  /** 渲染组件 */
  const renderComponents = (components: IComponent[]): React.ReactNode => {
    return components.map((component) => {
      const ComponentType = ComponentMap[component.name];
      if (!ComponentType) return;

      return React.createElement(
        ComponentType,
        { key: component.id, id: component.id, ...component.props },
        component.props.children || renderComponents(component.children || [])
      );
    });
  };
  const [{ canDrop }, drag] = useDrop(() => ({
    //可接受的元素类型
    accept: [ItemType.Button, ItemType.Space],
    drop: (_, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      return { id: 0 };
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));
  return (
    <div
      ref={drag}
      className={[
        'p-[24px] h-[100%]',
        canDrop ? ` border-2 border-solid border-gray-500` : '',
      ].join(' ')}
    >
      {renderComponents(components)}
    </div>
  );
};

export default Stage;
