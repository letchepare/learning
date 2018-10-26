
function validerFibonacci() {
    var nbRecursions = document.getElementById('nbRecursions').value;
    document.getElementById('resFibonacci').innerHTML = fibonacciRecurs(nbRecursions);
}

function fibonacci(nbRecursions) {

    var fibNum = [0, 1];

    for (var i = 1; i <= nbRecursions; i++) {
        fibNum.push(fibNum[i] + fibNum[i - 1])
    }

    return fibNum[nbRecursions]

}

function fibonacciDecrementale(nbRecursions) {
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

function fibonacciRecurs(nombre) {
    if (nombre < 2)
        return nombre;
    else
        return fibonacciRecurs(nombre - 1) + fibonacciRecurs(nombre - 2)
}

