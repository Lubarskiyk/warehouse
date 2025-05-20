import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/redax/reduxHooks';
import { selectIsOfficeModal} from '@/redax/togleModal/selectors';
import { closeModal } from '@/redax/togleModal/slice';

import OfficeForm from '@/components/Office/OfficeForm';

export default function OfficeModal() {
  const isOfficeModal = useAppSelector(selectIsOfficeModal);
  const dispatch = useAppDispatch();

  return (
    <Dialog
      open={isOfficeModal}
      onOpenChange={() => dispatch(closeModal("isOfficeModal"))}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Додати Офіс</DialogTitle>
        </DialogHeader>
        <OfficeForm/>
      </DialogContent>
    </Dialog>
  )
}
