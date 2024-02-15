export interface ResPlayer {
    get: string
    parameters: Parameters
    errors: any[]
    results: number
    response: Player[]
  }
  
  export interface Parameters {
    team: string
    season: string
  }
  
  export interface Player {
    id: number
    firstname: string
    lastname: string
    birth: Birth
    nba: Nba
    height: Height
    weight: Weight
    college?: string
    affiliation?: string
    leagues: Leagues
  }
  
  export interface Birth {
    date?: string
    country?: string
  }
  
  export interface Nba {
    start: number
    pro: number
  }
  
  export interface Height {
    feets?: string
    inches?: string
    meters?: string
  }
  
  export interface Weight {
    pounds?: string
    kilograms?: string
  }
  
  export interface Leagues {
    standard: Standard
    africa?: Africa
    vegas?: Vegas
    utah?: Utah
  }
  
  export interface Standard {
    jersey?: number
    active: boolean
    pos: string
  }
  
  export interface Africa {
    jersey: number
    active: boolean
    pos: string
  }
  
  export interface Vegas {
    jersey: number
    active: boolean
    pos: string
  }
  
  export interface Utah {
    jersey: number
    active: boolean
    pos: string
  }
  