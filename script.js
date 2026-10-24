const navbar =
document.getElementById("navbar");
if (navbar) {
window.addEventListener("scroll",function () {
    if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
}
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
if (localStorage.getItem("menu") === "show") {
    navMenu.classList.add("show");
}
if (menuBtn && navMenu) {
menuBtn.addEventListener("click",function() {
    navMenu.classList.toggle("show");
    if
    (navMenu.classList.contains("show")) {
        localStorage.setItem("menu","show")
    }else{
        localStorage.setItem("menu","hide")
    }
    });
}
let changeText =
document.getElementById("changeText");
let welcome =
document.getElementById("welcome");
if (localStorage.getItem("text") === "change") {
    if (welcome) {
        welcome.textContent = "Bring Your All";
}
}
if (changeText) {
if (welcome) {
    changeText.addEventListener("click",function() {
        if (welcome.textContent === "Bring Your Possibilities") {
            welcome.textContent = "Bring Your All"; 
            localStorage.setItem("text","change");
        } else {
            welcome.textContent = "Bring Your Possibilities";
            localStorage.setItem("text","revert");    
        }
    });
}
}
const searchBtn =
document.getElementById("searchBtn");
const searchOverlay =
document.getElementById("searchOverlay");
const closeSearch =
document.getElementById("closeSearch");
const searchInput =
document.getElementById("searchInput");
if (
searchBtn &&
searchOverlay &&
closeSearch
) {
searchBtn.addEventListener("click",function () {
    searchOverlay.classList.add("active");
    if (searchInput) {
        setTimeout(function () {
            searchInput.focus();
        }, 100);
    }              
    document.body.style.overflow = "hidden";
});
closeSearch.addEventListener("click",function () {
    searchOverlay.classList.remove("active");
});
}

const contactForm =
document.getElementById("contactForm");
const statusMessage =
document.getElementById("statusMessage");
if (contactForm) {
contactForm.addEventListener("submit",async function(event) {
    event.preventDefault();
    const name =
    document.getElementById("name").value.trim();
    const email =
    document.getElementById("email").value.trim();
    const subject =
    document.getElementById("subject").value.trim();
    const message =
    document.getElementById("message").value.trim();
     if (name.trim() === "" || email.trim() === "" || subject.trim() === "" || message.trim() === "") {
            statusMessage.textContent ="Oops! Something went wrong.";
            statusMessage.style.color = "red";
            return;
     }
     const dataToSend = {
        name: name,
        email: email,
        subject: subject,
        message: message,
     };
    try {
      const response = await
        fetch("https://formspree.io/f/xyegpvgz", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend) 
        });
        if (response.ok) {
            statusMessage.textContent ="Message sent successfully";
            statusMessage.style.color = "green";
            contactForm.reset();
        } else {
            const errorData = await response.json();
            console.log("Formspree error:", errorData);
            statusMessage.textContent = "Something went wrong. Please try again.";
            statusMessage.style.color = "red";
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        statusMessage.textContent = "Network error. Please try again later.";
        statusMessage.style.color = "red";
    }
});
}
const message =
document.getElementById("message");
const charCount =
document.getElementById("charCount");
if (message) {
    if (charCount) {
        message.addEventListener("input", function() {
            const count = message.value.length;
            charCount.textContent = `${count} / 500 characters`;
        });
    }
}
let themeBtn =
document.getElementById("themeBtn");
if (localStorage.getItem("theme")==="dark") {
    document.body.classList.add("dark-mode");
}
if (themeBtn) {
    themeBtn.addEventListener("click",function() {
        document.body.classList.toggle("dark-mode");
        if
        (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme","dark");
        }else{
            localStorage.setItem("theme","light");
        }
    });
}
const extraInfo =
document.getElementById("extraInfo");
const toggleButton =
document.getElementById("toggleButton");
if (toggleButton) {
if (extraInfo) {
    toggleButton.addEventListener("click",function() {
        if (window.getComputedStyle(extraInfo).display ==="none") {
            extraInfo.style.display ="block";
            toggleButton.textContent ="Show less";
        } else {
            extraInfo.style.display ="none";
            toggleButton.textContent ="Show More";
        }
    });              
}
}
const password =
document.getElementById("password");
const bar =
document.getElementById("bar");
const news =
document.getElementById("news");
const eye =
document.getElementById("eye");
if (password) {
if (bar) {
if (news) {
password.addEventListener("input",function() {
const length =
password.value.length;
if (length === 0) {
bar.style.width = "0";
news.textContent = "Start typing...";
} else if (length < 5) {
bar.style.width = "30%";
bar.style.background = "#ef4444";
news.textContent = "Weak password";
} else if (length < 9) {
bar.style.width = "65%";
bar.style.background = "#f59e0b";
news.textContent = "Medium password";
} else {
bar.style.width = "100%";
bar.style.background = "#22c55e";
news.textContent = "Strong password";
}
}); }}}
if (eye) {
eye.addEventListener("click", () => {
if(password.type === "password") {
password.type = "text";
} else {
password.type = "password";
}
});}
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const signupStatus = document.getElementById("signupStatus");

        signupStatus.textContent = "";
        signupStatus.textContent = "";
        if (password.value !== confirmPassword.value) {
            signupStatus.textContent = "Passwords do not match.";
            signupStatus.style.color = "red";
            return;
        }
        if (password.length < 8) {
            signupStatus.textContent = "Your password must contain at least 8 characters.";
            signupStatus.style.color = "red";
            return;
        }

        const submitButton = signupForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = "Creating account...";

        try {
            const { data, error } = await supabaseClient.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: fullName
                    }
                }
            });

            if (error) {
                throw error;
            }

            if (data.user && !data.session) {
                signupStatus.textContent =
                    "Registration started! Check your email for a confirmation link before signing in.";
            } else if (data.user && data.session) {
                signupStatus.textContent =
                    "Your account has been created successfully!";
            } else {
                signupStatus.textContent =
                    "Please check your email and follow any instructions provided.";
            }

            signupStatus.style.color = "green";
            signupForm.reset();

            const bar = document.getElementById("bar");
            const news = document.getElementById("news");

            if (bar) {
                bar.style.width = "0";
            }

            if (news) {
                news.textContent = "Start typing...";
            }
        } catch (error) {
            signupStatus.textContent =
                error.message || "Registration failed. Please try again.";
            signupStatus.style.color = "red";
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Create Account";
        }
    });
}