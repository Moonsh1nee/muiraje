import styles from '@/assets/styles/components/NavigationBar.module.scss'

export default function NavigationBar() {
  return (
    <div className={styles.navigationBar}>
      <nav>
        <ul className={styles.navigationList}>
          <li className={styles.navigationItem}>File</li>
          <li className={styles.navigationItem}>About</li>
        </ul>
      </nav>
      <div className={styles.divider}></div>
    </div>
  );
}