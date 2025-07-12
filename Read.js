// ✅ Script 載入確認
console.log('script.js loaded');

// ✅ Vue 發出事件後觸發渲染邏輯
window.addEventListener('vue-app-ready', function () {
    console.log('vue-app-ready received, start fetching resume json');

    waitForElement('#resume-container', function () {
        const container = document.getElementById('resume-container');
        const blockName = container?.dataset.block;
        if (blockName) {
            fetchProfileData(blockName); // ✅ 不再寫死
        } else {
            console.warn("⚠ 無 data-block 屬性，無法載入資料");
        }
    });

});

// ✅ 等待 DOM 元素出現才執行 callback
function waitForElement(selector, callback) {
    const interval = setInterval(() => {
        if (document.querySelector(selector)) {
            clearInterval(interval);
            callback();
        }
    }, 100);
}

// ✅ 載入 profile.json 並抓出對應區塊
function fetchProfileData(blockName) {
    const version = new Date().getTime();
    fetch(`/Resume/data/profile.json?v=${version}`)
        .then(response => {
            console.log('fetch response:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok, status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched resume raw data:', data);
            renderSpecificSection(data, blockName);
        })
        .catch(error => {
            console.error('fetch failed:', error);
            const container = document.getElementById('resume-container');
            if (container) {
                container.innerText = '⚠ 無法載入資料';
            }
        });
}

// ✅ 渲染指定的 BItem（只渲染 SItem 和內容，不渲染 BItemNM 標題）
function renderSpecificSection(rawData, blockName) {
    const resume = rawData[0];
    const bItem = resume.BItemList.find(b => b.BItemNM === blockName);

    if (!bItem) {
        console.warn("⚠ 找不到 BItemNM:", blockName);
        const container = document.getElementById("resume-container");
        if (container) container.innerText = `⚠ 找不到區塊：${blockName}`;
        return;
    }

    const container = document.getElementById("resume-container");
    if (!container) return;
    container.innerHTML = '';

    const section = document.createElement("section");

    bItem.SItemList.forEach(sItem => {
        // 🔸 子標題（SItemNM）
        const subtitle = document.createElement("h3");
        subtitle.classList.add("sitem-title");
        subtitle.textContent = sItem.SItemNM;
        section.appendChild(subtitle);

        // 🔸 內容清單
        sItem.ContentList.forEach(content => {
            const paragraph = document.createElement("p");
            paragraph.textContent = content.Content;
            section.appendChild(paragraph);
        });
    });

    container.appendChild(section);
}
