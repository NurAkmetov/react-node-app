import {useEffect, useMemo, useState} from 'react';
import {useMutation, useInfiniteQuery, useQuery} from 'react-query';
import {PaginatedList} from '../apiServices/pageParams';
import {BaseApiService} from '../apiServices/baseApiService';
import {defaultPageParams} from '../apiServices/pageParams';

export function usePaginatedItems<T>(model: new () => T, page: number, query?: string) {
    const fetchData: Promise<PaginatedList<T>> = useMemo(() => {
        return (typeof (query) === 'undefined' || query === '')
            ? BaseApiService.getAll(model.name, {...defaultPageParams, page})
            : BaseApiService.search(model.name, {...defaultPageParams, page, q: query});
    }, [page, model, query]);

    const {hasNextPage, isLoading, data} = useInfiniteQuery<PaginatedList<T>, Error>(
        `${model.name} ${page} ${query}`,
        () => fetchData,
        {
            getNextPageParam: response => {
                if ((response.pageSize > response.results.length) || (response.results.length === 0)) {
                    return undefined;
                }

                return page + 1;
            },

            keepPreviousData: true
        }
    );

    const [currentData, setCurrentData] = useState(data);

    const [showPagination, setShowPagination] = useState(false);

    useEffect(() => {
        setCurrentData(data?.pages[0].results.length === 0 && page > 1 ? currentData : data);

        if (page === 1 && data && (data?.pages[0].results.length === data.pages[0].pageSize)) {
            setShowPagination(true);
        } else if (page === 1 && data && (data?.pages[0].results.length < data.pages[0].pageSize)) {
            setShowPagination(false);
        }
    }, [data, page, currentData]);

    const items: T[] | undefined = data?.pages[0].results.length === 0 && page > 1 ? currentData?.pages[0].results : data?.pages[0].results;
    const currentPage: number = data?.pages[0].results.length === 0 && page > 1 ? page - 1 : page;
    const showSearch: boolean | undefined = query !== '' || page > 1 || (data && data?.pages[0].results.length > 0);

    return {
        hasNextPage,
        isLoading,
        items,
        currentPage,
        showSearch,
        showPagination
    };
}

export function useGetItem<T>(id: number, model: new () => T) {
    const {data, isError, isLoading} = useQuery<T, Error>(
        `${model.name} ${id}`,
        () => BaseApiService.getById(model.name, id), {}
    );

    return {item: data, isLoading, isError};
}

export function useCreateItem<T>(model: new () => T) {
    const {mutate, isLoading} =
        useMutation((item: T) => BaseApiService.create(model.name, item));

    return {add: mutate, isLoading};
}

export function useUpdateItem<T>(model: new () => T, id: number) {
    const {mutate, isLoading} =
        useMutation((item: T) => BaseApiService.update(model.name, item, id));

    return {update: mutate, isLoading};
}

export function useDeleteItem<T>(model: new () => T) {
    const {mutate, isLoading} =
        useMutation((id: number) => BaseApiService.delete(model.name, id));

    return {delete: mutate, isLoading};
}
