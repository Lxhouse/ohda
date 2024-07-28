import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Style } from '@/store/editStoreTypes';
import {
  EditStoreAction,
  EditStoreState,
  ICanvas,
  ICmp,
} from './editStoreTypes';
import { enableMapSet } from 'immer';

enableMapSet();
const useEditStore = create(
  immer<EditStoreAction & EditStoreState>((set) => ({
    canvas: getDefaultCanvas(),
    assembly: new Set<number>(),
  }))
);

export const addCmp = (_cmps: ICmp) => {
  useEditStore.setState((draft) => {
    draft.canvas.cmps.push({ ..._cmps, key: new Date().getTime() });
  });
};
export const addAssembly = (cmpKeys: number[]) => {
  useEditStore.setState((draft) => {
    if (!Array.isArray(cmpKeys)) return;
    for (const cmpKeyItem of cmpKeys) {
      if (draft.assembly.has(cmpKeyItem)) {
        draft.assembly.delete(cmpKeyItem);
      } else {
        draft.assembly.add(cmpKeyItem);
      }
    }
  });
};
export const updateCanvasByAssembly = (style: Style) => {
  useEditStore.setState((draft) => {
    for (const cmpKeyItem of draft.assembly) {
      const cmp = draft.canvas.cmps.find((e) => e?.key === cmpKeyItem)!;
      const keys = Reflect.ownKeys(style);
      for (const keyItem of keys) {
        cmp.style[keyItem] = cmp.style[keyItem] += style[keyItem];
      }
    }
  });
};

function getDefaultCanvas(): ICanvas {
  return {
    title: '未命名',
    style: {
      width: 420,
      height: 668,
      backgroundColor: '#fff',
      backgroundImage: '',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    },
    cmps: [],
  };
}

export default useEditStore;
