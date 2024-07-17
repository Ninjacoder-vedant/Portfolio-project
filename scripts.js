let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");
let submitbtn = document.querySelector(".submit-btn");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 200;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector(`header nav a[href*=${id}]`)
          .classList.add("active");
      });
    }
  });
};
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phoneNumber: formData.get("phoneNumber"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    fetch(
      "https://script.google.com/macros/s/AKfycbwk11x1q9F9rxJDIfMHXeD7mR9BDrJyq4ubuy_a3_jsHp4nlm-efNCtEy3wvtgyUZ76Ag/exec", // appscript linked with google
      {
        method: "POST",
        body: new URLSearchParams(data),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Form submitted successfully.");
          document.getElementById("contact-form").reset();
          // clear the form fields
        } else {
          throw new Error("Form submission failed");
        }
      })
      .catch((error) => {
        console.error("Error!", error.message);
      });
  });
