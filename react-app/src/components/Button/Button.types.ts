export interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  type: 'default' | 'outline';
  size?: 'lg' | 'sm';
  width?: string;
  height?: string;
  borderRadius?: string;
}
