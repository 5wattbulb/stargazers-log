const repositoryList = document.querySelector("#repository-list");
const statusMessage = document.querySelector("#status");

async function loadRepositories() {
  try {
    const response = await fetch("./events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a list.");
    }

    repositories.forEach((repository) => {
      const item = document.createElement("li");
      item.className = "repository";

      const link = document.createElement("a");
      link.href = repository.url;
      link.textContent = repository.name;

      const description = document.createElement("p");
      description.textContent = repository.description;

      const date = document.createElement("time");
      date.dateTime = repository.starredAt;
      date.textContent = `Starred on ${repository.starredAt}`;

      item.append(link, description, date);
      repositoryList.append(item);
    });

    statusMessage.textContent = repositories.length
      ? `${repositories.length} starred repositories`
      : "No starred repositories yet.";
  } catch (error) {
    statusMessage.textContent = "Could not load starred repositories.";
    console.error("Could not load events.json:", error);
  }
}

loadRepositories();
