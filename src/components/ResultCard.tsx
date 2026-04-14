interface Props {
  displayText: string | null;
  isAnimating: boolean;
  result: string | null;
}

export function ResultCard({ displayText, isAnimating, result }: Props) {
  const showText = displayText || result;

  if (!showText) {
    return (
      <div className="flex items-center justify-center min-h-[160px] rounded-2xl border border-border/30 bg-card/50">
        <p className="text-muted-foreground text-sm">Your pick will appear here</p>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center min-h-[160px] rounded-2xl border transition-all duration-300 ${
        isAnimating
          ? "border-primary/30 bg-card animate-shuffle"
          : "border-primary/50 bg-card spotlight-glow"
      }`}
    >
      <p
        className={`text-center px-6 py-8 font-bold transition-all duration-300 ${
          isAnimating
            ? "text-2xl text-foreground/70"
            : "text-4xl md:text-5xl text-foreground animate-scale-in"
        }`}
      >
        {showText}
      </p>
    </div>
  );
}
