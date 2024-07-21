function LeftSlider() {
  const MATERIEL_LIST = [
    { label: '文本', value: 1 },
    { label: '图片', value: 2 },
    { label: '图形', value: 3 },
  ];

  return (
    <div className="w-[50px] h-full shadow-xl">
      {MATERIEL_LIST.map(({ label, value }) => (
        <div
          key={value}
          className="h-[50px] w-full flex justify-center items-center text-lg shadow-xl"
        >
          {label}
        </div>
      ))}
    </div>
  );
}

export default LeftSlider;
