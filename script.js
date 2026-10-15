/* =========================================
   SYAZA & AISY — WEBSITE FUNCTIONS
   ========================================= */


/* =========================================
   1. OPEN INVITATION
   ========================================= */

function openInvitation() {

    const invitation =
        document.getElementById("invitation");

    if (!invitation) return;

    invitation.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================================
   2. COUNTDOWN
   ========================================= */

// Wedding date
const weddingDate =
    new Date("December 5, 2026 20:00:00").getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const difference =
        weddingDate - now;


    // If the wedding date has passed
   
