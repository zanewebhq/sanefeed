import Button from '../../button';
import styles from './buttons.module.css';

export interface DialogButtonsProps {
  onClose: () => void;
  submitText: string;
  cancelText?: string;
}

export function DialogButtons({
  onClose,
  submitText,
  cancelText,
}: DialogButtonsProps) {
  return (
    <div className={styles.buttons}>
      <div />

      <div className={styles.mainButtons}>
        <Button type="button" variant="secondary" onClick={onClose}>
          {cancelText || 'Cancel'}
        </Button>

        <Button type="submit" variant="primary">
          {submitText}
        </Button>
      </div>
    </div>
  );
}

export default DialogButtons;
