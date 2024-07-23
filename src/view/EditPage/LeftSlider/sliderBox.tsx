import useEditStore from '@/store/editStore';
import { Style } from '@/store/editStoreTypes';
import { memo } from 'react';

interface ISliderProps {
  selectIndex: number;
}
interface ITextSelectBox {
  value: string;
  style: Style;
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
const SliderBox = memo((props: ISliderProps) => {
  const { addCmp } = useEditStore(
    (state) => state,
    () => true
  );
  const { selectIndex } = props || {};
  console.log('render SliderBox');
  return (
    <div className="absolute w-[300px] h-full left-[50px]  shadow-xl p-1">
      {selectIndex === 1 && (
        <div className="flex gap-5">
          {staticTextSelectBox.map((selectBoxItem) => (
            <div
              key={selectBoxItem.value}
              className="flex items-center justify-center w-1/2  cursor-pointer h-[60px] border border-sky-500 hover:border-yellow-500"
              style={selectBoxItem.style}
              onClick={() => addCmp({ ...selectBoxItem, type: 1 })}
            >
              {selectBoxItem.value || ''}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default SliderBox;
