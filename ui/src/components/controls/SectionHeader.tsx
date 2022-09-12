import classNames from 'classnames';
import * as React from 'react';
import styles from './SectionHeader.module.scss';

interface IProps {
    readonly className?: string;
    readonly title: string;
}

const SectionHeaderInner: React.ForwardRefRenderFunction<HTMLDivElement, IProps> = (props, ref) => {
    return (
        <div ref={ref} className={classNames(styles['section-header'], props.className)}>
            <div className={styles.title}>{props.title}</div>
        </div>
    )
}

export const SectionHeader = React.forwardRef(SectionHeaderInner);
