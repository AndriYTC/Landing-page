
document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("Email");
    const message = document.getElementById("message");

    
    const errorName = document.getElementById("error-name");
    const errorEmail = document.getElementById("error-email");
    const errorMessage = document.getElementById("error-message");

    [errorName, errorEmail, errorMessage].forEach(el => el.textContent = '');
    [name, email, message].forEach(input => input.classList.remove('border-red-500'));

    let isValid = true;

    if (!name.value.trim()) {
      errorName.textContent = "Nama tidak boleh kosong !!!";
      name.classList.add("border-red-500");
      isValid = false;
    }

    if (!email.value.trim() || !email.value.includes("@")) {
      errorEmail.textContent = "Email tidak valid !!! ";
      email.classList.add("border-red-500");
      isValid = false;
    }

    if (!message.value.trim()) {
      errorMessage.textContent = "Pesan tidak boleh kosong !!!";
      message.classList.add("border-red-500");
      isValid = false;
    }

    if (!isValid) return;

    const form = e.target;
    const data = new FormData(form);
    const action = form.action;

    try {
      const res = await fetch(action, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        form.reset();
        document.getElementById("popup-success").classList.remove("hidden");
        document.getElementById("popup-success").classList.add("flex");
      } else {
        alert("Terjadi kesalahan saat mengirim.");
      }
    } catch (err) {
      alert("Gagal mengirim pesan. Silakan coba lagi.");
    }
});
  
document.querySelectorAll("[data-modal-hide]").forEach(btn => {
  btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-modal-hide");
      const modal = document.getElementById(id);
      if (modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
      }
  });
});

function openModal() {
  document.getElementById("contactModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("contactModal").classList.add("hidden");
}