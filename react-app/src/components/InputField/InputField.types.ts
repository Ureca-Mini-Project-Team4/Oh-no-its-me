export type InputType = 'text' | 'password';

export interface InputFieldProps {
  type: InputType;
  label: string;
  value: string;
  onChange: () => void;
  placeholder: string;
}
