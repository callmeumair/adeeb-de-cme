import toast from 'react-hot-toast';

const baseStyle = {
  background: '#1a1a1a',
  color: '#f8f4ed',
  border: '1px solid rgba(201, 168, 76, 0.2)',
  fontFamily: 'var(--font-body)',
  fontSize: '13px',
  letterSpacing: '0.05em',
  padding: '14px 20px',
};

export function toastSuccess(message: string) {
  return toast.success(message, {
    style: {
      ...baseStyle,
      borderColor: 'rgba(201, 168, 76, 0.4)',
    },
    iconTheme: {
      primary: '#c9a84c',
      secondary: '#0a0a0a',
    },
  });
}

export function toastError(message: string) {
  return toast.error(message, {
    style: {
      ...baseStyle,
      borderColor: 'rgba(220, 38, 38, 0.4)',
    },
    iconTheme: {
      primary: '#dc2626',
      secondary: '#f8f4ed',
    },
  });
}

export function toastLoading(message: string) {
  return toast.loading(message, {
    style: baseStyle,
  });
}

export function toastDismiss(toastId?: string) {
  toast.dismiss(toastId);
}

export { toast };
