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
