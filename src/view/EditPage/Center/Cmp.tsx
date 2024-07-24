import { ICmpWithKey } from '@/store/editStoreTypes';

interface IComProps {
  key: number;
  cmp: ICmpWithKey;
  index: number;
}

function Cmp(props: IComProps) {
  const { key, cmp, index } = props;
  const { style } = cmp;

  return (
    <div key={key} className={`absolute z-${index}`} style={style}>
      {cmp.value}
    </div>
  );
}

export default Cmp;
