import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Sparkles } from "lucide-react";

interface Props {
  rawText: string;
  setRawText: (t: string) => void;
  entryCount: number;
  clearList: () => void;
  loadDemo: () => void;
}

export function ItemInput({ rawText, setRawText, entryCount, clearList, loadDemo }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Items</span>
          {entryCount > 0 && (
            <Badge variant="secondary" className="text-xs">{entryCount}</Badge>
          )}
        </div>
        <div className="flex gap-2">
          {entryCount === 0 && (
            <Button variant="ghost" size="sm" onClick={loadDemo} className="h-9 text-xs gap-1">
              <Sparkles className="h-3.5 w-3.5" /> Try Demo
            </Button>
          )}
          {entryCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearList} className="h-9 text-xs gap-1 text-muted-foreground">
              <Trash2 className="h-3.5 w-3.5" /> Clear
            </Button>
          )}
        </div>
      </div>
      <Textarea
        value={rawText}
        onChange={e => setRawText(e.target.value)}
        placeholder={"Enter items, one per line:\nAlex\nJordan\nTaylor"}
        className="min-h-[120px] bg-muted/50 border-border/50 text-sm resize-none"
        rows={5}
      />
    </div>
  );
}
