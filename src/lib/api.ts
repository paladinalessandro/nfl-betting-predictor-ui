import type { BettingPrediction } from "./types";

const API_BASE_URL = "http://localhost:3000/api";

export interface AnalysisResponse {
  success: boolean;
  message: string;
  game?: {
    homeTeam: string;
    awayTeam: string;
    week: number;
  };
}

export interface StatusResponse {
  status: "pending" | "processing" | "completed" | "failed";
  progress?: number;
  message?: string;
}

export async function generateAnalysis(
  homeTeam: string,
  awayTeam: string,
  week: number,
): Promise<AnalysisResponse> {
  const params = new URLSearchParams({
    homeTeam,
    awayTeam,
    week: week.toString(),
  });

  const response = await fetch(`${API_BASE_URL}/analysis?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to generate analysis: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

export async function getAnalysisStatus(
  homeTeam: string,
  awayTeam: string,
  week: number,
): Promise<StatusResponse> {
  const params = new URLSearchParams({
    homeTeam,
    awayTeam,
    week: week.toString(),
  });

  const response = await fetch(`${API_BASE_URL}/status?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to get status: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

export async function getAnalysisResult(
  homeTeam: string,
  awayTeam: string,
  week: number,
): Promise<BettingPrediction> {
  const params = new URLSearchParams({
    homeTeam,
    awayTeam,
    week: week.toString(),
  });

  const response = await fetch(`${API_BASE_URL}/result?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to get result: ${response.status} ${response.statusText}`,
    );
  }

  // Backend returns plain text markdown, not JSON
  const text = await response.text();

  return {
    text,
  };
}

export async function getBettingPrediction(
  homeTeam: string,
  awayTeam: string,
  week: number,
): Promise<BettingPrediction> {
  // Start the analysis
  await generateAnalysis(homeTeam, awayTeam, week);

  // Poll for status until complete
  let isComplete = false;
  let attempts = 0;
  const maxAttempts = 120; // 2 minutes with 1 second intervals

  while (!isComplete && attempts < maxAttempts) {
    const status = await getAnalysisStatus(homeTeam, awayTeam, week);

    if (status.status === "completed") {
      isComplete = true;
      break;
    } else if (status.status === "failed") {
      throw new Error("Analysis failed on the backend");
    }

    // Wait 1 second before checking again
    await new Promise((resolve) => setTimeout(resolve, 1000));
    attempts++;
  }

  if (!isComplete) {
    throw new Error("Analysis timed out after 2 minutes");
  }

  // Get the final result
  return await getAnalysisResult(homeTeam, awayTeam, week);
}
