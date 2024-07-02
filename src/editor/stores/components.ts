import { create } from 'zustand';
import { IComponent } from '@/editor/utils/types';
import { getComponentById } from '@/editor/utils';
interface State {
  components: IComponent[];
  curComponentId?: string;
}

interface Action {
  /**添加组件 */
  addComponent: (component: IComponent, parentId?: string) => void;
  /** 设置当前的组件 */
  setCurComponentId: (componentId: string) => void;
}

export const useComponents = create<State & Action>((set) => ({
  components: [],
  curComponentId: void 0,
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
  setCurComponentId: (componentId) => {
    set((state) => ({ ...state, curComponentId: componentId }));
  },
}));
