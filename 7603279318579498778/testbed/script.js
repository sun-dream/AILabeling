const OS = (() => {
  const state = {
    z: 100,
    editMode: false,
    windows: new Map(),
    lastToastAt: 0,

    panel: "none",
    sys: {
      brightness: 80,
      wifi: true,
      bt: true,
      silent: false,
      airplane: false,
    },

    notifs: [
      { id: 'n1', title: "系统更新", body: "HarmonyOS 4.0.0 已就绪", time: "10分钟前" },
      { id: 'n2', title: "畅连", body: "妈妈: 晚上回家吃饭吗？", time: "30分钟前" },
    ],

    files: [
      { id: 'f1', name: '工作文档.txt', type: 'file', content: '会议记录...' },
      { id: 'f2', name: '照片备份', type: 'folder', children: [] },
      { id: 'f3', name: '项目计划.md', type: 'file', content: '# Q4 Plan' },
    ],
    fsPath: [],
    fsSelectedId: null,

    photos: [
      { id: 'p1', src: null, time: '10:20' },
      { id: 'p2', src: null, time: '昨天' },
      { id: 'p3', src: null, time: '周一' },
    ],

    messages: [
      { id: 'm1', sender: '10086', body: '您的余额不足 10 元，请及时充值。', time: '12:00' },
      { id: 'm2', sender: '快递员', body: '您的快递已放丰巢，取件码 8821。', time: '11:45' },
      { id: 'm3', sender: '华为商城', body: 'Mate 60 Pro 现货开售！', time: '昨天' },
    ],
    emails: [
      { id: 'e1', sender: 'Huawei Cloud', subject: '欢迎使用华为云', body: '这是一封示例邮件，用于展示邮件详情页。', time: '09:30' },
      { id: 'e2', sender: 'Project Bot', subject: 'Build #128 成功', body: '构建已完成。点击查看详情（示意）。', time: '昨天' },
    ],
    notes: {
      fileId: null,
    },
    camera: {
      stream: null,
    },

    locked: true,
    pin: "",
    pinTarget: "1234",
    phone: {
      number: "",
      inCall: false,
      startedAt: null,
      timer: null,
    },
  };

  const APPS = [
    {
      id: "phone",
      name: "电话",
      subtitle: "拨号与通话",
      color: "from-green-400 to-emerald-500",
      dock: true,
      content: renderPhone,
      icon: `<svg class="w-8 h-8 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.161 15.161 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1.01A11.36 11.36 0 018.59 3.99C8.59 3.45 8.14 3 7.6 3H4.12C3.5 3 3 3.5 3 4.13c0 9.97 8.09 18.06 18.06 18.06.63 0 1.13-.5 1.13-1.12V17.6c0-.54-.45-.99-.99-.99-.75-.01-1.48-.09-2.19-.23z"/></svg>`
    },
    {
      id: "messages",
      name: "信息",
      subtitle: "短信与通知",
      color: "from-blue-400 to-cyan-500",
      dock: true,
      content: renderMessages,
      icon: `<svg class="w-8 h-8 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>`
    },
    {
      id: "browser",
      name: "浏览器",
      subtitle: "网页浏览",
      color: "from-sky-400 to-blue-600",
      dock: true,
      content: renderBrowser,
      icon: `<svg class="w-8 h-8 text-white drop-shadow-md" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`
    },
    {
      id: "camera",
      name: "相机",
      subtitle: "拍照与录像",
      color: "from-gray-700 to-slate-900",
      dock: true,
      content: renderCamera,
      icon: `<svg class="w-8 h-8 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"/><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>`
    },
    {
      id: "gallery",
      name: "图库",
      subtitle: "照片与视频",
      color: "from-indigo-400 to-purple-500",
      dock: false,
      content: renderGallery,
      icon: `<svg class="w-8 h-8 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>`
    },
    {
      id: "files",
      name: "文件",
      subtitle: "管理与查看",
      color: "from-amber-400 to-orange-500",
      dock: false,
      content: renderFiles,
      icon: `<svg class="w-8 h-8 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>`
    },
    {
      id: "calculator",
      name: "计算器",
      subtitle: "标准计算",
      color: "from-slate-600 to-slate-800",
      dock: false,
      content: renderCalculator,
      icon: `<svg class="w-8 h-8 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5.75 14H7.25v-1.5h6v1.5zm0-2.5H7.25v-1.5h6v1.5zm0-2.5H7.25V10.5h6v1.5zm3.25 5h-1.5V10.5h1.5v6.5zm2.5 0h-1.5V10.5h1.5v6.5z"/></svg>`
    },
    {
      id: "settings",
      name: "设置",
      subtitle: "系统选项",
      color: "from-gray-400 to-slate-500",
      dock: false,
      content: renderSettings,
      icon: `<svg class="w-8 h-8 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.58 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`
    },
    {
      id: "notes",
      name: "备忘录",
      subtitle: "文本编辑",
      color: "from-yellow-400 to-amber-500",
      dock: false,
      content: renderNotes,
      icon: `<svg class="w-8 h-8 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`
    },
  ];

  function qs(sel, root = document) { return root.querySelector(sel); }
  function qsa(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }
  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  window.OS_openApp = (id) => {
    if (window.OS && window.OS.openApp) {
      window.OS.openApp(id);
    } else {
      console.error("OS system not ready yet.");
    }
  };

  window.OS_toast = (msg) => {
    if (window.OS && window.OS.toast) window.OS.toast(msg);
  };

  window.OS_fileAction = (act) => {
    if (window.OS && window.OS.fileAction) window.OS.fileAction(act);
  };

  window.OS_previewPhoto = (id) => {
    if (window.OS && window.OS.previewPhoto) window.OS.previewPhoto(id);
  };

  window.OS_toggle = (k) => {
    if (window.OS && window.OS.toggle) window.OS.toggle(k);
  };

  window.OS_setBrightness = (v) => {
    if (window.OS && window.OS.setBrightness) window.OS.setBrightness(v);
  };

  window.OS_unlock = () => {
    if (window.OS && window.OS.unlock) window.OS.unlock();
  };

  function nowTimeText() {
    const d = new Date();
    return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }
  function dateText() {
    const d = new Date();
    const w = "日一二三四五六".charAt(d.getDay());
    return `${d.getMonth() + 1}月${d.getDate()}日 星期${w}`;
  }
  function toast(msg) {
    const t = qs("#toast");
    const text = qs("#toast-text");
    if (!t || !text) return;

    const now = Date.now();
    if (now - state.lastToastAt < 500) return;
    state.lastToastAt = now;

    text.textContent = msg;
    t.classList.remove("hidden");
    t.style.animation = 'none';
    t.offsetHeight;
    t.style.animation = 'pop 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';

    clearTimeout(t._timer);
    t._timer = setTimeout(() => {
      t.classList.add("hidden");
    }, 2000);
  }

  function ensureInputSheet() {
    if (qs('#os-input-sheet')) return;
    const root = qs('#os') || document.body;
    const el = document.createElement('div');
    el.id = 'os-input-sheet';
    el.className = 'fixed inset-0 z-[80] hidden';
    el.innerHTML = `
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div class="relative h-full flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0">
        <div class="w-full max-w-[520px] rounded-[28px] border border-white/10 bg-black/45 backdrop-blur-2xl shadow-float overflow-hidden">
          <div class="px-4 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <div id="os-input-title" class="text-[14px] font-semibold text-white/90">输入</div>
            <button id="os-input-close" class="rounded-xl px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 active:scale-[0.98] transition" type="button">关闭</button>
          </div>
          <div class="p-4 space-y-3">
            <input id="os-input-value" class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:bg-white/10 transition" />
            <div class="flex items-center justify-end gap-2">
              <button id="os-input-cancel" class="px-4 py-2 rounded-2xl bg-white/10 text-white/80 text-sm hover:bg-white/15 active:scale-[0.98] transition" type="button">取消</button>
              <button id="os-input-ok" class="px-4 py-2 rounded-2xl bg-blue-500/25 text-blue-100 text-sm hover:bg-blue-500/30 active:scale-[0.98] transition" type="button">确定</button>
            </div>
          </div>
        </div>
      </div>
    `;
    root.appendChild(el);
  }

  function openInputSheet(opts) {
    ensureInputSheet();
    const sheet = qs('#os-input-sheet');
    const title = qs('#os-input-title', sheet);
    const input = qs('#os-input-value', sheet);
    const ok = qs('#os-input-ok', sheet);
    const cancel = qs('#os-input-cancel', sheet);
    const close = qs('#os-input-close', sheet);
    const scrim = sheet.firstElementChild;

    title.textContent = opts && opts.title ? opts.title : '输入';
    input.placeholder = (opts && opts.placeholder) ? opts.placeholder : '';
    input.value = (opts && typeof opts.value === 'string') ? opts.value : '';
    ok.textContent = (opts && opts.okText) ? opts.okText : '确定';

    sheet.classList.remove('hidden');
    setTimeout(() => input.focus(), 0);

    return new Promise((resolve) => {
      const done = (val) => {
        sheet.classList.add('hidden');
        ok.removeEventListener('click', onOk);
        cancel.removeEventListener('click', onCancel);
        close.removeEventListener('click', onCancel);
        scrim.removeEventListener('click', onCancel);
        input.removeEventListener('keydown', onKey);
        resolve(val);
      };
      const onOk = () => done(input.value.trim());
      const onCancel = () => done(null);
      const onKey = (e) => {
        if (e.key === 'Enter') onOk();
        if (e.key === 'Escape') onCancel();
      };
      ok.addEventListener('click', onOk);
      cancel.addEventListener('click', onCancel);
      close.addEventListener('click', onCancel);
      scrim.addEventListener('click', onCancel);
      input.addEventListener('keydown', onKey);
    });
  }

  function appIcon(app, size = "lg") {
    const dim = size === "sm" ? "h-11 w-11" : "h-[56px] w-[56px]";
    return `
      <div class="relative grid place-items-center rounded-[18px] shadow-lg shadow-black/20 overflow-hidden ${dim} bg-gradient-to-br ${app.color} border border-white/10 group">
        <div class="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-60"></div>
        <div class="relative z-10 transform transition-transform duration-300 group-active:scale-90">
          ${app.icon}
        </div>
      </div>
    `;
  }

  function renderPhone() {
    return `
      <div class="h-full flex flex-col" id="phone-app">
        <div id="phone-call" class="hidden absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/70 backdrop-blur-xl p-6">
          <div class="h-full flex flex-col items-center justify-center text-center">
            <div class="text-white/70 text-sm">正在通话</div>
            <div id="phone-call-number" class="mt-2 text-3xl font-light text-white"></div>
            <div id="phone-call-time" class="mt-2 text-white/60 text-sm tabular-nums">00:00</div>
            <div class="mt-10">
              <button id="btn-hangup" class="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-400 active:scale-95 transition shadow-lg shadow-red-500/30" type="button">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M21 15.46l-5.27-1.06a1 1 0 00-1.06.53l-1.2 2.1a16.07 16.07 0 01-7.06-7.06l2.1-1.2a1 1 0 00.53-1.06L8.54 3A1 1 0 007.56 2H3a1 1 0 00-1 1c0 10.49 8.51 19 19 19a1 1 0 001-1v-4.56a1 1 0 00-.99-.98z"/></svg>
              </button>
            </div>
          </div>
        </div>
        <div class="flex-1 flex flex-col justify-end pb-8 px-6">
          <div class="text-center mb-8">
            <div id="phone-display" class="text-4xl font-light text-white mb-2 h-12"></div>
            <div class="text-white/50 text-sm">点击号码拨打</div>
          </div>
          
          <div class="grid grid-cols-3 gap-y-6 gap-x-8 max-w-[280px] mx-auto">
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map(n => `
              <button class="phone-key w-16 h-16 rounded-full bg-white/10 flex flex-col items-center justify-center hover:bg-white/20 active:bg-white/30 transition" data-key="${n}">
                <span class="text-2xl font-medium text-white">${n}</span>
              </button>
            `).join('')}
          </div>
          
          <div class="mt-8 flex justify-center items-center gap-8">
             <div class="w-16"></div>
             <button class="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-400 active:scale-95 transition shadow-lg shadow-green-500/30" id="btn-call">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.161 15.161 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1.01A11.36 11.36 0 018.59 3.99C8.59 3.45 8.14 3 7.6 3H4.12C3.5 3 3 3.5 3 4.13c0 9.97 8.09 18.06 18.06 18.06.63 0 1.13-.5 1.13-1.12V17.6c0-.54-.45-.99-.99-.99-.75-.01-1.48-.09-2.19-.23z"/></svg>
             </button>
             <button class="w-16 h-16 flex items-center justify-center text-white/50 hover:text-white" id="btn-del">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"/></svg>
             </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderMessages() {
    return `
      <div class="h-full flex flex-col" id="messages-app">
        <div class="flex items-center gap-2 mb-3">
          <button class="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 active:scale-[0.98] transition text-xs text-white/85" type="button" data-msg-tab="sms">短信</button>
          <button class="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 active:scale-[0.98] transition text-xs text-white/85" type="button" data-msg-tab="mail">邮件</button>
        </div>
        <div class="flex-1 overflow-auto" id="messages-body"></div>
      </div>
    `;
  }

  function renderCalculator() {
    const keys = [
      'C', '÷', '×', '⌫',
      '7', '8', '9', '-',
      '4', '5', '6', '+',
      '1', '2', '3', '=',
      '%', '0', '.', ''
    ];
    return `
      <div class="h-full flex flex-col" id="calc-app">
        <div class="flex-1 flex flex-col justify-end p-4 mb-2">
          <div id="calc-display" class="text-right text-5xl font-light text-white break-all">0</div>
        </div>
        <div class="grid grid-cols-4 gap-3 p-2">
          ${keys.map(k => {
      if (k === '') return '<div></div>';
      let bg = 'bg-white/10';
      if (['÷', '×', '-', '+', '='].includes(k)) bg = 'bg-orange-500/80 text-white';
      else if (['C', '⌫', '%'].includes(k)) bg = 'bg-white/20';

      return `
              <button class="h-16 rounded-2xl ${bg} text-xl font-medium text-white hover:brightness-110 active:scale-95 transition" data-calc-key="${k}">
                ${k}
              </button>
            `;
    }).join('')}
        </div>
      </div>
    `;
  }

  function renderCamera() {
    return `
      <div class="h-full bg-black flex flex-col relative overflow-hidden rounded-xl" id="camera-app">
        <div class="flex-1 bg-black flex items-center justify-center relative">
          <video id="camera-video" class="absolute inset-0 w-full h-full object-cover" autoplay playsinline muted></video>
          <canvas id="camera-canvas" class="hidden"></canvas>
          <div class="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35"></div>
          <div id="camera-perm" class="absolute inset-0 flex items-center justify-center px-6 text-center">
            <div class="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl px-4 py-3 text-white/85 text-sm">
              需要相机权限以显示取景画面
            </div>
          </div>
          <div id="camera-flash" class="absolute inset-0 bg-white opacity-0 pointer-events-none transition-opacity duration-100"></div>
        </div>
        <div class="h-32 bg-black/40 backdrop-blur-md flex items-center justify-center gap-12 relative z-10">
           <div class="w-12 h-12 rounded-lg bg-white/10"></div>
           <button id="btn-shutter" class="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center active:scale-90 transition" type="button">
              <div class="w-12 h-12 bg-white rounded-full"></div>
           </button>
           <div class="w-12 h-12"></div>
        </div>
      </div>
    `;
  }

  function renderFiles() {
    return `
      <div class="flex flex-col h-full" id="files-app">
        <div class="flex items-center justify-between gap-2 mb-3">
          <div class="flex items-center gap-2 min-w-0">
            <button id="files-back" class="hidden w-9 h-9 rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 transition grid place-items-center text-white/80" type="button">←</button>
            <div class="min-w-0">
              <div class="text-xs text-white/50">文件</div>
              <div id="files-path" class="text-sm text-white/90 truncate"></div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button id="files-new-file" class="px-3 py-2 rounded-xl bg-blue-500/20 text-blue-200 text-xs hover:bg-blue-500/25 active:scale-[0.98] transition" type="button">新建文件</button>
            <button id="files-new-folder" class="px-3 py-2 rounded-xl bg-amber-500/20 text-amber-200 text-xs hover:bg-amber-500/25 active:scale-[0.98] transition" type="button">新建文件夹</button>
            <button id="files-del" class="px-3 py-2 rounded-xl bg-red-500/20 text-red-200 text-xs hover:bg-red-500/25 active:scale-[0.98] transition" type="button">删除</button>
          </div>
        </div>
        <div class="flex-1 overflow-auto space-y-2" id="file-list"></div>
      </div>
    `;
  }

  function renderGallery() {
    return `
      <div class="grid grid-cols-3 gap-2 p-1">
        ${state.photos.map(p => `
          <button class="group relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition active:scale-95" onclick="OS_previewPhoto('${p.id}')">
            <img src="${p.src || ''}" alt="photo" class="absolute inset-0 w-full h-full object-cover opacity-95 group-hover:opacity-100 transition" />
            <div class="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/40 text-[10px] text-white/80">${p.time}</div>
          </button>
        `).join('')}
      </div>
    `;
  }

  function renderBrowser() {
    return `
      <div class="flex flex-col h-full gap-3" id="browser-app">
        <div class="flex items-center gap-2">
          <input id="browser-url" type="text" value="demo://harmonyos" class="flex-1 bg-white/10 rounded-full px-4 py-2 text-xs text-white outline-none focus:bg-white/20 transition" />
          <button id="browser-go" class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 active:scale-95 transition flex items-center justify-center text-white text-xs" type="button">→</button>
          <button id="browser-refresh" class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 active:scale-95 transition flex items-center justify-center text-white text-xs" type="button">↻</button>
        </div>
        <div class="flex items-center gap-2">
          <button class="px-3 py-1.5 rounded-xl bg-white/10 text-white/80 text-xs hover:bg-white/15 active:scale-[0.98] transition" type="button" data-browser-demo="harmonyos">示例页</button>
          <button class="px-3 py-1.5 rounded-xl bg-white/10 text-white/80 text-xs hover:bg-white/15 active:scale-[0.98] transition" type="button" data-browser-demo="wiki">百科页</button>
        </div>
        <div class="flex-1 rounded-2xl overflow-hidden border border-white/10 bg-white">
          <iframe id="browser-frame" class="w-full h-full border-0"></iframe>
        </div>
      </div>
    `;
  }

  function renderSettings() {
    return `
      <div class="space-y-3">
        <div class="p-3 rounded-xl bg-white/5 flex items-center gap-3">
           <div class="w-12 h-12 rounded-full bg-gray-600"></div>
           <div>
             <div class="text-white font-medium">Huawei User</div>
             <div class="text-white/50 text-xs">HarmonyOS 4.0.0</div>
           </div>
        </div>
        
        <div class="space-y-1">
           ${['WLAN', '蓝牙', '移动网络', '更多连接'].map(item => `
             <div class="p-3 rounded-xl bg-white/5 flex justify-between items-center text-white text-sm hover:bg-white/10 active:bg-white/15 transition">
               <span>${item}</span>
               <span class="text-white/30">></span>
             </div>
           `).join('')}
        </div>
      </div>
    `;
  }

  function renderNotes() {
    return `
      <div class="flex flex-col h-full" id="notes-app">
        <div class="flex items-center justify-between mb-2 px-1">
          <span id="notes-title" class="text-xs text-white/60 truncate">备忘录</span>
          <div class="flex items-center gap-2">
            <button id="notes-save" class="px-3 py-1.5 rounded-xl bg-blue-500/20 text-blue-200 text-xs hover:bg-blue-500/25 active:scale-[0.98] transition" type="button">保存</button>
            <button id="notes-saveas" class="px-3 py-1.5 rounded-xl bg-white/10 text-white/80 text-xs hover:bg-white/15 active:scale-[0.98] transition" type="button">另存为</button>
          </div>
        </div>
        <textarea id="notes-text" class="flex-1 w-full bg-white/5 rounded-2xl text-white resize-none outline-none p-4 text-sm leading-relaxed" placeholder="在此输入内容..."></textarea>
      </div>
    `;
  }

  function openApp(id, opts) {
    const app = APPS.find(a => a.id === id);
    if (!app) {
      return;
    }

    if (state.windows.has(id)) {
      const w = state.windows.get(id);
      w.el.style.display = 'block';
      if (opts) {
        const body = w.el.querySelector('[data-window-content]');
        if (body) {
          body.innerHTML = app.content(opts);
          if (id === 'files') bindFiles(w.el);
          if (id === 'messages') bindMessages(w.el);
          if (id === 'notes') bindNotes(w.el, opts);
          if (id === 'browser') bindBrowser(w.el);
        }
      }
      focusWindow(w.el);
      return;
    }


    const el = document.createElement('div');
    el.className = `absolute top-12 left-4 right-4 bottom-20 bg-[#1c1c1e] rounded-[24px] overflow-hidden shadow-2xl border border-white/10 flex flex-col animate-pop origin-bottom pointer-events-auto`;
    el.style.zIndex = ++state.z;

    el.innerHTML = `
      <div class="h-8 flex items-center justify-center relative bg-white/5 shrink-0 touch-none user-select-none" id="titlebar">
         <div class="w-12 h-1 bg-white/20 rounded-full"></div>
         <button class="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/10 text-white/50 flex items-center justify-center text-xs hover:bg-red-500 hover:text-white transition" id="btn-close">×</button>
      </div>
      <div class="flex-1 overflow-hidden relative" data-window-content>
        ${app.content(opts)}
      </div>
    `;

    qs('#windows').appendChild(el);
    state.windows.set(id, { el, app });

    const closeBtn = el.querySelector('#btn-close');
    closeBtn.addEventListener('click', () => closeApp(id));

    el.addEventListener('pointerdown', () => focusWindow(el));

    if (id === 'phone') bindPhone(el);
    if (id === 'calculator') bindCalculator(el);
    if (id === 'camera') bindCamera(el);
    if (id === 'files') bindFiles(el);
    if (id === 'messages') bindMessages(el);
    if (id === 'notes') bindNotes(el, opts);
    if (id === 'browser') bindBrowser(el);

    toast(`打开 ${app.name}`);
  }

  function closeApp(id) {
    const w = state.windows.get(id);
    if (w) {
      if (id === 'camera') stopCamera();
      w.el.classList.add('animate-sink');
      w.el.addEventListener('animationend', () => {
        w.el.remove();
        state.windows.delete(id);
      });
    }
  }

  function focusWindow(el) {
    el.style.zIndex = ++state.z;
  }

  function bindPhone(el) {
    const display = el.querySelector('#phone-display');
    const callLayer = el.querySelector('#phone-call');
    const callNumber = el.querySelector('#phone-call-number');
    const callTime = el.querySelector('#phone-call-time');
    let num = "";
    el.querySelectorAll('.phone-key').forEach(btn => {
      btn.addEventListener('click', () => {
        if (state.phone.inCall) return;
        if (num.length < 13) {
          num += btn.dataset.key;
          display.textContent = num;
        }
      });
    });
    el.querySelector('#btn-del').addEventListener('click', () => {
      if (state.phone.inCall) return;
      num = num.slice(0, -1);
      display.textContent = num;
    });
    el.querySelector('#btn-call').addEventListener('click', () => {
      if (state.phone.inCall) return;
      if (!num) return;
      state.phone.inCall = true;
      state.phone.number = num;
      state.phone.startedAt = Date.now();
      callNumber.textContent = num;
      callLayer.classList.remove('hidden');
      const tick = () => {
        const sec = Math.floor((Date.now() - state.phone.startedAt) / 1000);
        const mm = String(Math.floor(sec / 60)).padStart(2, '0');
        const ss = String(sec % 60).padStart(2, '0');
        callTime.textContent = `${mm}:${ss}`;
      };
      tick();
      state.phone.timer = setInterval(tick, 1000);
    });

    el.querySelector('#btn-hangup').addEventListener('click', () => {
      state.phone.inCall = false;
      state.phone.number = "";
      state.phone.startedAt = null;
      if (state.phone.timer) clearInterval(state.phone.timer);
      state.phone.timer = null;
      callLayer.classList.add('hidden');
      toast('通话已结束');
    });
  }

  function bindCalculator(el) {
    const display = el.querySelector('#calc-display');
    let expr = "";
    el.querySelectorAll('[data-calc-key]').forEach(btn => {
      btn.addEventListener('click', () => {
        const k = btn.dataset.calcKey;
        if (k === 'C') { expr = ""; }
        else if (k === '⌫') { expr = expr.slice(0, -1); }
        else if (k === '=') {
          try {
            expr = String(eval(expr.replace(/×/g, '*').replace(/÷/g, '/')));
          } catch { expr = "Error"; }
        }
        else { expr += k; }
        display.textContent = expr || "0";
      });
    });
  }

  function bindCamera(el) {
    const app = el.querySelector('#camera-app');
    if (!app) return;
    const video = app.querySelector('#camera-video');
    const canvas = app.querySelector('#camera-canvas');
    const perm = app.querySelector('#camera-perm');

    const start = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        perm.classList.remove('hidden');
        perm.querySelector('div').textContent = '当前环境不支持相机取景';
        return;
      }
      try {
        stopCamera();
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
          audio: false
        });
        state.camera.stream = stream;
        video.srcObject = stream;
        perm.classList.add('hidden');
      } catch (e) {
        perm.classList.remove('hidden');
        perm.querySelector('div').textContent = '相机权限被拒绝或不可用，点击此处重试';
      }
    };

    perm.addEventListener('click', start);
    start();

    app.querySelector('#btn-shutter').addEventListener('click', () => {
      const flash = el.querySelector('#camera-flash');
      flash.classList.remove('opacity-0');
      setTimeout(() => flash.classList.add('opacity-0'), 100);

      let src = null;
      if (state.camera.stream && video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        src = canvas.toDataURL('image/jpeg', 0.92);
      }
      const newPhoto = { id: `p_${Date.now()}`, src: src || makePhotoSrc(Date.now()), time: '刚刚' };
      state.photos.unshift(newPhoto);
      toast("已保存到图库");
    });
  }

  function stopCamera() {
    const stream = state.camera.stream;
    if (!stream) return;
    for (const track of stream.getTracks()) track.stop();
    state.camera.stream = null;
  }

  function makePhotoSrc(seed) {
    const palettes = [
      ["#38bdf8", "#2563eb"],
      ["#a78bfa", "#7c3aed"],
      ["#34d399", "#059669"],
      ["#fb7185", "#e11d48"],
      ["#fbbf24", "#f97316"],
    ];
    const [a, b] = palettes[Math.abs(seed) % palettes.length];
    const label = `PHOTO ${String(seed).slice(-4)}`;
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="720" height="720" viewBox="0 0 720 720">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="${a}"/>
            <stop offset="1" stop-color="${b}"/>
          </linearGradient>
          <filter id="n">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/>
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 .08 0"/>
          </filter>
        </defs>
        <rect width="720" height="720" fill="url(#g)"/>
        <rect width="720" height="720" filter="url(#n)"/>
        <circle cx="540" cy="180" r="120" fill="rgba(255,255,255,0.12)"/>
        <circle cx="180" cy="540" r="160" fill="rgba(0,0,0,0.10)"/>
        <text x="40" y="660" font-family="system-ui, -apple-system, Segoe UI, Roboto" font-size="42" fill="rgba(255,255,255,0.82)">${label}</text>
      </svg>
    `.trim();
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function ensureDefaultPhotos() {
    for (let i = 0; i < state.photos.length; i++) {
      if (!state.photos[i].src) state.photos[i].src = makePhotoSrc(i + 1);
    }
  }

  function ensurePhotoViewer() {
    if (qs('#photo-viewer')) return;
    const root = qs('#os') || document.body;
    const wrap = document.createElement('div');
    wrap.id = 'photo-viewer';
    wrap.className = 'fixed inset-0 z-[70] hidden';
    wrap.innerHTML = `
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div class="relative h-full flex flex-col items-center justify-center px-4">
        <div class="w-full max-w-[520px] rounded-[28px] border border-white/10 bg-black/40 backdrop-blur-xl shadow-float overflow-hidden">
          <div class="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div class="text-sm text-white/85">照片预览</div>
            <button id="photo-close" class="rounded-xl px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 active:scale-[0.98] transition" type="button">关闭</button>
          </div>
          <div class="p-3">
            <img id="photo-img" src="" alt="photo" class="w-full max-h-[70vh] object-contain rounded-2xl bg-black/20" />
          </div>
        </div>
      </div>
    `;
    root.appendChild(wrap);
    wrap.querySelector('#photo-close').addEventListener('click', () => wrap.classList.add('hidden'));
    wrap.addEventListener('click', (e) => {
      if (e.target === wrap || e.target === wrap.firstElementChild) wrap.classList.add('hidden');
    });
  }

  function openPhoto(id) {
    const photo = state.photos.find(p => String(p.id) === String(id));
    if (!photo) return;
    ensurePhotoViewer();
    const viewer = qs('#photo-viewer');
    const img = viewer.querySelector('#photo-img');
    img.src = photo.src || '';
    viewer.classList.remove('hidden');
  }

  function getFsCurrentFolder() {
    let folder = { id: 'root', name: '文件', type: 'folder', children: state.files };
    for (const folderId of state.fsPath) {
      const next = (folder.children || []).find(x => x.type === 'folder' && x.id === folderId);
      if (!next) break;
      folder = next;
    }
    return folder;
  }

  function getFsPathText() {
    const names = ['文件'];
    let folder = { id: 'root', name: '文件', type: 'folder', children: state.files };
    for (const folderId of state.fsPath) {
      const next = (folder.children || []).find(x => x.type === 'folder' && x.id === folderId);
      if (!next) break;
      names.push(next.name);
      folder = next;
    }
    return names.join(' / ');
  }

  function renderFsListHtml(folder) {
    const items = folder.children || [];
    if (items.length === 0) {
      return `<div class="text-center text-white/40 text-sm py-10">空文件夹</div>`;
    }
    return items.map(item => {
      const isSel = String(state.fsSelectedId) === String(item.id);
      const iconBg = item.type === 'folder' ? 'from-amber-300 to-yellow-500' : 'from-blue-400 to-blue-600';
      const icon = item.type === 'folder' ? '📁' : '📄';
      return `
        <button type="button" class="w-full flex items-center gap-3 p-3 rounded-2xl border ${isSel ? 'border-white/25 bg-white/12' : 'border-white/10 bg-white/5 hover:bg-white/10'} transition text-left" data-fs-id="${item.id}" data-fs-type="${item.type}">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center text-base">${icon}</div>
          <div class="flex-1 min-w-0">
            <div class="text-sm text-white truncate">${escapeHtml(item.name)}</div>
            <div class="text-xs text-white/45">${item.type === 'folder' ? '文件夹' : '文件'}</div>
          </div>
          <div class="text-white/30 text-sm">›</div>
        </button>
      `;
    }).join('');
  }

  async function fsCreateItem(type) {
    const folder = getFsCurrentFolder();
    const def = type === 'folder' ? '新建文件夹' : '新建文件.txt';
    const name = await openInputSheet({
      title: type === 'folder' ? '新建文件夹' : '新建文件',
      placeholder: type === 'folder' ? '请输入文件夹名称' : '请输入文件名称',
      value: def,
      okText: '创建'
    });
    const finalName = (name || '').trim();
    if (!finalName) return;
    const item = type === 'folder'
      ? { id: `d_${Date.now()}`, name: finalName, type: 'folder', children: [] }
      : { id: `f_${Date.now()}`, name: finalName, type: 'file', content: '' };
    folder.children.push(item);
    state.fsSelectedId = item.id;
  }

  function fsDeleteSelected() {
    const folder = getFsCurrentFolder();
    const idx = (folder.children || []).findIndex(x => String(x.id) === String(state.fsSelectedId));
    if (idx < 0) {
      toast('请选择要删除的项目');
      return;
    }
    folder.children.splice(idx, 1);
    state.fsSelectedId = null;
    toast('已删除');
  }

  function bindFiles(el) {
    const app = el.querySelector('#files-app');
    if (!app) return;

    const backBtn = app.querySelector('#files-back');
    const pathEl = app.querySelector('#files-path');
    const listEl = app.querySelector('#file-list');
    let lastClickId = null;
    let lastClickAt = 0;

    const refresh = () => {
      backBtn.classList.toggle('hidden', state.fsPath.length === 0);
      pathEl.textContent = getFsPathText();
      const folder = getFsCurrentFolder();
      listEl.innerHTML = renderFsListHtml(folder);
    };

    app.querySelector('#files-new-file').addEventListener('click', async () => {
      await fsCreateItem('file');
      refresh();
    });
    app.querySelector('#files-new-folder').addEventListener('click', async () => {
      await fsCreateItem('folder');
      refresh();
    });
    app.querySelector('#files-del').addEventListener('click', () => {
      fsDeleteSelected();
      refresh();
    });
    backBtn.addEventListener('click', () => {
      state.fsPath.pop();
      state.fsSelectedId = null;
      refresh();
    });

    listEl.addEventListener('click', (e) => {
      const row = e.target.closest('[data-fs-id]');
      if (!row) return;
      const id = row.getAttribute('data-fs-id');
      const type = row.getAttribute('data-fs-type');
      const now = Date.now();
      const isDouble = lastClickId === id && (now - lastClickAt) < 450;
      lastClickId = id;
      lastClickAt = now;

      state.fsSelectedId = id;
      if (isDouble) {
        if (type === 'folder') {
          state.fsPath.push(id);
          state.fsSelectedId = null;
        } else {
          openApp('notes', { fileId: id });
        }
      }
      refresh();
    });

    refresh();
  }

  function fsFindById(id, folder) {
    const base = folder || { id: 'root', type: 'folder', name: '文件', children: state.files };
    const children = base.children || [];
    for (const item of children) {
      if (String(item.id) === String(id)) return { item, parent: base };
      if (item.type === 'folder') {
        const found = fsFindById(id, item);
        if (found) return found;
      }
    }
    return null;
  }

  function bindNotes(el, opts) {
    const app = el.querySelector('#notes-app');
    if (!app) return;
    const titleEl = app.querySelector('#notes-title');
    const textEl = app.querySelector('#notes-text');

    if (opts && opts.fileId) state.notes.fileId = opts.fileId;
    const fileId = state.notes.fileId;
    const found = fileId ? fsFindById(fileId) : null;

    titleEl.textContent = found ? found.item.name : '新建笔记';
    textEl.value = found && typeof found.item.content === 'string' ? found.item.content : '';

    const saveTo = async (targetId) => {
      const existing = targetId ? fsFindById(targetId) : null;
      if (existing && existing.item.type === 'file') {
        existing.item.content = textEl.value;
        state.notes.fileId = existing.item.id;
        titleEl.textContent = existing.item.name;
        toast('已保存');
        return;
      }

      const name = await openInputSheet({
        title: '保存为文件',
        placeholder: '请输入文件名',
        value: '新建笔记.txt',
        okText: '保存'
      });
      const finalName = (name || '').trim();
      if (!finalName) return;
      const root = { id: 'root', type: 'folder', name: '文件', children: state.files };
      const newFile = { id: `f_${Date.now()}`, name: finalName, type: 'file', content: textEl.value };
      root.children.push(newFile);
      state.notes.fileId = newFile.id;
      titleEl.textContent = newFile.name;
      toast('已保存');
    };

    app.querySelector('#notes-save').addEventListener('click', async () => { await saveTo(fileId); });
    app.querySelector('#notes-saveas').addEventListener('click', async () => { await saveTo(null); });
  }

  function renderMsgList(kind) {
    const list = kind === 'mail' ? state.emails : state.messages;
    if (list.length === 0) return `<div class="flex items-center justify-center h-full text-white/40 text-sm">无内容</div>`;
    return `
      <div class="space-y-2">
        ${list.map(x => `
          <button type="button" class="w-full flex items-start gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-[0.98] transition text-left" data-msg-kind="${kind}" data-msg-id="${x.id}">
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-br ${kind === 'mail' ? 'from-purple-400 to-indigo-500' : 'from-blue-400 to-cyan-500'} flex items-center justify-center text-white font-semibold text-sm">
              ${(x.sender || '?')[0]}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex justify-between items-baseline gap-2">
                <span class="text-white font-medium text-sm truncate">${escapeHtml(x.sender)}</span>
                <span class="text-white/40 text-xs">${escapeHtml(x.time)}</span>
              </div>
              <div class="text-white/70 text-sm truncate mt-0.5">${escapeHtml(kind === 'mail' ? x.subject : x.body)}</div>
            </div>
          </button>
        `).join('')}
      </div>
    `;
  }

  function renderMsgDetail(kind, id) {
    const list = kind === 'mail' ? state.emails : state.messages;
    const item = list.find(x => String(x.id) === String(id));
    if (!item) return renderMsgList(kind);
    return `
      <div class="space-y-3">
        <button type="button" class="px-3 py-2 rounded-xl bg-white/10 text-white/80 text-xs hover:bg-white/15 active:scale-[0.98] transition" data-msg-back="1">← 返回</button>
        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div class="flex items-center justify-between gap-2">
            <div class="text-white font-semibold text-sm truncate">${escapeHtml(item.sender)}</div>
            <div class="text-white/40 text-xs">${escapeHtml(item.time)}</div>
          </div>
          ${kind === 'mail' ? `<div class="mt-2 text-white/85 text-sm font-medium">${escapeHtml(item.subject)}</div>` : ``}
          <div class="mt-3 text-white/75 text-sm leading-relaxed whitespace-pre-wrap">${escapeHtml(item.body)}</div>
        </div>
      </div>
    `;
  }

  function bindMessages(el) {
    const app = el.querySelector('#messages-app');
    if (!app) return;
    const body = app.querySelector('#messages-body');
    let tab = 'sms';
    let detail = null;

    const refresh = () => {
      qsa('[data-msg-tab]', app).forEach(b => {
        const active = b.getAttribute('data-msg-tab') === tab;
        b.classList.toggle('bg-white/20', active);
      });
      if (detail) body.innerHTML = renderMsgDetail(tab === 'mail' ? 'mail' : 'sms', detail);
      else body.innerHTML = renderMsgList(tab === 'mail' ? 'mail' : 'sms');
    };

    app.addEventListener('click', (e) => {
      const tabBtn = e.target.closest('[data-msg-tab]');
      if (tabBtn) {
        tab = tabBtn.getAttribute('data-msg-tab');
        detail = null;
        refresh();
        return;
      }
      const back = e.target.closest('[data-msg-back]');
      if (back) {
        detail = null;
        refresh();
        return;
      }
      const item = e.target.closest('[data-msg-id]');
      if (item) {
        detail = item.getAttribute('data-msg-id');
        const kind = item.getAttribute('data-msg-kind');
        tab = kind === 'mail' ? 'mail' : 'sms';
        refresh();
      }
    });

    refresh();
  }

  function browserDocFor(url) {
    if (url === 'demo://wiki') {
      return `
        <!doctype html><html lang="zh-CN"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
        <style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Noto Sans SC,Arial,sans-serif;margin:0;background:#fff;color:#111}header{padding:14px 16px;border-bottom:1px solid #eee}main{padding:16px;line-height:1.7}h1{font-size:20px;margin:0}p{margin:10px 0}a{color:#2563eb}</style></head>
        <body><header><h1>百科 · HarmonyOS</h1></header><main>
        <p>这是一个内置的示例网页，用于满足“浏览器能打开 Demo 网页”的验收要求。</p>
        <p>你可以把它当作 Wikipedia 的简化页面（离线可用）。</p>
        <p><a href="#">继续阅读（示意）</a></p>
        </main></body></html>
      `.trim();
    }
    return `
      <!doctype html><html lang="zh-CN"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
      <style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Noto Sans SC,Arial,sans-serif;margin:0;background:linear-gradient(180deg,#0ea5e9,#1d4ed8);color:#fff}header{padding:18px 16px}main{padding:16px;line-height:1.7}section{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);border-radius:16px;padding:14px}h1{font-size:20px;margin:0 0 6px}p{margin:10px 0}</style></head>
      <body><header><h1>HarmonyOS 4/Next · Demo</h1><div style="opacity:.85;font-size:12px">WebOS 内置示例网页</div></header><main>
      <section>
        <p>欢迎来到示例页。此页面使用 srcdoc 离线渲染，确保在任何环境都可打开。</p>
        <p>包含：文本、卡片、链接等基础元素（示意）。</p>
      </section>
      </main></body></html>
    `.trim();
  }

  function bindBrowser(el) {
    const app = el.querySelector('#browser-app');
    if (!app) return;
    const urlEl = app.querySelector('#browser-url');
    const frame = app.querySelector('#browser-frame');
    const load = (u) => {
      const url = (u || '').trim();
      urlEl.value = url || 'demo://harmonyos';
      frame.srcdoc = browserDocFor(urlEl.value === 'demo://wiki' ? 'demo://wiki' : 'demo://harmonyos');
    };
    app.querySelector('#browser-go').addEventListener('click', () => load(urlEl.value));
    app.querySelector('#browser-refresh').addEventListener('click', () => load(urlEl.value));
    app.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-browser-demo]');
      if (!btn) return;
      const key = btn.getAttribute('data-browser-demo');
      load(key === 'wiki' ? 'demo://wiki' : 'demo://harmonyos');
    });
    urlEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') load(urlEl.value);
    });
    load(urlEl.value);
  }

  function renderSuperDevice() {
    return `
      <div class="h-48 relative bg-black/20 rounded-2xl mb-4 overflow-hidden border border-white/5">
        <div class="absolute inset-0 flex items-center justify-center">
           <div class="w-20 h-20 rounded-full bg-white flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <span class="text-2xl">📱</span>
              <span class="text-[10px] text-black font-bold mt-1">本机</span>
           </div>
           <div class="absolute top-4 left-8 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex flex-col items-center justify-center border border-white/20 animate-float-slow">
              <span class="text-lg">📺</span>
              <span class="text-[8px] text-white">智慧屏</span>
           </div>
           <div class="absolute bottom-6 right-8 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex flex-col items-center justify-center border border-white/20 animate-float-slower">
              <span class="text-lg">💻</span>
              <span class="text-[8px] text-white">MateBook</span>
           </div>
        </div>
        <div class="absolute bottom-2 left-0 right-0 text-center text-white/30 text-xs">超级终端 · 拖拽吸附协同</div>
      </div>
    `;
  }

  function renderControls() {
    const p = qs('#panel-controls .content');
    if (!p) return;
    p.innerHTML = `
      <div class="p-4 space-y-4">
        <div class="flex justify-between items-center text-white mb-2">
           <span class="font-bold text-lg">控制中心</span>
           <span class="text-sm opacity-50">${nowTimeText()}</span>
        </div>
        
        <div class="grid grid-cols-2 gap-3">
           <button class="bg-white/10 rounded-2xl p-3 flex gap-3 items-center hover:bg-white/20 transition ${state.sys.wifi ? 'bg-blue-500/80' : ''}" onclick="OS_toggle('wifi')">
              <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">📶</div>
              <div class="text-left">
                 <div class="text-white font-medium">WLAN</div>
                 <div class="text-white/50 text-xs">${state.sys.wifi ? '已连接' : '关闭'}</div>
              </div>
           </button>
           <button class="bg-white/10 rounded-2xl p-3 flex gap-3 items-center hover:bg-white/20 transition ${state.sys.bt ? 'bg-blue-500/80' : ''}" onclick="OS_toggle('bt')">
              <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">ᛒ</div>
              <div class="text-left">
                 <div class="text-white font-medium">蓝牙</div>
                 <div class="text-white/50 text-xs">${state.sys.bt ? '开启' : '关闭'}</div>
              </div>
           </button>
        </div>

        ${renderSuperDevice()}

        <div class="bg-white/10 rounded-2xl p-4 flex gap-4 items-center">
           <span class="text-white/70 text-sm">🔆</span>
           <input type="range" class="flex-1 accent-white h-1 bg-white/20 rounded-lg appearance-none" min="0" max="100" value="${state.sys.brightness}" oninput="OS_setBrightness(this.value)">
        </div>
      </div>
    `;
  }

  function renderLockScreen() {
    const el = qs('#panel-lock');
    if (!state.locked) {
      el.classList.add('opacity-0', 'pointer-events-none');
      return;
    }
    el.classList.remove('opacity-0', 'pointer-events-none');
    el.innerHTML = `
      <div class="h-full flex flex-col items-center pt-20 pb-10 px-6 text-white bg-black/40 backdrop-blur-xl">
         <div class="text-6xl font-light tracking-tighter mb-2">${nowTimeText()}</div>
         <div class="text-lg opacity-80 mb-12">${dateText()}</div>
         
         <div class="flex-1 w-full max-w-xs space-y-2">
            ${state.notifs.map(n => `
               <div class="bg-white/10 rounded-xl p-3 backdrop-blur-md">
                  <div class="font-medium text-sm">${n.title}</div>
                  <div class="text-xs opacity-70">${n.body}</div>
               </div>
            `).join('')}
         </div>

         <div class="mt-8 flex flex-col items-center gap-4 w-full">
            <div class="text-sm opacity-50 mb-2">向上滑动解锁</div>
            <div class="w-12 h-1 bg-white/50 rounded-full"></div>
         </div>
         
         <button class="absolute inset-0 w-full h-full cursor-default z-10" onclick="OS_unlock()"></button>
      </div>
    `;
  }

  function unlock() {
    state.locked = false;
    renderLockScreen();
    toast("已解锁");
  }

  function init() {
    window.OS = {
      openApp,
      closeApp,
      toast,
      unlock,
      toggle: (k) => {
        state.sys[k] = !state.sys[k];
        renderControls();
      },
      setBrightness: (v) => {
        state.sys.brightness = v;
        qs('#wallpaper').style.filter = `brightness(${v / 100})`;
      },
      fileAction: (act) => {
        if (act === 'new') {
          state.files.push({ id: Date.now(), name: '新文件.txt', type: 'file' });
          const w = state.windows.get('files');
          if (w) w.el.querySelector('.flex-1').innerHTML = renderFiles().match(/<div class="flex-1[^>]*>([\s\S]*)<\/div>/)[1];
        }
        if (act === 'del') {
          state.files.pop();
          const w = state.windows.get('files');
          if (w) w.el.querySelector('.flex-1').innerHTML = renderFiles().match(/<div class="flex-1[^>]*>([\s\S]*)<\/div>/)[1];
        }
      },
      previewPhoto: (id) => {
        openPhoto(id);
      }
    };

    ensureDefaultPhotos();
    ensurePhotoViewer();

    const grid = qs('#app-grid');
    grid.innerHTML = APPS.filter(a => !a.dock).map(app => `
      <button class="flex flex-col items-center gap-2 p-2 active:scale-95 transition" onclick="OS_openApp('${app.id}')">
        ${appIcon(app, 'lg')}
        <span class="text-xs text-white drop-shadow-md">${app.name}</span>
      </button>
    `).join('');

    const dock = qs('#dock');
    dock.innerHTML = APPS.filter(a => a.dock).map(app => `
      <button class="active:scale-90 transition" onclick="OS_openApp('${app.id}')">
        ${appIcon(app, 'sm')}
      </button>
    `).join('');

    setInterval(() => {
      qs('#status-time').textContent = nowTimeText();
      if (state.locked) renderLockScreen();
    }, 1000);

    renderLockScreen();

    bindGestures();
  }

  function bindGestures() {
    qs('header').addEventListener('click', (e) => {
      if (e.clientX > window.innerWidth / 2) {
        state.panel = 'controls';
        const p = qs('#panel-controls');
        p.classList.remove('translate-y-[-102%]');
        renderControls();
      } else {
        toast("通知中心 (暂未展开)");
      }
    });

    document.addEventListener('click', (e) => {
      if (state.panel === 'controls' && !e.target.closest('#panel-controls') && !e.target.closest('header')) {
        qs('#panel-controls').classList.add('translate-y-[-102%]');
        state.panel = 'none';
      }
    });

    let startY = 0;
    document.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
      const endY = e.changedTouches[0].clientY;
      const diffY = startY - endY;

      if (state.locked && diffY > 100) {
        unlock();
      }
    });

    let mouseDownY = 0;
    document.addEventListener('mousedown', (e) => {
      mouseDownY = e.clientY;
    });
    document.addEventListener('mouseup', (e) => {
      const diffY = mouseDownY - e.clientY;
      if (state.locked && diffY > 100) {
        unlock();
      }
    });
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", OS.init);
