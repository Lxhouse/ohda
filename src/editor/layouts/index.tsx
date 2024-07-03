import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

import React from 'react';
import Header from './header';
import Material from './material';
import Stage from './stage';
import Setting from './setting';
import ProdPage from './stage/prod';
import { useComponents } from '@/editor/stores/components';
const Layout: React.FC = () => {
  const { mode } = useComponents();
  return (
    <div className="h-[100vh] flex flex-col">
      <div className="h-[50px] flex items-center shadow-md">
        <Header />
      </div>
      {mode === 'edit' ? (
        <Allotment>
          <Allotment.Pane preferredSize={200} maxSize={400} minSize={200}>
            <Material />
          </Allotment.Pane>
          <Allotment.Pane>
            <Stage />
          </Allotment.Pane>
          <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
            <Setting />
          </Allotment.Pane>
        </Allotment>
      ) : (
        <ProdPage />
      )}
    </div>
  );
};

export default Layout;
