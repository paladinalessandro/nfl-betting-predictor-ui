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
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { AlertCircle, Loader2 } from "lucide-svelte";
  import TeamGrid from "$lib/components/TeamGrid.svelte";
  import PredictionResults from "$lib/components/PredictionResults.svelte";
  import { getBettingPrediction } from "$lib/api";
  import type { BettingPrediction, NFLTeam } from "$lib/types";

  let homeTeam: NFLTeam | null = $state(null);
  let awayTeam: NFLTeam | null = $state(null);
  let week: number = $state(1);
  let loading = $state(false);
  let error: string | null = $state(null);
  let prediction: BettingPrediction | null = $state(null);

  // Track the displayed match in results
  let displayedMatch = $state<{
    homeTeam: string;
    awayTeam: string;
    week: number;
  } | null>(null);

  const isFormValid = $derived(
    homeTeam !== null && awayTeam !== null && week >= 1 && week <= 18,
  );

  async function handleSubmit() {
    if (!isFormValid || !homeTeam || !awayTeam) return;

    if (homeTeam.name == awayTeam.name) {
      toast.error("Home team != Away Team!");
      return;
    }

    loading = true;
    error = null;
    prediction = null;

    try {
      const result = await getBettingPrediction(
        homeTeam.abbreviation,
        awayTeam.abbreviation,
        week,
      );

      prediction = result;
      displayedMatch = {
        homeTeam: homeTeam.name,
        awayTeam: awayTeam.name,
        week,
      };
    } catch (err) {
      error =
        err instanceof Error ? err.message : "An unexpected error occurred";
    } finally {
      loading = false;
    }
  }

  function handleHomeTeamSelect(team: NFLTeam) {
    homeTeam = team;
  }

  function handleAwayTeamSelect(team: NFLTeam) {
    awayTeam = team;
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
  <title>NFL Betting Predictor</title>
</svelte:head>

<Toaster />
<div class="min-h-screen bg-linear-to-b from-background to-secondary/10">
  <div class="container mx-auto py-8 px-4">
    <!-- Header -->
    <div class="mb-12 space-y-2">
      <h1 class="text-4xl font-bold tracking-tight">NFL Betting Predictor</h1>
      <p class="text-lg text-muted-foreground">
        Get AI up-to-date predictions for NFL matchups
      </p>
    </div>

    <!-- Input Form -->
    <Card class="mb-8">
      <CardHeader>
        <CardTitle>Select Match Details</CardTitle>
        <CardDescription
          >Choose two teams and the week to get a prediction</CardDescription
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
          <div class="flex gap-8">
            <!-- Home Team Grid -->
            <div class="w-1/2 space-y-3">
              <Label>Home Team</Label>
              <TeamGrid
                selectedTeam={homeTeam}
                onSelect={handleHomeTeamSelect}
              />
            </div>

            <!-- Away Team Grid -->
            <div class="w-1/2 space-y-3">
              <Label>Away Team</Label>
              <TeamGrid
                selectedTeam={awayTeam}
                onSelect={handleAwayTeamSelect}
              />
            </div>
          </div>

          <!-- Week Input -->
          <div class="space-y-2">
            <Label for="week">Week of Season</Label>
            <Input
              id="week"
              type="number"
              min="1"
              max="18"
              bind:value={week}
              placeholder="Enter week (1-18)"
            />
          </div>

          <!-- Error Message -->
          {#if error}
            <div
              class="flex items-center gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive"
            >
              <AlertCircle class="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          {/if}

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
      <PredictionResults
        homeTeam={displayedMatch.homeTeam}
        awayTeam={displayedMatch.awayTeam}
        week={displayedMatch.week}
        {prediction}
      />
    {/if}
  </div>
</div>

<style>
  :global(body) {
    @apply scroll-smooth;
  }
</style>
