import { Modal, Tree } from 'antd';
import { useComponents } from '@/editor/stores/components';

interface IComponentTreeProps {
  open: boolean;
  onCancel: () => void;
}
const ComponentTree: React.FC<IComponentTreeProps> = ({ open, onCancel }) => {
  const { components, setCurComponentId } = useComponents();
  function componentSelect([selectedKey]: string[]) {
    setCurComponentId(selectedKey);
    onCancel && onCancel();
  }
  return (
    <Modal open={open} onCancel={onCancel}>
      <Tree
        treeData={components}
        onSelect={componentSelect}
        fieldNames={{ title: 'name', key: 'id' }}
        showLine
        defaultExpandAll
      ></Tree>
    </Modal>
  );
};

export default ComponentTree;
