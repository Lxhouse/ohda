import { addCmp } from '@/store/editStore';
import { Style } from '@/store/editStoreTypes';
import { memo } from 'react';

interface ISliderProps {
  selectIndex: number;
}
interface ITextSelectBox {
  value: string;
  style: Style;
}
interface IImgSelectBox {
  value: string;
  style: Style;
  src: string;
}
const staticTextSelectBox: ITextSelectBox[] = [
  {
    value: '双击编辑标题',
    style: { fontSize: 20, lineHeight: '50px' },
  },
  {
    value: '双击编辑正文',
    style: {},
  },
];
const staticImgSelectBox: IImgSelectBox[] = [
  {
    value: '张陆让',
    src: 'https://img0.baidu.com/it/u=2158148208,3787932962&fm=253&fmt=auto&app=120&f=JPEG?w=801&h=500',
    style: {},
  },
  {
    value: '苏在在',
    src: 'https://dingyue.ws.126.net/2023/0808/4de0aa43j00rz2f8w0011c000hs00b6m.jpg',
    style: {},
  },
];
const SliderBox = memo((props: ISliderProps) => {
  const { selectIndex } = props || {};
  return (
    <div className="absolute w-[300px] h-full left-[50px]  shadow-xl p-1">
      {selectIndex === 1 && (
        <div className="flex gap-5">
          {staticTextSelectBox.map((selectBoxItem) => (
            <div
              draggable
              key={selectBoxItem.value}
              className="flex items-center justify-center w-1/2  cursor-pointer h-[60px] border border-sky-500 hover:border-yellow-500"
              style={selectBoxItem.style}
              onClick={() => addCmp({ ...selectBoxItem, type: 1 })}
              onDragStart={(event) => {
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData(
                  'drag-cmp',
                  JSON.stringify({ ...selectBoxItem, type: 1 })
                );
              }}
            >
              {selectBoxItem.value || ''}
            </div>
          ))}
        </div>
      )}

      {selectIndex === 2 && (
        <div className="flex gap-5 flex-wrap ">
          {staticImgSelectBox.map((imgItem) => (
            <img
              key={imgItem.value}
              onClick={() => addCmp({ ...imgItem, type: 2 })}
              onDragStart={(event) => {
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData(
                  'drag-cmp',
                  JSON.stringify({ ...imgItem, type: 2 })
                );
              }}
              className="w-[130px] h-[100px] cursor-pointer"
              {...imgItem}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default SliderBox;
