import { openModal } from "@/redax/togleModal/slice";
import { useAppDispatch } from "@/redax/reduxHooks";
import { useOffices } from "@/api/tanstackReactQuery/offices/queries";
import { Button } from "@/components/ui";
import { OFFICE_INPUT } from "@/components/Office/constant";
import { OfficeTable } from "@/components/Office/OfficeTable";
import { Pencil, Trash2 } from "lucide-react";

export default function OfficeContent() {
  const dispatch = useAppDispatch();

  const { data, isPending, error } = useOffices();
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const columns = [
    ...OFFICE_INPUT.filter((input) => input.id !== "address").map((input) => ({
      accessorKey: input.id,
      header: input.title,
    })),
    {
      id: "actions",
      header: "Дії",
      cell: ({ row }: any) => {
        const office = row.original;

        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log("Edit", office)}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => console.log("Delete", office)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <h1>Офіси</h1>
      <Button onClick={() => dispatch(openModal("isOfficeModal"))}>
        Додати Офіс
      </Button>
      <OfficeTable columns={columns} data={data.data} />
    </>
  );
}
