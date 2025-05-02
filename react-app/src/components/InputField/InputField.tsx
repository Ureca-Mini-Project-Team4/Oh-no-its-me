import { InputFieldProps } from './InputField.types';

const InputField: React.FC<InputFieldProps> = ({ type, label, value, onChange, placeholder }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center w-full max-w-md m-4">
      <label className="font-md sm:text-base text-gray-700 font-pr sm:w-32">{label}</label>
      <input
        className="w-full px-3 py-2 sm:px-4 sm:py-2 rounded-md border border-gray-300 bg-gray-100 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                   text-sm sm:text-base"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
