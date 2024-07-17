import { ItemType } from '../item-type';
export const componentsEventMap = new Map<
  string,
  { name: string; label: string }[]
>([
  [
    ItemType.Button,
    [
      {
        name: 'onClick',
        label: '点击事件',
      },
    ],
  ],
]);
export const componentsMethodsMap = new Map<
  string,
  { name: string; label: string }[]
>([
  [
    ItemType.Button,
    [
      {
        name: 'startLoading',
        label: '开始 loading',
      },
      {
        name: 'endLoading',
        label: '结束 loading',
      },
    ],
  ],
]);
