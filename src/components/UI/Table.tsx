import type { TableProps } from "../../types/Table"

const Table = <T extends {id?: number | string}>({columns, data, actions, className}:TableProps<T>) => {
  return(
    <table className={`min-w-full border border-gray-200 ${className}`}>
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, idx)=> (
              <th key={idx} className="text-left px-4 py-2 border-b border-gray-200">
                {col.header}
              </th>
            ))}
            {actions && <th className="px-4 py-2 border-b border-gray-200" >Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
                    <tr key={row.id || rowIdx} className="hover:bg-gray-50">
                        {columns.map((col, colIdx) => {
                            const value = typeof col.accessor === 'function' ? col.accessor(row) : row[col.accessor];
                            return (
                                <td key={colIdx} className="px-4 py-2 border-b border-gray-200">
                                    {value}
                                </td>
                            );
                        })}
                        {actions && <td className="px-4 py-2 border-b border-gray-200">{actions(row)}</td>}
                    </tr>
                ))}
        </tbody>
    </table>
  ) 
}

export default Table