export interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  type?: 'default' | 'outline';
  size?: 'full' | 'lg' | 'sm';
}
