import FullList from "../model/FullList.ts";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement;
  private static _instance: any = null;
  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }

  static instance(): ListTemplate {
    if (ListTemplate._instance) return ListTemplate._instance;
    return new ListTemplate();
  }

  clear(): void {
    this.ul.innerHTML = "";
  }
  render(fullList: FullList): void {
    this.clear();
    fullList.list.forEach((list) => {
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";
      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = list.id;
      check.checked = list.checked;
      check.tabIndex = 0;
      li.appendChild(check);

      check.addEventListener("change", () => {
        list.checked = !list.checked;
        fullList.save();
      });

      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = list.id;
      label.textContent = list.item;
      li.appendChild(label);

      const button = document.createElement("button") as HTMLButtonElement;
      button.className = "button";
      button.textContent = "X";
      li.appendChild(button);

      button.addEventListener("click", () => {
        fullList.removeItem(list.id);
        this.render(fullList);
      });

      this.ul.appendChild(li);
    });
  }
}
