import {apiClient} from '.';
import {BaseModel} from '../models/baseModel';
import {defaultPageParams, PageParams} from "./pageParams";
import {ConvertObjectToHttpParams} from "./pageParams";
import {PaginatedList} from "./pageParams";
require('dotenv').config()

export abstract class BaseApiService<TModel extends BaseModel> {
    private static baseURL: string = `${process.env.SERVER_HOST}:${process.env.PORT}`;

    public static async getAll<TModel>(url: string, pageParams: PageParams = defaultPageParams) {
        const params = new ConvertObjectToHttpParams(pageParams).get();
        const response = await apiClient.get<PaginatedList<TModel>>(`${url}/getAll?` + params, {
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
        const response = await apiClient.get<TModel>(`${url}/getById/${id}`, {
            baseURL: this.baseURL
        });

        return response.data;
    }

    public static async create<TModel>(url: string, item: TModel) {
        const response = await apiClient.post<TModel>(`${url}/create`, item, {
            baseURL: this.baseURL
        });

        return response.data;
    }

    public static async update<TModel>(url: string, item: TModel) {
        const response = await apiClient.put<TModel>(`${url}/update`, item, {
            baseURL: this.baseURL
        });

        return response.data;
    }

    public static async delete<TModel>(url: string, id: number) {
        const response = await apiClient.delete<TModel>(`${url}/delete/${id}`, {
            baseURL: this.baseURL
        });

        return response.data;
    }
}
