async function analyzeImage() {
  const fileInput = document.getElementById("imageInput");
  const resultDiv = document.getElementById("result");
  const file = fileInput.files[0];
  if (!file) return alert("Please upload an image!");

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    const base64Image = reader.result.split(",")[1];
    resultDiv.innerHTML = "🔍 Analyzing... please wait";

    const response = await fetch(
      "https://api-inference.huggingface.co/models/akhaliq/Plant-Disease-Detection",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer hf_yourapitokenhere", // Replace this with your API token
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "inputs": base64Image })
      }
    );

    const data = await response.json();
    console.log(data);

    if (data.error) {
      resultDiv.innerHTML = "⚠️ Error: " + data.error;
    } else {
      const prediction = data[0]?.label || "Unknown";
      const confidence = (data[0]?.score * 100).toFixed(2);
      resultDiv.innerHTML = `<b>Disease:</b> ${prediction}<br><b>Confidence:</b> ${confidence}%`;
    }
  };
}
