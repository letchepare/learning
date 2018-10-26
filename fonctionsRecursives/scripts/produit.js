function validerProduit() {
    var a = parseInt(document.getElementById('produitA').value);
    var b = parseInt(document.getElementById('produitB').value);
    
    document.getElementById('resProduit').innerHTML = (produit(a, b));
}


function produit(a, b) {
    var res;
    if (a <= b)
        res = produitRecursive(a, b, 0)
    else
        res = produitRecursive(b, a, 0)

    return res;
}

function produitRecursive(a, b, res) {
    if (a == 0)
        return res;

    else
        return produitRecursive(a - 1, b, res + b);

}