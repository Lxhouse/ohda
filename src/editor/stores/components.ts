import { create } from 'zustand';
import { IComponent } from '@/editor/utils/types';
import { getComponentById } from '@/editor/utils';
interface State {
  components: IComponent[];
  curComponentId?: string;
  curComponent: IComponent | null;
}

interface Action {
  /**添加组件 */
  addComponent: (component: IComponent, parentId?: string) => void;
  /** 设置当前的组件 */
  setCurComponentId: (componentId: string) => void;

  /**
   * 更新组件属性
   * @param componentId 组件id
   * @param props 新组件属性
   * @returns
   */
  updateComponentProps: (
    componentId: string,
    props: Record<string, any>
  ) => void;
}

export const useComponents = create<State & Action>((set) => ({
  components: [],
  curComponent: null,
  addComponent: (component, parentId) => {
    set((state) => {
      if (parentId) {
        const parentComponent = getComponentById(parentId, state.components);
        if (parentComponent) {
          if (parentComponent.children) {
            parentComponent.children.push(component);
          } else {
            parentComponent.children = [component];
          }
        }
        return { components: [...state.components] };
      }

      return { components: [...state.components, component] };
    });
  },
  setCurComponentId: (componentId) =>
    set((state) => ({
      curComponentId: componentId,
      curComponent: getComponentById(componentId, state.components),
    })),
  updateComponentProps: (componentId, props) => {
    set((state) => {
      const component = getComponentById(componentId, state.components);
      if (component) {
        component.props = { ...component.props, ...props };
        if (componentId === state.curComponentId) {
          return {
            curComponent: component,
            components: [...state.components],
          };
        }
      }
      return { components: [...state.components] };
    });
  },
}));
