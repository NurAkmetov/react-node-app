import * as React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface IProps {
    readonly className?: string;
    readonly state?: 'primary' | 'secondary';

    readonly onClick: () => void;
}

const ButtonInner = (props: React.PropsWithChildren<IProps>, ref: React.LegacyRef<HTMLDivElement> | undefined) => {
    return (
        <div ref={ref} className={classNames(styles['button'], props.className, styles[props.state ?? ''])} onClick={() => props.onClick()}>
            {props.children}
        </div>
    );
}

export const Button = React.forwardRef<HTMLDivElement, React.PropsWithChildren<IProps>>(ButtonInner);
