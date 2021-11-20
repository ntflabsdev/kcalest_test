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
import { roundToOneDp, roundToOneDpKcal } from "../../utils/NumberUtils"

interface propType {
  searchItems: ISearchItem[] | null,
  itemClickedHandler: (item: ISearchItem) => void
}

const SearchItemList: React.FC<propType> = (props) => {
    let searchItemsList = (
      <div>
        {props.searchItems !== null && (props.searchItems.map((item) => (
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
                    <p>Calories: {roundToOneDpKcal(item?.calories)}</p>
                    {!!item.carbs && (<p>Carbs: {roundToOneDp(item?.carbs)}</p>)}
                    {!!item.fat && (<p>Fat: {roundToOneDp(item?.fat)}</p>)}
                    {!!item.protein && (<p>Protein: {roundToOneDp(item?.protein)}</p>)}
                  </IonCol>
                  <IonCol>
                    <p>High Protein: {item?.highProtein ? "Yes" : "No"}</p>
                    {!!!item?.vegan && (<p>Vegetarian: {item.vegetarian ? "Yes" : "No"}</p>)}
                    {(!!item?.vegan ||!!item?.vegetarian) && ( <p>Vegan: {item.vegan ? "Yes" : "No"}</p>)}
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        )))}
      </div>
    );

  return (
    <IonRow>
      <IonCol size-sm="12" sizeMd="6" offsetMd="3">
        {searchItemsList}
      </IonCol>
    </IonRow>
  );
};

export default SearchItemList;
