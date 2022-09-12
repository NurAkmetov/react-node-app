import * as React from 'react';
import styles from './Confirm.module.scss';

interface IProps {
    readonly showModal: boolean;
    readonly className?: string;
    readonly message?: string;
    readonly errorMessage?: string;
    readonly onCancelClick: () => void;
    readonly onConfirmClick: () => void;
}

const ConfirmInner: React.ForwardRefRenderFunction<HTMLDivElement, IProps> = (props, ref) => {
    return (
        props.showModal
            ? <div ref={ref} className={styles.overlay}>
                <div className={styles.confirm}>
                    <div className={styles.content}>
                        <div className={styles.header}>Подтвердите действие</div>
                        {
                            !props.errorMessage || props.errorMessage === ''
                                ? <div>{props.message}</div>
                                : <div className={styles['error-status']}>{props.errorMessage}</div>
                        }
                        <div className={styles.action}>
                            <button className={styles['cancel-button']}
                                onClick={props.onCancelClick}>Отмена</button>
                            {
                                !props.errorMessage || props.errorMessage === ''
                                    ? <button
                                        onClick={props.onConfirmClick}>Да</button>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            : null
    )
}

export const Confirm = React.forwardRef<HTMLDivElement, React.PropsWithChildren<IProps>>(ConfirmInner);
