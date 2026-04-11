import { Chip } from "./ui/Chip";

interface CompletionBadgeProps {
  completed?: boolean;
  isRestDay?: boolean;
}

export function CompletionBadge({ completed, isRestDay }: CompletionBadgeProps) {
  if (isRestDay) {
    return <Chip label="Rest" />;
  }

  if (completed) {
    return <Chip label="Completed" tone="selected" />;
  }

  return <Chip label="Planned" />;
}
