export interface ModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onConfirm: () => void;
  text1?: string;
  text2?: string;
}
