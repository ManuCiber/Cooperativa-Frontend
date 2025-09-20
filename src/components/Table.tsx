import type { TableProps } from "../types/Table";

export default function Table<T>({ data, columns }: TableProps<T>) {
  return (
    <div className="overflow-x-auto border rounded-lg shadow">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-cyan-600 text-white">
          <tr>
            {columns.map((col)=> (
                <th key={col.key as string} className="px-4 py-2">
                    {col.label}
                </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No hay datos disponibles
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={i}
                className="odd:bg-gray-100 even:bg-white hover:bg-cyan-50"
              >
                {columns.map((col) => (
                  <td key={col.key as string} className="px-4 py-2 border-t">
                    {String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}