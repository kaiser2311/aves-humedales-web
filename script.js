function runInference() {
    const input = document.getElementById('imageInput');
    const file = input.files[0];

    if (!file) {
        alert("Por favor selecciona una imagen.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            fetch('https://detect.roboflow.com/aves_humedales/2?api_key=PhkfCxacir8ccO2z6Y7G', {
                method: "POST",
                body: file,
                headers: {
                    "Content-Type": "application/octet-stream"
                }
            })
            .then(res => res.json())
            .then(predictions => {
                if (!predictions || !Array.isArray(predictions.predictions)) {
                    alert("No se pudo procesar la imagen.");
                    return;
                }

                if (predictions.predictions.length === 0) {
                    alert("No se detectaron aves en la imagen.");
                    return;
                }

                predictions.predictions.forEach(prediction => {
                    const [x, y, width, height] = [
                        prediction.x - prediction.width / 2,
                        prediction.y - prediction.height / 2,
                        prediction.width,
                        prediction.height
                    ];

                    ctx.strokeStyle = "#00FFFF";
                    ctx.lineWidth = 2;
                    ctx.strokeRect(x, y, width, height);

                    ctx.fillStyle = "#00FFFF";
                    ctx.font = "16px Arial";
                    ctx.fillText(
                        `${prediction.class} (${Math.round(prediction.confidence * 100)}%)`,
                        x,
                        y > 10 ? y - 5 : 10
                    );
                });
            })
            .catch(err => {
                console.error(err);
                alert("Error al procesar la imagen: " + err.message);
            });
        };
        img.src = event.target.result;
        document.getElementById('selectedImage').src = img.src;
        document.getElementById('selectedImage').style.display = 'block';
    };
    reader.readAsDataURL(file);
}
