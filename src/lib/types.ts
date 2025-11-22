export interface BettingPrediction {
  text: string;
}

export type NFLTeam = {
  name: string;
  abbreviation: string;
  logo: string;
};

export const NFL_TEAMS: NFLTeam[] = [
  {
    name: "Kansas City Chiefs",
    abbreviation: "KC",
    logo: "https://a.espncdn.com/i/teamlogos/nfl/500/kc.png",
  },
  {
    name: "Dallas Cowboys",
    abbreviation: "DAL",
    logo: "https://a.espncdn.com/i/teamlogos/nfl/500/dal.png",
  },
  {
    name: "New York Giants",
    abbreviation: "NYG",
    logo: "https://a.espncdn.com/i/teamlogos/nfl/500/nyg.png",
  },
  {
    name: "Philadelphia Eagles",
    abbreviation: "PHI",
    logo: "https://a.espncdn.com/i/teamlogos/nfl/500/phi.png",
  },
  {
    name: "San Francisco 49ers",
    abbreviation: "SF",
    logo: "https://a.espncdn.com/i/teamlogos/nfl/500/sf.png",
  },
  {
    name: "Buffalo Bills",
    abbreviation: "BUF",
    logo: "https://a.espncdn.com/i/teamlogos/nfl/500/buf.png",
  },
];
