// container.innerText="???"

// 프로젝트 초기 설정: 데이터 불러오기
const loadData = async function () {
    let resArr = await Promise.all([
        fetch("./loginUser.json"),
        fetch("./products.json")
    ]);

    let objArr = await Promise.all(resArr.map((res) => res.json()));
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
    const ingredient = document.getElementById("ingredient");

    if (isLoaded) {
        const ingredientproductListContainer = document.getElementById("ingredientProductListContainer");
        if (ingredientproductListContainer) {
            ingredientproductListContainer.remove(); 
        }
        ingredient.innerText = "채소상품 불러오기";
        isLoaded = false;
        return;
    }

    isLoaded = true;
    ingredient.innerText = "채소상품 닫기";

    try {
        const response = await fetch("./products.json");
        if (!response.ok) {
            throw new Error("데이터를 가져오지 못했습니다.");
        }

        const products = await response.json();
        const productListContainer = document.createElement("div");
        productListContainer.id = "ingredientProductListContainer";
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
            price.style.fontWeight="bold"

            const qtyLabel = document.createElement("label");
            qtyLabel.innerText = "수량: ";
            qtyLabel.style.display = "block";
            qtyLabel.style.marginTop = "10px";
            
            const qtySelect = document.createElement("select");
            qtySelect.id="qtyInput"

            for (let i = 1; i <= 5; i++) {
                const option = document.createElement("option");
                option.value = i;
                option.innerText = i;
                qtySelect.appendChild(option);
            }

            const addButton = document.createElement("button");
            addButton.innerText = "담기";
            addButton.id="addBtn"


            addButton.onclick = () => {
                const quantity = Number(qtySelect.value, 10);
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
            productCard.appendChild(qtyLabel);
            qtyLabel.appendChild(qtySelect);        
            productCard.appendChild(addButton);
            productListContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error(error);
        alert("상품 데이터를 가져오는 데 실패했습니다.");
    }
});
let isLoaded1 = false;

alchol.addEventListener("click", async () => {
    const alchol = document.getElementById("alchol");

    if (isLoaded1) {
        const productListContainer = document.getElementById("alcoholProductListContainer");
        if (productListContainer) {
            productListContainer.remove(); // 주류 상품 목록 제거
        }
        alchol.innerText = "주류상품 불러오기";
        isLoaded1 = false;
        return;
    }

    isLoaded1 = true;
    alchol.innerText = "주류상품 닫기";

    try {
        const response = await fetch("./products1.json");
        if (!response.ok) {
            throw new Error("데이터를 가져오지 못했습니다.");
        }

        const products = await response.json();
        const productListContainer = document.createElement("div");
        productListContainer.id = "alcoholProductListContainer"; 
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
            img.style.height = "50%";
            img.style.borderRadius = "10px 10px 0 0";

            const title = document.createElement("h3");
            title.innerText = product.title;

            const price = document.createElement("p");
            price.innerText = `₩${product.price.toLocaleString()}`;
            price.style.color = "green";

            const qtyLabel = document.createElement("label");
            qtyLabel.innerText = "수량: ";
            qtyLabel.style.display = "block";
            qtyLabel.style.marginTop = "10px";

            const qtySelect = document.createElement("select");
            qtySelect.id = "qtyInput";

            for (let i = 1; i <= 3; i++) {
                const option = document.createElement("option");
                option.value = i;
                option.innerText = i;
                qtySelect.appendChild(option);
            }

            const addButton = document.createElement("button");
            addButton.innerText = "담기";
            addButton.id = "addBtn";

            addButton.onclick = () => {
                const quantity = Number(qtySelect.value, 10);
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
            productCard.appendChild(qtyLabel);
            qtyLabel.appendChild(qtySelect);
            productCard.appendChild(addButton);
            productListContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error(error);
        alert("상품 데이터를 가져오는 데 실패했습니다.");
    }
});

let isLoaded2=false
instant.addEventListener("click", async () => {
    const instant = document.getElementById("instant");
    if (isLoaded2) {

        const instantProductListContainer = document.getElementById("instantProductListContainer");
        if (instantProductListContainer) {
            instantProductListContainer.remove(); 
        }
        instant.innerText = "즉석상품 불러오기";
        isLoaded2 = false;
        return;
    }
    isLoaded2 = true;
    instant.innerText = "즉석상품 닫기";

    try {
        const response = await fetch("./products2.json");
        if (!response.ok) {
            throw new Error("데이터를 가져오지 못했습니다.");
        }

        const products = await response.json();
        const productListContainer = document.createElement("div");
        productListContainer.id = "instantProductListContainer";
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

            const qtyLabel = document.createElement("label");
            qtyLabel.innerText = "수량: ";
            qtyLabel.style.display = "block";
            qtyLabel.style.marginTop = "10px";
            
            const qtySelect = document.createElement("select");
            qtySelect.id="qtyInput"
            
            for (let i = 1; i <= 5; i++) {
                const option = document.createElement("option");
                option.value = i;
                option.innerText = i;
                qtySelect.appendChild(option);
            }

            const addButton = document.createElement("button");
            addButton.innerText = "담기";
            addButton.id="addBtn"

            addButton.onclick = () => {
                const quantity = Number(qtySelect.value, 10);
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
            productCard.appendChild(qtyLabel);
            qtyLabel.appendChild(qtySelect);
            productCard.appendChild(addButton);
            productListContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error(error);
        alert("상품 데이터를 가져오는 데 실패했습니다.");
    }
});

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

        const loginResponse = await fetch("./loginUser.json");
        if (!loginResponse.ok) {
            throw new Error("로그인 데이터를 가져올 수 없습니다.");
        }

        const loginUser = await loginResponse.json();
        const userId = loginUser.user_id;

        const basketResponse = await fetch(`./${userId}Baskets.json`);
        if (!basketResponse.ok) {
            throw new Error("장바구니 데이터를 가져올 수 없습니다.");
        }

        const userBaskets = await basketResponse.json();

        userBaskets.forEach((item) => {
            const basketItem = {
                num: item.num,
                title: item.title,
                cnt: item.cnt,
                price: item.price,
                total: item.cnt * item.price,
            };
            baskets.setBasket(basketItem);
        });

        printBaskets();
    } catch (error) {
        console.error("에러 발생:", error);
        alert("장바구니 데이터를 불러오는 데 실패했습니다.");
    }
};


moveSelectedList.onclick = () => {
    const body=document.body
    if (SelectedList.classList.contains("resize")) {
        SelectedList.classList.remove("resize");
        moveSelectedList.innerText = "접기";
        body.style.paddingBottom="230px";
    } else {
        SelectedList.classList.add("resize");
        body.style.paddingBottom="65px";
        moveSelectedList.innerText = "펴기";
    }
};
loadData();
