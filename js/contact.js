document.addEventListener(
  "input",
  event => {
    if (event.target.tagName.toLowerCase() !== "textarea") return;
    autoExpand(event.target);
  },
  false
);

// *** This code was to show the user some feedback that the form was submitted
// *** but e.preventDefault stops the form being sent to Formspree

// const form = document.getElementById("contactForm");

// form.addEventListener("submit", e => {
//   e.preventDefault();
//   const contactHeading = document.querySelector(".contact__heading");
//   const alert = document.querySelector(".alert");

//   // Show alert when user submits form
//   contactHeading.style.display = "none";
//   alert.style.display = "block";
//   alert.classList.add("animated", "fadeInLeft");

//   // Hide alert after 3 seconds
//   setTimeout(() => {
//     alert.classList.remove("animated", "fadeInLeft");
//     alert.style.display = "none";
//     contactHeading.style.display = "block";
//   }, 3500);

//   // clear form
//   document.getElementById("contactForm").reset();
// });

// auto expand text field
const autoExpand = function(textField) {
  // Reset textField height
  textField.style.height = "inherit";

  // Get the computed styles for the element
  const computed = window.getComputedStyle(textField);

  // Calculate the height
  let height =
    parseInt(computed.getPropertyValue("border-top-width"), 10) +
    textField.scrollHeight +
    parseInt(computed.getPropertyValue("border-bottom-width"), 10);

  // ** original code included padding top n bottom in the height but that gave the input
  // ** an extra 10px as soon as you started typing so I removed them & it worked perfectly..
  // parseInt(computed.getPropertyValue("padding-top"), 10) +
  // parseInt(computed.getPropertyValue("padding-bottom"), 10) +
  // const margin = parseInt(computed.getPropertyValue("margin-bottom"), 10);

  textField.style.height = height + "px";
};
