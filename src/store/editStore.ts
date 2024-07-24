import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  EditStoreAction,
  EditStoreState,
  ICanvas,
  ICmp,
} from './editStoreTypes';
const useEditStore = create(
  immer<EditStoreAction & EditStoreState>((set) => ({
    canvas: getDefaultCanvas(),
  }))
);

export const addCmp = (_cmps: ICmp) => {
  useEditStore.setState((draft) => {
    draft.canvas.cmps.push({ ..._cmps, key: new Date().getTime() });
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
