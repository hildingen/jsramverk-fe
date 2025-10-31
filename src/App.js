import { Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Home from './components/pages/Home';
import ViewDocuments from './components/pages/View-Documents';
import CreateDocuments from './components/pages/Create-document';
import SingleDocument from './components/pages/Single-document';
import CreateDocumentsCode from './components/pages/Create-document-code';
import CreateDocumentsRegular from './components/pages/Create-document-regular';
import Login from './components/pages/Login';


function App() {
  return (
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-document" element={<CreateDocuments />} />
        <Route path="/create-document-regular" element={<CreateDocumentsRegular />} />
        <Route path="/create-document-code" element={<CreateDocumentsCode />} />
        <Route path="/view-documents" element={<ViewDocuments />} />
        <Route path="/single-document/:id" element={<SingleDocument />} />
      </Routes>
  );
}

export default App;
