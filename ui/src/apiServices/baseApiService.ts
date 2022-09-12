import {apiClient} from '.';
import {defaultPageParams, PageParams} from "./pageParams";
import {ConvertObjectToHttpParams} from "./pageParams";
import {PaginatedList} from "./pageParams";
import {environment} from "../environments/environment";

export abstract class BaseApiService {
    private static baseURL: string = environment.resourceApiURI;

    public static async getAll<TModel>(url: string, pageParams: PageParams = defaultPageParams) {
        const params = new ConvertObjectToHttpParams(pageParams).get();
        const response = await apiClient.get<PaginatedList<TModel>>(`${url}?` + params, {
            baseURL: this.baseURL
        });

        return response.data;
    }

    public static async search<TModel>(url: string, pageParams: PageParams = defaultPageParams) {
        const params = new ConvertObjectToHttpParams(pageParams).get();
        const response = await apiClient.get<PaginatedList<TModel>>(`${url}/search?` + params, {
            baseURL: this.baseURL
        });

        return response.data;
    }

    public static async getById<TModel>(url: string, id: number) {
        const response = await apiClient.get<TModel>(`${url}/${id}`, {
            baseURL: this.baseURL
        });

        return response.data;
    }

    public static async create<TModel>(url: string, item: TModel) {
        const response = await apiClient.post<TModel>(`${url}`, item, {
            baseURL: this.baseURL
        });

        return response.data;
    }

    public static async update<TModel>(url: string, item: TModel, id: number) {
        const response = await apiClient.put<TModel>(`${url}/${id}`, item, {
            baseURL: this.baseURL
        });

        return response.data;
    }

    public static async delete<TModel>(url: string, id: number) {
        const response = await apiClient.delete<TModel>(`${url}/${id}`, {
            baseURL: this.baseURL
        });

        return response.data;
    }
}
