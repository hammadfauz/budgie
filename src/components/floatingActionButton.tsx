import * as React from 'react';
import { useState } from 'react';

export const FloatingActionButton = ({children}: React.PropsWithChildren) => {
  const [ hover, setHover ] = useState<boolean>(false);

  const styles = {
    main: {
      position: 'fixed' as 'fixed',
      bottom: '20px',
      right: '20px',
      width: '60px',
      height: '60px',
      padding: '0 0 4px 0',
      backgroundColor: hover
        ?'#0056b3'
        :'#007bff',
      color: '#fff',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      textDecoration: 'none',
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
      transition: 'background-color 0.3s ease',
      border: 'none',
    },
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <button style={styles.main}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {children}
    </button>
  );
};
