export interface ResTeam {
    get: string
    parameters: any[]
    errors: any[]
    results: number
    response: Team[]
  }
  
  export interface Team {
    id: number
    name: string
    nickname: string
    code: string
    city?: string
    logo?: string
    allStar: boolean
    nbaFranchise: boolean
    leagues: Leagues
  }
  
  export interface Leagues {
    standard?: Standard
    vegas?: Vegas
    utah?: Utah
    sacramento?: Sacramento
    africa?: Africa
  }
  
  export interface Standard {
    conference?: string
    division?: string
  }
  
  export interface Vegas {
    conference: string
    division?: string
  }
  
  export interface Utah {
    conference: string
    division?: string
  }
  
  export interface Sacramento {
    conference: string
    division?: string
  }
  
  export interface Africa {
    conference: any
    division: any
  }
  