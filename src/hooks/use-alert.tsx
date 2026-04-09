import { useState, useCallback } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

type AlertVariant = "default" | "destructive";

interface AlertState {
  message: string;
  title?: string;
  variant: AlertVariant;
  visible: boolean;
}

export function useAlert() {
  const [state, setState] = useState<AlertState>({
    message: "",
    title: "",
    variant: "default",
    visible: false,
  });

  const show = useCallback((options: Omit<AlertState, "visible">) => {
    setState({ ...options, visible: true });
  }, []);

  const showError = useCallback((message: string, title: string = "Error") => {
    show({ message, title, variant: "destructive" });
  }, [show]);

  const showSuccess = useCallback((message: string, title: string = "Success") => {
    show({ message, title, variant: "default" });
  }, [show]);

  const hide = useCallback(() => {
    setState((prev) => ({ ...prev, visible: false }));
  }, []);

  const AlertComponent = useCallback(({ className }: { className?: string }) => {
    if (!state.visible) return null;

    const Icon = state.variant === "destructive" ? AlertCircleIcon : CheckCircle2Icon;

    return (
      <Alert variant={state.variant} className={cn(className)}>
        <Icon className="h-4 w-4" />
        {state.title && <AlertTitle>{state.title}</AlertTitle>}
        <AlertDescription>{state.message}</AlertDescription>
      </Alert>
    );
  }, [state]);

  return {
    show,
    showError,
    showSuccess,
    hide,
    AlertComponent,
    visible: state.visible,
    state,
  };
}
