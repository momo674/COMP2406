let x = {name: 'Mohamad'}
let f = function(k,v){this[k]=v}
x.method = f
x.method('color','red')

console.log(x)
