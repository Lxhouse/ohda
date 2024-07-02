import { Allotment } from 'allotment';
import 'allotment/dist/style.css';

import React from 'react';
import Header from './header';
import Material from './material';
import Stage from './stage';
import Setting from './setting';

const Layout: React.FC = () => {
  return (
    <div className="h-[100vh] flex flex-col">
      <div className="h-[50px] flex items-center ">
        <Header />
      </div>
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
    </div>
  );
};

export default Layout;
