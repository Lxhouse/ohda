/** 预览页面 */
import { renderComponents } from '@/editor/utils';
import { useComponents } from '@/editor/stores/components';

const ProdPage = () => {
  const { components } = useComponents();

  return <div className="p-[24px]">{renderComponents(components)}</div>;
};

export default ProdPage;
