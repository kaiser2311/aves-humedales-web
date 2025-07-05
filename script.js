
document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const imageInput = document.getElementById("imageInput");
  const file = imageInput.files[0];
  if (!file) return alert("Por favor, selecciona una imagen.");

  const preview = document.getElementById("preview");
  const readerPreview = new FileReader();
  readerPreview.onload = function () {
    preview.src = readerPreview.result;
  };
  readerPreview.readAsDataURL(file);

  const reader = new FileReader();
  reader.onloadend = function () {
    const base64 = reader.result.split(",")[1];
    fetch("https://detect.roboflow.com/aves_humedales/2?api_key=PhkfCxacir8ccO2z6Y7G", {
      method: "POST",
      body: base64,
    })
      .then((res) => res.json())
      .then((data) => {
        const img = new Image();
        img.src = data.image;
        const output = document.getElementById("output");
        output.innerHTML = "";
        output.appendChild(img);
      })
      .catch((err) => {
        console.error(err);
        alert("Error al procesar la imagen.");
      });
  };
  reader.readAsDataURL(file);
});
