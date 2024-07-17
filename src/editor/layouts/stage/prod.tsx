/** 预览页面 */
import React, { useRef } from 'react';

import { useComponents } from '@/editor/stores/components';
import { IComponent } from '@/editor/utils/types';
import { ComponentMap } from '@/editor/components/componentsConfig';
import { componentsEventMap } from '@/editor/utils/constants';
import { message } from 'antd';
import { getComponentRef, getAllRef } from '@/editor/stores/component-ref';

const ProdPage = () => {
  const { components } = useComponents();
  const componentRefs = useRef<any>({});
  const handelEvent = (component: IComponent) => {
    const props: any = {};
    if (componentsEventMap.has(component.name)) {
      for (const event of componentsEventMap.get(component.name)!) {
        const eventConfig = component.props[event.name];
        if (!eventConfig) return;
        const { type, config } = eventConfig;
        props[event.name] = () => {
          if (type === 'showMessage') {
            message[config.type](config.text);
          } else if (type === 'componentFunction') {
            const component = componentRefs.current[config.componentId];
            if (component) {
              component[config.method]?.();
            }
          }
        };
      }
      return props;
    }
  };
  const renderComponents = (components: IComponent[]): React.ReactNode => {
    return components.map((component) => {
      if (!ComponentMap[component.name]) return null;
      const props = handelEvent(component);
      if (!ComponentMap[component.name]) return;
      return React.createElement(
        ComponentMap[component.name],
        {
          key: component.id,
          id: component.id,
          ref: (ref) => {
            componentRefs.current[component.id] = ref;
          },
          ...props,
        },
        component.props.children || renderComponents(component.children || [])
      );
    });
  };
  return <div className="p-[24px]">{renderComponents(components)}</div>;
};

export default ProdPage;
