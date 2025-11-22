import type { BettingPrediction } from "./types";

const API_BASE_URL = "http://localhost:3000/api";

export async function getBettingPrediction(
  homeTeam: string,
  awayTeam: string,
  week: number,
): Promise<BettingPrediction> {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      homeTeam,
      awayTeam,
      week,
    }),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}
