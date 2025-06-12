import styles from '@/assets/styles/components/product/ModalBtnErr.module.scss';

export default function ModalBtnErr({
  text,
  closeModal,
}: {
  text: string;
  closeModal: () => void;
}) {
  return (
    <button className={styles.modalBtnErr} onClick={closeModal}>
      <div className={styles.modalBtnErrWrapper}>
        <div className={styles.modalBtnErrUpper}>{text}</div>
        <div className={styles.modalBtnErrLower}>Окей, ща выберу</div>
      </div>
    </button>
  );
}
