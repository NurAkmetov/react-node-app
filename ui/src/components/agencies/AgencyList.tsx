import {FC, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {usePaginatedItems} from '../../hooks';
import {Agency} from '../../models/agency';
import {Button} from '../controls/Button';
import {Header} from '../controls/Header';
import {Pagination} from '../controls/Pagination';
import {SearchForm} from '../controls/SearchForm';
import styles from '../../styles/List.module.scss';

export const AgencyList: FC = () => {
    const history = useHistory();

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);

    const agencies = usePaginatedItems(Agency, page, query);

    useEffect(() => {
        if (query !== '' || typeof (query) !== 'undefined') {
            setPage(1);
        }
    }, [query]);

    return (
        <div className={styles['list']}>
            <Header title='Перевозчики'/>
            <div className={styles.container}>
                <Button state='primary' onClick={() => history.push(`/agencies/create`)}>
                    Добавить
                </Button>
            </div>
            <div className={styles.container}>
                <div className={styles['table-container']}>
                    {agencies.showSearch &&
                        <SearchForm
                            query={query}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
                            placeholder='Искать...'
                            clearInput={() => setQuery('')}/>
                    }
                    {agencies.items && agencies.items.length > 0
                        ?
                        <div className={styles['items-table']}>
                            <table>
                                <thead>
                                <tr className={styles.header}>
                                    <th>Идентификатор</th>
                                    <th>Название</th>
                                    <th>Регион</th>
                                </tr>
                                </thead>
                                <tbody>
                                {agencies.items
                                    .map((row, i) => {
                                        return (
                                            <tr className={styles.item} key={i}
                                                onClick={() => history.push(`/agencies/info/${row.id}`)}>
                                                <td>{row.id}</td>
                                                <td>{row.name}</td>
                                                <td>{row.region}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        : <div>Ничего не найдено...</div>
                    }
                    {
                        agencies.showPagination &&
                        <div className={styles['pagination-bar']}>
                            <Pagination
                                isLoading={agencies.isLoading}
                                page={agencies.currentPage}
                                lastPage={!agencies.hasNextPage}
                                handlePagination={page => setPage(page)}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
