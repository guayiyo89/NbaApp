import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLS } from 'src/app/constants/url.constant';
import { ResTeam, Team } from '../interfaces/teams';
import { environment } from 'src/environment/environment';
import { Player, ResPlayer } from '../interfaces/player';

@Injectable({
  providedIn: 'root',
})
export class TeamPlayerService {
  constructor(private http: HttpClient) {}

  headers = environment.headers;

  getTeams(): Observable<ResTeam> {
    let url = `${URLS.getTeams}`;
    return this.http.get<ResTeam>(url, { headers: this.headers });
  }

  getPlayer(year: number, team: number): Observable<ResPlayer> {
    let url = `${URLS.getPlayers}?team=${team}&season=${year}`;
    return this.http.get<ResPlayer>(url, { headers: this.headers });
  }

  saveTeamsLS(teamData: Team[]) {
    let data = JSON.stringify(teamData);
    localStorage.setItem('teams', data);
  }

  savePlayersByTeamLS(teamId: number, playerData: Player[]) {
    let data = JSON.stringify(playerData);
    localStorage.setItem(`players-team-${teamId}`, data);
  }

  getTeamsLS(): Team[] {
    return JSON.parse(localStorage.getItem('teams')!);
  }

  getPlayersByTeamLS(teamId: number): Player[] {
    return JSON.parse(localStorage.getItem(`players-team-${teamId}`)!);
  }
}
