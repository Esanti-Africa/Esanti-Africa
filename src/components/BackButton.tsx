import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface BackButtonProps {
  onBack: () => void;
  canGoBack: boolean;
}

export function BackButton({ onBack, canGoBack }: BackButtonProps) {
  if (!canGoBack) return null;

  return (
    <Button
      variant="ghost"
      onClick={onBack}
      className="mb-4 hover:bg-gray-100"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </Button>
  );
}
