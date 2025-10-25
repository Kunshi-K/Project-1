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
      "<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🌿 AI Plant Doctor – Gemini</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      background: #f2f8f3;
      padding: 40px;
    }
    h1 { color: #2e8b57; }
    textarea {
      width: 80%;
      padding: 10px;
      margin: 15px 0;
      border-radius: 6px;
      border: 1px solid #ccc;
    }
    input, button {
      padding: 10px 15px;
      border-radius: 6px;
      border: 1px solid #ccc;
      margin: 10px;
    }
    button {
      background-color: #2e8b57;
      color: white;
      border: none;
      cursor: pointer;
    }
    button:hover { background-color: #256e45; }
    #output {
      margin-top: 25px;
      background: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }
  </style>
</head>
<body>
  <h1>🌱 AI Plant Doctor (Gemini)</h1>
  <p>Ask about plant care or diseases below 👇</p>

  <textarea id="userInput" placeholder="Example: My tomato leaves have black spots, what should I do?"></textarea><br>

  <button onclick="callGemini()">Ask Gemini</button>

  <div id="output"></div>

  <script>
    async function callGemini() {
      const input = document.getElementById("userInput").value.trim();
      const outputDiv = document.getElementById("output");

      if (!input) {
        alert("Please enter a question about your plant!");
        return;
      }

      outputDiv.innerHTML = "🧠 Thinking... please wait.";

      // Replace with your Gemini API key from https://makersuite.google.com/app/apikey
      const apiKey = "YOUR_API_KEY_HERE";

      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: input }] }]
            })
          }
        );

        const data = await response.json();
        const result = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, no response.";

        outputDiv.innerHTML = `<b>🌿 Gemini Suggests:</b><br>${result}`;
      } catch (error) {
        outputDiv.innerHTML = `⚠️ Error: ${error.message}`;
      }
    }
  </script>
</body>
</html>
",
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

