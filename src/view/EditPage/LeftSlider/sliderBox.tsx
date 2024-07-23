import { Style } from '@/store/editStoreTypes';

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
function SliderBox(props: ISliderProps) {
  const { selectIndex } = props || {};

  return (
    <div className="absolute w-[300px] h-full left-[50px]  shadow-xl p-1">
      {selectIndex === 1 && (
        <div className="flex gap-5">
          {staticTextSelectBox.map((selectBoxItem) => (
            <div
              className="flex items-center justify-center w-1/2  cursor-pointer h-[60px] border border-sky-500 hover:border-yellow-500"
              style={selectBoxItem.style}
            >
              {selectBoxItem.value || ''}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SliderBox;
