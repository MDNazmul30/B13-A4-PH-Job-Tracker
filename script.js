let InterviewList = [];
let RejectedList = [];

let total = document.getElementById('total')
let Rejected = document.getElementById('Rejected')
let Interview = document.getElementById('Interview')

const allFiltBtn = document.getElementById('all-filter-btn')
const rejectedFilterBtn = document.getElementById('Rejected-filter-btn')
const interviewFilterBtn = document.getElementById('Interview-filter-btn')

let allcards = document.getElementById('allcards')
const mainContainer = document.querySelector('main')
const filterSection = document.getElementById('filterSection')
const statusSection = document.querySelector('.card');
const avaliableJobCount=document.getElementById('avaliableJobCount')


function count() {
    total.innerText = allcards.children.length;
    Interview.innerText = InterviewList.length;
    Rejected.innerText = RejectedList.length;
    const totalJobs = allcards.children.length;
    avaliableJobCount.innerText = totalJobs + ' Jobs';
}
count()

function toggleStyle(id) {
    allFiltBtn.classList.remove('bg-black', 'text-white')
    rejectedFilterBtn.classList.remove('bg-black', 'text-white')
    interviewFilterBtn.classList.remove('bg-black', 'text-white')
    
    allFiltBtn.classList.add('bg-gray-300', 'text-white')
    rejectedFilterBtn.classList.add('bg-gray-300', 'text-white')
    interviewFilterBtn.classList.add('bg-gray-300', 'text-white')
    
    console.log(id);
    const selected = document.getElementById(id)
    selected.classList.remove('bg-gray-300', 'text-black')
    selected.classList.add('bg-black', 'text-white')

    if (id == 'Interview-filter-btn') {
        statusSection.classList.add('hidden')
        allcards.classList.add('hidden')
        filterSection.classList.remove('hidden')
        filterInterview()
    }
    else if (id == 'Rejected-filter-btn') {
        allcards.classList.add('hidden')
        statusSection.classList.add('hidden') 
        filterSection.classList.remove('hidden')
        filterRejected()
    }
    else if (id == 'all-filter-btn') {
        statusSection.classList.remove('hidden') 
        allcards.classList.remove('hidden')
        filterSection.classList.add('hidden')
    }
}

mainContainer.addEventListener('click', function(event) {
    // Handle Interview button click
    if (event.target.classList.contains('interviewBtn')) {
        const parentNode = event.target.closest('.card');
        const heading1st = parentNode.querySelector('.heading1st').innerText
        const heading2nd = parentNode.querySelector('.heading2nd').innerText
        const description = parentNode.querySelector('.descriptiion').innerText
        const salaryDetails = parentNode.querySelector('.salaryDetails').innerText
        
        // Generate a unique ID based on content
        const cardId = heading1st + heading2nd + salaryDetails;
        
         const statusBtn = parentNode.querySelector('.status');
         statusBtn.classList.remove('hidden');  
         statusBtn.innerText = 'Interview';

        const cardInfo = {
            salaryDetails,
            description,
            heading2nd,
            heading1st,
            id: cardId
        }
        
        const jobExist = InterviewList.find(item => item.id == cardInfo.id)
        
        if (!jobExist) {
            InterviewList.push(cardInfo)
            // Remove from RejectedList if it exists there
            RejectedList = RejectedList.filter(item => item.id != cardInfo.id)
        }
        
        filterInterview()
        count()
    }
    
    // Handle Rejected button click
    if (event.target.classList.contains('rejectedBtn')) {
        const parentNode = event.target.closest('.card');
        const heading1st = parentNode.querySelector('.heading1st').innerText
        const heading2nd = parentNode.querySelector('.heading2nd').innerText
        const description = parentNode.querySelector('.descriptiion').innerText
        const salaryDetails = parentNode.querySelector('.salaryDetails').innerText
        
        // Generate a unique ID based on content
        const cardId = heading1st + heading2nd + salaryDetails;
        
         const statusBtn = parentNode.querySelector('.status');
         statusBtn.classList.remove('hidden');  
         statusBtn.innerText = 'Rejected';
        
        const cardInfo = {
            salaryDetails,
            description,
            heading2nd,
            heading1st,
            id: cardId
        }
        
        const jobExist = RejectedList.find(item => item.id == cardInfo.id)
        
        if (!jobExist) {
            RejectedList.push(cardInfo)
            // Remove from InterviewList if it exists there
            InterviewList = InterviewList.filter(item => item.id != cardInfo.id)
        }
        
        filterRejected()
        count()
    }
})

function filterInterview() {
    filterSection.innerHTML = ''
    for (let intervw of InterviewList) {
        console.log(intervw)
        let div = document.createElement('div');
        div.className = 'card p-5 border-1 rounded-xl space-y-5'
        div.innerHTML = `
            <div class="flex flex-row place-content-between space-y-4">
                <div class="">
                    <h1 class="heading1st">${intervw.heading1st}</h1>
                    <h1 class="heading2nd">
                        ${intervw.heading2nd}
                    </h1>
                </div>
                <i class="fa-solid fa-trash rounded-full"></i>
            </div>
            <h1 class="salaryDetails">${intervw.salaryDetails}</h1>
            <button class="status btn btn-sm w-24">Interview</button>
            <h1 class="descriptiion">${intervw.description}</h1>
            <div class="flex flex-row gap-[8px]">
                <button class="btn">Interview</button>
                <button class="btn">Rejected</button>
            </div>
        `
        filterSection.appendChild(div)
    }
}

function filterRejected() {
    filterSection.innerHTML = ''
    for (let reject of RejectedList) {
        console.log(reject)
        let div = document.createElement('div');
        div.className = 'card p-5 border-1 rounded-xl space-y-5'
        div.innerHTML = `
            <div class="flex flex-row place-content-between space-y-4">
                <div class="">
                    <h1 class="heading1st">${reject.heading1st}</h1>
                    <h1 class="heading2nd">
                        ${reject.heading2nd}
                    </h1>
                </div>
                <i class="fa-solid fa-trash rounded-full"></i>
            </div>
            <h1 class="salaryDetails">${reject.salaryDetails}</h1>
            <button class="status btn btn-sm w-24">Rejected</button>
            <h1 class="descriptiion">${reject.description}</h1>
            <div class="flex flex-row gap-[8px]">
                <button class="btn">Interview</button>
                <button class="btn">Rejected</button>
            </div>
        `
        filterSection.appendChild(div)
    }
}

// Add delete functionality
filterSection.addEventListener('click', function(event) {
    if (event.target.classList.contains('fa-trash')) {
        const card = event.target.closest('.card');
        const heading1st = card.querySelector('.heading1st').innerText;
        const heading2nd = card.querySelector('.heading2nd').innerText;
        const salaryDetails = card.querySelector('.salaryDetails').innerText;
        const cardId = heading1st + heading2nd + salaryDetails;
        
        // Remove from both lists
        InterviewList = InterviewList.filter(item => item.id != cardId);
        RejectedList = RejectedList.filter(item => item.id != cardId);
        
        // Remove the card
        card.remove();
        
        // Refresh the current view
        if (!allcards.classList.contains('hidden')) {
            // If we're in all cards view
            count();
        } else if (!filterSection.classList.contains('hidden')) {
            // If we're in filtered view
            if (document.getElementById('Interview-filter-btn').classList.contains('bg-black')) {
                filterInterview();
            } else if (document.getElementById('Rejected-filter-btn').classList.contains('bg-black')) {
                filterRejected();
            }
        }
        
        count();
    }
});