import Button, { ButtonTheme } from '../../button';
import styles from './buttons.module.css';

export interface DialogButtonsProps {
  onClose: () => void;
  submitText: string;
  submitTheme?: ButtonTheme;
  cancelText?: string;
  loading?: boolean;
}

export function DialogButtons({
  onClose,
  submitText,
  submitTheme,
  cancelText,
  loading,
}: DialogButtonsProps) {
  return (
    <div className={styles.buttons}>
      <div />

      <div className={styles.mainButtons}>
        <Button type="button" variant="secondary" onClick={onClose}>
          {cancelText || 'Cancel'}
        </Button>

        <Button
          type="submit"
          variant="primary"
          theme={submitTheme}
          loading={loading}
        >
          {submitText}
        </Button>
      </div>
    </div>
  );
}

export default DialogButtons;
