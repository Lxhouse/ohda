import { useState } from 'react';
import SliderBox from './sliderBox';
function LeftSlider() {
  const [selectIndex, setSelectIndex] = useState(0);
  const [showSliderBox, setShowSliderBox] = useState(false);
  const MATERIEL_LIST = [
    { label: '文本', value: 1 },
    { label: '图片', value: 2 },
    { label: '图形', value: 3 },
  ];
  const handleCardClick = (_key: number) => {
    if (_key === selectIndex) {
      setSelectIndex(0);
      setShowSliderBox(false);
    } else {
      setSelectIndex(_key);
      setShowSliderBox(true);
    }
  };
  return (
    <div className="relative w-[50px] h-full shadow-xl ">
      {showSliderBox && <SliderBox selectIndex={selectIndex} />}
      {MATERIEL_LIST.map(({ label, value }) => (
        <div
          key={value}
          onClick={() => handleCardClick(value)}
          className={`h-[50px] w-full flex justify-center items-center text-lg shadow-xl cursor-pointer ${
            selectIndex === value ? 'bg-gray-500 text-white' : ''
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

export default LeftSlider;
