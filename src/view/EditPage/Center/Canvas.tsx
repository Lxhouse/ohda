import useEditStore from '@/store/editStore';
function Canvas() {
  const { canvas } = useEditStore();
  return <div id="canvas" style={canvas.style}></div>;
}

export default Canvas;
