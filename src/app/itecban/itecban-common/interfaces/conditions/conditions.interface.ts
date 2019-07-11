export interface ConditionsElement {
    title?: string;
    data: Data[];
  }

  export interface Data {
    icon?: string;
    text: string;
    link: string;
    read: boolean;
}
