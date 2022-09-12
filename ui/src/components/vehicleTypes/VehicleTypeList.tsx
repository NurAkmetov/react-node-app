import {FC, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {usePaginatedItems} from '../../hooks';
import {VehicleType} from '../../models/vehicleType';
import {Button} from '../controls/Button';
import {Header} from '../controls/Header';
import {Pagination} from '../controls/Pagination';
import {SearchForm} from '../controls/SearchForm';
import styles from '../../styles/List.module.scss';

export const VehicleTypeList: FC = () => {
    const history = useHistory();

    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);

    const vehicleTypes = usePaginatedItems(VehicleType, page, query);

    useEffect(() => {
        if (query !== '' || typeof (query) !== 'undefined') {
            setPage(1);
        }
    }, [query]);

    return (
        <div className={styles['list']}>
            <Header title='Типы ПЕ'/>
            <div className={styles.container}>
                <Button state='primary' onClick={() => history.push(`/vehicleTypes/create`)}>
                    Добавить
                </Button>
            </div>
            <div className={styles.container}>
                <div className={styles['table-container']}>
                    {vehicleTypes.showSearch &&
                        <SearchForm
                            query={query}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
                            placeholder='Искать...'
                            clearInput={() => setQuery('')}/>
                    }
                    {vehicleTypes.items && vehicleTypes.items.length > 0
                        ?
                        <div className={styles['items-table']}>
                            <table>
                                <thead>
                                <tr className={styles.header}>
                                    <th>Идентификатор</th>
                                    <th>Название</th>
                                    <th>Стоимость</th>
                                </tr>
                                </thead>
                                <tbody>
                                {vehicleTypes.items
                                    .map((row, i) => {
                                        return (
                                            <tr className={styles.item} key={i}
                                                onClick={() => history.push(`/vehicleTypes/info/${row.id}`)}>
                                                <td>{row.id}</td>
                                                <td>{row.name}</td>
                                                <td>{row.price}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        : <div>Ничего не найдено...</div>
                    }
                    {
                        vehicleTypes.showPagination &&
                        <div className={styles['pagination-bar']}>
                            <Pagination
                                isLoading={vehicleTypes.isLoading}
                                page={vehicleTypes.currentPage}
                                lastPage={!vehicleTypes.hasNextPage}
                                handlePagination={page => setPage(page)}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
