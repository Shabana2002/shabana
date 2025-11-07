// Script: typing effect, back-to-top, certificates upload & preview, thumbnail click preview
document.addEventListener('DOMContentLoaded', function(){

  // Typing effect
  const typedEl = document.getElementById('typed');
  const text = 'Hi, I\'m Shabana A';
  let idx = 0;
  function type(){ if(idx<=text.length){ typedEl.textContent = text.slice(0, idx); idx++; setTimeout(type, 50); } }
  type();

  // Back to top
  const back = document.getElementById('backTop');
  back.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));
  window.addEventListener('scroll', ()=>{ back.style.display = (window.scrollY>300)?'flex':'none'; });

  // Certificate thumbnail preview click -> modal
  const certGrid = document.getElementById('certGrid');
  const previewModal = new bootstrap.Modal(document.getElementById('previewModal'));
  const previewArea = document.getElementById('previewArea');

  document.querySelectorAll('.thumb-img').forEach(img=>{
    img.style.cursor='pointer';
    img.addEventListener('click', ()=> openPreview(img.getAttribute('src')));
  });

  function openPreview(src){
    previewArea.innerHTML = '';
    if(src.endsWith('.pdf')){
      // show embed for pdf
      const embed = document.createElement('embed');
      embed.src = src;
      embed.type = 'application/pdf';
      embed.style.width='100%'; embed.style.height='80vh';
      previewArea.appendChild(embed);
    } else {
      const im = document.createElement('img');
      im.src = src; im.style.maxWidth='95%'; im.style.maxHeight='80vh'; im.className='img-fluid';
      previewArea.appendChild(im);
    }
    previewModal.show();
  }

  // Upload handler for images and PDFs
  const upload = document.getElementById('certUpload');
  const MAX = 15;
  upload.addEventListener('change', (e)=>{
    const files = Array.from(e.target.files).slice(0, MAX - document.querySelectorAll('#certGrid img, #certGrid a.preview-pdf').length);
    files.forEach(file=>{
      const reader = new FileReader();
      if(file.type === 'application/pdf'){
        reader.onload = function(ev){
          const blobUrl = URL.createObjectURL(file);
          const col = document.createElement('div'); col.className='col-6 col-md-3';
          col.innerHTML = `<div class="card thumb-card"><a class="d-block preview-pdf" href="${blobUrl}" data-file="${blobUrl}"><img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%' height='100%' fill='%23fff0f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='28' fill='%23ff7ab6'>PDF</text></svg>" class="img-fluid thumb-img"></a><div class="card-body p-2"><small class="text-muted">${file.name}</small></div></div>`;
          certGrid.prepend(col);
          col.querySelector('a.preview-pdf').addEventListener('click', function(ev){ ev.preventDefault(); openPreview(this.getAttribute('href')); });
        };
        reader.readAsArrayBuffer(file);
      } else if(file.type.startsWith('image/')){
        reader.onload = function(ev){
          const blobUrl = ev.target.result;
          const col = document.createElement('div'); col.className='col-6 col-md-3';
          col.innerHTML = `<div class="card thumb-card"><img src="${blobUrl}" class="img-fluid thumb-img" data-file="${file.name}"><div class="card-body p-2"><small class="text-muted">${file.name}</small></div></div>`;
          certGrid.prepend(col);
          col.querySelector('img').addEventListener('click', ()=> openPreview(col.querySelector('img').src));
        };
        reader.readAsDataURL(file);
      }
    });
    upload.value = '';
  });

  // Allow thumbnail SVG placeholders that link to svg or pdf to open in modal
  certGrid.addEventListener('click', function(e){
    const target = e.target.closest('[data-file]') || e.target.closest('img.thumb-img');
    if(!target) return;
    const src = target.getAttribute('data-file') || target.getAttribute('src');
    if(src) openPreview(src);
  });

});