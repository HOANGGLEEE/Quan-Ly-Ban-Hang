const adressbtn=document.querySelector("#adres-form")
const adressclose=document.querySelector("#adress-close")
const rightbtn=document.querySelector(".fa-chevron-right")
const leftbtn=document.querySelector(".fa-chevron-left")
const imgNumber=document.querySelectorAll(".silder-content-left-top img")
let index=0
adressbtn.addEventListener("click" ,function(){
    document.querySelector('.adres-form').style.display="flex"
})
adressclose.addEventListener("click" ,function(){
    document.querySelector('.adres-form').style.display="none"
})
rightbtn.addEventListener("click",function(){
    index=index+1
    if(index>imgNumber.length-1){
        index=0
    }
    document.querySelector(".silder-content-left-top").style.right=index *100+"%"
})
leftbtn.addEventListener("click",function(){
    index=index-1
    if(index<=0){
        index=imgNumber.length-1
    }
    document.querySelector(".silder-content-left-top").style.right=index *100+"%"
})
const imgactive=document.querySelectorAll(".active")

const imgNumberi=document.querySelectorAll(".silder-content-left-bottom li")
imgNumberi.forEach(function(image,index){
    image.addEventListener("click",function(){
        removeactive ()
        document.querySelector(".silder-content-left-top").style.right=index *100+"%"
        image.classList.add("active")
    })
})
function removeactive (){ 
    let imgactive=document.querySelector('.active')
    imgactive.classList.remove("active")
}
function imgAuto () {
    index=index+1
    if(index>imgNumber.length-1){
        index=0
    }
    removeactive ()
    document.querySelector(".silder-content-left-top").style.right=index *100+"%"
    imgNumberi[index].classList.add("active")
}
setInterval(imgAuto,2000)