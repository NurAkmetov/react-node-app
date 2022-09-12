import * as React from 'react';
import { ReactSVG } from 'react-svg';
import styles from './SearchForm.module.scss';

interface IProps {
    readonly query: string;
    readonly placeholder: string;

    readonly onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    readonly clearInput: () => void;
}

export const SearchForm: React.FC<IProps> = (props) => {
    return (
        <div className={styles['input-section']}>
            <input type='text' placeholder={props.placeholder} value={props.query} onChange={
                (event: React.ChangeEvent<HTMLInputElement>) => props.onChange(event)} />
            <div className={styles['clear-button']} onClick={() => props.clearInput()}>
                <ReactSVG src='/assets/cross.svg' />
            </div>
        </div>
    );
}
