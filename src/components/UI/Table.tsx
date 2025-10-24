import type { TableProps } from "../../types/Components/Table";

const Table = <T extends { id?: number | string }>({
  columns,
  data,
  actions,
  className,
}: TableProps<T>) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-cyan-700 text-white uppercase text-xs">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-3">
                {col.header}
              </th>
            ))}
            {actions && <th className="px-6 py-3 text-center">Acciones</th>}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center py-4 text-gray-500 italic"
              >
                No hay datos disponibles
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr
                key={row.id ?? rowIdx}
                className="border-b hover:bg-gray-100 transition-colors"
              >
                {columns.map((col, colIdx) => {
                  const value =
                    typeof col.accessor === "function"
                      ? col.accessor(row)
                      : (row[col.accessor] as unknown as React.ReactNode);

                  return (
                    <td key={colIdx} className="px-6 py-4">
                      {value}
                    </td>
                  );
                })}

                {actions && (
                  <td className="px-6 py-4 flex justify-center gap-3">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
