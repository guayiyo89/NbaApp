import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Player } from 'src/app/core/interfaces/player';
import { Team } from 'src/app/core/interfaces/teams';
import { TeamPlayerService } from 'src/app/core/services/team-player.service';
import { ModalErrorComponent } from 'src/app/shared/components/modal-error/modal-error.component';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
})
export class PlayersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  teams: Team[];
  teamSelected: Team | undefined;
  players: Player[];
  filteredPlayers: Player[];
  filteredTeams: Team[];
  searchPlayer: FormControl;
  searchTeam: FormControl;
  teamFieldText: FormControl;
  filterFound = true;

  displayedColumns: string[] = [
    'name',
    'birth',
    'country',
    'height',
    'weight',
    'start',
  ];

  dataSource: MatTableDataSource<Player> | undefined;

  constructor(
    private teamService: TeamPlayerService,
    public dialog: MatDialog
  ) {
    this.teams = [];
    this.players = [];
    this.filteredPlayers = [];
    this.filteredTeams = [];
    this.searchTeam = new FormControl('');
    this.searchPlayer = new FormControl('');
    this.teamFieldText = new FormControl('');
  }

  ngOnInit() {
    let teamsLS = this.teamService.getTeamsLS();
    if (!teamsLS) {
      this.getTeams();
    } else {
      this.teams = this.sortTeams(teamsLS);
      this.filteredTeams = this.teams;
    }
  }

  getTeams() {
    this.teamService.getTeams().subscribe({
      next: (res) => {
        this.teams = this.sortTeams(
          res.response.filter((team) => team.nbaFranchise == true)
        );
        this.filteredTeams = this.teams;
        this.teamService.saveTeamsLS(this.teams);
      },
      error: (_err) => {
        this.showError('Ha ocurrido una falla en el servicio.', 'error', false);
      },
    });
  }

  getPlayers(teamId: number) {
    this.teamService.getPlayer(teamId, 2022).subscribe({
      next: (res) => {
        this.players = res.response;
        this.teamService.savePlayersByTeamLS(
          parseInt(res.parameters.team),
          this.players
        );
        this.dataSource = new MatTableDataSource<Player>(this.players);
        this.dataSource!.paginator = this.paginator!;
        this.dataSource!.sort = this.sort!;
        this.paginator!.firstPage();
      },
      error: (_err) => {
        this.showError('Ha ocurrido una falla en el servicio.', 'error', false);
      },
    });
  }

  sortTeams(teams: Team[]) {
    return teams.sort((a, b) => a.name.localeCompare(b.name));
  }

  selectTeam() {
    this.teamSelected = this.searchTeam.value;
    let playerLS = this.teamService.getPlayersByTeamLS(this.teamSelected?.id!);
    if (!playerLS) {
      this.getPlayers(this.teamSelected?.id!);
    } else {
      this.players = playerLS;
      this.dataSource = new MatTableDataSource<Player>(this.players);
      this.dataSource!.paginator = this.paginator!;
      this.dataSource!.sort = this.sort!;
    }
    this.resetSearchControl();
  }

  filterPlayer() {
    let texto = this.searchPlayer.value!;
    let filteredData = this.players.filter((player) => {
      return player.firstname.toUpperCase().includes(texto.toUpperCase()) ||
        player.lastname.toUpperCase().includes(texto.toUpperCase());
    });
    this.dataSource = new MatTableDataSource<Player>(filteredData);
    this.dataSource!.paginator = this.paginator!;
    this.dataSource!.sort = this.sort!;
    this.paginator!.firstPage();
  }

  resetData() {
    this.dataSource = new MatTableDataSource<Player>(this.players);
    this.dataSource!.paginator = this.paginator!;
    this.dataSource!.sort = this.sort!;
    this.searchPlayer.reset();
    this.paginator!.firstPage();
  }

  resetSearchControl() {
    this.searchTeam.reset();
    this.filteredTeams = this.teams;
  }

  public filterData(event: any) {
    const value = this.teamFieldText?.value;
    if (value && value.length >= 1) {
      this.filteredTeams = this.teams.filter((element) =>
        element.name.toLowerCase().includes(value.toLowerCase())
      );
      if (this.filteredTeams.length < 1) this.filterFound = false;
      else if (this.filteredTeams.length >= 1) this.filterFound = true;
    } else {
      this.filteredTeams = this.teams;
      this.filterFound = true;
    }

    if (this.teamFieldText.dirty && this.searchTeam?.valid) {
      this.searchTeam.reset();
    }
  }

  showError(mensaje: string, tipo: string, actions: boolean) {
    return this.dialog.open(ModalErrorComponent, {
      disableClose: true,
      data: { mensaje, tipo, actions },
      width: '620px',
    });
  }
}
