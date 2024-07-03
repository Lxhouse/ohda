import React from 'react';
import { IComponent } from '@/editor/utils/types';
import { ComponentMap } from '@/editor/components/componentsConfig';
/**
 * 根据 id 递归查找组件
 *
 * @param id 组件 id
 * @param components 组件数组
 * @returns 匹配的组件或 null
 */
export function getComponentById(
  id: string | null,
  components: IComponent[]
): IComponent | null {
  if (!id) return null;

  for (const component of components) {
    if (component.id === id) return component;
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);
      if (result !== null) return result;
    }
  }
  return null;
}

/** 渲染组件 */
export const renderComponents = (components: IComponent[]): React.ReactNode => {
  return components.map((component) => {
    const ComponentType = ComponentMap[component.name];
    if (!ComponentType) return;
    return React.createElement(
      ComponentType,
      {
        key: component.id,
        id: component.id,
        ...component.props,
        'data-component-id': component.id,
      },
      component.props.children || renderComponents(component.children || [])
    );
  });
};
