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
const filterSection = document.getElementById('filterSection')


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
    //console.log(selected);
    selected.classList.remove('bg-gray-300','text-black')
    selected.classList.add('bg-black','text-white')

    if(id== 'Interview-filter-btn'){
        allcards.classList.add('hidden')
        filterSection.classList.remove('hidden')
    }
    else if(id== 'all-filter-btn'){
        allcards.classList.remove('hidden')
        filterSection.classList.add('hidden')
    }
}

mainContainer.addEventListener('click', function(event){
   // console.log(event.target.classList.contains('interviewBtn'))
   if(event.target.classList.contains('interviewBtn')){
     const parenNode=event.target.parentNode.parentNode;
    const heading1st =parenNode.querySelector('.heading1st').innerText
    const heading2nd =parenNode.querySelector('.heading2nd').innerText
    const descriptiion=parenNode.querySelector('.descriptiion').innerText
    const salaryDetails=parenNode.querySelector('.salaryDetails').innerText
    parenNode.querySelector('.status').innerText='Interview'
    const cardInfo ={
        salaryDetails,
        descriptiion,
        heading2nd,
        heading1st

    }
   const jobexist= InterviewList.find(item=>item.heading1st == cardInfo.heading1st)
   
   if(!jobexist){
    InterviewList.push(cardInfo)
   }
   filterInterview()
   count()

   }
   
})

function filterInterview(){
  filterSection.innerHTML = ''
  for(let intervw of InterviewList){
    console.log(intervw)
    let div = document.createElement('div');
    div.className = 'card p-5 border-1 rounded-xl space-y-5'
   div. innerHTML = `
                <div class="flex flex-row place-content-between space-y-4">
                    <div class="">
                        <h1 class="heading1st">${intervw.heading1st}</h1>
                        <h1 class="heading2nd">
                            ${intervw.heading2nd}
                        </h1>
                    </div>

                    <i class="fa-solid fa-trash  rounded-full"></i>


                </div>
                <h1 class="salaryDetails">${intervw.salaryDetails}</h1>
                <button class="status btn btn-sm w-24">Not Applied</button>

                <h1 class="descriptiion">${intervw.descriptiion}</h1>
                <div class="flex flex-row gap-[8px]">
                    <button class="btn">Inerview</button>
                    <button class="btn">Rejected</button>
                </div>
`
filterSection.appendChild(div)
  }
}