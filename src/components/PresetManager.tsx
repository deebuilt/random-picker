import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Bookmark, ChevronDown, Save, Trash2 } from "lucide-react";
import type { Preset } from "@/hooks/usePresets";

interface Props {
  presets: Preset[];
  save: (name: string, items: string) => void;
  remove: (name: string) => void;
  currentItems: string;
  loadItems: (items: string) => void;
  hasItems: boolean;
}

export function PresetManager({ presets, save, remove, currentItems, loadItems, hasItems }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [presetName, setPresetName] = useState("");

  const handleSave = () => {
    if (!presetName.trim()) return;
    save(presetName.trim(), currentItems);
    setPresetName("");
    setDialogOpen(false);
  };

  return (
    <>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 text-xs gap-1">
              <Bookmark className="h-3.5 w-3.5" />
              Presets
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {presets.length === 0 ? (
              <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                No saved presets
              </DropdownMenuLabel>
            ) : (
              <>
                <DropdownMenuLabel className="text-xs">Load preset</DropdownMenuLabel>
                {presets.map(p => (
                  <DropdownMenuItem key={p.name} className="flex justify-between group">
                    <span onClick={() => loadItems(p.items)} className="flex-1 cursor-pointer">
                      {p.name}
                    </span>
                    <Trash2
                      className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 cursor-pointer hover:text-destructive"
                      onClick={(e) => { e.stopPropagation(); remove(p.name); }}
                    />
                  </DropdownMenuItem>
                ))}
              </>
            )}
            {hasItems && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setDialogOpen(true)} className="gap-1.5">
                  <Save className="h-3.5 w-3.5" /> Save current list
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Save Preset</DialogTitle>
          </DialogHeader>
          <Input
            value={presetName}
            onChange={e => setPresetName(e.target.value)}
            placeholder="e.g. Team A"
            onKeyDown={e => e.key === "Enter" && handleSave()}
            autoFocus
          />
          <DialogFooter>
            <Button onClick={handleSave} disabled={!presetName.trim()} size="sm">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
