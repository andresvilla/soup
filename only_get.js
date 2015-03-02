module.exports = function(request,response,next) {
  if (request.method =='POST'){
    next();
  }else{
  	response.send("Method is not allowed");
  }
};