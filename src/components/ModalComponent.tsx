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
      <DialogContent className="max-w-4xl p-8 rounded-2xl">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        <main>{children}</main>
      </DialogContent>
    </Dialog>
  );
}
