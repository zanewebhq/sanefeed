import { toast as sonnerToast } from 'sonner';
import styles from './toast.module.css';
import Icon from '../icon';
import { cx } from '../../utils/index';
import { IconName } from '../icon/utils';
import Text from '../text';
import Spinner from '../spinner';

type ToastType = 'success' | 'error' | 'loading';

export const toast = {
  success: (title: string) =>
    sonnerToast.custom((id) => <Toast id={id} type="success" title={title} />),

  error: (title: string) =>
    sonnerToast.custom((id) => <Toast id={id} type="error" title={title} />),

  loading: (title: string) =>
    sonnerToast.custom((id) => <Toast id={id} type="loading" title={title} />, {
      duration: Infinity,
    }),

  dismiss: (id?: string | number) => sonnerToast.dismiss(id),
};

export interface ToastProps {
  id: string | number;
  type: ToastType;
  title: string;
}

const icons = {
  success: 'check-circle',
  error: 'error',
  loading: 'check-circle',
};

export default function Toast({ id, type, title }: ToastProps) {
  const handleClose = () => toast.dismiss(id);

  return (
    <div className={cx(styles.toast, styles[type])}>
      {type === 'loading' ? (
        <Spinner size="sm" className={styles.icon} />
      ) : (
        <Icon
          name={icons[type] as IconName}
          size="sm"
          className={styles.icon}
        />
      )}
      <div className={styles.content}>
        <Text type="label" size="sm" className={styles.title}>
          {title}
        </Text>
      </div>

      <button onClick={handleClose} className={styles.close}>
        <Icon name="close" size="xs" />
      </button>
    </div>
  );
}
