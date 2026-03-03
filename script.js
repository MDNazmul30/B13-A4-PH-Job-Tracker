let InterviewList=[];
let RejectedList=[];

let total=document.getElementById('total')
let Rejected=document.getElementById('Rejected')
let Interview= document.getElementById('Interview')

const allFiltBtn =document.getElementById('all-filter-btn')
const rejectedFilterBtn= document.getElementById('Rejected-filter-btn')
const interviewFilterBtn = document.getElementById('Interview-filter-btn')

let allcards=document.getElementById('allcards')
const mainContainer = document.querySelector('main')


function count(){
    total.innerText=allcards.children.length;
    Interview.innerText=InterviewList.length;
    Rejected.innerText=RejectedList.length;
}
count()
function toggleStyle(id){
    allFiltBtn.classList.remove('bg-black','text-white')
    rejectedFilterBtn.classList.remove('bg-black','text-white')
    interviewFilterBtn.classList.remove('bg-black','text-white')
    
    allFiltBtn.classList.add('bg-gray-300','text-white')
    rejectedFilterBtn.classList.add('bg-gray-300','text-white')
    interviewFilterBtn.classList.add('bg-gray-300','text-white')
    
    console.log(id);
    const selected =document.getElementById(id)
    console.log(selected);
    selected.classList.remove('bg-gray-300','text-black')
    selected.classList.add('bg-black','text-white')
}

