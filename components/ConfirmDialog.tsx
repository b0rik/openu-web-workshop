import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type ConfirmDialogType = {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  cancelText?: string;
  continueText?: string;
  onAction?: () => void;
  onCancel?: () => void;
};

export const ConfirmDialog = ({
  trigger,
  title,
  cancelText = 'Cancel',
  continueText = 'Continue',
  description,
  onAction = () => {},
  onCancel = () => {},
}: ConfirmDialogType) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>
            {continueText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
