import { Button as AntdButton } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

const Button = (props: any, ref: any) => {
  const [loading, setLoading] = useState(false);

  // 暴露方法，父组件可以使用ref获取组件里暴露出去的方法
  useImperativeHandle(
    ref,
    () => {
      return {
        startLoading: () => {
          setLoading(true);
        },
        endLoading: () => {
          setLoading(false);
        },
      };
    },
    []
  );

  return <AntdButton loading={loading} {...props} />;
};

export default forwardRef(Button);
