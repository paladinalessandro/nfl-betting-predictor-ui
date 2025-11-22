<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { NFL_TEAMS } from "$lib/types";
  import type { NFLTeam } from "$lib/types";

  let { selectedTeam = null, onSelect = (team: NFLTeam) => {} } = $props();
</script>

<div class="grid grid-cols-3 gap-3">
  {#each NFL_TEAMS as team (team.abbreviation)}
    <Button
      type="button"
      onclick={() => onSelect(team)}
      variant={selectedTeam?.abbreviation === team.abbreviation
        ? "default"
        : "outline"}
      class="flex h-auto flex-col items-center justify-center gap-2 p-4"
    >
      <img src={team.logo} alt={team.name} class="h-10 w-10 object-contain" />
      <span class="text-xs font-semibold">{team.abbreviation}</span>
    </Button>
  {/each}
</div>
