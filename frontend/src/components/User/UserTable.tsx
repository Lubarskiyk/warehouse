
import { useState } from "react"
import { DataTable } from '@/components/DataTable/DataTable';
import { TableToolbar } from '@/components/DataTable/TableToolbar';



export default function UserTable() {
  const data = [
    { id: 1, name: 'Иван Иванов', email: 'ivan@example.com', age: 28, blok: 1 },
    { id: 2, name: 'Мария Петрова', email: 'maria@example.com', age: 34, blok: 1 },

  ]

  const columns = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Имя' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'age', header: 'Возраст' },
    { accessorKey: 'blok', header: 'blok' },
  ]

  const [searchValue, setSearchValue] = useState("")

  const filteredUsers = data.filter((user) =>
    user.name.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <>
      <h1>Пользователи</h1>
      <DataTable
        columns={columns}
        data={filteredUsers}
        searchKey="name"
        search={
          <TableToolbar
            searchType="name"
            searchValue={searchValue}
            onSearchChange={(e) => setSearchValue(e)}
            onAddClick={() => alert("Добавить пользователя")}
          />
        }
      />
    </>
  )
}