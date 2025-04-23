"use client"
import { useState } from "react"
import { DataTable } from '@/components/data-table/DataTable'
import { TableToolbar } from '@/components/data-table/TableToolbar'

export default function Products() {
  const data = [
    { id: 1, number: '001', name: 'Товар A', price: 100 },
    { id: 2, number: '002', name: 'Товар С', price: 200 },
  ]

  const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'number', header: 'Номер товара' },
    { accessorKey: 'name', header: 'Название товара' },
    { accessorKey: 'price', header: 'Цена' },
  ]

  const [searchValue, setSearchValue] = useState("")
  const [radioValue, setRadioValue] = useState<"number" | "name">("number")

  const filteredProducts = data.filter((product) =>
    product[radioValue].toString().toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Товары</h1>
      <DataTable
        columns={columns}
        data={filteredProducts}
        searchKey="name"
        search={
          <TableToolbar
            searchType="multi"
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onRadioChange={(value) => setRadioValue(value as "number" | "name")}
            radioValue={radioValue}
            onAddClick={() => alert("Добавить товар")}
            radioOptions={[
              { label: "По номеру", value: "number" },
              { label: "По названию", value: "name" },
            ]}
          />
        }
      />
    </>
  )
}