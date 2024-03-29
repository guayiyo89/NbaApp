import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Team } from 'src/app/core/interfaces/teams';
import { TeamPlayerService } from 'src/app/core/services/team-player.service';
import { CreateTeamComponent } from './create-team/create-team.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { ModalErrorComponent } from 'src/app/shared/components/modal-error/modal-error.component';
import { MatSort } from '@angular/material/sort';
import { ShowTeamComponent } from './show-team/show-team.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
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
      this.dataSource = new MatTableDataSource<Team>(this.sortTeams(this.teams));
    }
  }

  ngAfterViewInit() {
    this.dataSource!.paginator = this.paginator!;
    this.dataSource!.sort = this.sort!;
  }

  getTeams() {
    this.teamService.getTeams().subscribe({
      next: (res) => {
        this.teams = res.response.filter((team) => team.nbaFranchise == true);
        this.teamService.saveTeamsLS(this.teams);
        this.dataSource = new MatTableDataSource<Team>(this.teams);
        this.dataSource!.paginator = this.paginator!;
        this.dataSource!.sort = this.sort!;
      },
      error: (_err) => {
        this.showError('Ha ocurrido una falla en el servicio.', 'error', false);
      },
    });
  }

  filterTeams() {
    let texto = this.searchTeams.value!;
    let filteredData = this.teams.filter((team) =>
      team.name.toUpperCase().includes(texto.toUpperCase())
    );
    this.dataSource = new MatTableDataSource<Team>(this.sortTeams(filteredData));
    this.dataSource!.paginator = this.paginator!;
    this.dataSource!.sort = this.sort!;
    this.paginator!.firstPage();
  }

  resetData() {
    this.dataSource = new MatTableDataSource<Team>(this.sortTeams(this.teams));
    this.dataSource!.paginator = this.paginator!;
    this.dataSource!.sort = this.sort!;
    this.paginator!.firstPage();
    this.searchTeams.reset();
  }

  editTeam(team: Team) {
    const dialogRef = this.dialog.open(EditTeamComponent, {
      disableClose: true,
      data: team,
      width: '512px',
    }); 

    dialogRef.componentInstance.onClose.subscribe((data: Team) => {
      const editRef = this.showError(`¿Está seguro de guardar los cambios a ${data.name}?`, 'warning', true)
      
      editRef.afterClosed().subscribe((res) => {
        if(res) {
          //vemos si el nombre no corresponde a ninguno de los demas equipos
          const existingTeam = this.teams.find(
            (teamEx) => teamEx.name.toUpperCase() === data.name.toUpperCase()
          );

          //eleimino el objeto a editar
          if(!existingTeam || team.name.toUpperCase() === data.name.toUpperCase()) {
            const index = this.teams.findIndex(
              (teamEx) =>
                teamEx.id === team.id &&
                teamEx.name.toUpperCase() === team.name.toUpperCase()
            );

            if (index !== -1) {
              this.teams.splice(index, 1);
              //insertamos la nueva data
              this.teams.push(data)
              //actualizamos la tabla
              this.resetData()
              this.showError(
                `${data.name} se ha editado correctamente.`,
                'check',
                false
              );
            } else {
              this.showError(
                'Ha ocurrido un error',
                'error',
                false
              );
            }

          } else {
            this.showError(
              'Ya existe un equipo con el mismo nombre.',
              'error',
              false
            );
          }
        }
      })
    });
  }

  newTeam() {
    const dialogRef = this.dialog.open(CreateTeamComponent, {
      disableClose: true,
      width: '512px',
    });

    dialogRef.componentInstance.onClose.subscribe((data: Team) => {
      //preguntar si existe el nombre actualmente
      const existingTeam = this.teams.find(
        (team) => team.name.toUpperCase() === data.name.toUpperCase()
      );
      if (existingTeam) {
        this.showError(
          'Ya existe un equipo con el mismo nombre.',
          'warning',
          false
        );
      } else {
        // guardar el nuevo array en LS
        this.teams.push(data);
        this.teamService.saveTeamsLS(this.teams);
        // actualizar dataSource
        // resetear tabla como el campo buscar
        this.showError(
          'Se ha agregado correctamente.',
          'check',
          false
        );
        this.resetData();
      }
    });
  }

  showTeam(team: Team) {
    this.dialog.open(ShowTeamComponent, {
      data: team,
      width: '620px',
    });
  }

  deleteTeam(teamSelected: Team) {
    const deleteRef = this.dialog.open(ModalErrorComponent, {
      disableClose: true,
      data: {
        mensaje: `¿Está seguro de eliminar el equipo ${teamSelected.name}?`,
        tipo: 'warning',
        actions: true,
      },
      width: '620px',
    });

    deleteRef.afterClosed().subscribe((res) => {
      if (res) {
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
          this.showError(
            'Se ha eliminado correctamente.',
            'check',
            false
          );
          this.resetData();
        } else {
          this.showError(
            'Ha ocurrido un error al eliminar el elemento.',
            'error',
            false
          );
        }
      }
    });
  }

  sortTeams(teams: Team[]) {
    return teams.sort((a, b) => a.name.localeCompare(b.name))
  }

  //vuelve a los datos tal como los trae la API
  fullRestore() {
    const restoreRef = this.dialog.open(ModalErrorComponent, {
      disableClose: true,
      data: {
        mensaje: `ATENCIÓN: Esta acción restablece el contenido tal como lo trae la API externa. ¿Desea continuar?`,
        tipo: 'warning',
        actions: true,
      },
      width: '620px',
    });

    restoreRef.afterClosed().subscribe((res) => {
      if(res) {
        this.teamService.resetLS('teams')
        this.getTeams()
      }
    })

  }

  showError(mensaje: string, tipo: string, actions: boolean) {
    return this.dialog.open(ModalErrorComponent, {
      disableClose: true,
      data: { mensaje, tipo, actions },
      width: '620px',
    });
  }
}
