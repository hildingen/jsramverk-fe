import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Home from './components/pages/Home';
import ViewDocuments from './components/pages/View-Documents';
import CreateDocuments from './components/pages/Create-document';
import SingleDocument from './components/pages/Single-document';


function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-document" element={<CreateDocuments />} />
        <Route path="/view-documents" element={<ViewDocuments />} />
        <Route path="/single-document/:id" element={<SingleDocument />} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
