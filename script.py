from git import Repo
import datetime
import os

def git_push_with_library():
    # Path folder repo (folder saat ini)
    path_repo = os.path.dirname(os.path.abspath(__file__))
    
    try:
        # Inisialisasi objek Repo
        repo = Repo(path_repo)
        
        # Cek apakah ada perubahan?
        if repo.is_dirty(untracked_files=True):
            
            # 1. Git Add
            repo.git.add(all=True)
            print("[1/3] File added.")
            
            # 2. Git Commit
            waktu = datetime.datetime.now().strftime("%H:%M:%S")
            repo.index.commit(f"Update Log jam {waktu}")
            print("[2/3] Committed.")
            
            # 3. Git Push
            origin = repo.remote(name='origin')
            origin.push()
            print("[3/3] Pushed successfully.")
            
        else:
            print("Tidak ada perubahan data untuk di-push.")
            
    except Exception as e:
        print(f"Error: {e}")

# Jalankan fungsi
git_push_with_library()