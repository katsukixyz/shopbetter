export type ListPage = {
  id?: number;
  name: string;
  items: ListItem[];
};

export type ListItem = {
  name: string;
  checkVal: boolean;
};
