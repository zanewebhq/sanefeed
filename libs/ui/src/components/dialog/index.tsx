import Icon from '../icon';
import DialogButtons from './buttons';
import styles from './dialog.module.css';
import DialogHeader from './header';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export function Dialog({ isOpen, onClose, children }: DialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay} onClick={onClose} />

      <div className={styles.dialog}>
        <Icon
          name="close"
          size="lg"
          onClick={onClose}
          className={styles.close}
        />
        {children}
      </div>
    </div>
  );
}

export default Dialog;

Dialog.Header = DialogHeader;
Dialog.Buttons = DialogButtons;
