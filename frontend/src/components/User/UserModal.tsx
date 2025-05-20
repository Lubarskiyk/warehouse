import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import { useAppDispatch, useAppSelector } from '@/redax/reduxHooks';
import { selectIsUserModal } from '@/redax/togleModal/selectors';
import { closeModal } from '@/redax/togleModal/slice';
import { UserForm } from '@/components/User/UserForm';


export default function UserModal() {
  const isUserModal = useAppSelector(selectIsUserModal);
  const dispatch = useAppDispatch();

  return (
    <Dialog
      open={isUserModal}
      onOpenChange={() => dispatch(closeModal("isUserModal"))}
    >
      <DialogContent className='sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Додати користувача</DialogTitle>
        </DialogHeader>
        <UserForm/>
      </DialogContent>
    </Dialog>
  )
}
