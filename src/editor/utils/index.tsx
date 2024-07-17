import React from 'react';
import { IComponent } from '@/editor/utils/types';
import { ComponentMap } from '@/editor/components/componentsConfig';
import { setComponentRef } from '../stores/component-ref';
/**
 * 根据 id 递归查找组件
 *
 * @param id 组件 id
 * @param components 组件数组
 * @returns 匹配的组件或 null
 */
/* 根据 id 查找组件 递归版本 */
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
/**根据 id 查找组件 动规版本 */
export function getComponentByIdDP(
  id: string | null,
  components: IComponent[]
): IComponent | null {
  if (!id) return null;

  // 创建一个哈希表用于存储已经计算过的结果
  const dp: { [id: string]: IComponent | null } = {};

  function dpHelper(id: string): IComponent | null {
    if (dp[id] !== undefined) {
      return dp[id];
    }

    for (const component of components) {
      if (component.id === id) {
        dp[id] = component;
        return component;
      }
      if (component.children && component.children.length > 0) {
        const result = dpHelper(id);
        if (result !== null) {
          dp[id] = result;
          return result;
        }
      }
    }
    dp[id] = null;
    return null;
  }

  return dpHelper(id);
}

/** 渲染组件 */
export const renderComponents = (
  components: IComponent[],
  handelFn?: (components: IComponent[]) => IComponent[]
): React.ReactNode => {
  const _components = handelFn ? handelFn(components) : components;
  return _components.map((component) => {
    const ComponentType = ComponentMap[component.name];
    if (!ComponentType) return;
    return handelFn
      ? React.createElement(
          ComponentType,
          {
            key: component.id,
            id: component.id,
            ...component.props,
            ref: (ref) => {
              setComponentRef(component.id, ref);
            },
            'data-component-id': component.id,
          },
          component.props.children || renderComponents(component.children || [])
        )
      : React.createElement(
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
