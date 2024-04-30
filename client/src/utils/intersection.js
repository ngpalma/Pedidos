//funcion que sirve para combinar filtros de 3 arreglos diferentes
const intersection = (arr1, arr2, arr3) => {
  var data = [arr1, arr2, arr3];
  var result = data.reduce((a, b) => a.filter((c) => b.includes(c)));
  return result;
};

export default intersection;
