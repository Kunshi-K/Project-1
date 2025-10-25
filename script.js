async function callGemini() {
  const input = document.getElementById("userInput").value.trim();
  const outputDiv = document.getElementById("output");

  if (!input) {
    alert("Please enter a question about your plant!");
    return;
  }

  outputDiv.innerHTML = "🧠 Thinking... please wait.";

  // Replace with your Gemini API key
  const apiKey = "AIzaSyDW6jglR3OUgroFdhNUtbqmVwsHpKQuvF8";

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
