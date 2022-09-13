import {FC, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {usePaginatedItems} from '../../hooks';
import {useStores} from "../../stores/store";
import {RouteCategory} from '../../models/routeCategory';
import {Button} from '../controls/Button';
import {Header} from '../controls/Header';
import {Pagination} from '../controls/Pagination';
import {SearchForm} from '../controls/SearchForm';
import styles from '../../styles/List.module.scss';

export const RouteCategoryList: FC = () => {
    const history = useHistory();

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);

    const routeCategories = usePaginatedItems(RouteCategory, page, query);

    const {networkStore} = useStores();

    useEffect(() => {
        networkStore.setLoading(routeCategories.isLoading);
    }, [routeCategories.isLoading]);

    useEffect(() => {
        if (query !== '' || typeof (query) !== 'undefined') {
            setPage(1);
        }
    }, [query]);

    return (
        <div className={styles['list']}>
            <Header title='Категории маршрута'/>
            <div className={styles.container}>
                <Button state='primary' onClick={() => history.push(`/routeCategories/create`)}>
                    Добавить
                </Button>
            </div>
            <div className={styles.container}>
                <div className={styles['table-container']}>
                    {routeCategories.showSearch &&
                        <SearchForm
                            query={query}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
                            placeholder='Искать...'
                            clearInput={() => setQuery('')}/>
                    }
                    {routeCategories.items && routeCategories.items.length > 0
                        ?
                        <div className={styles['items-table']}>
                            <table>
                                <thead>
                                <tr className={styles.header}>
                                    <th>Идентификатор</th>
                                    <th>Название</th>
                                </tr>
                                </thead>
                                <tbody>
                                {routeCategories.items
                                    .map((row, i) => {
                                        return (
                                            <tr className={styles.item} key={i}
                                                onClick={() => history.push(`/routeCategories/info/${row.id}`)}>
                                                <td>{row.id}</td>
                                                <td>{row.name}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        : <div>Ничего не найдено...</div>
                    }
                    {
                        routeCategories.showPagination &&
                        <div className={styles['pagination-bar']}>
                            <Pagination
                                isLoading={routeCategories.isLoading}
                                page={routeCategories.currentPage}
                                lastPage={!routeCategories.hasNextPage}
                                handlePagination={page => setPage(page)}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
