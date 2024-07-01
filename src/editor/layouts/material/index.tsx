import ComponentItem from '@/editor/common/component-item';
import { ItemType } from '@/editor/item-type';
import { useComponents } from '@/editor/stores/components';
import React from 'react';
const Material: React.FC = () => {
  const { addComponent } = useComponents();
  const onDragEnd = (dropResult: any) => {
    addComponent({
      id: String(new Date().getTime()),
      name: dropResult.name,
      props: dropResult.props,
    });
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
