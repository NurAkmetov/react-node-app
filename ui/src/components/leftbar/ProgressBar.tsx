import * as React from 'react';
import {observer} from "mobx-react";
import {useStores} from "../../stores/store";
import classNames from 'classnames';
import styles from './ProgressBar.module.scss';

interface IProps {
    readonly className?: string;
}

export const ProgressBar = observer((props: IProps) => {
    const {networkStore} = useStores();

    return (
        networkStore.isLoading
            ? <div className={classNames(styles['progress-bar'], props.className)}></div>
            : null
    )
});
