import { ISearchItem } from './SearchItems';

export interface IUser {
    favourites: number[];
}

export interface IModalData {
    favourites: String[] | null,
    item: ISearchItem | null
}

export interface User {
    userId: String,
    userEmail: String
}