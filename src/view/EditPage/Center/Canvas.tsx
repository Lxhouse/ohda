import { useCallback } from 'react';
import Cmp from './Cmp';
import useEditStore, { addCmp } from '@/store/editStore';
function Canvas() {
  const canvas = useEditStore((state) => state.canvas);
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    /** 获取拖拽的组件信息 */
    const dragInfo = e.dataTransfer.getData('drag-cmp');
    if (!dragInfo) return;
    const dragCmp = JSON.parse(dragInfo || '{}');
    /** 获取它放在画布上的位置，计算相对于画布的位置 */
    const endX = e.pageX;
    const endY = e.pageY;
    const canvas = document.querySelector('#canvas');
    const { top = 0, left = 0 } = canvas?.getBoundingClientRect() || {};
    const disX = endX - left;
    const disY = endY - top;
    dragCmp.style.left = disX;
    dragCmp.style.top = disY;
    /** 值传给store */
    addCmp(dragCmp);
  }, []);
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  return (
    <div
      id="canvas"
      className="relative h-full overflow-auto "
      style={canvas.style}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {canvas.cmps.map((cmp, i) => (
        <Cmp key={cmp.key} cmp={cmp} index={i} />
      ))}
    </div>
  );
}

export default Canvas;
