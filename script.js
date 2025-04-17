document.addEventListener("DOMContentLoaded", function () {
    // 메뉴 토글
    document.querySelector(".menu-tab").addEventListener("click", () => {
        document.querySelector(".menu-box").classList.toggle("active");
    });

    // 이미지 설정
    const original = document.querySelector(".original");
    const filtered = document.querySelector(".filtered");
    const images = ["PA.jpg", "PB.jpg", "PC.jpg", "PD.jpg", "PE.jpg"];
    let index = 0;

    function updateImage() {
        const url = `source/${images[index]}`;
        const img = new Image();
        img.onload = () => {
            original.style.backgroundImage = `url(${url})`;
            filtered.style.backgroundImage = `url(${url})`;
        };
        img.src = url;
    }
    

    updateImage();

    original.addEventListener("click", () => {
        index = (index + 1) % images.length;
        updateImage();
    });

    // 필터 적용
    const options = document.querySelectorAll(".menu-options .option");
    options.forEach(opt => {
        opt.addEventListener("click", () => {
            // 모든 option에서 selected 클래스 제거
            options.forEach(option => {
                option.classList.remove("selected");
            });

            // 클릭된 option에 selected 클래스 추가
            opt.classList.add("selected");

            // 필터 적용
            filtered.style.filter = opt.getAttribute("data-filter");

            // "human"이 선택되면 슬라이더 숨기기, 그 외에는 슬라이더 보이게
            if (opt.textContent === "Human") {
                handleContainer.style.display = "none";  // 슬라이더 숨기기
                filtered.style.clipPath = "none";  // 필터를 초기화
            } else {
                handleContainer.style.display = "block";  // 슬라이더 보이기
            }
        });
    });

    // 슬라이더 관련
    const wrapper = document.querySelector(".image-wrapper");
    const handleContainer = document.querySelector(".handle-container");

    // 슬라이더 초기 위치 설정 (오른쪽으로 더 이동)
    const initialSliderPosition = 80;  // 이 값은 px로 설정 가능 (100이 오른쪽 끝, 0은 왼쪽 끝)

    function setInitialSlider() {
        const wrapperWidth = wrapper.offsetWidth;
        const handleWidth = handleContainer.offsetWidth;
        const initialX = wrapperWidth * (initialSliderPosition / 100);  // px 단위로 위치 설정

        filtered.style.clipPath = `inset(0 0 0 ${initialX}px)`;  // 왼쪽 70%만 보이도록 설정
        handleContainer.style.left = `${initialX - handleWidth / 3.5}px`;  // 핸들을 오른쪽으로 이동
    }

    setInitialSlider();
    window.addEventListener("resize", setInitialSlider);

    handleContainer.addEventListener("mousedown", (e) => {
        e.preventDefault();
        document.addEventListener("mousemove", onSlide);
        document.addEventListener("mouseup", stopSlide);
    });

    function onSlide(e) {
        const rect = wrapper.getBoundingClientRect();
        let x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const leftPercent = (x / rect.width) * 100;

        filtered.style.clipPath = `inset(0 0 0 ${leftPercent}%)`;
        handleContainer.style.left = `${x - handleContainer.offsetWidth / 3.5}px`;
    }

    function stopSlide() {
        document.removeEventListener("mousemove", onSlide);
        document.removeEventListener("mouseup", stopSlide);
    }
});
