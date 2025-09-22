export interface Column<T>{
    header: string;
    accessor: keyof T | ((row: T)=>any);
}

export interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    actions?:(row: T) => React.ReactNode;
    className?: string
}
