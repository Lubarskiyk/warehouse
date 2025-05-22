import { openModal } from "@/redax/togleModal/slice";
import { useAppDispatch } from "@/redax/reduxHooks";
import { useOffice } from "@/api/tanstackReactQuery/offices/queries";
import { Button } from "@/components/ui";
import { OFFICE_INPUT } from "@/components/Office/constant";
import { OfficeTable } from '@/components/Office/OfficeTable';

export default function OfficeContent() {
  const dispatch = useAppDispatch();

  const { data, isPending, error } = useOffice();
  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const columns = OFFICE_INPUT.filter((input) => input.id !== "address").map(
    (input) => ({
      accessorKey: input.id,
      header: input.title,
    }),
  );

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
