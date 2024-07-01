import ComponentItem from '@/editor/common/component-item';
import { ItemType } from '@/editor/item-type';
import React from 'react';
const Material: React.FC = () => {
  const onDragEnd = (dropResult: any) => {
    console.log(dropResult);
  };

  return (
    <div>
      <ComponentItem
        onDragEnd={onDragEnd}
        name={ItemType.Button}
        description="按钮"
      />
      <ComponentItem
        onDragEnd={onDragEnd}
        name={ItemType.Space}
        description="间距"
      />
    </div>
  );
};

export default Material;
