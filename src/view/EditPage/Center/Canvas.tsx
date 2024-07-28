import { useCallback } from 'react';
import { throttle } from 'lodash';
import Cmp from './Cmp';
import useEditStore, {
  addCmp,
  updateCanvasByAssembly,
} from '@/store/editStore';
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
  const handelMove = (e: React.MouseEvent) => {
    let startX = e.pageX;
    let startY = e.pageY;
    const move = throttle((e1: React.MouseEvent) => {
      const disX = e1.pageX - startX;
      const disY = e1.pageY - startY;
      updateCanvasByAssembly({ top: disY, left: disX });
      startX = e1.pageX;
      startY = e1.pageY;
    });
    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };
  return (
    <div
      id="canvas"
      className="relative h-full overflow-auto "
      style={canvas.style}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onMouseDown={handelMove}
    >
      {canvas.cmps.map((cmp, i) => (
        <Cmp cmp={cmp} index={i} />
      ))}
    </div>
  );
}

export default Canvas;
