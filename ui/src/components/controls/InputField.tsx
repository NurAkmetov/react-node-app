import * as React from 'react';
import styles from './InputField.module.scss';

interface IProps {
    readonly className?: string;
    readonly field: { key: string, text: string, type?: string };
    readonly value?: string | number;
    readonly required?: boolean;
    readonly errorMessage?: string;

    readonly onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputFieldInner: React.ForwardRefRenderFunction<HTMLDivElement, IProps> = (props, ref) => {
    return (
        <div ref={ref} className={styles['input-field']}>
            <label htmlFor={props.field.key}>{props.field.text}{props.required && '*'}</label>
            <input name={props.field.key}
                type={props.field.type ?? 'text'}
                onChange={event => props.onChange(event)} value={props.value ?? ''} />
            {
                props.errorMessage &&
                <div className={styles.error}>{props.errorMessage}</div>
            }
        </div>
    )
}

export const InputField = React.forwardRef<HTMLDivElement, React.PropsWithChildren<IProps>>(InputFieldInner);
