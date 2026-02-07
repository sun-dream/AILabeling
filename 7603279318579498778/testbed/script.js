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
      share: true,
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
    super: {
      connected: {},
    },
    media: {
      playing: false,
      title: '午后微风',
      artist: '华为音乐',
      progress: 0.32,
    },
    settings: {
      page: 'main',
    },
    desktop: {
      widgets: [],
    },
    gesture: {
      edge: null,
      bottom: null,
    },
    launcher: {
      suppress: null,
      pointer: null,
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
      widget: true,
      content: renderCamera,
      icon: `<svg class="w-8 h-8 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"/><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>`
    },
    {
      id: "gallery",
      name: "图库",
      subtitle: "照片与视频",
      color: "from-indigo-400 to-purple-500",
      dock: false,
      widget: true,
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
      id: "meetime",
      name: "畅连",
      subtitle: "高清通话",
      color: "from-blue-500 to-indigo-600",
      dock: false,
      content: renderMeeTime,
      icon: `<svg class="w-8 h-8 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`
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

  window.OS_media = (act, v) => {
    if (window.OS && window.OS.media) window.OS.media(act, v);
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
    el.className = 'absolute inset-0 z-[80] hidden';
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

  function ensureKeyboard() {
    if (qs('#celia-kbd')) return;
    const root = qs('#os') || document.body;
    const el = document.createElement('div');
    el.id = 'celia-kbd';
    el.className = 'absolute left-0 right-0 bottom-0 z-[78] hidden pb-[max(10px,env(safe-area-inset-bottom))]';
    el.innerHTML = `
      <div class="mx-auto max-w-[520px] px-4">
        <div class="rounded-[26px] border border-white/12 bg-white/85 text-black shadow-float overflow-hidden">
          <div class="flex items-center justify-between px-4 py-2 border-b border-black/10">
            <div class="text-xs font-medium text-black/60">小艺键盘</div>
            <button type="button" data-kbd-hide="1" class="px-3 py-1.5 rounded-xl bg-black/5 text-xs text-black/70 hover:bg-black/10 active:scale-[0.98] transition">收起</button>
          </div>
          <div class="p-3 grid grid-cols-10 gap-2" data-kbd-grid="1"></div>
          <div class="px-3 pb-3 flex gap-2">
            <button type="button" data-kbd-key="SPACE" class="flex-1 py-3 rounded-2xl bg-black/5 text-sm text-black/80 hover:bg-black/10 active:scale-[0.98] transition">空格</button>
            <button type="button" data-kbd-key="DEL" class="w-20 py-3 rounded-2xl bg-black/5 text-sm text-black/80 hover:bg-black/10 active:scale-[0.98] transition">⌫</button>
            <button type="button" data-kbd-key="ENTER" class="w-24 py-3 rounded-2xl bg-blue-500/15 text-sm text-blue-700 hover:bg-blue-500/20 active:scale-[0.98] transition">完成</button>
          </div>
        </div>
      </div>
    `;
    root.appendChild(el);
    const grid = qs('[data-kbd-grid]', el);
    const keys = '1234567890qwertyuiopasdfghjklzxcvbnm'.split('');
    grid.innerHTML = keys.map(k => `<button type="button" data-kbd-key="${k}" class="h-9 rounded-xl bg-black/5 text-[13px] text-black/80 hover:bg-black/10 active:scale-[0.98] transition">${k}</button>`).join('');

    el.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button')) e.preventDefault();
    });
  }

  function showKeyboard(target) {
    if (!target) return;
    ensureKeyboard();
    state.keyboardTarget = target;
    qs('#celia-kbd')?.classList.remove('hidden');
  }

  function hideKeyboard() {
    state.keyboardTarget = null;
    qs('#celia-kbd')?.classList.add('hidden');
  }

  function insertToTarget(text) {
    const el = state.keyboardTarget;
    if (!el) return;
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    const v = el.value ?? '';
    el.value = v.slice(0, start) + text + v.slice(end);
    const pos = start + text.length;
    try {
      el.setSelectionRange(pos, pos);
    } catch { }
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }

  function deleteFromTarget() {
    const el = state.keyboardTarget;
    if (!el) return;
    const start = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    const v = el.value ?? '';
    if (start !== end) {
      el.value = v.slice(0, start) + v.slice(end);
      try { el.setSelectionRange(start, start); } catch { }
      el.dispatchEvent(new Event('input', { bubbles: true }));
      return;
    }
    if (start <= 0) return;
    el.value = v.slice(0, start - 1) + v.slice(end);
    try { el.setSelectionRange(start - 1, start - 1); } catch { }
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }

  function appIcon(app, size = "lg") {
    const dim = size === "sm" ? "h-11 w-11" : "h-[56px] w-[56px]";
    const hint = app.widget ? `<div class="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full bg-white/55"></div>` : ``;
    return `
      <div class="relative grid place-items-center rounded-[18px] shadow-lg shadow-black/20 overflow-hidden ${dim} bg-gradient-to-br ${app.color} border border-white/10 group">
        <div class="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-60"></div>
        <div class="relative z-10 transform transition-transform duration-300 group-active:scale-90">
          ${app.icon}
        </div>
        ${hint}
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
    const w = "日一二三四五六";
    const formatMonth = (d) => `${d.getFullYear()}年${d.getMonth() + 1}月`;
    const formatDay = (d) => `${d.getMonth() + 1}月${d.getDate()}日 星期${w.charAt(d.getDay())}`;
    const clamp = (n, a, b) => Math.max(a, Math.min(b, n));

    const photos = [...state.photos]
      .map((p, i) => ({ ...p, ts: (typeof p.ts === 'number' ? p.ts : (Date.now() - i * 86400000)) }))
      .sort((a, b) => (b.ts || 0) - (a.ts || 0));

    const byMonth = new Map();
    for (const p of photos) {
      const d = new Date(p.ts);
      const mKey = formatMonth(d);
      const dayKey = formatDay(d);
      if (!byMonth.has(mKey)) byMonth.set(mKey, new Map());
      const byDay = byMonth.get(mKey);
      if (!byDay.has(dayKey)) byDay.set(dayKey, []);
      byDay.get(dayKey).push(p);
    }

    const monthBlocks = Array.from(byMonth.entries()).map(([mKey, dayMap]) => {
      const dayBlocks = Array.from(dayMap.entries()).map(([dayKey, items]) => {
        const tiles = items.map((p, idx) => {
          const span = idx === 0 ? 'col-span-2 row-span-2' : (idx === 1 ? 'col-span-2 row-span-1' : 'col-span-1 row-span-1');
          const r = idx === 0 ? 'rounded-[22px]' : 'rounded-[16px]';
          return `
            <button type="button" class="relative overflow-hidden bg-white/5 border border-white/10 ${r} active:opacity-80 transition ${span}" onclick="OS_previewPhoto('${p.id}')">
              <img src="${p.src || ''}" alt="photo" class="absolute inset-0 w-full h-full object-cover" />
            </button>
          `;
        }).join('');
        return `
          <div class="space-y-2">
            <div class="px-2 pt-3 text-[13px] font-semibold text-white/90">${dayKey}</div>
            <div class="grid grid-cols-4 gap-1 auto-rows-[72px] [grid-auto-flow:dense] px-1">
              ${tiles}
            </div>
          </div>
        `;
      }).join('');
      return `
        <div class="space-y-2">
          <div class="px-3 pt-4 text-sm font-bold text-white/85">${mKey}</div>
          ${dayBlocks}
        </div>
      `;
    }).join('');

    return `
      <div class="h-full flex flex-col bg-black/95">
        <div class="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div class="text-lg font-bold text-white">图库</div>
          <div class="flex gap-4 text-sm font-medium text-white/60">
            <span class="text-white">时刻</span>
            <span>相册</span>
          </div>
        </div>
        <div class="flex-1 overflow-y-auto pb-4">
          ${monthBlocks || `<div class="p-6 text-center text-white/45 text-sm">暂无照片</div>`}
        </div>
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
    const switchHtml = (on) => `
      <span class="inline-flex items-center w-12 h-7 rounded-full border border-white/10 ${on ? 'bg-blue-500/70' : 'bg-white/10'} transition p-1">
        <span class="w-5 h-5 rounded-full bg-white ${on ? 'translate-x-5' : 'translate-x-0'} transition-transform"></span>
      </span>
    `;

    if (state.settings.page === 'about') {
      return `
        <div class="h-full flex flex-col" id="settings-app">
          <div class="flex items-center gap-2 mb-3">
            <button type="button" class="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 active:scale-[0.98] transition text-xs text-white/85" data-settings-nav="main">← 返回</button>
            <div class="text-sm font-semibold text-white/90">关于手机</div>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <div class="p-4 space-y-3">
              <div class="flex items-center justify-between">
                <div class="text-sm text-white/70">设备名称</div>
                <div class="text-sm text-white/90">HUAWEI Phone（示意）</div>
              </div>
              <div class="h-px bg-white/10"></div>
              <div class="flex items-center justify-between">
                <div class="text-sm text-white/70">HarmonyOS 版本</div>
                <div class="text-sm text-white/90">4.0.0</div>
              </div>
              <div class="h-px bg-white/10"></div>
              <div class="flex items-center justify-between">
                <div class="text-sm text-white/70">版本号</div>
                <div class="text-sm text-white/90">Build 200（示意）</div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="h-full flex flex-col space-y-3" id="settings-app">
        <div class="p-3 rounded-2xl bg-white/5 flex items-center gap-3">
           <div class="w-14 h-14 rounded-full bg-gradient-to-br from-slate-500 to-slate-800 border border-white/10"></div>
           <div class="min-w-0">
             <div class="text-white font-medium truncate">Huawei User</div>
             <div class="text-white/50 text-xs">HarmonyOS 4.0.0</div>
           </div>
        </div>

        <div class="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div class="px-4 py-3 border-b border-white/10 bg-white/5">
            <div class="text-[13px] font-semibold text-white/90">连接与共享</div>
          </div>
          <div class="p-3 space-y-2">
            <button type="button" class="w-full p-3 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/12 transition flex items-center justify-between" data-setting-toggle="wifi">
              <div class="text-left">
                <div class="text-sm text-white/90">WLAN</div>
                <div class="text-xs text-white/50">${state.sys.wifi ? '已连接' : '已关闭'}</div>
              </div>
              ${switchHtml(state.sys.wifi)}
            </button>
            <button type="button" class="w-full p-3 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/12 transition flex items-center justify-between" data-setting-toggle="bt">
              <div class="text-left">
                <div class="text-sm text-white/90">蓝牙</div>
                <div class="text-xs text-white/50">${state.sys.bt ? '已开启' : '已关闭'}</div>
              </div>
              ${switchHtml(state.sys.bt)}
            </button>
            <button type="button" class="w-full p-3 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/12 transition flex items-center justify-between" data-setting-toggle="share">
              <div class="text-left">
                <div class="text-sm text-white/90">华为分享</div>
                <div class="text-xs text-white/50">${state.sys.share ? '可发现' : '已关闭'}</div>
              </div>
              ${switchHtml(state.sys.share)}
            </button>
          </div>
        </div>

        <div class="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div class="px-4 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <div class="text-[13px] font-semibold text-white/90">显示和亮度</div>
            <div class="text-[12px] text-white/55 tabular-nums">${Math.round(state.sys.brightness)}%</div>
          </div>
          <div class="p-4 flex items-center gap-4">
            <span class="text-white/70 text-sm">🔆</span>
            <input data-setting-brightness="1" type="range" class="flex-1 accent-white h-1 bg-white/20 rounded-lg appearance-none" min="0" max="100" value="${state.sys.brightness}">
          </div>
        </div>

        <button type="button" class="p-4 rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/12 transition flex items-center justify-between" data-settings-nav="about">
          <div class="text-sm text-white/90">关于手机</div>
          <div class="text-white/30 text-sm">›</div>
        </button>
      </div>
    `;
  }

  function bindSettings(el) {
    const app = el.querySelector('#settings-app');
    if (!app || app.dataset.bound === '1') return;
    app.dataset.bound = '1';

    app.addEventListener('click', (e) => {
      const nav = e.target.closest('[data-settings-nav]');
      if (nav) {
        state.settings.page = nav.getAttribute('data-settings-nav');
        const body = el.querySelector('[data-window-content]');
        if (body) {
          body.innerHTML = renderSettings();
          bindSettings(el);
        }
        return;
      }
      const tog = e.target.closest('[data-setting-toggle]');
      if (tog) {
        const key = tog.getAttribute('data-setting-toggle');
        if (key) {
          state.sys[key] = !state.sys[key];
          renderControls();
          const body = el.querySelector('[data-window-content]');
          if (body) {
            body.innerHTML = renderSettings();
            bindSettings(el);
          }
        }
      }
    });

    const range = app.querySelector('[data-setting-brightness]');
    if (range && !range.dataset.bound) {
      range.dataset.bound = '1';
      range.addEventListener('input', () => {
        OS_setBrightness(range.value);
        const body = el.querySelector('[data-window-content]');
        if (body) {
          body.innerHTML = renderSettings();
          bindSettings(el);
        }
      });
    }
  }

  function renderMeeTime() {
    return `
      <div class="h-full flex flex-col relative overflow-hidden bg-gray-900">
        <div class="absolute inset-0 z-0">
          <div class="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 z-10"></div>
          <div class="w-full h-full bg-indigo-900/50 backdrop-blur-3xl flex items-center justify-center">
             <div class="w-48 h-48 rounded-full bg-indigo-500/30 blur-3xl"></div>
          </div>
        </div>

        <div class="relative z-10 flex-1 flex flex-col items-center pt-20 px-6">
           <div class="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 shadow-xl border-4 border-white/10 flex items-center justify-center text-3xl text-white font-bold mb-4">
             妈
           </div>
           <div class="text-2xl text-white font-medium mb-1">妈妈</div>
           <div class="text-sm text-white/60 mb-8">正在加密通话...</div>

           <div class="mt-auto w-full pb-12 flex justify-around items-center">
             <button class="flex flex-col items-center gap-2 group">
               <div class="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-active:bg-white/20 transition">
                 <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
               </div>
               <span class="text-xs text-white/70">静音</span>
             </button>
             
             <button class="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30 active:scale-95 transition" onclick="OS.closeApp('meetime')">
               <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M21 15.46l-5.27-1.06a1 1 0 00-1.06.53l-1.2 2.1a16.07 16.07 0 01-7.06-7.06l2.1-1.2a1 1 0 00.53-1.06L8.54 3A1 1 0 007.56 2H3a1 1 0 00-1 1c0 10.49 8.51 19 19 19a1 1 0 001-1v-4.56a1 1 0 00-.99-.98z"/></svg>
             </button>

             <button class="flex flex-col items-center gap-2 group">
               <div class="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-active:bg-white/20 transition">
                 <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
               </div>
               <span class="text-xs text-white/70">视频</span>
             </button>
           </div>
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
      w.minimized = false;
      if (opts) {
        const body = w.el.querySelector('[data-window-content]');
        if (body) {
          body.innerHTML = app.content(opts);
          if (id === 'files') bindFiles(w.el);
          if (id === 'messages') bindMessages(w.el);
          if (id === 'notes') bindNotes(w.el, opts);
          if (id === 'browser') bindBrowser(w.el);
          if (id === 'settings') bindSettings(w.el);
        }
      }
      focusWindow(w.el);
      return;
    }


    const el = document.createElement('div');
    el.className = `absolute top-[calc(env(safe-area-inset-top)+78px)] left-4 right-4 bottom-[calc(env(safe-area-inset-bottom)+94px)] bg-[#1c1c1e] rounded-[24px] overflow-hidden shadow-2xl border border-white/10 flex flex-col animate-pop origin-bottom pointer-events-auto`;
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
    state.windows.set(id, { el, app, minimized: false });

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
    if (id === 'settings') bindSettings(el);

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
      const newPhoto = { id: `p_${Date.now()}`, src: src || makePhotoSrc(Date.now()), time: '刚刚', ts: Date.now() };
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
      if (typeof state.photos[i].ts !== 'number') state.photos[i].ts = Date.now() - i * 86400000 - (i % 5) * 3600000;
    }
  }

  function ensurePhotoViewer() {
    if (qs('#photo-viewer')) return;
    const root = qs('#os') || document.body;
    const wrap = document.createElement('div');
    wrap.id = 'photo-viewer';
    wrap.className = 'absolute inset-0 z-[70] hidden';
    wrap.innerHTML = `
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      <div class="relative h-full flex flex-col items-center justify-center px-4">
        <div class="w-full max-w-[520px] rounded-[28px] border border-white/10 bg-black/40 backdrop-blur-xl shadow-float overflow-hidden">
          <div class="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div class="text-sm text-white/85">照片预览</div>
            <button id="photo-close" class="rounded-xl px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 active:scale-[0.98] transition" type="button">关闭</button>
          </div>
          <div id="photo-stage" class="p-3 touch-none">
            <img id="photo-img" src="" alt="photo" class="w-full max-h-[70vh] object-contain rounded-2xl bg-black/20 touch-none select-none" style="transform:scale(1); transform-origin:center center;" />
            <div class="mt-2 text-center text-[11px] text-white/45">双指缩放（示意）</div>
          </div>
        </div>
      </div>
    `;
    root.appendChild(wrap);
    wrap.querySelector('#photo-close').addEventListener('click', () => wrap.classList.add('hidden'));
    wrap.addEventListener('click', (e) => {
      if (e.target === wrap || e.target === wrap.firstElementChild) wrap.classList.add('hidden');
    });

    const stage = qs('#photo-stage', wrap);
    const img = qs('#photo-img', wrap);
    const pv = { pointers: new Map(), startDist: 0, startScale: 1, scale: 1 };
    wrap._pv = pv;

    const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
    const apply = () => { img.style.transform = `scale(${pv.scale})`; };
    const clampScale = (s) => Math.max(1, Math.min(4, s));

    stage.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      stage.setPointerCapture(e.pointerId);
      pv.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pv.pointers.size === 2) {
        const [p1, p2] = Array.from(pv.pointers.values());
        pv.startDist = dist(p1, p2);
        pv.startScale = pv.scale;
      }
    });
    stage.addEventListener('pointermove', (e) => {
      if (!pv.pointers.has(e.pointerId)) return;
      pv.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pv.pointers.size === 2) {
        const [p1, p2] = Array.from(pv.pointers.values());
        const d = dist(p1, p2);
        if (pv.startDist > 0) {
          pv.scale = clampScale(pv.startScale * (d / pv.startDist));
          apply();
        }
      }
    });
    const end = (e) => {
      if (pv.pointers.has(e.pointerId)) pv.pointers.delete(e.pointerId);
      if (pv.pointers.size < 2) {
        pv.startDist = 0;
        pv.startScale = pv.scale;
      }
    };
    stage.addEventListener('pointerup', end);
    stage.addEventListener('pointercancel', end);
  }

  function openPhoto(id) {
    const photo = state.photos.find(p => String(p.id) === String(id));
    if (!photo) return;
    ensurePhotoViewer();
    const viewer = qs('#photo-viewer');
    const img = viewer.querySelector('#photo-img');
    img.src = photo.src || '';
    if (viewer._pv) {
      viewer._pv.pointers.clear();
      viewer._pv.scale = 1;
      viewer._pv.startScale = 1;
      viewer._pv.startDist = 0;
      img.style.transform = 'scale(1)';
    }
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
        <div class="rounded-2xl border border-white/10 bg-white/5 p-3">
          <div class="text-xs text-white/55 mb-2">回复（示意）</div>
          <input data-celia="1" class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:bg-white/10 transition" placeholder="输入内容…" />
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
    const tv = state.super.connected.tv ? '已连接' : '智慧屏';
    const pad = state.super.connected.pad ? '已连接' : 'MatePad';
    const buds = state.super.connected.buds ? '已连接' : 'FreeBuds';
    return `
      <div id="super-device" class="h-48 relative bg-black/20 rounded-2xl mb-4 overflow-hidden border border-white/5 select-none touch-none">
        <div class="absolute inset-0">
          <div class="absolute inset-0 flex items-center justify-center">
            <div id="super-center" class="w-20 h-20 rounded-full bg-white flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              <span class="text-2xl">📱</span>
              <span class="text-[10px] text-black font-bold mt-1">本机</span>
            </div>
          </div>
          <button type="button" data-super-bubble="tv" class="super-bubble absolute top-4 left-8 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex flex-col items-center justify-center border border-white/20">
            <span class="text-lg">📺</span>
            <span class="text-[8px] text-white">${tv}</span>
          </button>
          <button type="button" data-super-bubble="pad" class="super-bubble absolute bottom-8 left-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex flex-col items-center justify-center border border-white/20">
            <span class="text-lg">�</span>
            <span class="text-[8px] text-white">${pad}</span>
          </button>
          <button type="button" data-super-bubble="buds" class="super-bubble absolute bottom-6 right-8 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex flex-col items-center justify-center border border-white/20">
            <span class="text-lg">🎧</span>
            <span class="text-[8px] text-white">${buds}</span>
          </button>
        </div>
        <div class="absolute bottom-2 left-0 right-0 text-center text-white/30 text-xs">超级终端 · 拖拽吸附协同</div>
      </div>
    `;
  }

  function bindSuperDevice(panelRoot) {
    const root = panelRoot.querySelector('#super-device');
    if (!root || root.dataset.bound === '1') return;
    root.dataset.bound = '1';
    const center = root.querySelector('#super-center');
    const centerRect = () => center.getBoundingClientRect();
    let drag = null;

    const onMove = (e) => {
      if (!drag || drag.pointerId !== e.pointerId) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      drag.el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const onUp = (e) => {
      if (!drag || drag.pointerId !== e.pointerId) return;
      const rect = drag.el.getBoundingClientRect();
      const c = centerRect();
      const bx = rect.left + rect.width / 2;
      const by = rect.top + rect.height / 2;
      const cx = c.left + c.width / 2;
      const cy = c.top + c.height / 2;
      const dist = Math.hypot(bx - cx, by - cy);
      if (dist < 74) {
        state.super.connected[drag.id] = true;
        renderControls();
        toast('已连接');
      } else {
        drag.el.style.transform = '';
      }
      drag = null;
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointercancel', onUp);
    };

    root.querySelectorAll('[data-super-bubble]').forEach((b) => {
      b.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        drag = { el: b, id: b.getAttribute('data-super-bubble'), x: e.clientX, y: e.clientY, pointerId: e.pointerId };
        document.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerup', onUp, { passive: true });
        document.addEventListener('pointercancel', onUp, { passive: true });
      });
    });
  }

  function renderControls() {
    const p = qs('#panel-controls .content');
    if (!p) return;
    const mediaPct = Math.round((state.media.progress || 0) * 100);
    p.innerHTML = `
      <div class="p-4 space-y-4">
        <div class="flex justify-between items-center text-white mb-2">
           <span class="font-bold text-lg">控制中心</span>
           <span class="text-sm opacity-50">${nowTimeText()}</span>
        </div>
        <div class="grid grid-cols-4 gap-3">
          <button type="button" class="h-16 w-16 rounded-full border border-white/12 ${state.sys.wifi ? 'bg-blue-500/70' : 'bg-white/10'} hover:bg-white/15 active:scale-[0.98] transition flex flex-col items-center justify-center gap-1" onclick="OS_toggle('wifi')">
            <div class="text-xl">📶</div>
            <div class="text-[10px] text-white/80">WLAN</div>
          </button>
          <button type="button" class="h-16 w-16 rounded-full border border-white/12 ${state.sys.bt ? 'bg-blue-500/70' : 'bg-white/10'} hover:bg-white/15 active:scale-[0.98] transition flex flex-col items-center justify-center gap-1" onclick="OS_toggle('bt')">
            <div class="text-xl">ᛒ</div>
            <div class="text-[10px] text-white/80">蓝牙</div>
          </button>
          <button type="button" class="h-16 w-16 rounded-full border border-white/12 ${state.sys.silent ? 'bg-blue-500/70' : 'bg-white/10'} hover:bg-white/15 active:scale-[0.98] transition flex flex-col items-center justify-center gap-1" onclick="OS_toggle('silent')">
            <div class="text-xl">🔕</div>
            <div class="text-[10px] text-white/80">静音</div>
          </button>
          <button type="button" class="h-16 w-16 rounded-full border border-white/12 ${state.sys.airplane ? 'bg-blue-500/70' : 'bg-white/10'} hover:bg-white/15 active:scale-[0.98] transition flex flex-col items-center justify-center gap-1" onclick="OS_toggle('airplane')">
            <div class="text-xl">✈</div>
            <div class="text-[10px] text-white/80">飞行</div>
          </button>
        </div>

        <div class="rounded-[28px] border border-white/12 bg-white/8 backdrop-blur-2xl shadow-float overflow-hidden">
          <div class="p-4 flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-sky-500 border border-white/10"></div>
            <div class="min-w-0 flex-1">
              <div class="text-sm font-semibold text-white/90 truncate">${escapeHtml(state.media.title)}</div>
              <div class="text-xs text-white/55 truncate">${escapeHtml(state.media.artist)}</div>
            </div>
            <button type="button" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 active:scale-[0.98] transition grid place-items-center" onclick="OS_media('prev')">⏮</button>
            <button type="button" class="w-12 h-12 rounded-full ${state.media.playing ? 'bg-blue-500/70' : 'bg-white/10'} hover:bg-white/15 active:scale-[0.98] transition grid place-items-center" onclick="OS_media('toggle')">
              ${state.media.playing ? '⏸' : '▶'}
            </button>
            <button type="button" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 active:scale-[0.98] transition grid place-items-center" onclick="OS_media('next')">⏭</button>
          </div>
          <div class="px-4 pb-4">
            <div class="flex items-center gap-3">
              <div class="text-[11px] text-white/45 tabular-nums w-8 text-right">${Math.floor(mediaPct / 2)}%</div>
              <input type="range" class="flex-1 accent-white h-1 bg-white/20 rounded-lg appearance-none" min="0" max="100" value="${mediaPct}" oninput="OS_media('seek', this.value)">
              <div class="text-[11px] text-white/45 tabular-nums w-8">${mediaPct}%</div>
            </div>
          </div>
        </div>

        ${renderSuperDevice()}

        <div class="bg-white/10 rounded-2xl p-4 flex gap-4 items-center">
           <span class="text-white/70 text-sm">🔆</span>
           <input type="range" class="flex-1 accent-white h-1 bg-white/20 rounded-lg appearance-none" min="0" max="100" value="${state.sys.brightness}" oninput="OS_setBrightness(this.value)">
        </div>
      </div>
    `;
    bindSuperDevice(p);
  }

  function renderLockScreen() {
    const el = qs('#panel-lock');
    if (!el) return;
    if (!state.locked) {
      el.classList.add('opacity-0', 'pointer-events-none');
      return;
    }
    el.classList.remove('opacity-0', 'pointer-events-none');
    if (el.dataset.lockBuilt !== '1') {
      el.dataset.lockBuilt = '1';
      el.innerHTML = `
        <div class="absolute inset-0 bg-black/55"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/55 via-black/75 to-black/90"></div>
        <div class="relative h-full px-6 pt-[max(20px,env(safe-area-inset-top))] pb-[max(18px,env(safe-area-inset-bottom))] touch-none select-none">
          <div class="mx-auto max-w-[520px] h-full flex flex-col">
            <div class="mt-10 text-center">
              <p id="lock-time-live" class="text-[56px] font-semibold tracking-tight tabular-nums leading-none">--:--</p>
              <p id="lock-date-live" class="mt-2 text-[13px] text-white/70">—</p>
            </div>

            <div class="mt-8 rounded-[28px] border border-white/12 bg-white/6 backdrop-blur-2xl shadow-float overflow-hidden">
              <div class="px-4 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <p class="text-[13px] font-semibold text-white/90">锁屏通知</p>
                <button id="btn-lock-clear" type="button" class="rounded-2xl border border-white/10 bg-white/8 px-3 py-2 text-[13px] text-white/85 hover:bg-white/12 active:scale-[0.98] transition">清除</button>
              </div>
              <div id="lock-notifs" class="p-4 space-y-3 max-h-[34vh] overflow-auto"></div>
            </div>

            <div class="mt-auto pb-8 flex flex-col items-center gap-3">
              <div class="text-[13px] text-white/60">向上滑动解锁</div>
              <div class="w-12 h-1 rounded-full bg-white/45"></div>
            </div>
          </div>

          <button id="lock-tap-unlock" type="button" class="absolute inset-0 w-full h-full cursor-default z-10 outline-none"></button>
        </div>
      `;

      qs('#lock-tap-unlock', el)?.addEventListener('click', unlock);
      qs('#btn-lock-clear', el)?.addEventListener('click', (e) => {
        e.preventDefault();
        state.notifs = [];
        const list = qs('#lock-notifs', el);
        if (list) list.innerHTML = '';
        toast('已清除');
      });
    }

    const timeEl = qs('#lock-time-live', el);
    if (timeEl) timeEl.textContent = nowTimeText();
    const dateEl = qs('#lock-date-live', el);
    if (dateEl) dateEl.textContent = dateText();
    const list = qs('#lock-notifs', el);
    if (list && list.dataset.built !== '1') {
      list.dataset.built = '1';
      list.innerHTML = state.notifs.map(n => `
        <div class="bg-white/10 rounded-xl p-3 backdrop-blur-md">
          <div class="font-medium text-sm">${escapeHtml(n.title)}</div>
          <div class="text-xs opacity-70">${escapeHtml(n.body)}</div>
        </div>
      `).join('');
    }
  }

  function unlock() {
    state.locked = false;
    renderLockScreen();
    toast("已解锁");
  }

  function ensureServiceWidget() {
    if (qs('#service-widget')) return;
    const root = qs('#os') || document.body;
    const el = document.createElement('div');
    el.id = 'service-widget';
    el.className = 'absolute inset-0 z-[75] hidden';
    el.innerHTML = `
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <div class="absolute left-0 right-0 bottom-0 pb-[max(12px,env(safe-area-inset-bottom))] px-4">
        <div id="service-widget-sheet" class="mx-auto max-w-[520px] rounded-[28px] border border-white/12 bg-black/45 backdrop-blur-2xl shadow-float overflow-hidden">
          <div class="px-4 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <div id="service-widget-title" class="text-[14px] font-semibold text-white/90">服务卡片</div>
            <button id="service-widget-close" type="button" class="rounded-xl px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 active:scale-[0.98] transition">关闭</button>
          </div>
          <div id="service-widget-body" class="p-4"></div>
        </div>
      </div>
    `;
    root.appendChild(el);
    qs('#service-widget-close', el).addEventListener('click', () => closeServiceWidget());
    el.addEventListener('click', (e) => {
      if (e.target === el || e.target === el.firstElementChild) closeServiceWidget();
    });
  }

  function closeServiceWidget() {
    const el = qs('#service-widget');
    if (!el) return;
    el.classList.add('hidden');
  }

  function widgetHtmlFor(appId) {
    if (appId === 'gallery') {
      const thumbs = state.photos.slice(0, 4).map(p => `
        <button type="button" class="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/5 active:scale-[0.98] transition" data-widget-photo="${p.id}">
          <img src="${p.src || ''}" class="absolute inset-0 w-full h-full object-cover" />
        </button>
      `).join('');
      return `
        <div class="space-y-3">
          <div class="grid grid-cols-4 gap-2">${thumbs}</div>
          <div class="flex items-center justify-between">
            <div class="text-xs text-white/60">最近照片</div>
            <button type="button" class="px-3 py-2 rounded-2xl bg-white/10 text-white/80 text-xs hover:bg-white/15 active:scale-[0.98] transition" data-widget-open="gallery">打开图库</button>
          </div>
        </div>
      `;
    }
    if (appId === 'camera') {
      const last = state.photos[0];
      return `
        <div class="space-y-3">
          <div class="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <div class="relative aspect-[16/10] bg-black">
              ${last ? `<img src="${last.src || ''}" class="absolute inset-0 w-full h-full object-cover opacity-90" />` : ``}
              <div class="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/40"></div>
              <div class="absolute left-3 bottom-3 text-xs text-white/85">相机快捷卡片</div>
            </div>
          </div>
          <div class="flex items-center justify-end">
            <button type="button" class="px-3 py-2 rounded-2xl bg-white/10 text-white/80 text-xs hover:bg-white/15 active:scale-[0.98] transition" data-widget-open="camera">打开相机</button>
          </div>
        </div>
      `;
    }
    return `
      <div class="text-white/60 text-sm">暂无服务卡片</div>
      <div class="mt-3">
        <button type="button" class="px-3 py-2 rounded-2xl bg-white/10 text-white/80 text-xs hover:bg-white/15 active:scale-[0.98] transition" data-widget-open="${escapeHtml(appId)}">打开应用</button>
      </div>
    `;
  }

  function openServiceWidget(appId, opts = {}) {
    ensureServiceWidget();
    const el = qs('#service-widget');
    const title = qs('#service-widget-title', el);
    const body = qs('#service-widget-body', el);
    const app = APPS.find(a => a.id === appId);
    title.textContent = app ? `${app.name} · 服务卡片` : '服务卡片';
    body.innerHTML = widgetHtmlFor(appId);
    el.classList.remove('hidden');
    const sheet = qs('#service-widget-sheet', el);
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sourceRect = opts && opts.sourceRect ? opts.sourceRect : null;
    if (sheet && sourceRect && !reduceMotion) {
      sheet.style.opacity = '0';
      requestAnimationFrame(() => {
        const endRect = sheet.getBoundingClientRect();
        const scaleX = sourceRect.width / endRect.width;
        const scaleY = sourceRect.height / endRect.height;
        const translateX = sourceRect.left - endRect.left;
        const translateY = sourceRect.top - endRect.top;
        const morph = document.createElement('div');
        morph.className = 'fixed z-[76] overflow-hidden';
        morph.style.left = `${endRect.left}px`;
        morph.style.top = `${endRect.top}px`;
        morph.style.width = `${endRect.width}px`;
        morph.style.height = `${endRect.height}px`;
        morph.style.borderRadius = '28px';
        morph.style.background = 'rgba(0,0,0,.45)';
        morph.style.backdropFilter = 'blur(18px)';
        morph.style.border = '1px solid rgba(255,255,255,.12)';
        morph.style.boxShadow = '0 12px 50px rgba(0,0,0,.55), 0 1px 0 rgba(255,255,255,.06) inset';
        morph.innerHTML = `
          <div class="px-4 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <div class="text-[14px] font-semibold text-white/90">${escapeHtml(app ? `${app.name} · 服务卡片` : '服务卡片')}</div>
          </div>
          <div class="p-4">${widgetHtmlFor(appId)}</div>
        `;
        document.body.appendChild(morph);
        morph.animate([
          { transformOrigin: '0 0', transform: `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`, opacity: 0.92 },
          { transformOrigin: '0 0', transform: 'translate(0px, 0px) scale(1, 1)', opacity: 1 }
        ], { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both' }).finished.then(() => {
          morph.remove();
          sheet.style.opacity = '1';
        }).catch(() => {
          morph.remove();
          sheet.style.opacity = '1';
        });
      });
    } else if (sheet) {
      sheet.style.opacity = '1';
    }

    body.querySelectorAll('[data-widget-open]').forEach(btn => {
      btn.addEventListener('click', () => {
        closeServiceWidget();
        openApp(btn.getAttribute('data-widget-open'));
      });
    });
    body.querySelectorAll('[data-widget-photo]').forEach(btn => {
      btn.addEventListener('click', () => {
        openPhoto(btn.getAttribute('data-widget-photo'));
      });
    });
  }

  function ensureServiceCenter() {
    if (qs('#service-center')) return;
    const root = qs('#os') || document.body;
    const el = document.createElement('div');
    el.id = 'service-center';
    el.className = 'absolute inset-0 z-[58] hidden pointer-events-none';
    el.innerHTML = `
      <div id="service-center-scrim" class="absolute inset-0 bg-black/20 backdrop-blur-sm opacity-0 transition-opacity duration-300"></div>
      <div id="service-center-panel" class="absolute inset-x-0 bottom-0 top-20 bg-[#f2f3f5] rounded-t-[32px] transform translate-y-full transition-transform duration-300 ease-out flex flex-col overflow-hidden pointer-events-auto">
        <div class="px-6 py-4 flex items-center justify-between bg-white/50 backdrop-blur-xl border-b border-black/5">
          <div class="text-lg font-bold text-gray-900">服务中心</div>
          <button id="service-center-close" class="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-gray-500 hover:bg-black/10 transition">×</button>
        </div>
        <div class="flex-1 overflow-y-auto p-4 space-y-6">
           <div class="h-32 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 p-4 text-white flex flex-col justify-between shadow-lg shadow-blue-500/20">
             <div class="font-bold text-lg">发现服务</div>
             <div class="text-sm opacity-90">添加到桌面，信息直达</div>
           </div>
           <div>
             <div class="text-sm font-semibold text-gray-500 mb-3 px-1">推荐卡片</div>
             <div class="grid grid-cols-2 gap-3">
               <div class="bg-white rounded-2xl p-3 shadow-sm border border-black/5 space-y-2">
                 <div class="flex items-center gap-2">
                   <div class="w-6 h-6 rounded-lg bg-orange-500 flex items-center justify-center text-white text-xs">☀</div>
                   <span class="text-sm font-medium text-gray-800">天气</span>
                 </div>
                 <div class="text-2xl font-light text-gray-900">26°</div>
                 <div class="text-xs text-gray-500">晴 · 空气优</div>
                 <div class="pt-1">
                   <button type="button" class="w-full px-3 py-2 rounded-xl bg-black/5 text-gray-700 text-xs hover:bg-black/10 active:scale-[0.98] transition" data-service-add="weather">添加到桌面</button>
                 </div>
               </div>
               <div class="bg-white rounded-2xl p-3 shadow-sm border border-black/5 space-y-2">
                 <div class="flex items-center gap-2">
                   <div class="w-6 h-6 rounded-lg bg-green-500 flex items-center justify-center text-white text-xs">🏃</div>
                   <span class="text-sm font-medium text-gray-800">运动健康</span>
                 </div>
                 <div class="text-2xl font-light text-gray-900">3,201</div>
                 <div class="text-xs text-gray-500">步数 · 目标 10,000</div>
                 <div class="pt-1">
                   <button type="button" class="w-full px-3 py-2 rounded-xl bg-black/5 text-gray-700 text-xs hover:bg-black/10 active:scale-[0.98] transition" data-service-add="steps">添加到桌面</button>
                 </div>
               </div>
               <div class="bg-white rounded-2xl p-3 shadow-sm border border-black/5 space-y-2">
                 <div class="flex items-center gap-2">
                   <div class="w-6 h-6 rounded-lg bg-blue-500 flex items-center justify-center text-white text-xs">📅</div>
                   <span class="text-sm font-medium text-gray-800">日程</span>
                 </div>
                 <div class="text-sm text-gray-900">下午 3:00 会议</div>
                 <div class="text-xs text-gray-500">还有 1 小时</div>
                 <div class="pt-1">
                   <button type="button" class="w-full px-3 py-2 rounded-xl bg-black/5 text-gray-700 text-xs hover:bg-black/10 active:scale-[0.98] transition" data-service-add="calendar">添加到桌面</button>
                 </div>
               </div>
               <button type="button" class="bg-white rounded-2xl p-3 shadow-sm border border-black/5 flex flex-col items-center justify-center gap-2 hover:bg-black/[0.03] active:scale-[0.98] transition" data-system-sheet="earphones">
                 <div class="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center text-lg">🎧</div>
                 <div class="text-sm font-medium text-gray-800">耳机连接</div>
                 <div class="text-xs text-gray-500">系统弹窗演示</div>
               </button>
             </div>
           </div>
           <div>
             <div class="text-sm font-semibold text-gray-500 mb-3 px-1">系统提示</div>
             <div class="space-y-2">
               <button type="button" class="w-full bg-white rounded-2xl p-3 shadow-sm border border-black/5 flex items-center justify-between hover:bg-black/[0.03] active:scale-[0.98] transition" data-system-sheet="lowBattery">
                 <div class="flex items-center gap-3">
                   <div class="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center text-lg">🪫</div>
                   <div class="text-left">
                     <div class="text-sm font-medium text-gray-800">低电量</div>
                     <div class="text-xs text-gray-500">系统级 Sheet（示意）</div>
                   </div>
                 </div>
                 <div class="text-gray-300 text-sm">›</div>
               </button>
             </div>
           </div>
        </div>
      </div>
    `;
    root.appendChild(el);
    
    const scrim = qs('#service-center-scrim', el);
    const panel = qs('#service-center-panel', el);
    const close = qs('#service-center-close', el);
    
    const hide = () => {
       scrim.classList.remove('opacity-100');
       scrim.classList.add('opacity-0');
       panel.classList.remove('translate-y-0');
       panel.classList.add('translate-y-full');
       setTimeout(() => el.classList.add('hidden'), 300);
    };

    close.addEventListener('click', hide);
    scrim.addEventListener('click', hide);

    el.addEventListener('click', (e) => {
      const add = e.target.closest('[data-service-add]');
      if (add) {
        const type = add.getAttribute('data-service-add');
        if (type) {
          addDesktopWidget(type);
          toast('已添加到桌面');
          hide();
        }
        return;
      }
      const sys = e.target.closest('[data-system-sheet]');
      if (sys) {
        const kind = sys.getAttribute('data-system-sheet');
        if (kind) openSystemSheet(kind);
      }
    });
  }

  function openServiceCenter() {
    ensureServiceCenter();
    const el = qs('#service-center');
    el.classList.remove('hidden');
    el.offsetHeight;
    
    const scrim = qs('#service-center-scrim', el);
    const panel = qs('#service-center-panel', el);
    
    scrim.classList.remove('opacity-0');
    scrim.classList.add('opacity-100');
    panel.classList.remove('translate-y-full');
    panel.classList.add('translate-y-0');
  }

  function ensureSystemSheet() {
    if (qs('#system-sheet')) return;
    const root = qs('#os') || document.body;
    const el = document.createElement('div');
    el.id = 'system-sheet';
    el.className = 'absolute inset-0 z-[79] hidden';
    el.innerHTML = `
      <div id="system-sheet-scrim" class="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 transition-opacity duration-200"></div>
      <div class="absolute left-0 right-0 bottom-0 pb-[max(12px,env(safe-area-inset-bottom))] px-4 pointer-events-none">
        <div id="system-sheet-panel" class="mx-auto max-w-[520px] rounded-[28px] border border-white/12 bg-black/55 backdrop-blur-2xl shadow-float overflow-hidden translate-y-full transition-transform duration-200 ease-out pointer-events-auto">
          <div class="px-4 py-3 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <div id="system-sheet-title" class="text-[14px] font-semibold text-white/90">系统提示</div>
            <button id="system-sheet-close" type="button" class="rounded-xl px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 active:scale-[0.98] transition">关闭</button>
          </div>
          <div id="system-sheet-body" class="p-4"></div>
        </div>
      </div>
    `;
    root.appendChild(el);
    const close = () => closeSystemSheet();
    qs('#system-sheet-close', el)?.addEventListener('click', close);
    qs('#system-sheet-scrim', el)?.addEventListener('click', close);
  }

  function closeSystemSheet() {
    const el = qs('#system-sheet');
    if (!el) return;
    const scrim = qs('#system-sheet-scrim', el);
    const panel = qs('#system-sheet-panel', el);
    scrim?.classList.remove('opacity-100');
    panel?.classList.add('translate-y-full');
    setTimeout(() => el.classList.add('hidden'), 200);
  }

  function systemSheetPayload(kind) {
    const k = String(kind || '');
    if (k === 'earphones') {
      return {
        title: '设备连接',
        body: `
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-lg">🎧</div>
              <div class="min-w-0">
                <div class="text-sm text-white/90 font-semibold">FreeBuds 已连接</div>
                <div class="text-xs text-white/55">支持协同播放（示意）</div>
              </div>
            </div>
            <div class="flex gap-2">
              <button type="button" class="flex-1 px-3 py-2 rounded-2xl bg-white/10 text-white/85 text-xs hover:bg-white/15 active:scale-[0.98] transition" onclick="OS_toast('已切换音频输出')">切换输出</button>
              <button type="button" class="flex-1 px-3 py-2 rounded-2xl bg-blue-500/25 text-blue-100 text-xs hover:bg-blue-500/30 active:scale-[0.98] transition" onclick="OS_toast('已打开设备设置')">设备设置</button>
            </div>
          </div>
        `
      };
    }
    return {
      title: '电量不足',
      body: `
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-lg">🪫</div>
            <div class="min-w-0">
              <div class="text-sm text-white/90 font-semibold">电量低于 20%</div>
              <div class="text-xs text-white/55">建议开启省电模式或连接充电器</div>
            </div>
          </div>
          <div class="flex gap-2">
            <button type="button" class="flex-1 px-3 py-2 rounded-2xl bg-white/10 text-white/85 text-xs hover:bg-white/15 active:scale-[0.98] transition" onclick="OS_toast('已开启省电模式（示意）')">省电模式</button>
            <button type="button" class="flex-1 px-3 py-2 rounded-2xl bg-blue-500/25 text-blue-100 text-xs hover:bg-blue-500/30 active:scale-[0.98] transition" onclick="OS_toast('已开启飞行模式（示意）')">立即优化</button>
          </div>
        </div>
      `
    };
  }

  function openSystemSheet(kind) {
    ensureSystemSheet();
    const el = qs('#system-sheet');
    const scrim = qs('#system-sheet-scrim', el);
    const panel = qs('#system-sheet-panel', el);
    const title = qs('#system-sheet-title', el);
    const body = qs('#system-sheet-body', el);
    const payload = systemSheetPayload(kind);
    if (title) title.textContent = payload.title;
    if (body) body.innerHTML = payload.body;
    el.classList.remove('hidden');
    el.offsetHeight;
    scrim?.classList.add('opacity-100');
    panel?.classList.remove('translate-y-full');
  }

  function addDesktopWidget(type) {
    const t = String(type || '');
    if (!t) return;
    if (state.desktop.widgets.some(w => w.type === t)) return;
    state.desktop.widgets.push({ id: `w_${Date.now()}`, type: t });
    renderDesktop();
  }

  function desktopWidgetHtml(type) {
    const t = String(type || '');
    if (t === 'steps') {
      return `
        <div class="col-span-2 row-span-2 rounded-[24px] border border-white/10 bg-white/8 backdrop-blur-2xl shadow-glass p-4 overflow-hidden">
          <div class="flex items-center justify-between">
            <div class="text-xs text-white/60">运动健康</div>
            <div class="text-xs text-white/50">今日</div>
          </div>
          <div class="mt-3 text-4xl font-light text-white tabular-nums">3,201</div>
          <div class="mt-1 text-xs text-white/55">步数 · 目标 10,000</div>
          <div class="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
            <div class="h-full w-[32%] bg-gradient-to-r from-emerald-400 to-green-300"></div>
          </div>
        </div>
      `;
    }
    if (t === 'calendar') {
      const d = new Date();
      const w = "日一二三四五六".charAt(d.getDay());
      return `
        <div class="col-span-2 row-span-2 rounded-[24px] border border-white/10 bg-white/8 backdrop-blur-2xl shadow-glass p-4 overflow-hidden">
          <div class="flex items-center justify-between">
            <div class="text-xs text-white/60">日程</div>
            <div class="text-xs text-white/50">${d.getMonth() + 1}月${d.getDate()}日 星期${w}</div>
          </div>
          <div class="mt-4 space-y-2">
            <div class="rounded-2xl bg-white/10 border border-white/10 p-3">
              <div class="text-xs text-white/55">15:00</div>
              <div class="text-sm text-white/90 font-medium">项目例会（示意）</div>
            </div>
            <div class="rounded-2xl bg-white/10 border border-white/10 p-3">
              <div class="text-xs text-white/55">19:00</div>
              <div class="text-sm text-white/90 font-medium">家庭提醒（示意）</div>
            </div>
          </div>
        </div>
      `;
    }
    return '';
  }

  function renderDesktop() {
    const grid = qs('#app-grid');
    if (!grid) return;
    const getApp = (id) => APPS.find(a => a.id === id);
    const weatherWidget = `
      <div class="col-span-2 row-span-2 rounded-[24px] bg-gradient-to-br from-blue-400 to-blue-600 p-4 text-white shadow-lg relative overflow-hidden active:scale-95 transition">
         <div class="absolute top-3 right-3 text-xs opacity-80">北京市</div>
         <div class="mt-2 flex flex-col">
            <span class="text-5xl font-light">26°</span>
            <span class="text-sm mt-1 opacity-90">晴 · 空气优</span>
         </div>
         <div class="absolute bottom-4 left-4 right-4 flex justify-between text-xs opacity-80">
            <span>28° / 19°</span>
            <span>湿度 45%</span>
         </div>
         <div class="absolute -right-4 -bottom-4 text-[80px] opacity-20">☀</div>
      </div>
    `;
    const folderApps = ['meetime', 'calculator', 'notes', 'settings'];
    const folderWidget = `
      <div class="col-span-2 row-span-2 rounded-[24px] bg-white/10 border border-white/5 p-3 backdrop-blur-md shadow-lg">
         <div class="grid grid-cols-2 gap-2 h-full">
            ${folderApps.map(id => {
               const app = getApp(id);
               if (!app) return '';
               return `
                 <button class="flex flex-col items-center justify-center gap-1 w-full h-full rounded-xl hover:bg-white/5 active:scale-90 transition select-none" type="button" data-app-id="${app.id}">
                    <div class="transform scale-75 origin-center">${appIcon(app, 'sm')}</div>
                    <span class="text-[10px] text-white/90 truncate max-w-full">${app.name}</span>
                 </button>
               `;
            }).join('')}
         </div>
      </div>
    `;
    const exclude = new Set(folderApps);
    const iconApps = APPS.filter(a => !a.dock && !exclude.has(a.id));
    const iconHtml = iconApps.map(app => `
      <button class="flex flex-col items-center gap-2 p-2 active:scale-95 transition select-none" type="button" data-app-id="${app.id}" data-app-widget="${app.widget ? '1' : '0'}">
        ${appIcon(app, 'lg')}
        <span class="text-xs text-white drop-shadow-md">${app.name}</span>
      </button>
    `).join('');
    const extraWidgets = state.desktop.widgets.map(w => desktopWidgetHtml(w.type)).filter(Boolean).join('');
    grid.innerHTML = `${weatherWidget}${extraWidgets}${iconHtml}${folderWidget}`;
  }

  function bindLauncher() {
    const roots = [qs('#app-grid'), qs('#dock')].filter(Boolean);
    for (const root of roots) {
      if (root.dataset.bound === '1') continue;
      root.dataset.bound = '1';

      root.addEventListener('pointerdown', (e) => {
        const btn = e.target.closest('[data-app-id]');
        if (!btn) return;
        state.launcher.pointer = {
          id: btn.getAttribute('data-app-id'),
          widget: btn.getAttribute('data-app-widget') === '1',
          x: e.clientX,
          y: e.clientY,
          t: Date.now(),
          pointerId: e.pointerId,
          rect: btn.getBoundingClientRect(),
        };
      });

      root.addEventListener('pointerup', (e) => {
        const p = state.launcher.pointer;
        if (!p || p.pointerId !== e.pointerId) return;
        state.launcher.pointer = null;
        const dy = p.y - e.clientY;
        const dx = Math.abs(p.x - e.clientX);
        if (p.widget && dy > 45 && dx < 35) {
          state.launcher.suppress = { id: p.id, until: Date.now() + 600 };
          openServiceWidget(p.id, { sourceRect: p.rect });
        }
      });

      root.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-app-id]');
        if (!btn) return;
        const id = btn.getAttribute('data-app-id');
        const s = state.launcher.suppress;
        if (s && s.id === id && Date.now() < s.until) {
          e.preventDefault();
          e.stopPropagation();
          state.launcher.suppress = null;
          return;
        }
        openApp(id);
      });
    }
  }

  function bindKeyboard() {
    if (document.documentElement.dataset.kbdBound === '1') return;
    document.documentElement.dataset.kbdBound = '1';
    ensureKeyboard();
    const kbd = qs('#celia-kbd');
    kbd.addEventListener('click', (e) => {
      const hide = e.target.closest('[data-kbd-hide]');
      if (hide) {
        hideKeyboard();
        return;
      }
      const keyBtn = e.target.closest('[data-kbd-key]');
      if (!keyBtn) return;
      const k = keyBtn.getAttribute('data-kbd-key');
      if (k === 'SPACE') insertToTarget(' ');
      else if (k === 'DEL') deleteFromTarget();
      else if (k === 'ENTER') {
        try { state.keyboardTarget?.blur(); } catch { }
        hideKeyboard();
      } else {
        insertToTarget(k);
      }
    });

    let blurTimer = null;
    document.addEventListener('focusin', (e) => {
      const t = e.target;
      if (!(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement)) return;
      const ok = t.getAttribute('data-celia') === '1' || t.id === 'global-search' || t.id === 'notes-text';
      if (!ok) return;
      clearTimeout(blurTimer);
      showKeyboard(t);
    });
    document.addEventListener('focusout', () => {
      clearTimeout(blurTimer);
      blurTimer = setTimeout(() => {
        const active = document.activeElement;
        if (active && kbd.contains(active)) return;
        hideKeyboard();
      }, 120);
    });
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
      media: (act, v) => {
        const action = String(act || '').toLowerCase();
        if (action === 'toggle') state.media.playing = !state.media.playing;
        if (action === 'seek') {
          const n = Math.max(0, Math.min(100, Number(v)));
          state.media.progress = Number.isFinite(n) ? n / 100 : state.media.progress;
        }
        if (action === 'next') {
          state.media.title = '星河漫游';
          state.media.artist = '华为音乐';
          state.media.progress = 0.04;
          state.media.playing = true;
        }
        if (action === 'prev') {
          state.media.title = '午后微风';
          state.media.artist = '华为音乐';
          state.media.progress = 0.12;
          state.media.playing = true;
        }
        renderControls();
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
    ensureServiceWidget();
    ensureServiceCenter();
    bindKeyboard();

    renderDesktop();

    const dock = qs('#dock');
    dock.innerHTML = APPS.filter(a => a.dock).map(app => `
      <button class="active:scale-90 transition select-none" type="button" data-app-id="${app.id}" data-app-widget="${app.widget ? '1' : '0'}">
        ${appIcon(app, 'sm')}
      </button>
    `).join('');

    bindLauncher();

    setInterval(() => {
      qs('#status-time').textContent = nowTimeText();
      const wd = qs('#widget-date');
      if (wd) wd.textContent = dateText();
      if (state.locked) renderLockScreen();
    }, 1000);

    const wd = qs('#widget-date');
    if (wd) wd.textContent = dateText();
    renderLockScreen();

    bindGestures();
  }

  function hidePanels() {
    qs('#panel-scrim')?.classList.add('opacity-0', 'pointer-events-none');
    qs('#panel-controls')?.classList.add('translate-y-[-102%]');
    qs('#panel-notifications')?.classList.add('translate-y-[-102%]');
    const rec = qs('#panel-recents');
    if (rec) rec.classList.add('opacity-0', 'pointer-events-none');
    state.panel = 'none';
  }

  function showScrim() {
    qs('#panel-scrim')?.classList.remove('opacity-0', 'pointer-events-none');
  }

  function renderNotifications() {
    const list = qs('#notif-list');
    const dateEl = qs('#notif-date');
    if (dateEl) dateEl.textContent = dateText();
    if (!list) return;
    list.innerHTML = state.notifs.map(n => `
      <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div class="flex items-center justify-between gap-2">
          <div class="text-sm font-semibold text-white/90 truncate">${escapeHtml(n.title)}</div>
          <div class="text-xs text-white/45">${escapeHtml(n.time)}</div>
        </div>
        <div class="mt-2 text-sm text-white/70 leading-relaxed">${escapeHtml(n.body)}</div>
      </div>
    `).join('');
    const btn = qs('#btn-clear-notifs');
    if (btn && !btn.dataset.bound) {
      btn.dataset.bound = '1';
      btn.addEventListener('click', () => {
        state.notifs = [];
        renderNotifications();
        toast('已清除');
      });
    }
  }

  function showNotifications() {
    state.panel = 'notifications';
    showScrim();
    renderNotifications();
    qs('#panel-notifications')?.classList.remove('translate-y-[-102%]');
  }

  function showControls() {
    state.panel = 'controls';
    showScrim();
    qs('#panel-controls')?.classList.remove('translate-y-[-102%]');
    renderControls();
  }

  function renderRecents() {
    const list = qs('#recents-list');
    if (!list) return;
    const items = Array.from(state.windows.entries())
      .map(([id, w]) => ({ id, w, z: parseInt(w.el.style.zIndex || '0', 10) || 0 }))
      .sort((a, b) => b.z - a.z);
    if (items.length === 0) {
      list.innerHTML = `<div class="text-center text-white/40 text-sm py-10">暂无任务</div>`;
      return;
    }
    list.innerHTML = items.map(({ id, w }) => `
      <div class="rounded-2xl border border-white/10 bg-white/5 p-3 flex items-center gap-3">
        <div class="w-10 h-10 rounded-2xl bg-white/10 border border-white/10 grid place-items-center overflow-hidden">${w.app.icon}</div>
        <div class="flex-1 min-w-0">
          <div class="text-sm text-white/90 truncate">${escapeHtml(w.app.name)}</div>
          <div class="text-xs text-white/45">${w.minimized ? '已挂起' : '运行中'}</div>
        </div>
        <button type="button" class="px-3 py-2 rounded-2xl bg-white/10 text-white/80 text-xs hover:bg-white/15 active:scale-[0.98] transition" data-recents-open="${id}">打开</button>
        <button type="button" class="w-9 h-9 rounded-2xl bg-white/10 text-white/70 hover:bg-red-500 hover:text-white active:scale-[0.98] transition grid place-items-center" data-recents-close="${id}">×</button>
      </div>
    `).join('');
  }

  function showRecents() {
    state.panel = 'recents';
    showScrim();
    renderRecents();
    const rec = qs('#panel-recents');
    if (rec) rec.classList.remove('opacity-0', 'pointer-events-none');
    const closeBtn = qs('#btn-close-recents');
    if (closeBtn && !closeBtn.dataset.bound) {
      closeBtn.dataset.bound = '1';
      closeBtn.addEventListener('click', hidePanels);
    }
    const clearBtn = qs('#btn-clear-recents');
    if (clearBtn && !clearBtn.dataset.bound) {
      clearBtn.dataset.bound = '1';
      clearBtn.addEventListener('click', () => {
        for (const [id] of state.windows) closeApp(id);
        hidePanels();
      });
    }
    const list = qs('#recents-list');
    if (list && !list.dataset.bound) {
      list.dataset.bound = '1';
      list.addEventListener('click', (e) => {
        const openBtn = e.target.closest('[data-recents-open]');
        if (openBtn) {
          const id = openBtn.getAttribute('data-recents-open');
          openApp(id);
          hidePanels();
          return;
        }
        const closeBtn = e.target.closest('[data-recents-close]');
        if (closeBtn) {
          closeApp(closeBtn.getAttribute('data-recents-close'));
          renderRecents();
        }
      });
    }
  }

  function goHome() {
    closeServiceWidget();
    qs('#photo-viewer')?.classList.add('hidden');
    hidePanels();
    for (const [, w] of state.windows) {
      w.el.style.display = 'none';
      w.minimized = true;
    }
  }

  function topmostWindowId() {
    let best = null;
    let bestZ = -1;
    for (const [id, w] of state.windows) {
      if (w.minimized) continue;
      const z = parseInt(w.el.style.zIndex || '0', 10) || 0;
      if (z > bestZ) {
        bestZ = z;
        best = id;
      }
    }
    return best;
  }

  function goBack() {
    const widget = qs('#service-widget');
    if (widget && !widget.classList.contains('hidden')) {
      closeServiceWidget();
      return;
    }
    const viewer = qs('#photo-viewer');
    if (viewer && !viewer.classList.contains('hidden')) {
      viewer.classList.add('hidden');
      return;
    }
    if (state.panel !== 'none') {
      hidePanels();
      return;
    }
    const id = topmostWindowId();
    if (id) {
      closeApp(id);
      return;
    }
    toast('已到桌面');
  }

  function bindGestures() {
    const scrim = qs('#panel-scrim');
    if (scrim && !scrim.dataset.bound) {
      scrim.dataset.bound = '1';
      scrim.addEventListener('click', hidePanels);
    }

    const header = qs('header');
    if (header && !header.dataset.bound) {
      header.dataset.bound = '1';
      header.addEventListener('click', (e) => {
        if (state.locked) return;
        const os = qs('#os');
        const rect = os ? os.getBoundingClientRect() : null;
        if (rect && e.clientX > rect.left + rect.width / 2) showControls();
        else showNotifications();
      });
    }

    document.addEventListener('pointerdown', (e) => {
      if (state.locked) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      const os = qs('#os');
      if (!os) return;
      const rect = os.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const w = rect.width;
      const h = rect.height;
      if (y <= 22) {
        state.gesture.top = { x, y, pointerId: e.pointerId, fired: false };
      } else if (x <= 14) {
        state.gesture.edge = { x, y, pointerId: e.pointerId, fired: false };
      } else if (y >= h - 24) {
        if (x < 70 || x > w - 70) {
           state.gesture.corner = { x, y, pointerId: e.pointerId, fired: false };
        } else {
           const timer = setTimeout(() => {
             if (state.gesture.bottom && !state.gesture.bottom.fired) {
               showRecents();
               state.gesture.bottom.fired = true;
             }
           }, 520);
           state.gesture.bottom = { x, y, pointerId: e.pointerId, fired: false, timer };
        }
      }
    }, { passive: true });

    document.addEventListener('pointermove', (e) => {
      const os = qs('#os');
      const rect = os ? os.getBoundingClientRect() : null;
      const x = rect ? (e.clientX - rect.left) : e.clientX;
      const y = rect ? (e.clientY - rect.top) : e.clientY;
      const w = rect ? rect.width : window.innerWidth;
      const top = state.gesture.top;
      if (top && top.pointerId === e.pointerId && !top.fired) {
        const dy = y - top.y;
        if (dy > 70) {
          top.fired = true;
          if (top.x > w / 2) showControls();
          else showNotifications();
        }
      }
      const edge = state.gesture.edge;
      if (edge && edge.pointerId === e.pointerId && !edge.fired) {
        const dx = x - edge.x;
        const dy = Math.abs(y - edge.y);
        if (dx > 80 && dy < 60) {
          edge.fired = true;
          goBack();
        }
      }
      const corner = state.gesture.corner;
      if (corner && corner.pointerId === e.pointerId && !corner.fired) {
        const dy = corner.y - y;
        const dx = Math.abs(x - corner.x);
        if (dy > 80) {
          corner.fired = true;
          openServiceCenter();
        }
      }
      const bottom = state.gesture.bottom;
      if (bottom && bottom.pointerId === e.pointerId && !bottom.fired) {
        const dy = bottom.y - y;
        const dx = Math.abs(x - bottom.x);
        if (dy > 110 && dx < 80) {
          bottom.fired = true;
          clearTimeout(bottom.timer);
          goHome();
        }
      }
    }, { passive: true });

    const clearPointer = (pid) => {
      if (state.gesture.top && state.gesture.top.pointerId === pid) state.gesture.top = null;
      if (state.gesture.edge && state.gesture.edge.pointerId === pid) state.gesture.edge = null;
      if (state.gesture.corner && state.gesture.corner.pointerId === pid) state.gesture.corner = null;
      if (state.gesture.bottom && state.gesture.bottom.pointerId === pid) {
        clearTimeout(state.gesture.bottom.timer);
        state.gesture.bottom = null;
      }
    };
    document.addEventListener('pointerup', (e) => clearPointer(e.pointerId), { passive: true });
    document.addEventListener('pointercancel', (e) => clearPointer(e.pointerId), { passive: true });

    document.addEventListener('pointerdown', (e) => {
      if (!state.locked) return;
      const os = qs('#os');
      if (!os) return;
      const rect = os.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;
      state.gesture.unlock = { y: e.clientY - rect.top, pointerId: e.pointerId };
    }, { passive: true });
    const onUnlockEnd = (e) => {
      if (!state.locked || !state.gesture.unlock || state.gesture.unlock.pointerId !== e.pointerId) return;
      const os = qs('#os');
      const rect = os ? os.getBoundingClientRect() : null;
      const y = rect ? (e.clientY - rect.top) : e.clientY;
      const dy = state.gesture.unlock.y - y;
      state.gesture.unlock = null;
      if (dy > 110) unlock();
    };
    document.addEventListener('pointerup', onUnlockEnd, { passive: true });
    document.addEventListener('pointercancel', onUnlockEnd, { passive: true });
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", OS.init);
