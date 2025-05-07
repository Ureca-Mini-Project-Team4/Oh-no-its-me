import React from 'react';
import { useToast, ToastType } from '@/hook/useToast'; // 경로 수정

export default function Toast(): React.ReactElement | null {
  const { toast, hideToast } = useToast();

  // 토스트가 보이지 않을 때는 렌더링하지 않음
  if (!toast.isShow) return null;

  // 타입에 따른 스타일 클래스 설정
  let borderColor = '';

  switch (toast.type) {
    case 'success':
      borderColor = 'border-l-4 border-success';
      break;
    case 'warning':
      borderColor = 'border-l-4 border-warning';
      break;
    case 'information':
      borderColor = 'border-l-4 border-info';
      break;
    default:
      borderColor = 'border-l-4 border-gray-400';
  }

  // 아이콘 경로 결정
  const getIconPath = (type: ToastType): string => {
    switch (type) {
      case 'success':
        return '/assets/icons/check.svg';
      case 'warning':
        return '/assets/icons/warning.svg';
      case 'information':
        return '/assets/icons/info.svg';
      default:
        return '/assets/icons/info.svg';
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`flex items-center shadow-lg px-6 py-4 bg-white rounded ${borderColor}`}
        onClick={hideToast}
      >
        <img src={getIconPath(toast.type)} alt={toast.type} width="24" height="24" />
        <span className="ml-3 font-pm text-gray-800">{toast.message}</span>
      </div>
    </div>
  );
}
