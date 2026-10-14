/* =========================================
   SYAZA & AISY — WEBSITE FUNCTIONS
   ========================================= */


/* =========================================
   1. OPEN INVITATION
   ========================================= */

function openInvitation() {

    const invitation = document.getElementById("invitation");

    invitation.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================================
   2. COUNTDOWN
   ========================================= */

// Wedding date
const weddingDate = new Date("December 5, 2026 20:00:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const difference = weddingDate - now;


    // If the wedding date has passed
    if (difference <= 0) {

        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";

        return;
    }


    // Calculate time remaining

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );


    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );


    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );


    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    // Display countdown

    document.getElementById("days").innerText =
        String(days).padStart(2, "0");

    document.getElementById("hours").innerText =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").innerText =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").innerText =
        String(seconds).padStart(2, "0");

}


// Update every second

setInterval(updateCountdown, 1000);


// Run immediately

updateCountdown();



/* =========================================
   3. MUSIC
   ========================================= */

let musicPlaying = false;


function toggleMusic() {

    const music =
        document.getElementById("weddingMusic");

    const button =
        document.getElementById("musicButton");


    if (!musicPlaying) {

        music.play();

        button.innerHTML = "❚❚";

        musicPlaying = true;

    } else {

        music.pause();

        button.innerHTML = "♫";

        musicPlaying = false;

    }

}



/* =========================================
   4. RSVP FORM
   ========================================= */

const rsvpForm =
    document.getElementById("rsvpForm");


if (rsvpForm) {

    rsvpForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            // Hide form

            rsvpForm.style.display = "none";


            // Show thank-you message

            document.getElementById(
                "rsvpThankYou"
            ).style.display = "block";

        }
    );

}



/* =========================================
   5. GUESTBOOK
   ========================================= */

const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzoxEIaouK29IIgCN_PEondzNHXXYtbQgPwVNF6EZdgIjIc3ycqXr4a781XTIMhsQKP_SQ/exec";


const guestbookForm =
    document.getElementById("guestbookForm");

const guestbookMessages =
    document.getElementById("guestbookMessages");


/* -----------------------------------------
   LOAD PREVIOUS UCAPAN
   ----------------------------------------- */

function loadGuestbook() {

    if (!guestbookMessages) return;

    guestbookMessages.innerHTML = "Loading ucapan...";

    const script = document.createElement("script");

    script.src =
        SCRIPT_URL +
        "?action=getGuestbook&callback=showGuestbook";

    script.onerror = function () {

        guestbookMessages.innerHTML =
            "Ucapan tidak dapat dimuatkan.";

        console.log("Guestbook loading failed.");

    };

    document.body.appendChild(script);
}


function showGuestbook(data) {

    console.log("Guestbook data received:", data);

    if (!guestbookMessages) return;

    guestbookMessages.innerHTML = "";

    if (!data || data.length === 0) {

        guestbookMessages.innerHTML =
            "Belum ada ucapan lagi ❤️";

        return;
    }


    data.forEach(function(item) {

        const messageCard =
            document.createElement("div");

        messageCard.className =
            "guest-message";


        const guestName =
            document.createElement("div");

        guestName.className =
            "guest-name";

        guestName.textContent =
            item.name;


        const guestText =
            document.createElement("div");

        guestText.className =
            "guest-text";

        guestText.textContent =
            item.message;


        messageCard.appendChild(guestName);

        messageCard.appendChild(guestText);

        guestbookMessages.appendChild(messageCard);

    });

}

/* -----------------------------------------
   SUBMIT NEW UCAPAN
   ----------------------------------------- */

if (guestbookForm) {

    guestbookForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "guest-name"
                ).value.trim();


            const message =
                document.getElementById(
                    "guest-message"
                ).value.trim();


            if (!name || !message) {

                return;

            }


            const data =
                new URLSearchParams();


            data.append(
                "type",
                "guestbook"
            );


            data.append(
                "name",
                name
            );


            data.append(
                "message",
                message
            );


            try {

                await fetch(
                    SCRIPT_URL,
                    {
                        method: "POST",
                        body: data,
                        mode: "no-cors"
                    }
                );


                /* Add new message immediately */

                const messageCard =
                    document.createElement("div");


                messageCard.className =
                    "guest-message";


                messageCard.innerHTML = `
                    <div class="guest-name">
                        ${name}
                    </div>

                    <div class="guest-text">
                        ${message}
                    </div>
                `;


                guestbookMessages.prepend(
                    messageCard
                );


                /* Clear form */

                guestbookForm.reset();


            } catch (error) {

                alert(
                    "Something went wrong. Please try again."
                );

            }

        }
    );

}


/* -----------------------------------------
   LOAD UCAPAN WHEN WEBSITE OPENS
   ----------------------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadGuestbook();

    }
);
