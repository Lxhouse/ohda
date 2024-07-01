import { ItemType } from '@/editor/item-type';
import { Space as AntdSpace } from 'antd';
import React from 'react';
import { useDrop } from 'react-dnd';
interface IProps {
  // 当前组件的子节点
  children: any;
  // 当前组件的id
  id: string;
}

const Space: React.FC<IProps> = ({ id, children }) => {
  const [{ canDrop }, drop] = useDrop(() => ({
    accept: [ItemType.Space, ItemType.Button],
    drop: (_, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) return;
      return {
        id,
      };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <AntdSpace
      ref={drop}
      className={[
        'p-[16px]',
        canDrop ? `border-2 border-solid border-gray-500` : '',
      ].join(' ')}
    >
      {!children?.length ? '暂无内容' : children}
    </AntdSpace>
  );
};

export default Space;
