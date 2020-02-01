var atag = document.getElementsByTagName('a');
var img = document.getElementsByTagName('img');


var slideIndex = 0;

showSlides(0)
function plusSlides(n) {
  showSlides(slideIndex += n);
}


function showSlides(n) {
  debugger
  var i;
  var slides = document.getElementsByClassName('menHolder');
  slideIndex = n;
  if (n > slides.length-1) {slideIndex = 0}    
  if (n < 0) {slideIndex = slides.length-3}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  
  slides[slideIndex].style.display = "block";
  slides[slideIndex+1].style.display = "block";
  slides[slideIndex+2].style.display = "block";  
 
}

// var a = [
// {image:"/images/mens/1.webp", name:"t0", description:"", id:0},
// {image:"/images/mens/2.webp", name:"t1", description:"", id:1},
// {image:"/images/mens/3.webp", name:"t2", description:"", id:2},
// {image:"/images/mens/4.webp", name:"t3", description:"", id:3},
// {image:"/images/mens/4.webp", name:"t4", description:"", id:4},
// {image:"/images/mens/5.webp", name:"t5", description:"", id:5}
// ]


atag.addEventListener("click", catIntro())
for(var i = 0; i<3;i++){
	atag[i].addEventListener("mouseover", function(event){
	console.log(this.innerHTML)
})
}

// for(var i = 0; i<3;i++){
// 	data[i].getElementsByTagName('img')[0].src=a[i].image;
// 	data[i].getElementsByTagName('h4')[0].innerHTML=a[i].name;
// 	data[i].getElementsByTagName('p')[0].innerHTML=a[i].description
// }


// function catIntro(){
   
// }

// function imgRight(){
//    for(var i = 0; i<3;i++){
//    		var ob = a.find( ({ name }) => name === data[i].getElementsByTagName('h4')[0].innerHTML ).id;
//    		if(ob===0){
//     	data[i].getElementsByTagName('img')[0].src=a[5].image;
// 	    data[i].getElementsByTagName('h4')[0].innerHTML=a[5].name;
// 	    data[i].getElementsByTagName('p')[0].innerHTML=a[5].description
//         }else{
//         	data[i].getElementsByTagName('img')[0].src=a[ob-1].image;
// 	        data[i].getElementsByTagName('h4')[0].innerHTML=a[ob-1].name;
// 	        data[i].getElementsByTagName('p')[0].innerHTML=a[ob-1].description
//         }
	    
//     }
// }

// function imgLeft(){
   
//    	for(var i = 2; i>-1;i--){
//    		var ob = a.find( ({ name }) => name === data[i].getElementsByTagName('h4')[0].innerHTML ).id;
//    		if(ob===a.length-1){
//     	data[i].getElementsByTagName('img')[0].src=a[0].image;
// 	    data[i].getElementsByTagName('h4')[0].innerHTML=a[0].name;
// 	    data[i].getElementsByTagName('p')[0].innerHTML=a[0].description
//         }else{
//         	data[i].getElementsByTagName('img')[0].src=a[ob+1].image;
// 	        data[i].getElementsByTagName('h4')[0].innerHTML=a[ob+1].name;
// 	        data[i].getElementsByTagName('p')[0].innerHTML=a[ob+1].description
//         }
	    
//     }
    
// }