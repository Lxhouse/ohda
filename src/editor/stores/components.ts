import { create } from 'zustand';

export interface IComponent {
  /**
   * 组件唯一标识
   */
  id: string;
  /**
   * 组件名称
   */
  name: string;
  /**
   * 组件属性
   */
  props: any;
  /**
   * 子组件
   */
  children?: IComponent[];
}

interface State {
  components: IComponent[];
}

interface Action {
  addComponent: (component: IComponent) => void;
}

export const useComponents = create<State & Action>((set) => ({
  components: [],
  addComponent: (component) => {
    set((state) => {
      return { components: [...state.components, component] };
    });
  },
}));
