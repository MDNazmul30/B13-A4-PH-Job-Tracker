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
    const appliedJobs = InterviewList.length + RejectedList.length;
    const totalJobs = allcards.children.length;
        if (appliedJobs === 0) {
        avaliableJobCount.innerText = totalJobs + ' Jobs';
    } else {
        avaliableJobCount.innerText = appliedJobs + ' of ' + totalJobs + ' Jobs';
    }
    
}

count()

function toggleStyle(id) {
   
    allFiltBtn.classList.remove('bg-blue-500', 'text-white')
    rejectedFilterBtn.classList.remove('bg-blue-500', 'text-white')
    interviewFilterBtn.classList.remove('bg-blue-500', 'text-white')
    
    allFiltBtn.classList.add('bg-white', 'text-gray-600', 'border', 'border-gray-300')
    rejectedFilterBtn.classList.add('bg-white', 'text-gray-600', 'border', 'border-gray-300')
    interviewFilterBtn.classList.add('bg-white', 'text-gray-600', 'border', 'border-gray-300')
    
    const selected = document.getElementById(id)
    selected.classList.remove('bg-white', 'text-gray-600', 'border', 'border-gray-300')
    selected.classList.add('bg-blue-500', 'text-white')

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
            InterviewList = InterviewList.filter(item => item.id != cardInfo.id)
        }
        
        filterRejected()
        count()
    }
})

function filterInterview() {
    filterSection.innerHTML = '';

    // Check if InterviewList is empty
    if (InterviewList.length === 0) {
        filterSection.innerHTML = `
            <div class="text-center p-10 bg-white rounded-xl">
             <img class="mx-auto" src="./jobs.png" alt="">

                <h2 class="font-bold text-[#002C5C]">No Jobs Available</h2>
                <p class="text-gray-500">Check back soon for new job opportunities</p>
            </div>`;
        
        // Update job count if you have a jobCount element
        if (document.getElementById('available-jobs-count')) {
            document.getElementById('available-jobs-count').innerText = '0 Jobs';
        }
        return;
    }

    // If there are jobs, display them
    for (let intervw of InterviewList) {
        console.log(intervw)
        let div = document.createElement('div');
        div.className = 'card p-5 border-1 rounded-xl space-y-5'
        div.innerHTML = `<div class="card p-5 bg-white rounded-xl space-y-5">

                <div class="flex flex-row place-content-between">
                    <div class="">
                        <h1 class="heading1st"> ${intervw.heading1st}</h1>
                        <h1 class="heading2nd text-[#64748B]">
                              ${intervw.heading2nd}
                        </h1>
                    </div>

                    <i class="delete fa-solid fa-trash text-black-500 hover:text-white bg-gray-100 hover:bg-blue-500 rounded-full p-5 cursor-pointer"></i>
                </div>
                <h1 class="salaryDetails text-[#64748B]">  ${intervw.salaryDetails}</h1>
                <button class="status btn w-25 hidden bg-[#EEF4FF]">Not Applied</button>

                <h1 class="descriptiion">  ${intervw.description}</h1>
                <div class="flex flex-row gap-[8px]">
                    <button class="interviewBtn btn border-green-500 hover:bg-green-500">Inerview</button>
                    <button class="rejectedBtn btn border-red-500 hover:bg-red-500">Rejected</button>
                </div>


            </div>
        `
        filterSection.appendChild(div)
    }
}

function filterRejected() {
    filterSection.innerHTML = '';

    // Check if RejectedList is empty
    if (RejectedList.length === 0) {
        filterSection.innerHTML = `
            <div class="text-center p-10">
                <i class="fa-solid fa-folder-open text-4xl mb-2"></i>
                <h2 class="font-bold">No Jobs Available</h2>
                <p>You haven't added any jobs here yet</p>
            </div>`;
        
        // Update job count if you have a jobCount element
        if (document.getElementById('available-jobs-count')) {
            document.getElementById('available-jobs-count').innerText = '0 Jobs';
        }
        return;
    }

    // If there are jobs, display them
    for (let reject of RejectedList) {
        console.log(reject)
        let div = document.createElement('div');
        div.className = 'card p-5 border-1 rounded-xl space-y-5'
        div.innerHTML = `
          <div class="card p-5 bg-white rounded-xl space-y-5">

                <div class="flex flex-row place-content-between">
                    <div class="">
                        <h1 class="heading1st"> ${reject.heading1st}</h1>
                        <h1 class="heading2nd text-[#64748B]">
                              ${reject.heading2nd}
                        </h1>
                    </div>

                    <i class="delete fa-solid fa-trash text-black-500 hover:text-white bg-gray-100 hover:bg-blue-500 rounded-full p-5 cursor-pointer"></i>
                </div>
                <h1 class="salaryDetails text-[#64748B]">  ${reject.salaryDetails}</h1>
                <button class="status btn w-25 hidden bg-[#EEF4FF]">Not Applied</button>

                <h1 class="descriptiion">  ${reject.description}</h1>
                <div class="flex flex-row gap-[8px]">
                    <button class="interviewBtn btn border-green-500 hover:bg-green-500">Inerview</button>
                    <button class="rejectedBtn btn border-red-500 hover:bg-red-500">Rejected</button>
                </div>


            </div>
        `
        filterSection.appendChild(div)
    }
}

// Add delete functionality
filterSection.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
        const card = event.target.closest('.card');
        const heading1st = card.querySelector('.heading1st').innerText;
        const heading2nd = card.querySelector('.heading2nd').innerText;
        const salaryDetails = card.querySelector('.salaryDetails').innerText;
        const cardId = heading1st + heading2nd + salaryDetails;
        

        InterviewList = InterviewList.filter(item => item.id != cardId);
        RejectedList = RejectedList.filter(item => item.id != cardId);
 
        card.remove();
        
        if (!allcards.classList.contains('hidden')) {
        
            count();
        } else if (!filterSection.classList.contains('hidden')) {
     
            if (document.getElementById('Interview-filter-btn').classList.contains('bg-black')) {
                filterInterview();
                count();
            } else if (document.getElementById('Rejected-filter-btn').classList.contains('bg-black')) {
                filterRejected();
                count();
            }
        } else {
            count();
        }
    }
});

// Add delete functionality for MAIN CARDS (when viewing All jobs)
allcards.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
        const card = event.target.closest('.card');
        
  
        const heading1st = card.querySelector('.heading1st').innerText;
        const heading2nd = card.querySelector('.heading2nd').innerText;
        const salaryDetails = card.querySelector('.salaryDetails').innerText;
        const cardId = heading1st + heading2nd + salaryDetails;
        

        InterviewList = InterviewList.filter(item => item.id != cardId);
        RejectedList = RejectedList.filter(item => item.id != cardId);
        
        card.remove();
        count();
    }
});