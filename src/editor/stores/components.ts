import { create } from 'zustand';
import { IComponent } from '@/editor/utils/types';
import { getComponentById } from '@/editor/utils';
interface State {
  components: IComponent[];
}

interface Action {
  addComponent: (component: IComponent, parentId?: string) => void;
}

export const useComponents = create<State & Action>((set) => ({
  components: [],
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
}));
