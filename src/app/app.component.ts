import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root', // Se transforma numa tag html: <app-root></app-root>
  templateUrl: './app.component.html', // externalizando o template num arquivo - mais fácil de gerenciar
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: string = 'list'; // para alternar visualização
  public todos: Todo[] = []; // inicia com valor "array vazio" []
  public title: string = 'Lista de Tarefas - Wagner';
  public form!: FormGroup; // ! significa que não vai setar valor inicial

  constructor(private fb: FormBuilder) {


    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])],
      // title: ['Insira aqui seu texto', Validators.required], // Texto é igual ao placeholder
      // title: ['', Validators.required], // Não necessita Validators.compose se só tem uma validação
      /*id: ['', Validators.compose([
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.required
      ])]*/
    });

    // Adicionando hardcode ao iniciar a aplicação
    /*this.todos.push(new Todo('Ir ao supermercado', false, 1));
    this.todos.push(new Todo('Cortar o cabelo', false, 2));
    this.todos.push(new Todo('Passear com o cachorro', true, 3));*/

    this.load();
  }

  add(){

    //this.form.value => { title: 'titulo '} // Outra forma de  receber os dados do form, só que em formato json

    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1; // Criando identificador único (não é o recomendado)
    this.todos.push(new Todo(title, false, id));
    this.save();
    this.clear();
  }

  clear(){
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    console.log(index);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo: Todo) {
    // Não precisa usar o this.todos e percorrer toda a lista
    // O objeto todo que vem por parâmetro é uma referência da lista de todos
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list'; // Após salvar, voltar para lista
    //sessionStorage.setItem('todos', data);
  }

  load() {
    const data = localStorage.getItem('todos'); // Sempre o mesmo nome do setItem
    if (data) {
      this.todos = JSON.parse(data); // convertendo string no Json
    }
    else {
      this.todos = [];
    }
  }

  changeMode(mode: string) {
    this.mode = mode;
  }
}
