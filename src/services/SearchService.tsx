export const getDietButtonStyles = (
  styles: any,
  props: any,
  buttonId: string,
  combination: string[]
) => {
  let disabled = false;
  let dietButtonClasses = [styles.SearchBoxDietButton];

  if (props.filters.length > 0) {
    if (
      props.filters.includes("paleo") &&
      (buttonId === "vegan" || buttonId === "vegetarian")
    ) {
      dietButtonClasses.push(styles.SearchBoxDietButtonDisabled);
      disabled=true;
    }
    if (
      (props.filters.includes("vegetarian") ||
        props.filters.includes("vegan")) &&
      buttonId === "paleo"
    ) {
      dietButtonClasses.push(styles.SearchBoxDietButtonDisabled);
      disabled=true;
    }
    if (combination != undefined) {
      if (!combination.includes(buttonId) && props.filters[0] !== buttonId) {
        dietButtonClasses.push(styles.SearchBoxDietButtonDisabled);
        disabled=true;
      }
    }
  }

  if (props.filters.includes(buttonId)) {
    dietButtonClasses.push(styles.SearchBoxDietButtonActive);
  }

  return {dietButtonClasses: dietButtonClasses, disabled: disabled};
};
