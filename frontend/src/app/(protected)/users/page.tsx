"use client"

import UserTable from '@/components/user/UserTable';

export default function Users() {

  const data = [
    { id: 1, name: 'Иван Иванов', email: 'ivan@example.com', age: 28,blok: 1 },
    { id: 2, name: 'Мария Петрова', email: 'maria@example.com', age: 34,blok: 1 },
    { id: 3, name: 'Алексей Сидоров', email: 'alex@example.com', age: 22,blok: 1 },
    { id: 4, name: 'Елена Кузнецова', email: 'elena@example.com', age: 29,blok: 1 },
    { id: 5, name: 'Дмитрий Новиков', email: 'dmitry@example.com', age: 40, blok: 1 },
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
    {
      accessorKey: 'blok',
      header: 'blok',
    },

  ];
  return (
    <>
         <UserTable/>
    </>
  );
}
