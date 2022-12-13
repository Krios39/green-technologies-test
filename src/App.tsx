import React, {memo, useEffect, useState} from 'react';
import {Column, Row} from "react-table";
import {Table} from "./components/Table";
import {ItemsService} from "./services/items.service";
import {DateRangePicker} from "./components/DateRangePicker";
import {DatePicker} from "./components/DatePicker";
import {SupportedDate} from "./types/supproted-dates";
import {DateRange} from "./models/date-range";
import {formatDateToString} from "./helpers/format-date-to-string";
import {Item} from "./models/item";

import './app.css'

const App = memo(() => {
    const [items, setItems] = useState<Item[]>([])
    const [date, setDate] = useState<SupportedDate>(null)
    const [dateRange, setDateRange] = useState<DateRange>({start: null, end: null})
    const [error, setError] = useState<any>(undefined)

    useEffect(() => {
        updateItems()
    }, [])

    const columns: Column<Item>[] = [
        {
            id: 'id',
            Header: 'ID',
            accessor: 'id'
        },
        {
            id: 'date',
            Header: 'Дата отправки',
            accessor: 'dateOfSend'
        },
        {
            id: 'range',
            Header: 'Прогноз на период',
            Cell: ({row}: { row: Row<Item> }) => {
                return <div>
                    {`${row.original.forecastStart} - ${row.original.forecastEnd}`}
                </div>
            }
        },
        {
            id: 'end',
            Header: 'Операции',
            Cell: ({row}: { row: Row<Item> }) => {
                return <button onClick={() => onDeleteItemClick(row.original.id)}>delete</button>
            }
        }
    ]

    const updateItems = () => {
        setError(undefined)
        ItemsService.get()
            .then(data => setItems(data))
            .catch(e => setError(e))
    }
    const onDeleteItemClick = (id: number) => {
        setError(undefined)
        ItemsService.delete(id)
            .then(() => {
                setItems(items.filter(item => item.id !== id))
            })
            .catch(e => setError(e))
    }
    const onAddItemClick = () => {
        setError(undefined)
        ItemsService.add({
            dateOfSend: formatDateToString(date),
            forecastStart: formatDateToString(dateRange.start),
            forecastEnd: formatDateToString(dateRange.end)
        })
            .then(() => {
                setDate(null)
                setDateRange({start: null, end: null})
                updateItems()
            })
            .catch(e => setError(e))
    }

    const isAddButtonDisable = !date || !dateRange.start || !dateRange.end

    return (
        <div className="app">
            <h1>Планироващик</h1>

            <h2>Запланированные задачи</h2>
            <Table data={items} columns={columns}/>

            <h3>Добавить новую</h3>
            <div className={'date-pickers-container'}>
                <DatePicker selected={date} onChange={value => setDate(value)} minDate={new Date()}/>
                <DateRangePicker dateRange={dateRange} onRangeChange={value => setDateRange(value)}/>
            </div>

            {error && <b className={'error'}>Возникла ошибка, пожалуйста обновите страницу</b>}

            <button disabled={isAddButtonDisable} onClick={onAddItemClick}>add</button>
        </div>
    );
})

export default App;
