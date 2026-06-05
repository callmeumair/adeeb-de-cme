'use client';

import toast, { type ToastOptions } from 'react-hot-toast';

const defaultOptions: ToastOptions = {
  duration: 3000,
  style: {
    background: '#1a1a1a',
    color: '#f8f4ed',
    border: '1px solid #333',
    fontFamily: "'Josefin Sans', sans-serif",
    fontSize: '13px',
    letterSpacing: '0.05em',
    borderRadius: '0',
    padding: '14px 20px',
  },
};

export function useToast() {
  function success(message: string): void {
    toast.success(message, {
      ...defaultOptions,
      iconTheme: {
        primary: '#c9a84c',
        secondary: '#0a0a0a',
      },
    });
  }

  function error(message: string): void {
    toast.error(message, {
      ...defaultOptions,
      iconTheme: {
        primary: '#ef4444',
        secondary: '#0a0a0a',
      },
    });
  }

  function info(message: string): void {
    toast(message, {
      ...defaultOptions,
      icon: '✦',
    });
  }

  function loading(message: string): string {
    return toast.loading(message, {
      ...defaultOptions,
    });
  }

  function dismiss(toastId?: string): void {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  }

  function promise<T>(
    promiseFn: Promise<T>,
    messages: { loading: string; success: string; error: string }
  ): Promise<T> {
    return toast.promise(promiseFn, messages, {
      ...defaultOptions,
      iconTheme: {
        primary: '#c9a84c',
        secondary: '#0a0a0a',
      },
    });
  }

  return {
    success,
    error,
    info,
    loading,
    dismiss,
    promise,
  };
}
