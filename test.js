// ✅ Script載入時，先打log確認
console.log('script.js loaded');

// ✅ 當Vue發出 'vue-app-ready' 事件時，開始動作
window.addEventListener('vue-app-ready', function () {
    console.log('vue-app-ready received, start fetching profile.json');

    // ✅ 等待指定元素存在，確保DOM已渲染好
    waitForElement('#intro-content', function() {
        fetchProfileData();
    });
});

// ✅ 等待某個元素存在後執行callback
function waitForElement(selector, callback) {
    const interval = setInterval(() => {
        if (document.querySelector(selector)) {
            clearInterval(interval); // 找到就停止輪詢
            callback(); // 執行fetch資料
        }
    }, 100); // 每100ms檢查一次
}

// ✅ 讀取profile.json資料，並渲染到畫面
function fetchProfileData() {
    fetch('/Resume/data/profile.json')
        .then(response => {
            console.log('fetch response:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok, status: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data);

            // ✅ 呼叫renderSections()，依資料內容渲染到畫面
            if (data.sections) {
                renderSections(data.sections);
            } else {
                console.error('Sections data not found.');
            }
        })
        .catch(error => {
            console.error('fetch failed:', error);

            // 如果失敗，intro區塊顯示錯誤提示
            const introElement = document.getElementById('intro-content');
            if (introElement) {
                introElement.innerText = 'Failed to load data.';
            }
        });
}

// ✅ 通用渲染function：根據不同區塊型別動態渲染
function renderSections(sections) {
    sections.forEach(section => {
        const container = document.getElementById(section.id);
        if (!container) {
            console.warn(`Element with id "${section.id}" not found.`);
            return;
        }

        if (section.type === 'text') {
            // ✅ 如果是純文字類型
            container.innerText = section.data;
        } else if (section.type === 'list') {
            // ✅ 如果是純列表項目
            container.innerHTML = '';
            section.data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                container.appendChild(li);
            });
        } else if (section.type === 'list-html') {
            // ✅ 如果是有html結構的列表
            container.innerHTML = '';
            section.data.forEach(item => {
                const div = document.createElement('div');
                div.innerHTML = item.html;
                container.appendChild(div);
            });
        } else {
            console.warn(`Unknown section type: ${section.type}`);
        }
    });
}
