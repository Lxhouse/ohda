import { ICmpWithKey } from '@/store/editStoreTypes';

interface IComProps {
  key: number;
  cmp: ICmpWithKey;
  index: number;
}

function Cmp(props: IComProps) {
  const { key, cmp, index } = props;
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
  return (
    <div key={key} className={`absolute z-${index}`} style={style}>
      {getDomByType(cmp)}
    </div>
  );
}

export default Cmp;
