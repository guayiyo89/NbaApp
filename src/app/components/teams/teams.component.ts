import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Team } from 'src/app/core/interfaces/teams';
import { TeamPlayerService } from 'src/app/core/services/team-player.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  teams: Team[]
  filteredTeams: Team[]
  searchTeams: FormControl

  displayedColumns: string[] = ['name', 'city', 'conference', 'division'];
  dataSource: MatTableDataSource<Team> | undefined

  constructor(private teamService: TeamPlayerService) { 
    this.teams = []
    this.filteredTeams = []
    this.searchTeams = new FormControl('')
  }

  ngOnInit() {
    let teamsLS = this.teamService.getTeamsLS()
    if(!teamsLS) {
      this.getTeams()
    } else {
      this.teams = teamsLS
      this.dataSource = new MatTableDataSource<Team>(this.teams);
    }
  }

  ngAfterViewInit() {
    this.dataSource!.paginator = this.paginator!;
  }

  getTeams() {
    this.teamService.getTeams().subscribe({
      next: (res) => {
        this.teams = res.response.filter(team => team.nbaFranchise == true)
        this.teamService.saveTeamsLS(this.teams)
        this.dataSource = new MatTableDataSource<Team>(this.teams);
        console.log(this.teams, 'servicio')
      },
      error: (_err) => {
        console.log('error')
      },
    })
  }

  filterTeams() {
    let texto = this.searchTeams.value!
    let filteredData = this.teams.filter(team => team.name.toUpperCase().includes(texto.toUpperCase()))
    this.dataSource = new MatTableDataSource<Team>(filteredData);
    this.dataSource!.paginator = this.paginator!;
  }

  resetData() {
    this.dataSource = new MatTableDataSource<Team>(this.teams);
    this.dataSource!.paginator = this.paginator!;
  }

}
