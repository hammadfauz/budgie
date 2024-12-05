import * as React from 'react';

export const List = ({ children }: { children: React.ReactElement | React.ReactElement[] }) => {
  const styles = {
    main: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      gap: '15px',
    },
  };
  return (<div style={styles.main}>
    {children}
  </div>)
};
