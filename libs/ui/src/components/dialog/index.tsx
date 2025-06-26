import Button from '../button';
import Icon from '../icon';
import Link from '../link';
import Text from '../text';
import styles from './dialog.module.css';

interface DialogButton {
  text: string;
  onClick: () => void;
}

export interface DialogProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  primary: DialogButton;
  secondary: DialogButton;
  tertiary?: DialogButton;
  children?: React.ReactNode;
}

export function Dialog({
  title,
  description,
  isOpen,
  onClose,
  primary,
  secondary,
  tertiary,
  children,
}: DialogProps) {
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

        <div className={styles.header}>
          <Text as="h3" className={styles.title}>
            {title}
          </Text>

          <Text as="p">{description}</Text>
        </div>

        {children}

        <div className={styles.buttons}>
          <div>
            {tertiary && (
              <Link onClick={tertiary.onClick}>{tertiary.text}</Link>
            )}
          </div>

          <div className={styles.mainButtons}>
            <Button
              type="button"
              variant="secondary"
              onClick={secondary.onClick}
            >
              {secondary.text}
            </Button>

            <Button type="button" variant="primary" onClick={primary.onClick}>
              {primary.text}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
