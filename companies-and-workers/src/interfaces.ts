export interface IRow {
  id: string;
  properties: IRowProperty[];
  isListHead?: boolean;
  isChecked?: boolean;
  className?: string;
  onChange?: () => void;
}

interface IRowProperty {
  value: string;
  func?: (arg: string) => void;
}

export interface IActiveTables {
  CompaniesTable?: boolean;
  WorkersTable?: boolean;
}

export interface IEmployee {
  id: number;
  companyId: number;
  name: string;
  surname: string;
  position: string;
  changeName?: (newName: string) => void;
  changeSurname?: (newSurName: string) => void;
  changePosition?: (newPosition: string) => void;
  isChecked?: boolean;
}

export interface ICompany {
  id: number;
  name: string;
  staff: IEmployee[];
  adress: string;
  changeNameFunc?: (newName: string) => void;
  changeAdressFunc?: (newAdress: string) => void;
  isChecked?: boolean;
}
