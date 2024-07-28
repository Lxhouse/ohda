import useEditStore, { addAssembly } from '@/store/editStore';
import { ICmpWithKey } from '@/store/editStoreTypes';

interface IComProps {
  cmp: ICmpWithKey;
  index: number;
}

function Cmp(props: IComProps) {
  const { cmp, index } = props;
  const assembly = useEditStore((state) => state.assembly);
  const { style } = cmp;

  const getDomByType = (cmpItem: ICmpWithKey) => {
    const { type, value } = cmpItem || {};
    if (type === 1) {
      return value;
    } else if (type === 2) {
      return <img {...cmpItem} />;
    }
    return;
  };
  const handelClick = (_key: number) => {
    addAssembly([_key]);
  };
  return (
    <div
      key={cmp.key}
      className={` z-${index} cursor-pointer`}
      onClick={() => handelClick(cmp.key)}
    >
      <div
        style={style}
        key={cmp.key}
        className={`absolute ${
          assembly.has(cmp.key) ? 'border-2 border-sky-500' : ''
        }`}
      >
        {getDomByType(cmp)}
      </div>
    </div>
  );
}

export default Cmp;
