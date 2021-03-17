export interface IOrderForm {
    [index: string]: fieldType;
  }

export interface IAuthForm {
  [index: string]: fieldType;
}
  
export interface fieldType {
    elementType: string;
    elementConfig: inputConfig | selectConfig;
    value: string;
    validation: validation;
  }
  
export interface inputConfig {
    type: "number" | "time" | "text" | "tel" | "url" | "email" | "search" | "date" | "password" | undefined;
    placeholder: string;
  }
  
export interface selectConfig {
    options: [
      { value: string; displayValue: string },
      { value: string; displayValue: string }
    ];
  }
  
export interface validation {
    [validation: string]: boolean | number;
  }