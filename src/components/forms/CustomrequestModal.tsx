"use client";

import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { RequestFormFields } from "./CustomRequestForm";
import { useRequestStore } from "@/store/requestStore";

export function RequestFormDialog() {
  const { isModalOpen, openModal, closeModal } = useRequestStore();

  return (
    <Dialog.Root
      lazyMount
      open={isModalOpen}
      onOpenChange={(e) => {
        if (e.open) {
          openModal();
        } else {
          closeModal();
        }
      }}
    >
      <Portal>
        <Dialog.Backdrop bg="rgba(0, 0, 0, 0.4)" backdropFilter="blur(6px)" />

        <Dialog.Positioner>
          <Dialog.Content maxW="xl" bg="white" rounded="lg" p={6} boxShadow="lg">
            <Dialog.Header>
              <Dialog.Title textAlign="center" fontSize="xl" fontWeight="bold">
                Post a Request
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body mt={4}>
              <RequestFormFields onSuccess={closeModal} />
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" position="absolute" top={3} right={3} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
