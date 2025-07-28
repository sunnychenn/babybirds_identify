const URL = "model/";

let model, maxPredictions;

async function loadModel() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
}

async function predict(image) {
    const prediction = await model.predict(image);
    prediction.sort((a, b) => b.probability - a.probability);
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `預測結果：${prediction[0].className} (${(prediction[0].probability * 100).toFixed(2)}%)`;
}

document.getElementById("upload").addEventListener("change", async function (event) {
    const file = event.target.files[0];
    const preview = document.getElementById("preview");
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.onload = () => URL.revokeObjectURL(img.src);
    img.id = "inputImage";
    preview.innerHTML = '';
    preview.appendChild(img);
});

document.getElementById("predictButton").addEventListener("click", async () => {
    const img = document.getElementById("inputImage");
    if (img) {
        await predict(img);
    } else {
        document.getElementById("result").innerText = "請先上傳圖片！";
    }
});

loadModel();
