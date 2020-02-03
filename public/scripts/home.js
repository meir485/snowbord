var atag = document.getElementsByTagName('a');
var img = document.getElementsByTagName('img');


var slideIndex = [0,0];
var slideId = ["men",'women']
showSlides(0,0)
showSlides(0,1)
function plusSlides(n,type) {
  showSlides(slideIndex[type] += n, type);
}


function showSlides(n,type) {
 
  var i;
  var slides = document.getElementsByClassName(slideId[type]);   
  // slideIndex[type] = n;
  if (n > slides.length-1) {slideIndex[type] = 0}    
  if (n < 0) {slideIndex[type] = slides.length-3}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  
  slides[slideIndex[type]].style.display = "block";
  slides[slideIndex[type]+1].style.display = "block";
  slides[slideIndex[type]+2].style.display = "block";  
 
}


// for(var i = 0; i<3;i++){
// 	atag[i].addEventListener("mouseover", function(event){
// 	alert(this.innerHTML)
// })
// }


    
