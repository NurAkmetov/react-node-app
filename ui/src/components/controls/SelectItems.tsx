import { GroupBase } from 'react-select';
import { AsyncPaginate, LoadOptions } from "react-select-async-paginate";
import { BaseApiService } from '../../apiServices/baseApiService';
import { defaultPageParams } from '../../apiServices/pageParams';
import { PaginatedList } from '../../apiServices/pageParams';
import styles from './SelectItems.module.scss';

type Item = {
    id: number,
    value: string | number
}

interface IProps<T> {
    readonly label: string;
    readonly model: new () => T;
    readonly searchKey: string;
    readonly value?: Item;
    readonly required?: boolean;
    readonly errorMessage?: string;
    readonly isSearchable?: boolean;

    readonly onChange: (id?: number) => void;
}

export const SelectItems = <T,>(props: IProps<T>): JSX.Element => {
    const idKey: string = 'id';

    const loadOptions: LoadOptions<Item, GroupBase<Item>, { page: number }> = async (searchQuery, prevOptions, additionalOptions) => {
        const currentPage = additionalOptions?.page ?? 1;

        const fetchData: PaginatedList<T> =
            (typeof (searchQuery) === 'undefined' || searchQuery === '')
                ? await BaseApiService.getAll(props.model.name, { ...defaultPageParams, page: currentPage })
                : await BaseApiService.search(props.model.name, { ...defaultPageParams, page: currentPage, q: searchQuery });

        return {
            options: fetchData.results.map(item => (
                {
                    id: Object.entries(item!).filter(([key]) => key === idKey)[0][1] as number,
                    value: Object.entries(item!).filter(([key]) => key === props.searchKey)[0][1] as string
                }
            )),
            hasMore: fetchData.results.length === fetchData.pageSize,
            additional: {
                page: currentPage + 1
            }
        }
    }

    return (
        <div className={styles['select-field']}>
            <label>{props.label}{props.required && '*'}</label>
            <AsyncPaginate
                key={props.label}
                getOptionLabel={(opt: Item) => opt.value.toString()}
                getOptionValue={(opt: Item) => opt.value.toString()}
                loadOptions={loadOptions}
                noOptionsMessage={() => 'Нет данных'}
                loadingMessage={() => 'Загрузка'}
                defaultValue={props.value}
                placeholder='Выберите из списка...'
                additional={{
                    page: 1
                }}
                onChange={opt => props.onChange(opt?.id)}
                isSearchable={props.isSearchable}
            />
            {
                props.errorMessage &&
                <div className={styles.error}>{props.errorMessage}</div>
            }
        </div>
    )
}
