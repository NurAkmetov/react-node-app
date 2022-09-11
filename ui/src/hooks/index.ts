import { useEffect, useMemo, useState } from 'react';
import { useMutation, useInfiniteQuery, useQuery } from 'react-query';
import { PaginatedList } from '../apiServices/pageParams';
import { BaseApiService } from '../apiServices/baseApiService';
import { defaultPageParams } from '../apiServices/pageParams';
import { nameof } from '../utils';

export function usePaginatedItems<T>(page: number, query?: string, model?: new () => T) {
    const fetchData: Promise<PaginatedList<T>> = useMemo(() => {
        return (typeof (query) === 'undefined' || query === '')
            ? BaseApiService.getAll(nameof(Object(model)), { ...defaultPageParams, page })
            : BaseApiService.search(nameof(Object(model)), { ...defaultPageParams, page, q: query });
    }, [page, model, query]);

    const { hasNextPage, isLoading, data } = useInfiniteQuery<PaginatedList<T>, Error>(
        `${nameof(Object(model))} ${page} ${query}`,
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
        }
        else if (page === 1 && data && (data?.pages[0].results.length < data.pages[0].pageSize)) {
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
    const { data, isError, isLoading } = useQuery<T, Error>(
        `${nameof(Object(model))} ${id}`,
        () => BaseApiService.getById(nameof(Object(model)), id), {}
    );

    return { item: data, isLoading, isError };
}

export function useCreateItem<T>(model: new () => T) {
    const { mutate } =
        useMutation((item: T) => BaseApiService.create(nameof(Object(model)), item));

    return { add: mutate };
}

export function useUpdateItem<T>(model: new () => T) {
    const { mutate } =
        useMutation((item: T) => BaseApiService.update(nameof(Object(model)), item));

    return { update: mutate };
}

export function useDeleteItem<T>(model: new () => T) {
    const { mutate } =
        useMutation((id: number) => BaseApiService.delete(nameof(Object(model)), id));

    return { delete: mutate };
}
