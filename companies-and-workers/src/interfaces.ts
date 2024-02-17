export interface IRow {
  id: number;
  properties: IRowProperty[];
  isListHead?: boolean;
  isChecked?: boolean;
  isNeedCheckbox?: boolean;
  className?: string;
}

interface IRowProperty {
  value: string;
  func?: () => void;
}

export interface IActiveTables {
  CompaniesTable?: boolean;
  WorkersTable?: boolean;
}

export interface IEmployee {
  id: number;
  name: string;
  surname: string;
  position: string;
}

export interface ICompany {
  id: number;
  name: string;
  staff: IEmployee[];
}
