import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import './i18n';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import Partners from './pages/Partners';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import Demo from './pages/Demo';
import SolutionDetail from './pages/SolutionDetail';
import Admin from './pages/Admin';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/features" element={<Layout><Features /></Layout>} />
          <Route path="/partners" element={<Layout><Partners /></Layout>} />
          <Route path="/blog" element={<Layout><Blog /></Layout>} />
          <Route path="/blog/:id" element={<Layout><Blog /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/demo" element={<Layout><Demo /></Layout>} />
          <Route path="/solutions/:sector" element={<Layout><SolutionDetail /></Layout>} />
          <Route path="*" element={<Layout><Home /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}
