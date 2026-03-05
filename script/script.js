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
        categoriesContainer.append(btn);
        btn.textContent = category.category_name;
    });
};
loadCategories();

// displayTrees function to display all plants
async function loadTress() {
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");

    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();

    loadingSpinner.classList.add("hidden");
    displayTrees(data.plants);
}

function displayTrees(trees) {
    trees.forEach((tree) => {
        console.log(tree);
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
};
loadTress();