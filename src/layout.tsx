import * as React from 'react';
import { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FloatingActionButton } from './components/floatingActionButton';
import { getUrl } from './utils/getUrl';

const SidebarButton = ({ show, onClick }: { show: boolean, onClick: () => void }) => {
  const styles = {
    main: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      width: '30px',
      height: '30px',
      justifyContent: 'space-around',
      cursor: 'pointer',
    },
    bar1: {
      height: '3px',
      background: '#fff',
      transition: 'all 300ms ease-in-out',
      transform: show
        ? 'rotate(45deg) translate(6px,5px) scaleX(1.43)'
        : '',
    },
    bar2: {
      height: '3px',
      background: '#fff',
      transition: 'all 300ms ease-in-out',
    },
    bar3: {
      height: '3px',
      background: '#fff',
      transition: 'all 300ms ease-in-out',
      transform: show
        ? 'rotate(-45deg) translate(6px,-6px) scaleX(1.43)'
        : '',
    },
  };
  return (<div style={styles.main} onClick={onClick}>
    <div style={styles.bar1}></div>
    {!show && <div style={styles.bar2}></div>}
    <div style={styles.bar3}></div>
  </div>);
};

const SideBar = ({ children }: { children?: React.ReactElement }) => {
  const [show, setShow] = useState(false);
  const styles = {
    menuContainer: {
      position: 'absolute' as 'absolute',
      right: '0px',
      bottom: '20px',
      top: '44px',
      background: '#333',
      padding: '10px',
    },
  };
  return (<>
    <SidebarButton show={show} onClick={() => setShow(!show)} />
    {show && <div onClick={() => setShow(!show)} style={styles.menuContainer}>{children}</div>}
  </>);
};

const Header = () => {
  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#333',
      color: '#fff',
      padding: '5px',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
    },
    img: {
      width: '30px',
      height: '30px',
      marginRight: '10px',
    },
    name: {
      fontSize: '1.1rem',
      lineHeight: '0.5rem',
    },
    sidebarLink: {
      textDecoration: 'none',
      color: 'inherit',
    },
  };
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Link to='/'>
          <img src={getUrl('/icons/icon-512x512.png')}
            alt='Budgie logo'
            style={styles.img} />
        </Link>
        <h1 style={styles.name}>
          Budgie
        </h1>
      </div>
      <SideBar>
        <Link style={styles.sidebarLink} to='/accounts/'>
          Accounts
        </Link>
      </SideBar>
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
      overflow: 'scroll',
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
