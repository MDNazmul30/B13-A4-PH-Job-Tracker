let total=document.getElementById('total')
let Rejected=document.getElementById('Rejected')
let Interview= document.getElementById('Interview')

let allcards=document.getElementById('allcards')

function count(){
    total.innerText=allcards.children.length;
}
count()