export interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  type: 'default' | 'outline';
  width: string;
  height: string;
}
