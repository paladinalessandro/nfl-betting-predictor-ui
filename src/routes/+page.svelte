<script lang="ts">
import { Button } from "$lib/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "$lib/components/ui/card";
import toast, { Toaster } from "svelte-5-french-toast";
import { Label } from "$lib/components/ui/label";
import { Loader2 } from "lucide-svelte";
import MatchList from "$lib/components/MatchList.svelte";
import PredictionResults from "$lib/components/PredictionResults.svelte";
import LoadingScreen from "$lib/components/LoadingScreen.svelte";
import { getBettingPrediction } from "$lib/api";
import type { BettingPrediction, NFLMatch } from "$lib/types";
import type { StatusResponse } from "$lib/api";

let selectedMatch: NFLMatch | null = $state(null);
let loading = $state(false);
let prediction: BettingPrediction | null = $state(null);
let resultsElement: HTMLElement | undefined = $state(undefined);
let currentStatus: StatusResponse | null = $state(null);

// Track the displayed match in results
let displayedMatch = $state<{
  homeTeam: string;
  awayTeam: string;
  week: number;
} | null>(null);

const isFormValid = $derived(selectedMatch !== null);

async function handleSubmit() {
  if (!isFormValid || !selectedMatch) return;

  loading = true;
  prediction = null;
  currentStatus = null;

  try {
    const result = await getBettingPrediction(
      selectedMatch.homeTeam.name,
      selectedMatch.awayTeam.name,
      selectedMatch.week
    );

    prediction = result;
    displayedMatch = {
      homeTeam: selectedMatch.homeTeam.name,
      awayTeam: selectedMatch.awayTeam.name,
      week: selectedMatch.week,
    };

    // Scroll to results smoothly after DOM update
    requestAnimationFrame(() => {
      resultsElement?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  } catch (err) {
    toast.error("Not available currently!");
  } finally {
    loading = false;
    currentStatus = null;
  }
}

function handleMatchSelect(match: NFLMatch) {
  selectedMatch = match;
}

// Features data
const features = [
  {
    icon: "📊",
    title: "Data-Driven Predictions",
    description:
      "Calibrate your bets with data and dynamically generated graphs using E2B sanboxes",
  },
  {
    icon: "⚡",
    title: "Up-to-Date Insights",
    description:
      "Real-time insights helping your decisions, powered by Brave browser MCP server.",
  },
  {
    icon: "⚠️",
    title: "Not Betting Advice",
    description: "This is informational content for analytical purposes only",
  },
];
</script>

<svelte:head>
  <title>BetMCP</title>
</svelte:head>

<Toaster />
<div class="min-h-screen bg-linear-to-b from-background to-secondary/10">
  <div class="container mx-auto py-8 px-4">
    <!-- Header -->
    <div class="mb-12 space-y-2">
      <h1 class="text-4xl font-bold tracking-tight">
        BetMCP - Your NFL Betting Predictor
      </h1>
      <p class="text-lg text-muted-foreground">
        Get AI up-to-date predictions for NFL matchups
      </p>
    </div>

    <!-- Input Form -->
    <Card class="mb-8">
      <CardHeader>
        <CardTitle>Select a Match</CardTitle>
        <CardDescription
          >Choose an upcoming NFL matchup to get a prediction</CardDescription
        >
      </CardHeader>
      <CardContent>
        <form
          onsubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          class="space-y-8"
        >
          <!-- Match List -->
          <div class="space-y-3">
            <Label>Upcoming Matches</Label>
            <MatchList {selectedMatch} onSelect={handleMatchSelect} />
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            disabled={!isFormValid || loading}
            class="w-full"
            size="lg"
          >
            {#if loading}
              <Loader2 class="mr-2 h-4 w-4 animate-spin" />
              Getting Prediction...
            {:else}
              Get Prediction
            {/if}
          </Button>
        </form>
      </CardContent>
    </Card>

    <!-- Features Section -->
    <div class="mb-12 grid gap-6 md:grid-cols-3">
      {#each features as feature (feature.title)}
        <Card class="border-border hover:shadow-md transition-shadow">
          <CardContent class="pt-6">
            <div class="text-4xl mb-4">{feature.icon}</div>
            <h3 class="font-semibold text-lg mb-2">{feature.title}</h3>
            <p class="text-sm text-muted-foreground">{feature.description}</p>
          </CardContent>
        </Card>
      {/each}
    </div>

    <!-- Results -->
    {#if prediction && displayedMatch}
      <div bind:this={resultsElement}>
        <PredictionResults
          homeTeam={displayedMatch.homeTeam}
          awayTeam={displayedMatch.awayTeam}
          week={displayedMatch.week}
          {prediction}
        />
      </div>
    {/if}
  </div>
</div>

<!-- Loading Screen -->
{#if loading}
  <LoadingScreen status={currentStatus} />
{/if}

<style>
:global(body) {
  @apply scroll-smooth;
}
</style>
