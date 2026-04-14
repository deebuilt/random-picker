import { usePicker } from "@/hooks/usePicker";
import { usePresets } from "@/hooks/usePresets";
import { ItemInput } from "@/components/ItemInput";
import { PickerControls } from "@/components/PickerControls";
import { ResultCard } from "@/components/ResultCard";
import { PickHistory } from "@/components/PickHistory";
import { PresetManager } from "@/components/PresetManager";
import { Dices } from "lucide-react";

const Index = () => {
  const picker = usePicker();
  const presetStore = usePresets();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-center gap-2 pt-6 pb-2">
        <Dices className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold text-foreground">Random Picker</h1>
      </header>

      <main className="flex-1 w-full max-w-lg mx-auto px-4 pb-8 space-y-6">
        {/* Result — center stage */}
        <section className="pt-2">
          <ResultCard
            displayText={picker.displayText}
            isAnimating={picker.isAnimating}
            result={picker.result}
          />
        </section>

        {/* Controls */}
        <section>
          <PickerControls
            pick={picker.pick}
            isAnimating={picker.isAnimating}
            canPick={picker.availableItems.length > 0}
            noRepeats={picker.noRepeats}
            setNoRepeats={picker.setNoRepeats}
            hasRemoved={picker.removed.length > 0}
            resetPicks={picker.resetPicks}
          />
        </section>

        {/* History */}
        <section>
          <PickHistory history={picker.history} />
        </section>

        {/* Input + Presets */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <PresetManager
              presets={presetStore.presets}
              save={presetStore.save}
              remove={presetStore.remove}
              currentItems={picker.rawText}
              loadItems={picker.setRawText}
              hasItems={picker.entryCount > 0}
            />
          </div>
          <ItemInput
            rawText={picker.rawText}
            setRawText={picker.setRawText}
            entryCount={picker.entryCount}
            clearList={picker.clearList}
            loadDemo={picker.loadDemo}
          />
        </section>
      </main>
    </div>
  );
};

export default Index;
