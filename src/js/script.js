document.addEventListener("DOMContentLoaded", () => {
    // Constants
    const openingTime = 9;
    const closingTime = 17;
    
     // Status Indicator Update
     const updateStatus = () => {
        const statusIndicator = document.querySelector(".status-indicator");
        if (statusIndicator) {
            statusIndicator.innerHTML = ''; // Clear previous content
            const statusDot = document.createElement("span");
            statusDot.classList.add("status-dot");
            statusIndicator.prepend(statusDot);
 
            const now = new Date();
            const currentHour = now.getHours();
            const isOpen = currentHour >= openingTime && currentHour < closingTime;
            
            statusDot.style.backgroundColor = isOpen ? "green" : "red";
            
            if (isOpen) {
                const hoursRemaining = closingTime - currentHour;
                const minutesRemaining = 60 - now.getMinutes();
                
                if (hoursRemaining === 1) {
                    statusIndicator.append(`Open for ${minutesRemaining} more minutes`);
                } else if (hoursRemaining < 1) {
                    statusIndicator.append(`Open for ${minutesRemaining} more minutes`);
                } else {
                    statusIndicator.append(`Open for ${hoursRemaining} more hours`);
                }
            } else {
                statusIndicator.append(`Closed until ${openingTime}:00 AM`);
            }
        }
    };
 
    // Hours Text Update
    const updateHoursText = () => {
        const hoursElement = document.querySelector(".hours");
        if (hoursElement) {
            const isMobile = window.matchMedia("(max-width: 820px)").matches;
            const hoursText = isMobile ? "Thurs Hrs: 9 AM - 5 PM" : "Thursday Hours: 9:00 AM - 5:00 PM";
            hoursElement.innerHTML = `
                <span class="material-symbols-outlined">schedule</span>
                ${hoursText}
                <span class="dropdown-chevron material-symbols-outlined">expand_more</span>
            `;
        }
    };
 
    // Initialize status and hours
    updateStatus();
    updateHoursText();
    window.addEventListener("resize", updateHoursText);
 
    // Dropdown functionality
    const hoursHeader = document.querySelector(".hours-header");
    if (hoursHeader) {
        const dropdown = document.querySelector(".hours-dropdown");
        const weekHours = dropdown.querySelector(".week-hours");
        let isOpen = false;
 
        hoursHeader.addEventListener("click", () => {
            isOpen = !isOpen;
            dropdown.classList.toggle("open");
            
            if (weekHours) {
                weekHours.style.maxHeight = isOpen ? `${weekHours.scrollHeight}px` : "0";
            }
            
            const chevron = dropdown.querySelector(".dropdown-chevron");
            if (chevron) {
                chevron.textContent = isOpen ? "expand_less" : "expand_more";
            }
        });
    }
 
     // Email copy functionality
     const emailElement = document.querySelector('.contact');
     let isAnimating = false;
     
     if (emailElement) {
         emailElement.addEventListener('click', async () => {
             if (isAnimating) return;
             
             const emailText = 'ritewayplumbing@gmail.com';
             try {
                 await navigator.clipboard.writeText(emailText);
                 isAnimating = true;
                 const originalHTML = emailElement.innerHTML;
                 emailElement.innerHTML = originalHTML + ' <span style="color: green;">(Copied!)</span>';
                 setTimeout(() => {
                     emailElement.innerHTML = originalHTML;
                     isAnimating = false;
                 }, 2000);
             } catch (err) {
                 console.error('Failed to copy:', err);
                 isAnimating = false;
             }
         });
     }
 
    // Mobile menu
    document.querySelector(".close-menu")?.addEventListener("click", () => {
        document.getElementById("menu-toggle").checked = false;
    });
 
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            document.getElementById("menu-toggle").checked = false;
        });
    });
 });