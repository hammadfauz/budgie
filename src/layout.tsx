import * as React from 'react';
import { useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FloatingActionButton } from './components/floatingActionButton';
import { getUrl } from './utils/getUrl';

const Header = () => {
  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#333',
      color: '#fff',
      padding: '10px',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
    },
    img: {
      width: '40px',
      height: '40px',
      marginRight: '10px',
    },
    name: {
      fontSize: '1.5rem',
    },
  };
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <img src={getUrl('/icons/icon-512x512.png')}
          alt='Budgie logo'
          style={styles.img} />
        <h1 style={styles.name}>
          Budgie
        </h1>
      </div>
    </header>
  );
};

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: '#f8f8f8',
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-around',
      borderTop: '1px solid #ddd',
    }
  };
  return (
    <footer style={styles.footer}>
    </footer>
  );
};

export const Layout: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let path = localStorage.getItem('ghPath');
    if (path) {
      localStorage.removeItem('ghPath');
      navigate(getUrl('/'), { replace: true });
    }
  }, []);
  const styles = {
    layout: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
      height: '100vh',
    },
    content: {
      padding: '20px',
    },
  };

  return (
    <div style={styles.layout}>
      <Header />
      <main style={styles.content}>
        <Outlet />
      </main>
      <Footer />
      <Link to='/transaction/add'>
        <FloatingActionButton>+</FloatingActionButton>
      </Link>
    </div>
  );
};
