const products = [
  { id: 1, name: "Mars rug", img: "./image 10.png", price: 100, stock: 24 },
  { id: 2, name: "Keyboard sticker", img: "./image 22.png", price: 49, stock: 11 },
  { id: 3, name: "Smart watch", img: "./image 23.png", price: 899, stock: 4 },
  { id: 4, name: "Wireless keyboard", img: "./image 24.png", price: 350, stock: 0 },
  { id: 5, name: "Mouse", img: "./image 25.png", price: 359, stock: 24 },
  { id: 6, name: "AirPods", img: "./image 26.png", price: 499, stock: 11 },
  { id: 7, name: "Powerbank", img: "./image 27.png", price: 899, stock: 5 },
  { id: 8, name: "USB flash drive", img: "./image 28.png", price: 299, stock: 31 },
  { id: 9, name: "Smartphone", img: "./image 29.png", price: 3699, stock: 2 },
  { id: 10, name: "Playstation 5", img: "./image 30.png", price: 7449, stock: null, note: "Ushbu tovarga oldindan buyurtma berish mumkin" },
  { id: 11, name: "Yandex Station", img: "./image 31.png", price: 1999, stock: 4 },
  { id: 12, name: "Planshet Samsung", img: "./image 32.png", price: 4999, stock: 24 },
];

const grid = document.getElementById("grid");
const input = document.getElementById("q");
const searchBtn = document.getElementById("go");
const sortSelect = document.getElementById("sort");

let selectedId = 7;

function createCard(p) {
  const isOut = p.stock === 0;
  const dim = isOut ? " opacity-40" : "";
  const border = p.id === selectedId ? "border-blue-500" : "border-transparent";
  const cursor = isOut ? "cursor-not-allowed" : "cursor-pointer";
  const stockText = p.note ?? `${p.stock} dona mavjud`;

  return `
    <button data-id="${p.id}" ${isOut ? "disabled" : ""} class="flex h-[190px] flex-col items-center rounded-[18px] border-[3px] ${border} bg-white px-2.5 pb-3 pt-5 text-center shadow-[0_3px_10px_rgba(0,0,0,.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${cursor}">
      <div class="flex h-20 w-full items-center justify-center${dim}"><img src="${p.img}" alt="${p.name}" class="max-h-20 max-w-[80%] object-contain"></div>
      <div class="mt-3.5 text-xs font-semibold${dim}">${p.name}</div>
      <div class="mt-2.5 flex items-center gap-1.5 text-xs${dim}"><img src="./Coin 3.png" alt="" class="h-3.5 w-3.5">${p.price} Coins</div>
      <div class="mt-auto text-[9px] text-neutral-700">${stockText}</div>
    </button>`;
}

function getVisibleProducts() {
  const text = input.value.trim().toLowerCase();
  let list = products.filter((p) => p.name.toLowerCase().includes(text));

  if (sortSelect.value === "asc") list = [...list].sort((a, b) => a.price - b.price);
  if (sortSelect.value === "desc") list = [...list].sort((a, b) => b.price - a.price);
  if (sortSelect.value === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));

  return list;
}

function render() {
  const list = getVisibleProducts();
  grid.innerHTML = list.length
    ? list.map(createCard).join("")
    : `<p class="col-span-full py-10 text-center text-neutral-400">Hech narsa topilmadi</p>`;
}

grid.addEventListener("click", (e) => {
  const card = e.target.closest("[data-id]");
  if (!card) return;

  const product = products.find((p) => p.id === Number(card.dataset.id));
  if (!product || product.stock === 0) return;

  selectedId = product.id;
  render();
});

input.addEventListener("input", render);
searchBtn.addEventListener("click", render);
sortSelect.addEventListener("change", render);

render();