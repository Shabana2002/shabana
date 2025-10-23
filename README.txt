Shabana A — Bootstrap Portfolio (Baby Pink Theme)

Files included:
- index.html
- styles.css
- script.js
- avatar.svg (placeholder avatar)
- cert_thumb_1..cert_thumb_15.svg (placeholders)
- resume.pdf (your uploaded resume)

How to open locally in PyCharm:
1. Unzip the project into a folder.
2. Open PyCharm -> Open -> select the project folder.
3. Double-click index.html and right-click -> Open in Browser to preview.
4. To upload certificates: use the 'Upload Certificates' input (images or PDFs). Thumbnails will appear and you can preview them in the modal.

How to publish to GitHub Pages:
1. Create a repo (e.g., shabana-portfolio).
2. Upload all files to the repo root, including resume.pdf.
3. Settings -> Pages -> Choose 'main' branch and root folder -> Save.
4. The site will be available at https://yourusername.github.io/repo-name/

Notes for future edits:
- Projects carousel: Edit the <div class="carousel-inner"> in index.html. Each .carousel-item is a slide. Add more slides for new projects.
- Certificates: Uploaded files are client-side only (not saved to server). To permanently host certs, upload them to repo and update thumbnails or file links.
- To replace placeholder avatar: overwrite avatar.svg with your photo named avatar.svg or replace <img src="avatar.svg"> with your image path.
