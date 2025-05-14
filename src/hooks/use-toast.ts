
import { useState, useEffect, useRef } from "react";
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
  duration?: number;
};

type Toast = {
  id: string;
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

type UseToastResult = {
  toast: (props: ToastProps) => void;
  toasts: Toast[];
  dismiss: (id: string) => void;
};

const useToast = (): UseToastResult => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idCounter = useRef(0);

  const toast = ({ title, description, action, variant = "default", duration = 5000 }: ToastProps) => {
    const id = `toast-${idCounter.current++}`;
    const newToast = { id, title, description, action, variant };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Use sonner toast as well
    sonnerToast(title || "", {
      description,
      duration,
    });

    if (duration > 0) {
      setTimeout(() => {
        dismiss(id);
      }, duration);
    }

    return id;
  };

  const dismiss = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return { toast, toasts, dismiss };
};

export { useToast, type Toast, type ToastProps };

// For standalone usage without hooks
const toastStore: {
  toasts: Toast[];
  listeners: ((toasts: Toast[]) => void)[];
} = {
  toasts: [],
  listeners: [],
};

const toast = ({ title, description, action, variant = "default" }: ToastProps) => {
  const id = `toast-${Math.random().toString(36).substring(2, 9)}`;
  const newToast = { id, title, description, action, variant };

  toastStore.toasts = [...toastStore.toasts, newToast];
  toastStore.listeners.forEach((listener) => listener(toastStore.toasts));

  // Use sonner toast as well
  sonnerToast(title || "", {
    description,
    duration: 5000,
  });

  return id;
};

export { toast };
