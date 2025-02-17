import { Button, Space } from 'antd';
import { useState } from 'react';
import { useComponents } from '@/editor/stores/components';
import ComponentTree from './component-tree';
const Header: React.FC = () => {
  const { mode, setMode, setCurComponentId } = useComponents();
  const [componentTreeVisible, setComponentTreeVisible] = useState(false);
  return (
    <div className="h-[100%] w-[100%]">
      <div className="flex justify-between px-[24px] items-center   h-[100%]">
        <div
          className="flex justify-center items-center font-medium h-[100%] text-xl"
          style={
            {
              backgroundImage:
                'linear-gradient(45deg, lab(63 59.32 -1.47), lab(33 42.09 -43.19))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              transition:
                'lab(63 59.32 -1.47) 0.2s ease-out, lab(33 42.09 -43.19) 0.2s ease-in-out',
            } as React.CSSProperties
          }
        >
          OHDA 搭建平台
        </div>
        <div className="flex flex-1 justify-end px-[24px]">
          <Space className="flex-1 flex justify-end">
            <Button
              onClick={() => {
                setComponentTreeVisible(true);
              }}
              type="primary"
            >
              查看大纲
            </Button>
            {mode === 'edit' && (
              <Button
                onClick={() => {
                  setMode('preview');
                  setCurComponentId('');
                }}
                type="primary"
              >
                预览
              </Button>
            )}
            {mode === 'preview' && (
              <Button
                onClick={() => {
                  setMode('edit');
                }}
                type="primary"
              >
                退出预览
              </Button>
            )}
          </Space>
        </div>
      </div>
      <ComponentTree
        open={componentTreeVisible}
        onCancel={() => {
          setComponentTreeVisible(false);
        }}
      />
    </div>
  );
};

export default Header;
