import * as React from 'react';
import styles from './Header.module.scss';

interface IProps {
    readonly title: string;
}

const HeaderInner: React.ForwardRefRenderFunction<HTMLDivElement, IProps> = (props, ref) => {
    return (
        <div ref={ref} className={styles.header}>
            <div className={styles.title}>{props.title}</div>
        </div>
    )
}

export const Header = React.forwardRef(HeaderInner);
