document.addEventListener("DOMContentLoaded", () => {
  const questionsContent = document.getElementById("questions-content");

  function fetchQuestions() {
    console.log("Fetching Stack Overflow questions...");
    fetch(
      "https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow"
    )
      .then((response) => {
        console.log("Response status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        if (data.items) {
          questionsContent.innerHTML = "";
          data.items.forEach((question) => {
            const questionDiv = document.createElement("div");
            questionDiv.className = "col-md-6 mb-3";
            questionDiv.innerHTML = `
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${question.title}</h5>
                  <a href="${question.link}" class="btn btn-primary" target="_blank">View Question</a>
                </div>
              </div>
            `;
            questionsContent.appendChild(questionDiv);
          });
        } else {
          questionsContent.innerHTML = "<p>No questions found.</p>";
        }
      })
      .catch((error) =>
        console.error("Error fetching Stack Overflow data:", error)
      );
  }

  fetchQuestions();
});
