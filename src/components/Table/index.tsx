import {Column, useTable} from 'react-table'
import './style.css'
interface TableProps<T extends object>  {
    data: T[],
    columns: Column<T>[]
}

export const Table = <T extends object>(props: TableProps<T>) => {
    const {headers, rows, prepareRow} = useTable({data: props.data, columns: props.columns})


    return (
        <table>
            <thead>
            <tr>
                {headers.map(header => (
                    <th key={header.id}>
                        <div>
                            {header.render('Header')}
                        </div>
                    </th>
                ))}
            </tr>
            </thead>

            <tbody>
            {rows.map(row => {
                prepareRow(row)
                    return (<tr key={row.id}>
                        {row.cells.map(cell =>
                            <td key={cell.getCellProps().key}>
                                {cell.render('Cell')}
                            </td>
                        )}
                    </tr>)
                }
            )}

            </tbody>
        </table>
    )
}