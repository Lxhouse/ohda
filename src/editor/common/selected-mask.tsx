import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { createPortal } from 'react-dom';

interface IProps {
  // 组件id
  componentId: string;
  // 容器class
  containerClassName: string;
  // 相对容器class
  offsetContainerClassName: string;
}

function SelectedMask(
  { componentId, offsetContainerClassName, containerClassName }: IProps,
  ref: any
) {
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  // 对外暴露更新位置方法
  useImperativeHandle(ref, () => ({
    updatePosition,
  }));
  useEffect(() => {
    updatePosition();
  }, [componentId]);
  function updatePosition() {
    if (!componentId) return;
    const container = document.querySelector(`.${offsetContainerClassName}`);
    if (!container) return;
    const node = document.querySelector(`[data-component-id="${componentId}"]`);
    if (!node) return;
    const { top, left, width, height } = node.getBoundingClientRect();
    const { top: containerTop, left: containerLeft } =
      container.getBoundingClientRect();
    setPosition({
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft,
      width,
      height,
    });
  }
  return createPortal(
    <div
      style={{
        position: 'absolute',
        backgroundColor: 'rgba(66, 133, 244, 0.2)',
        border: '1px solid rgb(66, 133, 244)',
        pointerEvents: 'none',
        zIndex: 1003,
        borderRadius: 4,
        boxSizing: 'border-box',
        ...position,
      }}
    ></div>,
    document.querySelector(`.${containerClassName}`)!
  );
}

export default forwardRef(SelectedMask);
