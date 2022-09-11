import React from 'react';
import classNames from 'classnames';
import styles from './Pagination.module.scss';
import { ReactSVG } from 'react-svg';

export interface IProps {
    page: number;
    lastPage?: boolean;
    isLoading?: boolean;

    handlePagination: (page: number) => void;
}

export const Pagination: React.FC<IProps> = (props) => {
    return (
        <div className={styles.pagination}>
            <div className={styles.paginationWrapper}>
                {props.page !== 1 &&
                    <button
                        disabled={props.isLoading}
                        onClick={() => props.handlePagination(props.page - 1)}
                        type="button"
                        className={classNames(styles.pageItem, styles.sides, styles.left)}>
                        <ReactSVG src='/assets/arrow-pagination.svg' />
                    </button>
                }
                <button
                    onClick={() => props.page !== 1 && props.handlePagination(1)}
                    type="button"
                    className={classNames(styles.pageItem, { [styles.active]: props.page === 1 })}>
                    {1}
                </button>
                {props.page > 3 && props.page !== 4 &&
                    <div className={styles.separator}>
                        <ReactSVG src='/assets/dots-pagination.svg' />
                    </div>
                }
                {props.page > 3 &&
                    <button
                        onClick={() => props.handlePagination(props.page - 2)}
                        type="button"
                        className={styles.pageItem}>
                        {props.page - 2}
                    </button>
                }
                {props.page > 2 &&
                    <button
                        onClick={() => props.handlePagination(props.page - 1)}
                        type="button"
                        className={styles.pageItem}>
                        {props.page - 1}
                    </button>
                }
                {props.page !== 1 &&
                    <button
                        type="button"
                        className={classNames(styles.pageItem, styles.active)}>
                        {props.page}
                    </button>
                }
                {!props.lastPage &&
                    <button
                        disabled={props.isLoading}
                        onClick={() => props.handlePagination(props.page + 1)}
                        type="button"
                        className={classNames(styles.pageItem, styles.sides, styles.right)}>
                        <ReactSVG src='/assets/arrow-pagination.svg' />
                    </button>
                }
            </div>
        </div>
    );
};
