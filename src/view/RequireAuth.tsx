import Login from '@/components/Login';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
const { Header } = Layout;
function RequirePage() {
  return (
    <div className="h-screen flex flex-col">
      <Header className="text-center text-white h-[64px] ps-[10px] pe-[10px] leading-[64px] bg-black">
        <Login />
      </Header>
      <Outlet />
    </div>
  );
}

export default RequirePage;
