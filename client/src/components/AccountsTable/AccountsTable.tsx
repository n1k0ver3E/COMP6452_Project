import React, { FC, useMemo } from 'react'
import { useTable } from 'react-table'
import { IAccountsTableProps } from '../../interfaces/contract'
import './accountstable.css'

const AccountsTable: FC<IAccountsTableProps> = ({ columns, data }) => {
  const cols = useMemo(() => columns, [])
  const d = useMemo(() => data, [])

  const tableInstance = useTable({
    columns: cols,
    data: d,
  })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default AccountsTable
