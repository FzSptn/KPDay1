from flask import Flask, render_template, request, redirect, url_for, session, flash

app = Flask(__name__)

# KUNCI RAHASIA (Wajib untuk menggunakan Session)
# Fungsinya untuk mengamankan data login browser.
# Ganti dengan tulisan acak apa saja.
app.secret_key = 'kucing_terbang_makan_ikan_paus'

# Data Login Hardcoded (Hanya untuk latihan!)
# Di aplikasi nyata, ini disimpan di Database dan diproses dengan hash.
USERNAME_BENAR = "John"
PASSWORD_BENAR = "123456"

# Route untuk Halaman Login (Menangani GET dan POST)
@app.route("/", methods=['GET', 'POST'])
def login():
    # Cek jika user sudah login sebelumnya, langsung lempar ke dashboard
    if 'logged_in' in session:
        return redirect(url_for('dashboard'))

    # Jika ada pengiriman data formulir (tombol Login ditekan)
    if request.method == 'POST':
        # Ambil data dari input HTML berdasarkan atribut 'name'
        user_input = request.form['username']
        pass_input = request.form['password']

        # Cek apakah username dan password cocok
        if user_input == USERNAME_BENAR and pass_input == PASSWORD_BENAR:
            # BERHASIL: Simpan status login di session browser
            session['logged_in'] = True
            session['user_name'] = user_input # Simpan nama untuk ditampilkan nanti
            return redirect(url_for('dashboard'))
        else:
            # GAGAL: Kirim pesan error (flash message)
            flash('Username atau Password salah!', 'error')
    
    # Jika hanya membuka halaman (GET request), tampilkan formulir login
    return render_template("login.html")

# Route untuk Halaman Dashboard (Hanya bisa diakses jika login)
@app.route("/dashboard")
def dashboard():
    # Cek keamanan: Apakah user punya session login?
    if 'logged_in' in session:
        # Jika ya, tampilkan halaman dashboard dan kirim nama user
        nama_user = session['user_name']
        return render_template("dashboard.html", nama=nama_user)
    else:
        # Jika tidak, tendang balik ke halaman login
        flash('Anda harus login terlebih dahulu.', 'warning')
        return redirect(url_for('login'))

# Route untuk Logout
@app.route("/logout")
def logout():
    # Hapus data session (melupakan user)
    session.pop('logged_in', None)
    session.pop('user_name', None)
    flash('Anda berhasil logout.', 'info')
    return redirect(url_for('login'))

if __name__ == "__main__":
    app.run(debug=True)