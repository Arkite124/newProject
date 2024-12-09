// container.innerText="???"

// 프로젝트 초기 설정: 데이터 불러오기
const loadData = async function () {
    let resArr = await Promise.all([
        fetch("./loginUser.json"),
        fetch("./products.json")
    ]);

    let objArr = await Promise.all(resArr.map((res) => res.json()));
    console.log(objArr);
    const loginUser = objArr[0];
    const products = objArr[1];

    // 사용자 장바구니 데이터 불러오기
    let res3 = await fetch(`./${loginUser["user_id"]}Baskets.json`);
    let baskets = await res3.json();
    console.log(baskets);
};

// 주요 DOM 요소
const basketCont = document.getElementById("basketCont");
const trEx = document.getElementById("trEx");
const totalPrice = document.getElementById("totalPrice");
const printBasketsBtn = document.getElementById("printBasketsBtn");
const basketFormArr = document.querySelectorAll(".basketForm");
const ingredient = document.getElementById("ingredient");
const SelectedList = document.getElementById("SelectedList");
const moveSelectedList = document.getElementById("moveSelectedList");


// 장바구니 객체 정의
const baskets = { total: 0 }; // total 초기값 숫자로 설정

baskets.setBasket = function (basket) {
    if (basket.num in this) {
        this.total -= this[basket.num].total; // 기존 항목의 총합 차감
    }
    
    this[basket.num] = {
        ...basket,
        price: Number(basket.price), // 숫자 변환
        cnt: Number(basket.cnt), // 숫자 변환
        total: Number(basket.price) * Number(basket.cnt), // 총합 계산
    };
    
    this.total += this[basket.num].total; // 총합 갱신
};

baskets.delBasket = function (num) {
    this.total -= this[num].total; // 삭제된 항목의 총합 차감
    delete this[num];
};

// 상품 데이터 불러오기 및 화면 출력
let isLoaded = false;
ingredient.addEventListener("click", async () => {
    if (isLoaded) {
        alert("이미 상품이 불러와졌습니다.");
        return;
    }
    isLoaded = true;

    try {
        const response = await fetch("./products.json");
        if (!response.ok) {
            throw new Error("데이터를 가져오지 못했습니다.");
        }

        const products = await response.json();
        const productListContainer = document.createElement("div");
        productListContainer.id = "productListContainer";
        productListContainer.style.display = "flex";
        productListContainer.style.flexWrap = "wrap";
        productListContainer.style.gap = "20px";
        document.body.appendChild(productListContainer);

        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.style.border = "1px solid #ccc";
            productCard.style.backgroundColor = "azure";
            productCard.style.borderRadius = "10px";
            productCard.style.width = "200px";
            productCard.style.height = "400px";
            productCard.style.textAlign = "center";
            productCard.style.padding = "10px";
            productCard.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";

            const img = document.createElement("img");
            img.src = product["img[src]"];
            img.alt = product.title;
            img.style.width = "100%";
            img.style.height = "200px";
            img.style.borderRadius = "10px 10px 0 0";

            const title = document.createElement("h3");
            title.innerText = product.title;

            const price = document.createElement("p");
            price.innerText = `₩${product.price.toLocaleString()}`;
            price.style.color = "green";

            const qtyInput = document.createElement("input");
            qtyInput.type = "number";
            qtyInput.min = "1";
            qtyInput.max = "5";
            qtyInput.value = "1";
            qtyInput.style.width = "50px";

            const addButton = document.createElement("button");
            addButton.innerText = "담기";
            addButton.style.backgroundColor = "#28a745";
            addButton.style.color = "#fff";

            addButton.onclick = () => {
                const quantity = Number(qtyInput.value);
                const price = Number(product.price);

                if (isNaN(quantity) || quantity <= 0) {
                    alert("올바른 수량을 입력하세요.");
                    return;
                }

                if (baskets[product.num]) {
                    alert(`"${product.title}"은(는) 이미 장바구니에 담겨 있습니다.`);
                    return;
                }

                const basketItem = {
                    num: product.num,
                    title: product.title,
                    cnt: quantity,
                    price: price,
                    total: price * quantity,
                };

                baskets.setBasket(basketItem);
                alert(`"${product.title}"이(가) ${quantity}개 장바구니에 추가되었습니다!`);
                printBaskets();
            };

            productCard.appendChild(img);
            productCard.appendChild(title);
            productCard.appendChild(price);
            productCard.appendChild(qtyInput);
            productCard.appendChild(addButton);
            productListContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error(error);
        alert("상품 데이터를 가져오는 데 실패했습니다.");
    }
});
let isLoaded1=false
alchol.addEventListener("click", async () => {
    if (isLoaded1) {
        alert("이미 상품이 불러와졌습니다.");
        return;
    }
    isLoaded1 = true;

    try {
        const response = await fetch("./products1.json");
        if (!response.ok) {
            throw new Error("데이터를 가져오지 못했습니다.");
        }

        const products = await response.json();
        const productListContainer = document.createElement("div");
        productListContainer.id = "productListContainer";
        productListContainer.style.display = "flex";
        productListContainer.style.flexWrap = "wrap";
        productListContainer.style.gap = "20px";
        document.body.appendChild(productListContainer);

        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.style.border = "1px solid #ccc";
            productCard.style.backgroundColor = "skyblue";
            productCard.style.borderRadius = "10px";
            productCard.style.width = "200px";
            productCard.style.height = "400px";
            productCard.style.textAlign = "center";
            productCard.style.padding = "10px";
            productCard.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";

            const img = document.createElement("img");
            img.src = product["img[src]"];
            img.alt = product.title;
            img.style.width = "100%";
            img.style.height = "60%";
            img.style.borderRadius = "10px 10px 0 0";

            const title = document.createElement("h3");
            title.innerText = product.title;

            const price = document.createElement("p");
            price.innerText = `₩${product.price.toLocaleString()}`;
            price.style.color = "green";

            const qtyInput = document.createElement("input");
            qtyInput.type = "number";
            qtyInput.min = "1";
            qtyInput.max = "3";
            qtyInput.value = "1";
            qtyInput.style.width = "50px";

            const addButton = document.createElement("button");
            addButton.innerText = "담기";
            addButton.style.backgroundColor = "#28a745";
            addButton.style.color = "#fff";

            addButton.onclick = () => {
                const quantity = Number(qtyInput.value);
                const price = Number(product.price);

                if (isNaN(quantity) || quantity <= 0) {
                    alert("올바른 수량을 입력하세요.");
                    return;
                }

                if (baskets[product.num]) {
                    alert(`"${product.title}"은(는) 이미 장바구니에 담겨 있습니다.`);
                    return;
                }

                const basketItem = {
                    num: product.num,
                    title: product.title,
                    cnt: quantity,
                    price: price,
                    total: price * quantity,
                };

                baskets.setBasket(basketItem);
                alert(`"${product.title}"이(가) ${quantity}개 장바구니에 추가되었습니다!`);
                printBaskets();
            };

            productCard.appendChild(img);
            productCard.appendChild(title);
            productCard.appendChild(price);
            productCard.appendChild(qtyInput);
            productCard.appendChild(addButton);
            productListContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error(error);
        alert("상품 데이터를 가져오는 데 실패했습니다.");
    }
});
let isloaded2=false
instant.addEventListener("click", async () => {
    if (isloaded2) {
        alert("이미 상품이 불러와졌습니다.");
        return;
    }
    isloaded2 = true;

    try {
        const response = await fetch("./products2.json");
        if (!response.ok) {
            throw new Error("데이터를 가져오지 못했습니다.");
        }

        const products = await response.json();
        const productListContainer = document.createElement("div");
        productListContainer.id = "productListContainer";
        productListContainer.style.display = "flex";
        productListContainer.style.flexWrap = "wrap";
        productListContainer.style.gap = "20px";
        document.body.appendChild(productListContainer);

        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.style.border = "1px solid #ccc";
            productCard.style.backgroundColor = "greenyellow";
            productCard.style.borderRadius = "10px";
            productCard.style.width = "200px";
            productCard.style.textAlign = "center";
            productCard.style.padding = "10px";
            productCard.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";

            const img = document.createElement("img");
            img.src = product["img[src]"];
            img.alt = product.title;
            img.style.width = "100%";
            img.style.height = "50%";
            img.style.borderRadius = "10px 10px 0 0";

            const title = document.createElement("h3");
            title.innerText = product.title;

            const price = document.createElement("p");
            price.innerText = `₩${product.price.toLocaleString()}`;
            price.style.color = "green";

            const qtyInput = document.createElement("input");
            qtyInput.type = "number";
            qtyInput.min = "1";
            qtyInput.max = "5";
            qtyInput.value = "1";
            qtyInput.style.width = "50px";

            const addButton = document.createElement("button");
            addButton.innerText = "담기";
            addButton.style.backgroundColor = "#28a745";
            addButton.style.color = "#fff";

            addButton.onclick = () => {
                const quantity = Number(qtyInput.value);
                const price = Number(product.price);

                if (isNaN(quantity) || quantity <= 0) {
                    alert("올바른 수량을 입력하세요.");
                    return;
                }

                if (baskets[product.num]) {
                    alert(`"${product.title}"은(는) 이미 장바구니에 담겨 있습니다.`);
                    return;
                }

                const basketItem = {
                    num: product.num,
                    title: product.title,
                    cnt: quantity,
                    price: price,
                    total: price * quantity,
                };

                baskets.setBasket(basketItem);
                alert(`"${product.title}"이(가) ${quantity}개 장바구니에 추가되었습니다!`);
                printBaskets();
            };

            productCard.appendChild(img);
            productCard.appendChild(title);
            productCard.appendChild(price);
            productCard.appendChild(qtyInput);
            productCard.appendChild(addButton);
            productListContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error(error);
        alert("상품 데이터를 가져오는 데 실패했습니다.");
    }
});

// 장바구니 출력
const printBaskets = () => {
    basketCont.innerHTML = "";
    for (let key in baskets) {
        if (key === "total") {
            totalPrice.textContent = baskets[key].toLocaleString();
        } else if (!isNaN(key)) {
            const tr = trEx.cloneNode(true);
            tr.removeAttribute("id");
            tr.querySelector(".title").innerText = baskets[key].title;
            tr.querySelector(".price").innerText = baskets[key].price.toLocaleString();
            tr.querySelector(".cnt").innerText = baskets[key].cnt;
            tr.querySelector(".total").innerText = baskets[key].total.toLocaleString();
            tr.querySelector(".delBasket").dataset.num = baskets[key].num;

            tr.querySelector(".delBasket").onclick = (e) => {
                baskets.delBasket(Number(e.target.dataset.num));
                printBaskets();
            };

            basketCont.appendChild(tr);
        }
    }
};

printBasketsBtn.onclick = async () => {
    try {
        // 로그인된 사용자 정보 가져오기
        const loginResponse = await fetch("./loginUser.json");
        if (!loginResponse.ok) {
            throw new Error("로그인 데이터를 가져올 수 없습니다.");
        }

        const loginUser = await loginResponse.json();
        const userId = loginUser.user_id;

        // 로그인된 사용자와 관련된 장바구니 데이터 가져오기
        const basketResponse = await fetch(`./${userId}Baskets.json`);
        if (!basketResponse.ok) {
            throw new Error("장바구니 데이터를 가져올 수 없습니다.");
        }

        const userBaskets = await basketResponse.json();

        // 장바구니 데이터 추가
        userBaskets.forEach((item) => {
            const basketItem = {
                num: item.num,
                title: item.title,
                cnt: item.cnt,
                price: item.price,
                total: item.cnt * item.price,
            };
            baskets.setBasket(basketItem); // 기존 baskets 객체에 추가
        });

        // 장바구니 화면에 출력
        printBaskets();
    } catch (error) {
        console.error("에러 발생:", error);
        alert("장바구니 데이터를 불러오는 데 실패했습니다.");
    }
};


moveSelectedList.onclick = () => {
    if (SelectedList.classList.contains("resize")) {
        SelectedList.classList.remove("resize");
        moveSelectedList.innerText = "접기";
    } else {
        SelectedList.classList.add("resize");
        moveSelectedList.innerText = "펴기";
    }
};

// 스타일 설정
SelectedList.style.position = "fixed";
SelectedList.style.bottom = "0";
SelectedList.style.left = "0";
SelectedList.style.backgroundColor = "#beige";
SelectedList.style.boxShadow = "0 -4px 8px rgba(0, 0, 0, 0.1)";
SelectedList.style.padding = "10px";

loadData();
