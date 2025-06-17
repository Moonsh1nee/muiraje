import { Header } from '@/assets/components/Header';
import styles from '@/assets/styles/pages/Contacts.module.scss';
import Link from 'next/link';

export default function Contacts() {
  return (
    <div className={styles.contacts}>
      <Header
        nav="Contact us"
        link="/catalog"
        nameIcon="contacts"
        width={35}
        height={40}
        color="blue"
      />

      <ul className={styles.contactsContent}>
        <li>
          <div>Support</div>
          <Link href="https://t.me/care224radge">@care224radge</Link>
        </li>
        <li>
          <div>Email</div>
          <Link href="mailto:muiraje@muiraje.ru">muiraje@muiraje.ru</Link>
        </li>
        <li>
          <div>Telegram channel</div>
          <Link href="https://t.me/mymiradge">@mymiradge</Link>
        </li>
      </ul>
    </div>
  );
}
