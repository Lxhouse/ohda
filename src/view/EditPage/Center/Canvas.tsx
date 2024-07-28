import React, { useCallback, useRef } from 'react';
import { throttle } from 'lodash';
import Cmp from './Cmp';
import useEditStore, {
  addCmp,
  updateCanvasByAssembly,
} from '@/store/editStore';

function Canvas() {
  const canvas = useEditStore((state) => state.canvas);
  const canvasRef = useRef<HTMLDivElement>(null);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dragInfo = e.dataTransfer.getData('drag-cmp');
    if (!dragInfo) return;

    const dragCmp = JSON.parse(dragInfo || '{}');
    const { top = 0, left = 0 } =
      canvasRef.current?.getBoundingClientRect() || {};
    const disX = e.pageX - left;
    const disY = e.pageY - top;

    dragCmp.style.left = disX;
    dragCmp.style.top = disY;

    addCmp(dragCmp);
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleMove = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    let startX = e.pageX;
    let startY = e.pageY;

    const move = throttle((e1: MouseEvent) => {
      const disX = e1.pageX - startX;
      const disY = e1.pageY - startY;

      updateCanvasByAssembly({ top: disY, left: disX });

      startX = e1.pageX;
      startY = e1.pageY;
    }, 50); // Adjust throttle delay as needed

    const up = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  }, []);

  return (
    <div
      id="canvas"
      className="relative h-full overflow-auto"
      style={canvas.style}
      ref={canvasRef}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onMouseDown={handleMove}
    >
      {canvas.cmps.map((cmp, i) => (
        <Cmp key={i} cmp={cmp} index={i} />
      ))}
    </div>
  );
}

export default Canvas;
