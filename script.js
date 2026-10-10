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

const guestbookForm =
    document.getElementById("guestbookForm");


if (guestbookForm) {

    guestbookForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "messageName"
                ).value;


            const message =
                document.getElementById(
                    "guestMessage"
                ).value;


            // Create new message card

            const messageCard =
                document.createElement("div");


            messageCard.className =
                "message-card";


            messageCard.innerHTML = `
                <h4>❤️ ${name}</h4>
                <p>"${message}"</p>
            `;


            // Add message to guestbook

            document.getElementById(
                "messages"
            ).prepend(messageCard);


            // Clear form

            guestbookForm.reset();

        }
    );

}
