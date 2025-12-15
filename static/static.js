/* static/script.js
   Berisi logika untuk interaksi halaman Login dan Dashboard
*/

// --- FITUR 1: Animasi Fade-In saat halaman dimuat ---
// Event 'DOMContentLoaded' memastikan JS berjalan setelah HTML selesai dibaca browser
/* static/script.js */

document.addEventListener("DOMContentLoaded", function () {
  // --- SETUP FITUR PASSWORD ---
  const toggleIcon = document.getElementById("icon-toggle");
  const passwordInput = document.getElementById("password");

  // Cek apakah kedua elemen ini ditemukan di halaman?
  if (toggleIcon && passwordInput) {
    // Kita pasang "telinga" (listener) untuk mendengar klik
    toggleIcon.addEventListener("click", function () {
      // Tes di Console browser (F12)
      console.log("Tombol mata diklik!");

      if (passwordInput.type === "password") {
        // Ubah jadi Text
        passwordInput.type = "text";

        // Ganti Ikon jadi Mata Dicoret
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
      } else {
        // Balikin jadi Password
        passwordInput.type = "password";

        // Ganti Ikon jadi Mata Biasa
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
      }
    });
  }

  // ... Kode animasi fade-in Anda yang lain bisa ditaruh di bawah sini ...
});

// --- FITUR 2: Toggle Lihat Password (Versi Font Awesome) ---
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.getElementById("icon-toggle");

  if (passwordInput && toggleIcon) {
    if (passwordInput.type === "password") {
      // 1. Ubah tipe input jadi text (terlihat)
      passwordInput.type = "text";

      // 2. Ubah ikon: Hapus 'fa-eye', Tambah 'fa-eye-slash' (mata dicoret)
      toggleIcon.classList.remove("fa-eye");
      toggleIcon.classList.add("fa-eye-slash");
    } else {
      // 1. Kembalikan jadi password (titik-titik)
      passwordInput.type = "password";

      // 2. Ubah ikon: Hapus 'fa-eye-slash', Tambah 'fa-eye' (mata biasa)
      toggleIcon.classList.remove("fa-eye-slash");
      toggleIcon.classList.add("fa-eye");
    }
  }
}

// --- FITUR 3: Sapaan Waktu Dinamis (untuk Halaman Dashboard) ---
function aturSapaanWaktu() {
  const elemenSapaan = document.getElementById("sapaan-waktu");
  const namaUserSpan = document.getElementById("nama-user");

  // Cek apakah kita berada di halaman dashboard (ada elemen sapaan?)
  if (elemenSapaan && namaUserSpan) {
    // Ambil jam saat ini dari browser pengguna (0 - 23)
    const jam = new Date().getHours();
    let sapaan = "Selamat Datang";

    // Logika menentukan Pagi/Siang/Sore/Malam
    if (jam >= 4 && jam < 11) {
      sapaan = "Selamat Pagi";
    } else if (jam >= 11 && jam < 15) {
      sapaan = "Selamat Siang";
    } else if (jam >= 15 && jam < 18) {
      sapaan = "Selamat Sore";
    } else {
      sapaan = "Selamat Malam";
    }

    // Ambil nama yang dikirim dari Python (tersimpan di dalam span tadi)
    const nama = namaUserSpan.textContent;

    // Gabungkan sapaan baru dengan nama user
    elemenSapaan.innerHTML = `${sapaan}, ${nama}!`;
  }
}
