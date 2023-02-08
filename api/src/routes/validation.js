function validationPostActivity(data) {
  const {name, difficulty, duration, season} = data;

  if(!name || !difficulty){
    throw new Error('the fields Name and Dificulty are required');
  }

  //-----------------

  if(typeof name !== "string"){
    throw new Error("Name must be a string")
  }

  if(name.length < 3){
    throw new Error("name must be at least 3 character long");
  }

  if(!/^[a-z]+$/i.test(name)){
    throw new Error("Name must contain only a-z characters")
  }

  //--------------------

  if(typeof difficulty !== "number"){
    throw new Error("Difficulty must be a number")
  }

  if(difficulty < 1 || difficulty > 5){
    throw new Error("Difficulty must be a number between 1 and 5")
  }

  //-------------------------

  if(typeof season !== "string"){
    throw new Error("Season must be a string");
  }

  //if(season !== "summer" || season !== "autumn" || season !== "spring" || season !== "winter"){
  //  throw new Error("Season must be summer, autumn, spring or winter")
  //}

  //------------------

  if(typeof duration !== "string"){
    throw new Error("Duration must be a string");
  }

}

module.exports = {validationPostActivity}