import { DataTable } from "@/components/data-table/data-table";

export default function Users() {

  const data = [
    { id: 1, name: 'Иван Иванов', email: 'ivan@example.com', age: 28 },
    { id: 2, name: 'Мария Петрова', email: 'maria@example.com', age: 34 },
    { id: 3, name: 'Алексей Сидоров', email: 'alex@example.com', age: 22 },
    { id: 4, name: 'Елена Кузнецова', email: 'elena@example.com', age: 29 },
    { id: 5, name: 'Дмитрий Новиков', email: 'dmitry@example.com', age: 40 },
  ];

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Имя',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'age',
      header: 'Возраст',
    },
  ];
  return (
    <>
      <h1>Users</h1>
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
}
