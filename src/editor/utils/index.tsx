import { IComponent } from '@/editor/utils/types';

export const getComponentById = (
  id: string,
  components: IComponent[]
): IComponent | null => {
  for (const component of components) {
    if (component.id === id) return component;
    else if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);
      if (result !== null) return result;
    }
  }
  return null;
};
