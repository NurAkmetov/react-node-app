import * as React from 'react';
import classNames from 'classnames';
import styles from './LeftBarButton.module.scss';

interface IProps {
    readonly className?: string;
    readonly isSelected?: boolean;

    readonly onClick: () => void;
}

const LeftBarButtonInner = (props: React.PropsWithChildren<IProps>, ref: React.LegacyRef<HTMLDivElement> | undefined) => {
    return (
        <div ref={ref} className={classNames(styles['leftbar-button'], styles[props.isSelected ? 'selected' : ''], props.className)} onClick={() => props.onClick()}>
            {props.children}
        </div>
    );
}

export const LeftBarButton = React.forwardRef<HTMLDivElement, React.PropsWithChildren<IProps>>(LeftBarButtonInner);
