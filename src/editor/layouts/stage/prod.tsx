/** 预览页面 */
import { renderComponents } from '@/editor/utils';
import { useComponents } from '@/editor/stores/components';
import { IComponent } from '@/editor/utils/types';
import { componentsEventMap } from '@/editor/utils/constants';
import { message } from 'antd';
const ProdPage = () => {
  const { components } = useComponents();

  const handleEvent = (component: IComponent) => {
    const props: Record<string, any> = {};
    if (componentsEventMap.has(component.name)) {
      componentsEventMap.get(component.name)?.forEach((event) => {
        const eventConfig = component.props[event.name];
        if (eventConfig) {
          const { type, config } = eventConfig || {};
          props[event.name] = () => {
            if (type === 'showMessage') {
              message[config.type](config.text);
            }
          };
        }
      });
    }
    return { ...component, props: { ...component?.props, ...props } };
  };
  const handelComponentsFn = (components: IComponent[]) => {
    return components.map((component) => handleEvent(component));
  };
  return (
    <div className="p-[24px]">
      {renderComponents(components, handelComponentsFn)}
    </div>
  );
};

export default ProdPage;
