import os
from PIL import Image

# folder tempat script ini berada
current_folder = os.path.dirname(os.path.abspath(__file__))

# loop semua file di folder
for filename in os.listdir(current_folder):
    if filename.lower().endswith((".png", ".jpg", ".jpeg", ".bmp", ".tiff", ".heic")):
        img_path = os.path.join(current_folder, filename)
        img = Image.open(img_path).convert("RGB")  # pastikan RGB

        # buat nama baru (ganti extension ke .webp)
        new_filename = os.path.splitext(filename)[0] + ".webp"
        output_path = os.path.join(current_folder, new_filename)

        # simpan sebagai WebP
        img.save(output_path, "WEBP", quality=85)

        # hapus file asli (kalau bukan .webp)
        if not filename.lower().endswith(".webp"):
            os.remove(img_path)

        print(f"Converted & replaced: {filename} → {new_filename}")

print("✅ Semua gambar berhasil dikonversi ke WebP & file asli dihapus!")
