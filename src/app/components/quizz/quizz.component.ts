import { Component, OnInit, OnChanges } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"



type options = {
  id:number,
  name:string,
  alias:string,
}

type question = {
  id:number,
  question:string,
  options: options[],
}




@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss']
})
export class QuizzComponent implements OnInit {


  public title:string = "";
  public isFinished:boolean = false;
  public currentQuestion:question = {id:0, question:"", options:[{id:0, name:"", alias:""}]};
  public results:string = ""

  private questions:question[] = []
  private questionIndex:number = 0;
  private questionMaxIndex:number = 0;
  private answers:string[] = []



  constructor() { }

  ngOnInit(): void {
    this.title = quizz_questions.title;
    this.questions = quizz_questions.questions;
    this.currentQuestion = this.questions[this.questionIndex];
    this.questionMaxIndex = this.questions.length;
  }

  private calculateResult():string{
    const result = this.answers.reduce((pre,cur,i,arr)=>{
      if(arr.filter(item => item === pre).length > arr.filter(item => item === cur).length){
        return pre;
      }else{
        return cur;
      }
    })

    return result
  }

  public nextQuestion(alias:string):void{
    this.questionIndex++;
    this.answers.push(alias)

    if(this.questionIndex < this.questionMaxIndex){
      this.currentQuestion = this.questions[this.questionIndex];
    }else{
      const finalAnswer:string = this.calculateResult()
      this.isFinished = true;
      this.results = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
    }
  }



}
