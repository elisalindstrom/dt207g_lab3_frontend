import './style.css'

fetchWorkexperiences();

// Hämta data från API
async function fetchWorkexperiences() {
    try {
        const response = await fetch("https://dt207g-lab3.onrender.com/workexperience");
        const workexperience = await response.json();

        if (!workexperience) return;

        console.log(workexperience); // Ta bort

        displayWorkexperiences(workexperience);
    } catch (error) {
        console.error("Något gick fel:" + error);
    }
}

// Skriv ut lista på arbetserfarenheter
function displayWorkexperiences(workexperience) {
    const cvList = document.querySelector("#cv-list");
    cvList.innerHTML = "";

    workexperience.forEach(experience => {
        const liEl = document.createElement("li");
        const titleEl = document.createElement("span");
        titleEl.classList.add("bold");
        const companyEl = document.createElement("span");
        const dateEl = document.createElement("span");
        const startdate = new Date(experience.startdate).toLocaleDateString();
        let enddate = experience.enddate;

        // Kontroll av enddate
        if (enddate) {
            enddate = new Date(experience.enddate).toLocaleDateString();
        } else {
            enddate = "Pågående";
        }

        titleEl.textContent = `${experience.jobtitle}`;
        companyEl.textContent = `${experience.companyname}`;
        dateEl.textContent = `${startdate} - ${enddate}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Ta bort";

        // Lägg till eventlistener
        deleteBtn.addEventListener("click", () => {
            deleteWorkexperience(experience._id);
        });

        liEl.append(titleEl, companyEl, dateEl, deleteBtn);
        cvList.appendChild(liEl);
    });
}

async function deleteWorkexperience(id) {
    try {
        const response = await fetch(`https://dt207g-lab3.onrender.com/workexperience/${id}`, {
            method: "DELETE"
        });
        fetchWorkexperiences();
    } catch (error) {
        console.error("Något gick fel:" + error);
    }
}