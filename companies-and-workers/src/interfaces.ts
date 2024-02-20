export interface IRow {
  id: string;
  properties: IRowProperty[];
  isListHead?: boolean;
  isChecked?: boolean;
  className?: string;
  onChange?: () => void;
}

export function isIRow(obj: any): obj is IRow {
  return obj && typeof obj === "object" && "id" in obj && "properties" in obj;
}

export interface IRowProperty {
  value: string;
  func?: (arg: string) => void;
  key?: number;
}

export interface ICreateButtonRow {
  createButtonText: string;
  isChecked?: boolean;
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
  isChecked?: boolean;
}

export interface ICompany {
  id: number;
  name: string;
  staff: IEmployee[];
  adress: string;
  isChecked?: boolean;
}
