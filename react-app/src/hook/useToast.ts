import { useState } from 'react';

// 토스트 타입 정의
export type ToastType = 'success' | 'warning' | 'information';

// 토스트 상태 인터페이스
export interface ToastState {
  isShow: boolean;
  message: string;
  type: ToastType;
  duration: number;
}

// 모듈 레벨 변수들 (파일 스코프)
let toastState: ToastState = {
  isShow: false,
  message: '',
  type: 'success',
  duration: 3000,
};

// 전역 상태 업데이트 함수와 타이머 ID
let globalSetToast: ((state: ToastState) => void) | null = null;
let hideTimeoutId: ReturnType<typeof setTimeout> | null = null;

export function useToast() {
  // 컴포넌트에서 상태 업데이트를 위한 useState
  const [toast, setToast] = useState<ToastState>(toastState);

  // 마운트 시 글로벌 setter 설정 (첫 번째 컴포넌트가 마운트될 때만)
  if (!globalSetToast) {
    globalSetToast = setToast;
  }

  // 토스트 표시 함수
  const showToast = (
    message: string,
    type: ToastType = 'success',
    duration: number = 3000,
  ): void => {
    // 이전 타이머가 있다면 제거
    if (hideTimeoutId) {
      clearTimeout(hideTimeoutId);
      hideTimeoutId = null;
    }

    // 새로운 토스트 상태
    const newState: ToastState = {
      isShow: true,
      message,
      type,
      duration,
    };

    // 상태 업데이트 (전역 및 현재 컴포넌트)
    toastState = newState;
    if (globalSetToast) {
      globalSetToast(newState);
    }
    setToast(newState);

    // 지정된 시간 후 토스트 숨기기
    hideTimeoutId = setTimeout(() => {
      const hiddenState = { ...toastState, isShow: false };
      toastState = hiddenState;

      if (globalSetToast) {
        globalSetToast(hiddenState);
      }
      setToast(hiddenState);
    }, duration);
  };

  // 토스트 즉시 숨기기
  const hideToast = (): void => {
    const hiddenState = { ...toastState, isShow: false };
    toastState = hiddenState;

    if (globalSetToast) {
      globalSetToast(hiddenState);
    }
    setToast(hiddenState);

    if (hideTimeoutId) {
      clearTimeout(hideTimeoutId);
      hideTimeoutId = null;
    }
  };

  return { toast, showToast, hideToast };
}
