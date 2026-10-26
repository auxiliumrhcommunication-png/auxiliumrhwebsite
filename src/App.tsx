import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Secteurs from './pages/Secteurs';
import APropos from './pages/APropos';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import { MentionsLegales, Confidentialite } from './pages/Legal';
import NotFound from './pages/NotFound';
import { motionStyle } from './design';

/** À chaque navigation : remonte en haut, ou va à l'ancre (#…) si l'URL en contient une. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Attendre le rendu de la page avant de chercher l'ancre
      requestAnimationFrame(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  return (
    <>
      <a
        href="#contenu"
        className="sr-only z-[60] rounded bg-brand-800 px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Aller au contenu
      </a>
      <ScrollManager />
      <Navbar />
      {/* Fondu d'entrée de page (réglage --motion), rejoué à chaque changement de page */}
      <main id="contenu" key={pathname} className="page-enter animate-enter" style={motionStyle}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/secteurs" element={<Secteurs />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
