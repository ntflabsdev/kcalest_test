

export interface ISearchItems {
    [item: string] : ISearchItem
}

export interface ISearchItem {
        id: string,
        calories: string,
        carbs: string,
        fat: string,
        highProtein: boolean,
        name: string,
        protein: string,
        store: string,
        vegetarian: boolean,
        vegan: boolean,
        imageUrl: string,
        avatarUrl: string
}