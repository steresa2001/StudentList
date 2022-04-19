// Global variables
const maxItemsPerPage = 9;

// showPage function creates list off students
const showPage = (list, page) => {
  const startIndex = page * maxItemsPerPage - maxItemsPerPage;
  const endIndex = page * maxItemsPerPage;

  const studentList = document.querySelector(".student-list");
  studentList.innerHTML = "";

  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      const studentItem = `
         <li class="student-item cf">
         <div class="student-details">
            <img class="avatar" src="${list[i].picture.thumbnail}" alt="Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
            <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
            <span class="date">${list[i].registered.date}</span>
         </div>
      `;
      studentList.insertAdjacentHTML("beforeend", studentItem);
    }
  }
};

// addPagination function creates the correct amount of buttons
const addPagination = (list) => {
  const listLength = list.length;
  const numOfPages = Math.ceil(listLength / maxItemsPerPage);
  const linkList = document.querySelector(".link-list");

  linkList.innerHTML = "";

  // If number of pages is 0, don't create pagination
  if (numOfPages === 0) return;
  for (let i = 1; i <= numOfPages; i++) {
    const button = `
     <li>
      <button type="button">${i}</button>
      </li>
     `;
    linkList.insertAdjacentHTML("beforeend", button);
  }
  const firstPaginationButton = linkList.firstElementChild.children[0];
  firstPaginationButton.className = "active";

  linkList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const activeButton = document.querySelector(".active");
      activeButton.className = "";
      e.target.className = "active";
      let currentPage = parseInt(e.target.textContent);
      showPage(list, currentPage);
    }
  });
};

// createSearchComponent function creates the search component
const createSearchComponent = () => {
  const headingElement = document.querySelector("h2");
  const searchComponent = `<label for="search" class="student-search">
  <span>Search by name</span>
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>
`;
  headingElement.insertAdjacentHTML("afterend", searchComponent);
};

// noSearchResults function displays no results message
const noSearchResults = () => {
  const studentList = document.querySelector(".student-list");
  const noResultsFound = `<h3 class="no-results">No results found</h3>`;
  studentList.insertAdjacentHTML("afterbegin", noResultsFound);
};

// filterSearch function allows for filltering students by first or last name
const filterSearch = () => {
  const searchInput = document.getElementById("search");

  filteredData = data.filter(
    (str) =>
      str.name.first.toLowerCase().indexOf(searchInput.value.toLowerCase()) !==
        -1 ||
      str.name.last.toLowerCase().indexOf(searchInput.value.toLowerCase()) !==
        -1
  );
  showPage(filteredData, 1);
  addPagination(filteredData);

  // Show no results found message
  if (filteredData.length === 0) {
    noSearchResults();
  }
};

// Call functions
showPage(data, 1);
addPagination(data);
createSearchComponent();

// Variables must be declared after calling the createSearchComponent function
const searchButton = document.querySelector(".student-search button");
const searchInput = document.getElementById("search");

// Event listeners for search
searchButton.addEventListener("click", filterSearch);
searchInput.addEventListener("keyup", filterSearch);
