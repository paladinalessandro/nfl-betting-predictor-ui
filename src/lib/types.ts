export interface BettingPrediction {
  text: string;
}

export type NFLTeam = {
  name: string;
  abbreviation: string;
  logo: string;
};

export type NFLMatch = {
  id: string;
  homeTeam: NFLTeam;
  awayTeam: NFLTeam;
  week: number;
  date: string;
  time: string;
  channel?: string;
  line?: number;
  overUnder?: number;
  stadium?: string;
  city?: string;
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
  {
    name: "Pittsburgh Steelers",
    abbreviation: "PIT",
    logo: "https://a.espncdn.com/i/teamlogos/nfl/500/pit.png",
  },
  {
    name: "Chicago Bears",
    abbreviation: "CHI",
    logo: "https://a.espncdn.com/i/teamlogos/nfl/500/chi.png",
  },
  {
    name: "New England Patriots",
    abbreviation: "NE",
    logo: "https://a.espncdn.com/i/teamlogos/nfl/500/ne.png",
  },
  {
    name: "Cincinnati Bengals",
    abbreviation: "CIN",
    logo: "https://a.espncdn.com/i/teamlogos/nfl/500/cin.png",
  },
  {
    name: "Detroit Lions",
    abbreviation: "DET",
    logo: "https://a.espncdn.com/i/teamlogos/nfl/500/det.png",
  },
  {
    name: "Minnesota Vikings",
    abbreviation: "MIN",
    logo: "https://a.espncdn.com/i/teamlogos/nfl/500/min.png",
  },
  {
    name: "Green Bay Packers",
    abbreviation: "GB",
    logo: "https://a.espncdn.com/i/teamlogos/nfl/500/gb.png",
  },
  {
    name: "Seattle Seahawks",
    abbreviation: "SEA",
    logo: "https://a.espncdn.com/i/teamlogos/nfl/500/sea.png",
  },
  {
    name: "Tennessee Titans",
    abbreviation: "TEN",
    logo: "https://a.espncdn.com/i/teamlogos/nfl/500/ten.png",
  },
];

// Real NFL matches for Nov 23, 2025
export const UPCOMING_MATCHES: NFLMatch[] = [
  {
    id: "1",
    homeTeam: NFL_TEAMS[7], // Chicago Bears
    awayTeam: NFL_TEAMS[6], // Pittsburgh Steelers
    week: 11,
    date: "Nov 23, 2025",
    time: "10:00 AM ET",
    channel: "CBS",
    line: -2.5,
    overUnder: 46.5,
    stadium: "Soldier Field",
    city: "Chicago, IL",
  },
  {
    id: "2",
    homeTeam: NFL_TEAMS[9], // Cincinnati Bengals
    awayTeam: NFL_TEAMS[8], // New England Patriots
    week: 11,
    date: "Nov 23, 2025",
    time: "10:00 AM ET",
    channel: "CBS",
    line: 7.5,
    overUnder: 50.5,
    stadium: "Paycor Stadium",
    city: "Cincinnati, OH",
  },
  {
    id: "3",
    homeTeam: NFL_TEAMS[10], // Detroit Lions
    awayTeam: NFL_TEAMS[2], // New York Giants
    week: 11,
    date: "Nov 23, 2025",
    time: "10:00 AM ET",
    channel: "FOX",
    line: 13,
    overUnder: 50.5,
    stadium: "Ford Field",
    city: "Detroit, MI",
  },
  {
    id: "4",
    homeTeam: NFL_TEAMS[12], // Green Bay Packers
    awayTeam: NFL_TEAMS[11], // Minnesota Vikings
    week: 11,
    date: "Nov 23, 2025",
    time: "10:00 AM ET",
    channel: "FOX",
    line: 6,
    overUnder: 41.5,
    stadium: "Lambeau Field",
    city: "Green Bay, WI",
  },
  {
    id: "5",
    homeTeam: NFL_TEAMS[13], // Seattle Seahawks
    awayTeam: NFL_TEAMS[14], // Tennessee Titans
    week: 11,
    date: "Nov 23, 2025",
    time: "10:00 AM ET",
    channel: "FOX",
    stadium: "Lumen Field",
    city: "Seattle, WA",
  },
];
