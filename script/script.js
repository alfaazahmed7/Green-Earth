const categoriesContainer = document.getElementById("categories-container");
const treesContainer = document.getElementById("tress-container");
const loadingSpinner = document.getElementById("loading-spinner");

// loadCategories function to display category buttons
async function loadCategories() {
    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();
    data.categories.forEach((category) => {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline w-full";
        btn.textContent = category.category_name;
        btn.onclick = () => selectCategory(category.id, btn);
        categoriesContainer.append(btn);
    });
};
loadCategories();

// click category button function to select separately
async function selectCategory(categoryId, btn) {
    showLoading();

    const allButtons = document.querySelectorAll("#categories-container button, #all-trees-btn");
    allButtons.forEach((btn) => {
        btn.classList.remove("btn-pp")
        btn.classList.add("btn-outline");
    });
    btn.classList.add("btn-pp");
    btn.classList.remove("btn-outline");

    const res = await fetch(
        `https://openapi.programming-hero.com/api/category/${categoryId}`,
    );
    const data = await res.json();
    console.log(data);
    displayTrees(data.plants);

    hideLoading();
};

// loading spinner funtions
function showLoading() {
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
}
function hideLoading() {
    loadingSpinner.classList.add("hidden");
}

// displayTrees function to display all plants
async function loadTress() {
    showLoading();

    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();

    hideLoading();
    displayTrees(data.plants);
}

function displayTrees(trees) {
    treesContainer.innerHTML = "";
    
    trees.forEach((tree) => {
        const card = document.createElement("div");
        card.className = "card bg-white shadow-sm";
        card.innerHTML = `
        <figure>
                            <img src="${tree.image}"
                                alt="${tree.name}"
                                class = "h-48 w-full object-cover cursor-pointer" />
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title text-sm font-semibold text-[#1F2937]">${tree.name}</h2>
                            <p class="text-[12px] text-[#1F2937] line-clamp-2">${tree.description}
                            </p>
                            <div class="">
                                <p class="text-[#15803D] text-sm font-medium bg-[#DCFCE7] p-1 rounded-xl w-[50%] text-center">${tree.category}</p>
                            </div>
                            <div class="flex justify-between items-center">
                                <h2 class="font-semibold text-xl text-[#4ade80]">$${tree.price}</h2>
                                <button class="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
        `;
        treesContainer.appendChild(card);
    });
    hideLoading();
};
loadTress();