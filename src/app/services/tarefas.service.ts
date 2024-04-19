import { Injectable } from '@angular/core';
import {Tarefa} from '../interfaces/Tarefa';

@Injectable({
  providedIn: "root"
})
export class TarefaService {
  constructor() { }

  //Esta lista virá da API
  tarefas:Tarefa[] = [
    {id: "fdaklfads", nome: "Thiago Xavier"},
    {id: "teste", nome : "Teste 2", descricao:"testeDescr"}
  ];

  listar():Tarefa[]{
    return this.tarefas;
  }

  remover(id:string){
    const cliente = this.tarefas.find(c => c.id == id);

    if(cliente){
       const index = this.tarefas.indexOf(cliente);
       this.tarefas.splice(index,1);
    }
  }

  adicionar(cliente:Tarefa){
    this.tarefas.push(cliente);
  }
}

