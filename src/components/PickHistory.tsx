import { Clock } from "lucide-react";

interface Props {
  history: string[];
}

export function PickHistory({ history }: Props) {
  if (history.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        <span>Recent picks</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`px-3 py-1 rounded-full text-sm border border-border/50 ${
              i === 0 ? "bg-primary/10 text-primary" : "bg-muted/50 text-muted-foreground"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
