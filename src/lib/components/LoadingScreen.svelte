<script lang="ts">
let { status = null } = $props();

let currentLoadingMessage = $state(0);

const loadingMessages = [
  "🎲 Aligning the planets...",
  "🔮 Consulting the betting gods...",
  "⚡ Charging the quantum processors...",
  "🏈 Analyzing tackle strategies...",
  "📊 Crunching the stats matrix...",
  "🤖 Downloading more RAM...",
  "🎯 Calibrating prediction algorithms...",
  "💫 Summoning the data spirits...",
  "🌟 Synchronizing with the Matrix...",
  "🚀 Launching prediction rockets...",
  "🧠 Engaging mega-brain mode...",
  "⚙️ Fine-tuning the neural networks...",
  "🎪 Entertaining the prediction circus...",
  "🌊 Riding the data waves...",
  "⭐ Polishing the crystal ball...",
];

$effect(() => {
  const interval = setInterval(() => {
    currentLoadingMessage =
      (currentLoadingMessage + 1) % loadingMessages.length;
  }, 1200);

  return () => clearInterval(interval);
});
</script>

<div
  class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
>
  <div
    class="bg-card border border-border rounded-lg shadow-lg p-8 max-w-md w-full mx-4 animate-fade-in"
  >
    <!-- Loading Spinner -->
    <div class="flex justify-center mb-6">
      <div class="relative w-16 h-16">
        <div
          class="absolute inset-0 rounded-full border-4 border-primary/20"
        ></div>
        <div
          class="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"
        ></div>
      </div>
    </div>

    <!-- Loading Message -->
    <div class="text-center space-y-4">
      <p class="text-xl font-bold text-foreground">
        {loadingMessages[currentLoadingMessage]}
      </p>
      <p class="text-sm text-muted-foreground">
        This is taking longer than usual, but we're working on it!
      </p>

      <!-- Status Message -->
      {#if status}
        <div
          class="text-xs text-muted-foreground italic mt-3 p-3 bg-secondary/50 rounded"
        >
          <p class="font-semibold capitalize">{status.status}</p>
          {#if status.message}
            <p class="mt-1">{status.message}</p>
          {/if}
        </div>
      {/if}

      <!-- Progress Bar -->
      <div class="w-full bg-secondary rounded-full h-2 overflow-hidden mt-6">
        <div
          class="bg-gradient-to-r from-primary to-primary/50 h-full animate-pulse"
          style="width: {status?.progress
            ? Math.min(status.progress, 95)
            : ((currentLoadingMessage + 1) / loadingMessages.length) * 100}%"
        ></div>
      </div>

      <!-- Loading Tips -->
      <div class="text-xs text-muted-foreground mt-6 space-y-1">
        <p>
          💡 Did you know? NFL quarterbacks average 40 pass attempts per game
        </p>
      </div>
    </div>
  </div>
</div>
