import { useNavigate } from "react-router-dom";
import { usePicker } from "@/hooks/usePicker";
import { usePresets } from "@/hooks/usePresets";
import { ItemInput } from "@/components/ItemInput";
import { PickerControls } from "@/components/PickerControls";
import { ResultCard } from "@/components/ResultCard";
import { PickHistory } from "@/components/PickHistory";
import { PresetManager } from "@/components/PresetManager";
import { OpsetteHeader } from "@/components/opsette-header";

const Index = () => {
  const navigate = useNavigate();
  const picker = usePicker();
  const presetStore = usePresets();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <OpsetteHeader />

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

        <div className="flex justify-center gap-4 pt-2 text-xs text-muted-foreground">
          <button onClick={() => navigate('/about')} className="hover:text-foreground transition-colors">
            About
          </button>
          <span>·</span>
          <button onClick={() => navigate('/privacy')} className="hover:text-foreground transition-colors">
            Privacy
          </button>
          <span>·</span>
          <span>
            By{' '}
            <a href="https://opsette.io" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">
              Opsette
            </a>
          </span>
        </div>
      </main>
    </div>
  );
};

export default Index;
