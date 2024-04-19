import { Component } from '@angular/core';
import { TarefaService } from '../services/tarefas.service';
import { Tarefa } from '../interfaces/Tarefa';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tarefas.component.html',
  styleUrl: './tarefas.component.css'
})
export class TarefasComponent {

  tarefas: Tarefa[] = [];
  tarefaForm: FormGroup = new FormGroup({});
  constructor(private tarefasService: TarefaService, private formBuilder: FormBuilder) {
    this.tarefaForm = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
    })
  }
    generateRandomString(length: number): string  {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }

  inserir(){
    if (this.tarefaForm.valid) {
      const clientNovo: Tarefa={
        nome: this.tarefaForm.value.nome,
        descricao: this.tarefaForm.value.telefone,
        id: this.generateRandomString(6)
      }
      this.tarefaForm.reset()
      this.tarefasService.adicionar(clientNovo)
      alert("cadastrado com sucesso")
    }
  }

  listar(): void {
    this.tarefas = this.tarefasService.listar();
  }

  remover(id: string) {
    const cliente = this.tarefas.find(c => c.id == id);
    if (cliente) {
      const index = this.tarefas.indexOf(cliente);
      this.tarefas.splice(index,1);
    }
    alert("removido com sucesso")

  }

}
