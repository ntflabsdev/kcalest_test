import {
  IonCard,
  IonCardContent,
  IonCol,
  IonRow,
  IonAvatar,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonText,
} from "@ionic/react";

import React from "react";
import { ISearchItem } from "../../models/SearchItems";

interface propType {
  searchItems: ISearchItem[] | null,
  itemClickedHandler: (item: ISearchItem) => void
}

const SearchItemList: React.FC<propType> = (props) => {
  let searchItemsList = (
    <IonCard className="ion-text-center">
      <IonCardContent>
        <p>Add search filters to display items</p>
      </IonCardContent>
    </IonCard>
  );

  if (props.searchItems != null) {
    searchItemsList = (
      <div>
        {props.searchItems.map((item) => (
          <IonCard
            key={Math.random() * 10}
            onClick={() => props.itemClickedHandler(item)}
          >
            <IonCardHeader>
              <IonCardTitle className="searchItemCardTitle">
                <IonGrid>
                  <IonRow>
                    <IonCol size="3" sizeSm="2">
                      <IonAvatar>
                        <img src={item.avatarUrl} alt="costa jpeg" />
                      </IonAvatar>
                    </IonCol>
                    <IonCol size="9" sizeSm="10">
                      <IonText>{item.name}</IonText>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <p>Calories: {Number(item.calories).toFixed(1)}</p>
                    {!!item.carbs && (<p>Carbs: {Number(item.carbs).toFixed(1)}</p>)}
                    {!!item.fat && (<p>Fat: {Number(item.fat).toFixed(1)}</p>)}
                  </IonCol>
                  <IonCol>
                    <p>High Protein: {item.highProtein ? "Yes" : "No"}</p>
                    {!!item.protein && (<p>Protein: {Number(item.protein).toFixed(1)}</p>)}
                    {!!!item.vegan && (<p>Vegetarian: {item.vegetarian ? "Yes" : "No"}</p>)}
                    {(!!item?.vegan ||!!item?.vegetarian) && ( <p>Vegan: {item.vegan ? "Yes" : "No"}</p>)}
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        ))}
      </div>
    );
  }

  return (
    <IonRow>
      <IonCol size-sm="12" sizeMd="6" offsetMd="3">
        {searchItemsList}
      </IonCol>
    </IonRow>
  );
};

export default SearchItemList;
