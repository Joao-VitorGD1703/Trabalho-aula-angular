import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/Cliente';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  clientes: Cliente[] = [];
  clienteForm: FormGroup = new FormGroup({});
  constructor(private clienteService: ClienteService, private formBuilder: FormBuilder) {
    this.clienteForm = this.formBuilder.group({
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
  if (this.clienteForm.valid) {
    const clientNovo: Cliente={
      nome: this.clienteForm.value.nome,
      telefone: this.clienteForm.value.telefone,
      id: this.generateRandomString(6)
    }
    this.clienteForm.reset()
    this.clienteService.adicionar(clientNovo)
    alert("cadastrado com sucesso")
  }
}

  listar(): void {
    this.clientes = this.clienteService.listar();
  }
  ngOnInit(): void {
    this.listar();
  }
}
