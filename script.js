
const MODEL = "aves_humedales";
const VERSION = 2;
const API_KEY = "PhkfCxacir8ccO2z6Y7G";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function runInference() {
    const fileInput = document.getElementById("imageUpload");
    if (!fileInput.files.length) return;

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        const img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            fetch(`https://detect.roboflow.com/${MODEL}/${VERSION}?api_key=${API_KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "image=" + encodeURIComponent(reader.result)
            })
            .then(res => res.json())
            .then(data => {
                data.predictions.forEach(pred => {
                    ctx.strokeStyle = "#FF0000";
                    ctx.lineWidth = 2;
                    ctx.strokeRect(pred.x - pred.width / 2, pred.y - pred.height / 2, pred.width, pred.height);
                    ctx.font = "18px Arial";
                    ctx.fillStyle = "#FF0000";
                    ctx.fillText(pred.class, pred.x - pred.width / 2, pred.y - pred.height / 2 - 5);
                });
            })
            .catch(err => {
                alert("Error al procesar la imagen: " + err.message);
            });
        };
        img.src = reader.result;
    };

    reader.readAsDataURL(file);
}
