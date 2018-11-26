import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fibonacciAngular';

  nbRecursions;

  data: TreeNode[] = [{
    label: 'fibonacci',
    children: []
  }]

  validerFibonacci() {
    document.getElementById('resFibonacci').innerHTML = this.fibonacciRecurs(this.nbRecursions);
  }

  fibonacci(nbRecursions) {

    var fibNum = [0, 1];

    for (var i = 1; i <= nbRecursions; i++) {
      fibNum.push(fibNum[i] + fibNum[i - 1])
    }

    return fibNum[nbRecursions]

  }

  fibonacciDecrementale(nbRecursions) {
    var a = 0;
    var b = 1;
    var temp;

    while (nbRecursions > 0) {
      temp = b;
      b = a + b;
      a = temp;

      nbRecursions--;
    }
    return a;
  }

  fibonacciRecurs(nombre) {
    if (nombre < 2)
      return nombre;
    else {
      this.data[nombre].children = [{ label: "fib( " +  (nombre-1) + ')' }]
      return this.fibonacciRecurs(nombre - 1) + this.fibonacciRecurs(nombre - 2)
    }
  }

}
