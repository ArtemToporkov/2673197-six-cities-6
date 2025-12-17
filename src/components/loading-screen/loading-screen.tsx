import type { ReactNode } from 'react';

import styles from './loading-screen.module.css';

export function LoadingScreen(): ReactNode {
  return (
    <div className={styles['loading-screen']} role='status' aria-label='loading'>
      <div className={styles['spinner']}></div>
    </div>
  );
}
