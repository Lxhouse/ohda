import React, { useState } from 'react';
import { Segmented } from 'antd';
import type { SegmentedValue } from 'antd/es/segmented';
import { useComponents } from '@/editor/stores/components';
import ComponentAttr from './attr';
import ComponentEvent from './event';
const Setting: React.FC = () => {
  const { curComponentId, curComponent } = useComponents() || {};
  const [key, setKey] = useState<SegmentedValue>('属性');
  if (!curComponentId || !curComponent) return;
  return (
    <div>
      <Segmented
        value={key}
        block
        onChange={setKey}
        options={['属性', '事件']}
      />
      <div className="pt-[20px]">
        {key === '属性' && <ComponentAttr />}
        {key === '事件' && <ComponentEvent />}
      </div>
    </div>
  );
};

export default Setting;
