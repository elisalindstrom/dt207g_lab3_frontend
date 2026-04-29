"use strict";

const form = document.querySelector("#form");
const companyname = document.querySelector("#companyname");
const jobtitle = document.querySelector("#jobtitle");
const startdate = document.querySelector("#startdate");
const enddate = document.querySelector("#enddate");
const message = document.querySelector("#error");
const confirmation = document.querySelector("#confirmation");

// Validering efter submit
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let errors = [];

    if (!companyname.value.trim()) {
        errors.push("Fyll i företag");
    }

    if (!jobtitle.value.trim()) {
        errors.push("Fyll i jobbtitel");
    }

    if (!startdate.value) {
        errors.push("Fyll i startdatum");
    }

    if (errors.length > 0) {
        message.innerHTML = "";

        errors.forEach(error => {
            let liEl = document.createElement("li");
            liEl.textContent = error;
            message.appendChild(liEl);
        })
        return; // Return vid error
    }

    message.innerHTML = "";
    createWorkexperience();
});

// Lägg till ny workexperience i API:et
async function createWorkexperience() {
    let experience = {
        companyname: companyname.value.trim(),
        jobtitle: jobtitle.value.trim(),
        startdate: startdate.value,
        enddate: enddate.value || null
    };

    try {
        const response = await fetch("https://dt207g-lab3.onrender.com/workexperience", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(experience)
        })

        confirmation.textContent = "Arbetserfarenhet tillagd";
        form.reset();
    } catch (error) {
        console.error("Något gick fel:" + error);
    }
};
