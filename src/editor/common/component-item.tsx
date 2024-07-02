import { useDrag } from 'react-dnd';
import { ItemType } from '@/editor/item-type';
interface IComponentItemProps {
  // 组件名称
  name: string;
  // 组件描述
  description: string;
  // 拖拽结束回调
  onDragEnd: any;
}
const ComponentItem: React.FC<IComponentItemProps> = ({
  name,
  description,
  onDragEnd,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: name,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
    end: (_, monitor) => {
      const dropResult = monitor.getDropResult();
      console.log(dropResult, 'dropResult');
      if (!dropResult) return;
      onDragEnd &&
        onDragEnd({
          name,
          props: name === ItemType.Button ? { children: '按钮' } : {},
          ...dropResult,
        });
    },
  }));
  return (
    <div
      ref={drag}
      className={[
        'border-dashed border border-[gray] bg-white cursor-move py-[8px] px-[20px] rounded-lg',
        isDragging ? 'opacity-40' : 'opacity-100',
      ].join(' ')}
    >
      {description}
    </div>
  );
};

export default ComponentItem;
