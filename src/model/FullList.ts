import ListItem from "./ListItem.ts";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  private _list: ListItem[] = [];
  private static _instance: FullList;
  private constructor(list: ListItem[]) {
    this._list = list;
  }

  get list() {
    return this._list;
  }
  static instance(): FullList {
    if (FullList._instance) return FullList._instance;
    FullList._instance = new FullList([]);
    return FullList._instance;
  }
  load(): void {
    type loadObject = { _id: string; _item: string; _checked: boolean };

    const storedList: string | null = localStorage.getItem("myList");

    if (typeof storedList !== "string") return;

    const parsedList: loadObject[] = JSON.parse(storedList);

    parsedList.forEach((itemObj) => {
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );
      this.addItem(newListItem);
    });
  }

  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }

  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }

  clearList(): void {
    this._list = [];
    this.save();
  }
}
