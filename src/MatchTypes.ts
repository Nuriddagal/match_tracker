export interface Player {
  "kills": number,
  "username": string
}
export interface Team {
  "name": string,
  "place": number,
  "players": Player[],
  "points": number,
  "total_kills": number
}
export interface Matches {
    "awayScore": number,
    "awayTeam": Team,
    "homeScore": number,
    "homeTeam": Team,
    "status": string,
    "time": string,
    "title": string
}
export interface JsonData {
  "data": {
    "matches": Matches[]
  },
  "ok": boolean
}
export type Icons = {
  "userIcon": string,
  "teamIcon": string,
  "arrow": string
}