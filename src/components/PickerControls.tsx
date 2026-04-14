import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Shuffle, RotateCcw } from "lucide-react";

interface Props {
  pick: () => void;
  isAnimating: boolean;
  canPick: boolean;
  noRepeats: boolean;
  setNoRepeats: (v: boolean) => void;
  hasRemoved: boolean;
  resetPicks: () => void;
}

export function PickerControls({ pick, isAnimating, canPick, noRepeats, setNoRepeats, hasRemoved, resetPicks }: Props) {
  return (
    <div className="space-y-4">
      <Button
        onClick={pick}
        disabled={!canPick || isAnimating}
        className="w-full h-14 text-lg font-bold gap-2 rounded-xl"
        size="lg"
      >
        <Shuffle className="h-5 w-5" />
        {isAnimating ? "Picking..." : "Pick Random"}
      </Button>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Switch
            id="no-repeats"
            checked={noRepeats}
            onCheckedChange={setNoRepeats}
          />
          <Label htmlFor="no-repeats" className="text-sm text-muted-foreground cursor-pointer">
            No Repeats
          </Label>
        </div>

        {hasRemoved && (
          <Button variant="ghost" size="sm" onClick={resetPicks} className="h-9 text-xs gap-1 text-muted-foreground">
            <RotateCcw className="h-3.5 w-3.5" /> Reset Picks
          </Button>
        )}
      </div>
    </div>
  );
}
