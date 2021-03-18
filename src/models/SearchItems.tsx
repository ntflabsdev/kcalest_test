export interface ISearchItems {
    [item: string] : ISearchItem
}

export interface ISearchItem {
        id: string,
        calories: Number,
        carbs: Number,
        fat: Number,
        highProtein: boolean,
        name: string,
        protein: Number,
        store: string, 
        vegetarian: boolean,
        vegan: boolean,
        imageUrl: string,
        avatarUrl: string
}