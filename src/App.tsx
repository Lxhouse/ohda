import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditPage from '@/view/EditPage';
import ListPage from '@/view/ListPage';
import RequirePage from '@/view/RequireAuth';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RequirePage />}>
          <Route index element={<EditPage />}></Route>
          <Route path="list" element={<ListPage />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
