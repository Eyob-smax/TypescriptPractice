export interface Item {
  id: string;
  item: string;
  checked: boolean;
}

export default class ListItem implements Item {
  private _id: string;
  private _item: string;
  private _checked: boolean;

  constructor(_id: string, _item: string, _checked: boolean) {
    this._id = _id;
    this._item = _item;
    this._checked = _checked;
  }

  get id() {
    return this._id;
  }
  set id(id: string) {
    this._id = id;
  }
  get item() {
    return this._item;
  }
  set item(item: string) {
    this._item = item;
  }
  get checked() {
    return this._checked;
  }
  set checked(checked: boolean) {
    this._checked = checked;
  }
}
