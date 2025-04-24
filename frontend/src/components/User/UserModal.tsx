import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/redax/reduxHooks';
import { selectIsUserModal } from '@/redax/togleModal/selectors';
import { closeModal } from '@/redax/togleModal/slice';
import UserForm from '@/components/User/UserForm';

export default function UserModal() {
  const isUserModal = useAppSelector(selectIsUserModal);
  const dispatch = useAppDispatch();

  return (
    <Dialog
      open={isUserModal}
      onOpenChange={() => dispatch(closeModal("isUserModal"))}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>UserForm</DialogTitle>
          <DialogDescription>
            UserForm
          </DialogDescription>
        </DialogHeader>
        <UserForm/>
      </DialogContent>
    </Dialog>
  )
}
