export interface TableProps<T>{
    data: T[];
    columns: {key: keyof T; label: string}[];
}