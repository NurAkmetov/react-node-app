import * as React from "react";
import {FC, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {usePaginatedItems} from '../../hooks';
import {useDebounce} from "../../hooks/debounce";
import {useStores} from "../../stores/store";
import {Stop} from '../../models/stop';
import {Button} from '../controls/Button';
import {Header} from '../controls/Header';
import {Pagination} from '../controls/Pagination';
import {SearchForm} from '../controls/SearchForm';
import styles from '../../styles/List.module.scss';

export const StopList: FC = () => {
    const history = useHistory();

    const [query, setQuery] = useState('');
    const debounced = useDebounce(query);
    const [page, setPage] = useState(1);

    const stops = usePaginatedItems(Stop, page, debounced);

    const {networkStore} = useStores();

    React.useEffect(() => {
        networkStore.setLoading(stops.isLoading);
    }, [stops.isLoading]);

    useEffect(() => {
        if (query !== '' || typeof (query) !== 'undefined') {
            setPage(1);
        }
    }, [query]);

    return (
        <div className={styles['list']}>
            <Header title='Остановки'/>
            <div className={styles.container}>
                <Button state='primary' onClick={() => history.push(`/stops/create`)}>
                    Добавить
                </Button>
            </div>
            <div className={styles.container}>
                <div className={styles['table-container']}>
                    {stops.showSearch &&
                        <SearchForm
                            query={query}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
                            placeholder='Искать...'
                            clearInput={() => setQuery('')}/>
                    }
                    {stops.items && stops.items.length > 0
                        ?
                        <div className={styles['items-table']}>
                            <table>
                                <thead>
                                <tr className={styles.header}>
                                    <th>Идентификатор</th>
                                    <th>Название</th>
                                    <th>Маршрут</th>
                                </tr>
                                </thead>
                                <tbody>
                                {stops.items
                                    .map((row, i) => {
                                        return (
                                            <tr className={styles.item} key={i}
                                                onClick={() => history.push(`/stops/info/${row.id}`)}>
                                                <td>{row.id}</td>
                                                <td>{row.name}</td>
                                                <td>{row.route?.name ? row.route.name : ''}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        : <div>Ничего не найдено...</div>
                    }
                    {
                        stops.showPagination &&
                        <div className={styles['pagination-bar']}>
                            <Pagination
                                isLoading={stops.isLoading}
                                page={stops.currentPage}
                                lastPage={!stops.hasNextPage}
                                handlePagination={page => setPage(page)}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
