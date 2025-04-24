import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/redax/reduxHooks";
import { selectIsProductModal} from '@/redax/togleModal/selectors';
import { closeModal } from "@/redax/togleModal/slice";
import ProductForm from "@/components/Product/ProductForm";

export default function ProductModal() {
  const isProductModal = useAppSelector(selectIsProductModal);
  const dispatch = useAppDispatch();

  return (
    <Dialog
      open={isProductModal}
      onOpenChange={() => dispatch(closeModal("isProductModal"))}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ProductForm</DialogTitle>
          <DialogDescription>
            ProductForm
          </DialogDescription>
        </DialogHeader>
        <ProductForm />
      </DialogContent>
    </Dialog>
  );
}
