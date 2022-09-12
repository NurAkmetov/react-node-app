import {FC, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {usePaginatedItems} from '../../hooks';
import {Route as Line} from '../../models/route';
import {Button} from '../controls/Button';
import {Header} from '../controls/Header';
import {Pagination} from '../controls/Pagination';
import {SearchForm} from '../controls/SearchForm';
import styles from '../../styles/List.module.scss';

export const RouteList: FC = () => {
    const history = useHistory();

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);

    const routes = usePaginatedItems(Line, page, query);

    useEffect(() => {
        if (query !== '' || typeof (query) !== 'undefined') {
            setPage(1);
        }
    }, [query]);

    return (
        <div className={styles['list']}>
            <Header title='Маршруты'/>
            <div className={styles.container}>
                <Button state='primary' onClick={() => history.push(`/routes/create`)}>
                    Добавить
                </Button>
            </div>
            <div className={styles.container}>
                <div className={styles['table-container']}>
                    {routes.showSearch &&
                        <SearchForm
                            query={query}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
                            placeholder='Искать...'
                            clearInput={() => setQuery('')}/>
                    }
                    {routes.items && routes.items.length > 0
                        ?
                        <div className={styles['items-table']}>
                            <table>
                                <thead>
                                <tr className={styles.header}>
                                    <th>Идентификатор</th>
                                    <th>Название</th>
                                    <th>Направление</th>
                                    <th>Расстояние</th>
                                    <th>Перевозчик</th>
                                    <th>Тип ПЕ</th>
                                    <th>Категория</th>
                                </tr>
                                </thead>
                                <tbody>
                                {routes.items
                                    .map((row, i) => {
                                        return (
                                            <tr className={styles.item} key={i}
                                                onClick={() => history.push(`/routes/info/${row.id}`)}>
                                                <td>{row.id}</td>
                                                <td>{row.name}</td>
                                                <td>{row.direction}</td>
                                                <td>{row.distance}</td>
                                                <td>{row.agency?.name ? row.agency.name : ''}</td>
                                                <td>{row.vehicleType?.name ? row.vehicleType.name : ''}</td>
                                                <td>{row.routeCategory?.name ? row.routeCategory.name : ''}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        : <div>Ничего не найдено...</div>
                    }
                    {
                        routes.showPagination &&
                        <div className={styles['pagination-bar']}>
                            <Pagination
                                isLoading={routes.isLoading}
                                page={routes.currentPage}
                                lastPage={!routes.hasNextPage}
                                handlePagination={page => setPage(page)}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
