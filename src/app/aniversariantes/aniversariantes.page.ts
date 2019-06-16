import { Component, OnInit } from '@angular/core';
import { DatafileService } from '../datafile.service';


@Component({
  selector: 'app-aniversariantes',
  templateUrl: './aniversariantes.page.html',
  styleUrls: ['./aniversariantes.page.scss'],
})
export class AniversariantesPage implements OnInit {

  public diames;
  public aniversariantes;
  public busca;
  constructor(public datafileService: DatafileService) { }

  ngOnInit() {
    this.diames = new Date(Date.now()).toISOString();
    this.trocouData();
  }


  trocouData(){
    let aux = new Date(this.diames);
    this.datafileService.getAniversariantesByDate(aux)
    .subscribe((data) =>{
      console.log(data);
      this.aniversariantes = data;
    } ,
    error => console.log(error));
    

  }

  trocouBusca(){
    
    this.datafileService.getAniversariantesByName(this.busca)
    .subscribe((data) =>{
      console.log(data);
      this.aniversariantes = data;
    } ,
    error => console.log(error));
    

  }

}
