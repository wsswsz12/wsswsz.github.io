
// tai_he_tang_tcm_clinic/frontend/js/main.js
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有页面的公共功能
    initCommonFeatures();
    
    // 根据当前页面初始化特定功能
    const pathname = window.location.pathname.split('/').pop();
    switch(pathname) {
        case 'knowledge.html':
            initKnowledgePage();
            break;
        case 'virtual-tour.html':
            initVirtualTourPage();
            break;
        case 'herbs.html':
            initHerbsPage();
            break;
        default:
            initHomePage();
    }
});

// 公共功能初始化
function initCommonFeatures() {
    // 移动端菜单切换
    const mobileMenuButton = document.querySelector('button.md\\:hidden');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            const navItems = document.querySelector('.md\\:hidden + .md\\:flex');
            if (navItems) {
                navItems.classList.toggle('hidden');
            }
        });
    }

    // 初始化粒子特效
    initParticles();
}

// 粒子特效初始化
function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5,
            color: `rgba(16, 185, 129, ${Math.random() * 0.4 + 0.1})`
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
            if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// 首页特定功能
function initHomePage() {
    // 首页暂无特殊功能
}

// 知识库页面初始化
function initKnowledgePage() {
    // 初始化知识库数据
    if (!localStorage.getItem('tcmKnowledge')) {
        const knowledgeData = [
            {
                id: 1,
                title: "脾胃虚弱调理",
                category: "digestive",
                content: "脾胃虚弱表现为食欲不振、腹胀、大便稀溏。调理方法：1. 饮食规律，少食多餐；2. 多吃山药、莲子、薏米等健脾食物；3. 避免生冷油腻；4. 可按摩足三里穴位。",
                image: "https://picsum.photos/400/300?random=101"
            },
            {
                id: 2,
                title: "感冒初期调理",
                category: "respiratory",
                content: "感冒初期表现为鼻塞、流涕、轻微发热。调理方法：1. 生姜红糖水发汗解表；2. 葱白豆豉汤；3. 热水泡脚至微微出汗；4. 注意保暖休息。",
                image: "https://picsum.photos/400/300?random=102"
            },
            {
                id: 3,
                title: "失眠调理",
                category: "sleep",
                content: "失眠多由心肾不交或肝郁化火引起。调理方法：1. 睡前热水泡脚；2. 酸枣仁、柏子仁煮水代茶饮；3. 按摩涌泉穴；4. 避免睡前使用电子产品。",
                image: "https://picsum.photos/400/300?random=103"
            },
            {
                id: 4,
                title: "工作压力缓解",
                category: "stress",
                content: "长期压力导致肝气郁结。调理方法：1. 玫瑰花、菊花代茶饮；2. 适量运动如八段锦；3. 按摩太冲穴；4. 保持规律作息。",
                image: "https://picsum.photos/400/300?random=104"
            },
            {
                id: 5,
                title: "提升免疫力",
                category: "immunity",
                content: "中医认为正气存内，邪不可干。调理方法：1. 黄芪、枸杞泡水；2. 保证充足睡眠；3. 适度晒太阳；4. 练习太极拳等舒缓运动。",
                image: "https://picsum.photos/400/300?random=105"
            },
            {
                id: 6,
                title: "慢性咳嗽调理",
                category: "respiratory",
                content: "慢性咳嗽多由肺脾两虚引起。调理方法：1. 百合、银耳炖梨；2. 避免辛辣刺激；3. 按摩肺俞穴；4. 适度有氧运动增强肺功能。",
                image: "https://picsum.photos/400/300?random=106"
            }
        ];
        localStorage.setItem('tcmKnowledge', JSON.stringify(knowledgeData));
    }
    
    // 加载知识库内容
    loadKnowledge('all');
    
    // 绑定搜索事件
    const searchButton = document.querySelector('#knowledgeSearch + button');
    if (searchButton) {
        searchButton.addEventListener('click', searchKnowledge);
    }
    
    // 绑定搜索框回车事件
    const searchInput = document.getElementById('knowledgeSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchKnowledge();
            }
        });
    }
}

// 加载知识库内容
function loadKnowledge(category) {
    const container = document.getElementById('knowledgeContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    const knowledgeData = JSON.parse(localStorage.getItem('tcmKnowledge'));
    let filteredData = knowledgeData;
    
    if (category !== 'all') {
        filteredData = knowledgeData.filter(item => item.category === category);
    }
    
    // 更新标签状态
    const tabs = document.querySelectorAll('.flex.space-x-4 button');
    tabs.forEach(tab => {
        const tabCategory = tab.getAttribute('onclick').replace("filterKnowledge('", "").replace("')", "");
        if (tabCategory === category) {
            tab.classList.add('active-tab');
            tab.classList.remove('hover:text-green-800');
        } else {
            tab.classList.remove('active-tab');
            tab.classList.add('hover:text-green-800');
        }
    });
    
    if (filteredData.length === 0) {
        container.innerHTML = '<div class="col-span-3 text-center text-gray-500 py-12">暂无相关数据</div>';
        return;
    }
    
    filteredData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'knowledge-card bg-white rounded-xl overflow-hidden shadow-md transition-all';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-bold text-green-800 mb-3">${item.title}</h3>
                <p class="text-gray-700 mb-4">${item.content}</p>
                <button onclick="showKnowledgeDetail(${item.id})" class="text-green-700 hover:text-green-900 font-medium transition-all flex items-center">
                    查看详情
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// 筛选知识
function filterKnowledge(category) {
    loadKnowledge(category);
}

// 搜索知识
function searchKnowledge() {
    const searchTerm = document.getElementById('knowledgeSearch').value.toLowerCase();
    if (!searchTerm) {
        loadKnowledge('all');
        return;
    }
    
    const container = document.getElementById('knowledgeContainer');
    container.innerHTML = '';
    
    const knowledgeData = JSON.parse(localStorage.getItem('tcmKnowledge'));
    const filteredData = knowledgeData.filter(item => 
        item.title.toLowerCase().includes(searchTerm) || 
        item.content.toLowerCase().includes(searchTerm)
    );
    
    if (filteredData.length === 0) {
        container.innerHTML = '<div class="col-span-3 text-center text-gray-500 py-12">没有找到相关结果</div>';
        return;
    }
    
    filteredData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'knowledge-card bg-white rounded-xl overflow-hidden shadow-md transition-all';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-bold text-green-800 mb-3">${item.title}</h3>
                <p class="text-gray-700 mb-4">${item.content}</p>
                <button onclick="showKnowledgeDetail(${item.id})" class="text-green-700 hover:text-green-900 font-medium transition-all flex items-center">
                    查看详情
                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// 查看知识详情
function showKnowledgeDetail(id) {
    alert('正在开发中，详情功能即将上线！');
}

// 虚拟导览页面初始化
function initVirtualTourPage() {
    // 默认显示接待大厅
    showTourSection('reception');
    
    // 绑定导览按钮事件
    const tourButtons = document.querySelectorAll('.tour-highlight');
    tourButtons.forEach(button => {
        const sectionId = button.getAttribute('onclick').replace("showTourSection('", "").replace("')", "");
        button.addEventListener('click', () => showTourSection(sectionId));
    });
    
    // 绑定详情按钮事件
    document.querySelectorAll('.tour-card button').forEach(button => {
        button.addEventListener('click', function() {
            alert('正在开发中，详情功能即将上线！');
        });
    });
    
    // 绑定视频和图片按钮事件
    document.querySelectorAll('.bg-green-700, .border-green-700').forEach(button => {
        button.addEventListener('click', function() {
            alert('正在开发中，多媒体功能即将上线！');
        });
    });
}

// 显示导览区域
function showTourSection(sectionId) {
    const sections = ['reception', 'consultation', 'herb-room', 'therapy'];
    
    sections.forEach(id => {
        const element = document.getElementById(id);
        if (id === sectionId) {
            element.style.transform = 'translateX(0)';
        } else {
            element.style.transform = 'translateX(100%)';
        }
    });
}

// 药材页面初始化
function initHerbsPage() {
    // 初始化药材数据
    if (!localStorage.getItem('tcmHerbs')) {
        const herbsData = [
            {
                id: 1,
                name: "人参",
                latinName: "Panax ginseng C.A.Mey.",
                category: "tonic",
                nature: "甘、微苦，微温",
                meridian: "归脾、肺、心经",
                dosage: "3-9g，另煎兑服；也可研粉吞服，一次2g，一日2次",
                effects: "大补元气，复脉固脱，补脾益肺，生津安神。用于体虚欲脱，肢冷脉微，脾虚食少，肺虚喘咳，津伤口渴，内热消渴，久病虚羸，惊悸失眠，阳痿宫冷。",
                applications: "1. 用于急救：大剂量的人参(15-30g)煎服或炖服，或以人参注射液(每毫升含生药0.57g)2-4毫升肌肉或静脉注射，可用于心源性休克的急救。\n2. 治疗心血管系统疾病：人参对高血压病、心肌营养不良、冠状动脉硬化、心绞痛等都有一定治疗作用。\n3. 治疗胃和肝脏疾病：对慢性胃炎伴有胃酸缺乏或胃酸过低者，服人参后可见胃纳增加。",
                precautions: "1. 实证、热证而正气不虚者忌服。\n2. 反藜芦、畏五灵脂、恶皂荚，应忌同用。\n3. 服人参不宜喝茶和吃萝卜，以免影响药力。\n4. 不宜与葡萄同吃，葡萄中含有鞣酸，极易与人参中的蛋白质结合生成沉淀，影响吸收。",
                image: "https://picsum.photos/400/300?random=301"
            },
            {
                id: 2,
                name: "黄芪",
                latinName: "Astragalus membranaceus (Fisch.) Bunge",
                category: "tonic",
                nature: "甘，微温",
                meridian: "归肺、脾经",
                dosage: "9-30g",
                effects: "补气固表，利尿托毒，排脓，敛疮生肌。用于气虚乏力，食少便溏，中气下陷，久泻脱肛，便血崩漏，表虚自汗，气虚水肿，痈疽难溃，久溃不敛，血虚萎黄，内热消渴。",
                applications: "1. 治疗气虚表卫不固所致的自汗：常与牡蛎、麻黄根等配伍，如牡蛎散。\n2. 治疗脾肺气虚或中气下陷证：常与人参、白术等配伍，如补中益气汤。\n3. 治疗气血不足所致的疮疡内陷，脓成不溃或溃久不敛：常与当归、穿山甲等配伍，如透脓散。",
                precautions: "1. 表实邪盛、气滞湿阻、食积内停、阴虚阳亢、痈疽初起或溃后热毒尚盛等证，均不宜用。\n2. 孕妇慎用。",
                image: "https://picsum.photos/400/300?random=302"
            },
            {
                id: 3,
                name: "金银花",
                latinName: "Lonicera japonica Thunb.",
                category: "heat-clearing",
                nature: "甘，寒",
                meridian: "归肺、心、胃经",
                dosage: "6-15g",
                effects: "清热解毒，疏散风热。用于痈肿疔疮，喉痹，丹毒，热毒血痢，风热感冒，温病发热。",
                applications: "1. 治疗外感风热或温病初起：常与连翘、薄荷等配伍，如银翘散。\n2. 治疗热毒疮痈：常与蒲公英、紫花地丁等配伍，如五味消毒饮。\n3. 治疗热毒血痢：单用或与黄连、黄芩等配伍。",
                precautions: "脾胃虚寒及气虚疮疡脓清者忌用。",
                image: "https://picsum.photos/400/300?random=303"
            },
            {
                id: 4,
                name: "丹参",
                latinName: "Salvia miltiorrhiza Bunge",
                category: "blood-activating",
                nature: "苦，微寒",
                meridian: "归心、肝经",
                dosage: "9-15g",
                effects: "活血祛瘀，通经止痛，清心除烦，凉血消痈。用于胸痹心痛，脘腹胁痛，癥瘕积聚，热痹疼痛，心烦不眠，月经不调，痛经经闭，疮疡肿痛。",
                applications: "1. 治疗胸痹心痛：常与檀香、砂仁等配伍，如丹参饮。\n2. 治疗月经不调、痛经、经闭：常与当归、川芎等配伍。\n3. 治疗疮疡肿痛：常与金银花、连翘等配伍。",
                precautions: "1. 不宜与藜芦同用。\n2. 孕妇慎用。",
                image: "https://picsum.photos/400/300?random=304"
            },
            {
                id: 5,
                name: "陈皮",
                latinName: "Citrus reticulata Blanco",
                category: "qi-regulating",
                nature: "苦、辛，温",
                meridian: "归肺、脾经",
                dosage: "3-10g",
                effects: "理气健脾，燥湿化痰。用于脘腹胀满，食少吐泻，咳嗽痰多。",
                applications: "1. 治疗脾胃气滞证：常与木香、砂仁等配伍。\n2. 治疗湿痰、寒痰咳嗽：常与半夏、茯苓等配伍，如二陈汤。\n3. 治疗胸痹胸中气塞短气：常与枳实、生姜等配伍，如橘皮枳实生姜汤。",
                precautions: "1. 气虚及阴虚燥咳者不宜用。\n2. 吐血证慎服。",
                image: "https://picsum.photos/400/300?random=305"
            },
            {
                id: 6,
                name: "茯苓",
                latinName: "Poria cocos (Schw.) Wolf",
                category: "dampness-removing",
                nature: "甘、淡，平",
                meridian: "归心、肺、脾、肾经",
                dosage: "9-15g",
                effects: "利水渗湿，健脾，宁心。用于水肿尿少，痰饮眩悸，脾虚食少，便溏泄泻，心神不安，惊悸失眠。",
                applications: "1. 治疗水肿：常与猪苓、泽泻等配伍，如五苓散。\n2. 治疗脾虚湿盛泄泻：常与白术、山药等配伍，如参苓白术散。\n3. 治疗痰饮：常与桂枝、白术等配伍，如苓桂术甘汤。\n4. 治疗心悸、失眠：常与酸枣仁、远志等配伍。",
                precautions: "虚寒精滑或气虚下陷者忌服。",
                image: "https://picsum.photos/400/300?random=306"
            },
            {
                id: 7,
                name: "当归",
                latinName: "Angelica sinensis (Oliv.) Diels",
                category: "tonic",
                nature: "甘、辛，温",
                meridian: "归肝、心、脾经",
                dosage: "6-12g",
                effects: "补血活血，调经止痛，润肠通便。用于血虚萎黄，眩晕心悸，月经不调，经闭痛经，虚寒腹痛，风湿痹痛，跌扑损伤，痈疽疮疡，肠燥便秘。",
                applications: "1. 治疗血虚诸证：常与熟地黄、白芍等配伍，如四物汤。\n2. 治疗血虚血瘀之月经不调、经闭、痛经：常与香附、桃仁等配伍。\n3. 治疗虚寒腹痛：常与生姜、羊肉等配伍，如当归生姜羊肉汤。\n4. 治疗痈疽疮疡：常与金银花、赤芍等配伍。",
                precautions: "1. 湿盛中满、大便泄泻者忌服。\n2. 孕妇慎用。",
                image: "https://picsum.photos/400/300?random=307"
            },
            {
                id: 8,
                name: "黄连",
                latinName: "Coptis chinensis Franch.",
                category: "heat-clearing",
                nature: "苦，寒",
                meridian: "归心、脾、胃、肝、胆、大肠经",
                dosage: "2-5g",
                effects: "清热燥湿，泻火解毒。用于湿热痞满，呕吐吞酸，泻痢，黄疸，高热神昏，心火亢盛，心烦不寐，心悸不宁，血热吐衄，目赤，牙痛，消渴，痈肿疮毒。",
                applications: "1. 治疗湿热中阻，脘痞呕恶：常与黄芩、干姜等配伍，如半夏泻心汤。\n2. 治疗泻痢：常与木香配伍，如香连丸。\n3. 治疗高热神昏：常与黄芩、黄柏等配伍，如黄连解毒汤。\n4. 治疗心火亢盛之心烦失眠：常与朱砂、生地黄等配伍，如朱砂安神丸。",
                precautions: "1. 脾胃虚寒者忌用。\n2. 阴虚津伤者慎用。",
                image: "https://picsum.photos/400/300?random=308"
            }
        ];
        localStorage.setItem('tcmHerbs', JSON.stringify(herbsData));
    }
    
    // 加载药材内容
    loadHerbs('all');
    
    // 绑定搜索事件
    const searchButton = document.querySelector('#herbSearch + button');
    if (searchButton) {
        searchButton.addEventListener('click', searchHerbs);
    }
    
    // 绑定搜索框回车事件
    const searchInput = document.getElementById('herbSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchHerbs();
            }
        });
    }
    
    // 绑定模态框关闭事件
    const modalCloseButton = document.querySelector('#herbModal button');
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closeHerbModal);
    }
}

// 加载药材内容
function loadHerbs(category) {
    const container = document.getElementById('herbsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    const herbsData = JSON.parse(localStorage.getItem('tcmHerbs'));
    let filteredData = herbsData;
    
    if (category !== 'all') {
        filteredData = herbsData.filter(item => item.category === category);
    }
    
    // 更新标签状态
    const tabs = document.querySelectorAll('.herb-tab');
    tabs.forEach(tab => {
        const tabCategory = tab.getAttribute('onclick').replace("filterHerbs('", "").replace("')", "");
        if (tabCategory === category) {
            tab.classList.add('active');
            tab.classList.remove('hover:bg-green-100');
        } else {
            tab.classList.remove('active');
            tab.classList.add('hover:bg-green-100');
        }
    });
    
    if (filteredData.length === 0) {
        container.innerHTML = '<div class="col-span-4 text-center text-gray-500 py-12">暂无相关药材数据</div>';
        return;
    }
    
    filteredData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'herb-card bg-white rounded-lg overflow-hidden shadow-md transition-all';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="font-bold text-lg text-green-800 mb-2">${item.name}</h3>
                <p class="text-gray-700 text-sm mb-3">${item.effects.substring(0, 60)}...</p>
                <button onclick="showHerbDetail(${item.id})" class="w-full bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition-all">
                    查看详情
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// 筛选药材
function filterHerbs(category) {
    loadHerbs(category);
}

// 搜索药材
function searchHerbs() {
    const searchTerm = document.getElementById('herbSearch').value.toLowerCase();
    if (!searchTerm) {
        loadHerbs('all');
        return;
    }
    
    const container = document.getElementById('herbsContainer');
    container.innerHTML = '';
    
    const herbsData = JSON.parse(localStorage.getItem('tcmHerbs'));
    const filteredData = herbsData.filter(item => 
        item.name.toLowerCase().includes(searchTerm) || 
        item.latinName.toLowerCase().includes(searchTerm) ||
        item.effects.toLowerCase().includes(searchTerm)
    );
    
    if (filteredData.length === 0) {
        container.innerHTML = '<div class="col-span-4 text-center text-gray-500 py-12">没有找到相关药材</div>';
        return;
    }
    
    filteredData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'herb-card bg-white rounded-lg overflow-hidden shadow-md transition-all';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="font-bold text-lg text-green-800 mb-2">${item.name}</h3>
                <p class="text-gray-700 text-sm mb-3">${item.effects.substring(0, 60)}...</p>
                <button onclick="showHerbDetail(${item.id})" class="w-full bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition-all">
                    查看详情
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

// 显示药材详情
function showHerbDetail(id) {
    const herbsData = JSON.parse(localStorage.getItem('tcmHerbs'));
    const herb = herbsData.find(item => item.id === id);
    
    if (herb) {
        document.getElementById('herbModalTitle').textContent = herb.name;
        document.getElementById('herbModalImage').src = herb.image;
        document.getElementById('herbModalImage').alt = herb.name;
        document.getElementById('herbLatinName').textContent = herb.latinName;
        document.getElementById('herbNature').textContent = herb.nature;
        document.getElementById('herbMeridian').textContent = herb.meridian;
        document.getElementById('herbDosage').textContent = herb.dosage;
        document.getElementById('herbEffects').textContent = herb.effects;
        document.getElementById('herbApplications').textContent = herb.applications;
        document.getElementById('herbPrecautions').textContent = herb.precautions;
        
        document.getElementById('herbModal').classList.remove('hidden');
    }
}

// 关闭药材详情模态框
function closeHerbModal() {
    document.getElementById('herbModal').classList.add('hidden');
}
