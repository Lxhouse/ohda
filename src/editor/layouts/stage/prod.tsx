/** 预览页面 */
import { renderComponents } from '@/editor/utils';
import { useComponents } from '@/editor/stores/components';
import { IComponent } from '@/editor/utils/types';
import { componentsEventMap } from '@/editor/utils/constants';
import { message } from 'antd';

const ProdPage = () => {
  const { components } = useComponents();

  // 处理组件事件配置，增强组件属性
  const enhanceComponentProps = (component: IComponent) => {
    const enhancedProps: Record<string, any> = {};

    // 检查是否有事件映射
    if (componentsEventMap.has(component.name)) {
      // 遍历组件的事件配置
      componentsEventMap.get(component.name)?.forEach((event) => {
        const eventConfig = component.props[event.name];
        if (eventConfig) {
          const { type, config } = eventConfig;
          // 如果事件类型是 'showMessage' 并且配置存在，则设置增强的属性
          if (type === 'showMessage' && config) {
            enhancedProps[event.name] = () => {
              message[config.type](config.text);
            };
          }
        }
      });
    }

    // 返回增强后的组件对象，保持原有属性不变，只增加新属性
    return { ...component, props: { ...component.props, ...enhancedProps } };
  };

  // 对所有组件进行属性增强处理
  const enhanceComponents = (components: IComponent[]) => {
    return components.map(enhanceComponentProps);
  };

  // 渲染预览页面，传入增强后的组件列表和处理函数
  return (
    <div className="p-[24px]">
      {renderComponents(components, enhanceComponents)}
    </div>
  );
};

export default ProdPage;
