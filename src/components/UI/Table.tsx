import { useState, useMemo, type ReactNode } from "react";
import type { TableProps } from "../../types/Components/Table";

interface ExtendedTableProps<T> extends TableProps<T> {
  searchable?: boolean;
  selectable?: boolean;
  rowsPerPage?: number;
}

const formatCurrency = (value: unknown): string | unknown => {
  if (typeof value === "number") {
    return value.toLocaleString("es-DO", {
      style: "currency",
      currency: "DOP",
      minimumFractionDigits: 2,
    });
  }

  if (typeof value === "string" && !isNaN(Number(value))) {
    return Number(value).toLocaleString("es-DO", {
      style: "currency",
      currency: "DOP",
      minimumFractionDigits: 2,
    });
  }

  return value;
};

const Table = <T extends { id?: number | string }>({
  columns,
  data,
  actions,
  className,
  searchable = true,
  selectable = true,
  rowsPerPage = 10,
}: ExtendedTableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<(number | string)[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key?: string | ((row: T) => string | number);
    direction: "asc" | "desc";
  }>({
    key: undefined,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);

  // --- 🔍 Filtrado global ---
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter((row) =>
      columns.some((col) => {
        const value =
          typeof col.accessor === "function"
            ? col.accessor(row)
            : (row[col.accessor] as unknown as string | number | undefined);

        return (
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );
  }, [searchTerm, data, columns]);

  // --- ↕️ Ordenamiento ---
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const aVal =
        typeof sortConfig.key === "function"
          ? sortConfig.key(a)
          : (a[sortConfig.key as keyof T] as unknown as string | number);
      const bVal =
        typeof sortConfig.key === "function"
          ? sortConfig.key(b)
          : (b[sortConfig.key as keyof T] as unknown as string | number);

      if (aVal == null || bVal == null) return 0;

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      return sortConfig.direction === "asc"
        ? aVal.toString().localeCompare(bVal.toString())
        : bVal.toString().localeCompare(aVal.toString());
    });

    return sorted;
  }, [filteredData, sortConfig]);

  // --- 📄 Paginación ---
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // --- ✅ Selección ---
  const toggleSelect = (id: number | string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === paginatedData.length) {
      setSelected([]);
    } else {
      setSelected(paginatedData.map((row) => row.id!).filter(Boolean));
    }
  };

  // --- ↕️ Cambiar orden ---
  const handleSort = (key: string | ((row: T) => string | number)) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-4 overflow-hidden ${className}`}>
      {/* --- 🔍 Barra de búsqueda --- */}
      {searchable && (
        <div className="flex justify-end mb-4">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-1/3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
        </div>
      )}

      {/* --- 📋 Contenedor de tabla --- */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-cyan-700 text-white uppercase text-xs">
            <tr>
              {selectable && (
                <th className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={
                      selected.length === paginatedData.length && selected.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="accent-cyan-600 w-4 h-4"
                  />
                </th>
              )}
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 cursor-pointer select-none whitespace-nowrap"
                  onClick={() =>
                    typeof col.accessor === "string" && handleSort(col.accessor)
                  }
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {sortConfig.key === col.accessor && (
                      <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
                    )}
                  </div>
                </th>
              ))}
              {actions && <th className="px-6 py-3 text-center">Acciones</th>}
            </tr>
          </thead>

          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0) + (selectable ? 1 : 0)}
                  className="text-center py-4 text-gray-500 italic"
                >
                  No hay datos disponibles
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIdx) => (
                <tr
                  key={row.id ?? rowIdx}
                  className={`border-b hover:bg-gray-100 transition-colors ${
                    selected.includes(row.id!) ? "bg-cyan-50" : ""
                  }`}
                >
                  {selectable && (
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={selected.includes(row.id!)}
                        onChange={() => toggleSelect(row.id!)}
                        className="accent-cyan-600 w-4 h-4"
                      />
                    </td>
                  )}

                  {columns.map((col, colIdx) => {
                    let value =
                      typeof col.accessor === "function"
                        ? col.accessor(row)
                        : (row[col.accessor] as unknown as React.ReactNode);

                    // 💰 Formatear automáticamente si es numérico
                    if (
                      typeof value === "number" ||
                      (typeof value === "string" && !isNaN(Number(value))) ||
                      ["monto", "salario", "total"].some((k) =>
                        col.header.toLowerCase().includes(k)
                      )
                    ) {
                      value = formatCurrency(value) as ReactNode;
                    }

                    return (
                      <td
                        key={colIdx}
                        className="px-6 py-4 whitespace-nowrap break-words max-w-xs"
                      >
                        {value}
                      </td>
                    );
                  })}

                  {actions && (
                    <td className="px-6 py-4 flex justify-center gap-3 flex-wrap">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- 📊 Paginación --- */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-600 gap-3">
        <p>
          Mostrando{" "}
          <span className="font-semibold">
            {paginatedData.length > 0
              ? (currentPage - 1) * rowsPerPage + 1
              : 0}
          </span>{" "}
          -{" "}
          <span className="font-semibold">
            {(currentPage - 1) * rowsPerPage + paginatedData.length}
          </span>{" "}
          de <span className="font-semibold">{filteredData.length}</span> registros
        </p>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="text-gray-800 font-semibold">
            {currentPage} / {totalPages || 1}
          </span>
          <button
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* --- 🧮 Contador de seleccionados --- */}
      {selectable && selected.length > 0 && (
        <div className="mt-3 text-sm text-gray-600">
          {selected.length} elemento{selected.length > 1 ? "s" : ""} seleccionado
          {selected.length > 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
};

export default Table;
