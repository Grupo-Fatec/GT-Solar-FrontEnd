import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription
} from "./ui/dialog";
import { ReactNode } from "react";

interface ModalComponentProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  isOpen: boolean;
  close: () => void;
}

export function ModalComponent({
  children,
  title,
  subtitle,
  isOpen,
  close,
}: ModalComponentProps) {
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-4xl p-8 rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex justify-between items-center">
        </DialogHeader>
        <main className="mt-4">{children}</main>
      </DialogContent>
    </Dialog>
  );
}