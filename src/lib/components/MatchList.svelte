<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { UPCOMING_MATCHES } from "$lib/types";
  import type { NFLMatch } from "$lib/types";

  let { selectedMatch = null, onSelect = (match: NFLMatch) => {} } = $props();
</script>

<div class="space-y-3">
  {#each UPCOMING_MATCHES as match (match.id)}
    <Button
      type="button"
      onclick={() => onSelect(match)}
      variant={selectedMatch?.id === match.id ? "default" : "outline"}
      class={`w-full flex items-center justify-between gap-4 p-4 h-auto transition-colors ${
        selectedMatch?.id === match.id
          ? "bg-blue-100 hover:bg-blue-200 text-blue-900 border-blue-300"
          : ""
      }`}
    >
      <div class="flex items-center gap-3 flex-1">
        <img
          src={match.awayTeam.logo}
          alt={match.awayTeam.name}
          class="h-8 w-8 object-contain"
        />
        <span class="text-xs font-semibold">{match.awayTeam.abbreviation}</span>
      </div>

      <div class="text-center flex-1">
        <div class="text-xs font-bold">@</div>
      </div>

      <div class="flex items-center gap-3 flex-1 justify-end">
        <span class="text-xs font-semibold">{match.homeTeam.abbreviation}</span>
        <img
          src={match.homeTeam.logo}
          alt={match.homeTeam.name}
          class="h-8 w-8 object-contain"
        />
      </div>

      <div class="text-right flex-1 min-w-max">
        <div class="text-xs font-semibold">{match.date}</div>
        <div class="text-xs text-muted-foreground">{match.time}</div>
      </div>
    </Button>
  {/each}
</div>
