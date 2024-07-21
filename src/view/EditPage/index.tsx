import { Layout } from 'antd';
import LeftSlider from './LeftSlider';
import RightSlider from './RightSlider';
import Center from './Center';
function EditPage() {
  return (
    <Layout>
      <div className="w-screen h-full flex justify-between">
        <LeftSlider />
        <Center />
        <RightSlider />
      </div>
    </Layout>
  );
}

export default EditPage;
