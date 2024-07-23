import useEditStore from '@/store/editStore';
function Canvas() {
  const { canvas } = useEditStore();
  return (
    <div id="canvas" className="h-full overflow-auto" style={canvas.style}>
      {canvas.cmps.map((cmp) => (
        <div key={cmp.key} style={cmp.style}>
          {cmp.value}
        </div>
      ))}
    </div>
  );
}

export default Canvas;
