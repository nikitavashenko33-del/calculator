const games = [
    {
        name: "Cyber Adventure",
        genre: "Action",
        price: 12990,
        icon: "🤖"
    },
    {
        name: "Dragon Quest",
        genre: "RPG",
        price: 15990,
        icon: "🐉"
    },
    {
        name: "Street Racing",
        genre: "Racing",
        price: 9990,
        icon: "🏎️"
    },
    {
        name: "Football Pro",
        genre: "Sports",
        price: 11990,
        icon: "⚽"
    },
    {
        name: "Space Battle",
        genre: "Action",
        price: 13990,
        icon: "🚀"
    },
    {
        name: "Magic World",
        genre: "RPG",
        price: 14990,
        icon: "🧙"
    },
    {
        name: "Extreme Racing",
        genre: "Racing",
        price: 10990,
        icon: "🏁"
    },
    {
        name: "Basketball Stars",
        genre: "Sports",
        price: 8990,
        icon: "🏀"
    }
];

let cart = [];

const gamesContainer = document.getElementById("games");
const search = document.getElementById("search");
const genre = document.getElementById("genre");

function showGames(list) {
    gamesContainer.innerHTML = "";

    if (list.length === 0) {
        gamesContainer.innerHTML = "<p>Игры не найдены.</p>";
        return;
    }

    list.forEach((game) => {
        const index = games.indexOf(game);

        gamesContainer.innerHTML += `
            <div class="game">
                <div class="gameIcon">${game.icon}</div>

                <h3>${game.name}</h3>

                <p class="genre">${game.genre}</p>

                <p class="price">
                    ${game.price.toLocaleString()} ₸
                </p>

                <button onclick="addToCart(${index})">
                    Добавить в корзину
                </button>
            </div>
        `;
    });
}

function addToCart(index) {
    cart.push(games[index]);
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    const container = document.getElementById("cartItems");
    const totalElement = document.getElementById("total");
    const countElement = document.getElementById("cartCount");

    countElement.textContent = cart.length;

    if (cart.length === 0) {
        container.innerHTML = "<p>Корзина пуста</p>";
        totalElement.textContent = "0";
        return;
    }

    let total = 0;

    container.innerHTML = "";

    cart.forEach((game, index) => {
        total += game.price;

        container.innerHTML += `
            <div class="cartItem">
                <span>
                    ${game.icon} ${game.name}
                    — ${game.price.toLocaleString()} ₸
                </span>

                <button onclick="removeFromCart(${index})">
                    Удалить
                </button>
            </div>
        `;
    });

    totalElement.textContent = total.toLocaleString();
}

function filterGames() {
    const text = search.value.toLowerCase();
    const selectedGenre = genre.value;

    const filtered = games.filter((game) => {
        const matchesName =
            game.name.toLowerCase().includes(text);

        const matchesGenre =
            selectedGenre === "all" ||
            game.genre === selectedGenre;

        return matchesName && matchesGenre;
    });

    showGames(filtered);
}

search.addEventListener("input", filterGames);
genre.addEventListener("change", filterGames);

document
    .getElementById("orderButton")
    .addEventListener("click", () => {

        if (cart.length === 0) {
            alert("Корзина пуста!");
            return;
        }

        alert("🎉 Заказ успешно оформлен!");

        cart = [];
        updateCart();
    });

showGames(games);