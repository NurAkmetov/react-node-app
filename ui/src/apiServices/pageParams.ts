export interface PageParams {
    q?: string;
    page: number;
    pageSize: number;
}

export const defaultPageParams: PageParams = {
    pageSize: 10,
    page: 1
};

export interface PaginatedList<T> {
    currentPage: number;
    pageSize: number;
    results: Array<T>;
}

export class ConvertObjectToHttpParams {
    private readonly params: any;

    constructor(params: any) {
        this.params = params;
    }

    get() {
        const str = [];
        for (const p in this.params)
            if (this.params.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(this.params[p]));
            }
        return str.join("&");
    }
}