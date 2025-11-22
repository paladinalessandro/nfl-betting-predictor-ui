<script lang="ts">
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";
  import { marked } from "marked";
  import type { BettingPrediction } from "$lib/types";

  interface Props {
    homeTeam: string;
    awayTeam: string;
    week: number;
    prediction: BettingPrediction;
  }

  let { homeTeam, awayTeam, week, prediction } = $props();

  // Parse markdown to HTML (includes images and all formatting)
  const renderedMarkdown = $derived(marked(prediction.text));
</script>

<div class="space-y-6">
  <Card>
    <CardHeader>
      <CardTitle>Prediction for Week {week}</CardTitle>
      <CardDescription>
        {awayTeam} @ {homeTeam}
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-6">
      <div class="rounded-lg bg-muted p-6">
        <div
          class="prose prose-sm dark:prose-invert max-w-none text-foreground"
        >
          {@html renderedMarkdown}
        </div>
      </div>
    </CardContent>
  </Card>
</div>
