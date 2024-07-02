import React, { useEffect, useRef, useImperativeHandle } from 'react';
import { useDrop } from 'react-dnd';
import { Button } from 'antd';
import Space from '@/editor/components/space';
import SelectedMask from '@/editor/common/selected-mask';
import { ItemType } from '@/editor/item-type';
import { useComponents } from '@/editor/stores/components';
import { IComponent } from '@/editor/utils/types';

const ComponentMap: Record<string, React.ElementType> = {
  Button,
  Space,
};

const Stage: React.FC = () => {
  const { components, curComponentId, setCurComponentId } = useComponents();
  const selectedMaskRef = useRef<any>(null);

  useEffect(() => {
    function createMask(e: any) {
      const path = e.composedPath();
      for (let i = 0; i < path.length; i++) {
        const ele = path[i];
        if (ele.getAttribute) {
          if (ele.getAttribute('data-component-id')) {
            const componentId = ele.getAttribute('data-component-id');
            setCurComponentId(componentId);
          }
        }
      }
    }
    let container = document.querySelector('.stage');
    if (container) {
      container.addEventListener('click', createMask, true);
    }
    return () => {
      container = document.querySelector('.stage');
      if (container) {
        container.removeEventListener('click', createMask, true);
      }
    };
  }, []);
  // 组件改变后，重新渲染遮罩
  useEffect(() => {
    if (selectedMaskRef?.current) {
      selectedMaskRef.current.updatePosition();
    }
  }, [components]);
  /** 渲染组件 */
  const renderComponents = (components: IComponent[]): React.ReactNode => {
    return components.map((component) => {
      const ComponentType = ComponentMap[component.name];
      if (!ComponentType) return;

      return React.createElement(
        ComponentType,
        {
          key: component.id,
          id: component.id,
          ...component.props,
          'data-component-id': component.id,
        },
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
        'p-[24px] h-[100%] stage',
        canDrop ? `border-2 border-solid border-gray-500` : '',
      ].join(' ')}
    >
      {renderComponents(components)}
      {curComponentId && (
        <SelectedMask
          componentId={curComponentId}
          containerClassName="select-mask-container"
          offsetContainerClassName="stage"
          ref={selectedMaskRef}
        />
      )}
      <div className="select-mask-container" />
    </div>
  );
};

export default Stage;
