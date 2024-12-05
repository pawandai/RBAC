"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/use-modal";
import { PropsWithChildren } from "react";

const CardModal = ({ children }: PropsWithChildren) => {
  const { isOpen, onClose } = useCardModal();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
