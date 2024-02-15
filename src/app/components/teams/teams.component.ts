import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Team } from 'src/app/core/interfaces/teams';
import { TeamPlayerService } from 'src/app/core/services/team-player.service';
import { CreateTeamComponent } from './create-team/create-team.component';
import { EditTeamComponent } from './edit-team/edit-team.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  teams: Team[];
  filteredTeams: Team[];
  searchTeams: FormControl;

  displayedColumns: string[] = [
    'name',
    'city',
    'conference',
    'division',
    'actions',
  ];
  dataSource: MatTableDataSource<Team> | undefined;

  constructor(
    private teamService: TeamPlayerService,
    public dialog: MatDialog
  ) {
    this.teams = [];
    this.filteredTeams = [];
    this.searchTeams = new FormControl('');
  }

  //TRAER LOS DATOS ORDENADOS POR NOMBRE AL MOMENTO DE CADA RESET

  ngOnInit() {
    let teamsLS = this.teamService.getTeamsLS();
    if (!teamsLS) {
      this.getTeams();
    } else {
      this.teams = teamsLS;
      this.dataSource = new MatTableDataSource<Team>(this.teams);
    }
  }

  ngAfterViewInit() {
    this.dataSource!.paginator = this.paginator!;
  }

  getTeams() {
    this.teamService.getTeams().subscribe({
      next: (res) => {
        this.teams = res.response.filter((team) => team.nbaFranchise == true);
        this.teamService.saveTeamsLS(this.teams);
        this.dataSource = new MatTableDataSource<Team>(this.teams);
        console.log(this.teams, 'servicio');
      },
      error: (_err) => {
        console.log('error');
      },
    });
  }

  filterTeams() {
    let texto = this.searchTeams.value!;
    let filteredData = this.teams.filter((team) =>
      team.name.toUpperCase().includes(texto.toUpperCase())
    );
    this.dataSource = new MatTableDataSource<Team>(filteredData);
    this.dataSource!.paginator = this.paginator!;
  }

  resetData() {
    this.dataSource = new MatTableDataSource<Team>(this.teams);
    this.dataSource!.paginator = this.paginator!;
    this.searchTeams.reset();
  }

  editTeam(team: Team) {
    const dialogRef = this.dialog.open(EditTeamComponent, {
      disableClose: true,
      data: team,
      width: '620px',
    });

    dialogRef.componentInstance.onClose.subscribe((data: Team) => {
      console.log(data);
      // guardar el nuevo array en LS
      // actualizar dataSource
      // resetear tabla como el campo buscar
      this.resetData();
    });
  }

  newTeam() {
    const dialogRef = this.dialog.open(CreateTeamComponent, {
      disableClose: true,
      width: '620px',
    });

    dialogRef.componentInstance.onClose.subscribe((data: Team) => {
      //preguntar si existe el nombre actualmente
      // guardar el nuevo array en LS
      this.teams.push(data);
      this.teamService.saveTeamsLS(this.teams);
      // actualizar dataSource
      // resetear tabla como el campo buscar
      this.resetData();
    });
  }

  deleteTeam(teamSelected: Team) {
    //preguntar por el team
    //elimino el team del arreglo global teams
    const index = this.teams.findIndex(
      (team) =>
        team.id === teamSelected.id &&
        team.name.toUpperCase() === teamSelected.name.toUpperCase()
    );
    if (index !== -1) {
      this.teams.splice(index, 1);
      //guardo el dato
      //aqui confirmo q elimino
      this.teamService.saveTeamsLS(this.teams);
      // actualizar dataSource
      // resetear tabla como el campo buscar
      this.resetData();
    }
    //preguntar por el team
    //eliminar
    //enviar mensaje de exito
    // guardar el nuevo array en LS
    // actualizar dataSource
    // resetear tabla como el campo buscar
  }
}
