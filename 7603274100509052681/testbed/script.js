const WebOSStorage = {
    vfsKey: "webos_vfs_v1",
    snakeHighScoreKey: "webos_snake_high_score_v1",
    themeKey: "webos_theme_v1"
};

function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
}

function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
        if (k === "class") node.className = v;
        else if (k === "dataset") Object.assign(node.dataset, v);
        else if (k === "style") Object.assign(node.style, v);
        else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
        else if (v === true) node.setAttribute(k, "");
        else if (v !== false && v != null) node.setAttribute(k, String(v));
    }
    for (const c of Array.isArray(children) ? children : [children]) {
        if (c == null) continue;
        if (typeof c === "string") node.appendChild(document.createTextNode(c));
        else node.appendChild(c);
    }
    return node;
}

function nowISO() {
    return new Date().toISOString();
}

class VFS {
    constructor() {
        this.root = null;
        this.load();
    }

    load() {
        const raw = localStorage.getItem(WebOSStorage.vfsKey);
        if (raw) {
            try {
                this.root = JSON.parse(raw);
                if (this.root && this.root.type === "dir") return;
            } catch (_) { }
        }
        this.root = this.defaultTree();
        this.save();
    }

    save() {
        localStorage.setItem(WebOSStorage.vfsKey, JSON.stringify(this.root));
    }

    defaultTree() {
        const mkDir = (name, children = {}) => ({
            type: "dir",
            name,
            createdAt: nowISO(),
            updatedAt: nowISO(),
            children
        });

        const mkText = (name, content, mime = "text/plain") => ({
            type: "file",
            name,
            kind: "text",
            mime,
            createdAt: nowISO(),
            updatedAt: nowISO(),
            content
        });

        const mkImage = (name, url) => ({
            type: "file",
            name,
            kind: "image",
            mime: "image/*",
            createdAt: nowISO(),
            updatedAt: nowISO(),
            url
        });

        const mkVideo = (name, url) => ({
            type: "file",
            name,
            kind: "video",
            mime: "video/*",
            createdAt: nowISO(),
            updatedAt: nowISO(),
            url
        });

        const root = mkDir("", {});
        root.children["Desktop"] = mkDir("Desktop", {
            "欢迎使用 WebOS.txt": mkText("欢迎使用 WebOS.txt", "欢迎使用 WebOS Desktop。\\n\\n提示：\\n- 双击桌面图标打开应用\\n- 文件管理器/记事本/终端共享同一个虚拟文件系统（localStorage 持久化）\\n- 终端支持 ls / cd / pwd / cat / python 等命令\\n")
        });

        root.children["Documents"] = mkDir("Documents", {
            "hello.py": mkText("hello.py", "print('Hello from Python!')\\nfor i in range(3):\\n    print('count', i)\\n", "text/x-python"),
            "hello.js": mkText("hello.js", "console.log('Hello from JavaScript!');\\nfor (let i=0;i<3;i++) console.log('count', i);\\n", "text/javascript"),
            "notes.md": mkText("notes.md", "# Notes\\n\\n- 这是一个示例 Markdown 文件\\n", "text/markdown")
        });

        root.children["Pictures"] = mkDir("Pictures", {
            "sample-1.jpg": mkImage("sample-1.jpg", "https://placehold.co/1200x800/jpg?text=WebOS+Photo+1"),
            "sample-2.jpg": mkImage("sample-2.jpg", "https://placehold.co/1200x800/jpg?text=WebOS+Photo+2")
        });

        root.children["Downloads"] = mkDir("Downloads", {});
        root.children["Videos"] = mkDir("Videos", {
            "flower.mp4": mkVideo("flower.mp4", "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4")
        });

        return root;
    }

    normalizePath(path) {
        if (!path) return "/";
        let p = String(path).trim();
        if (!p.startsWith("/")) p = "/" + p;
        p = p.replace(/\/+/g, "/");
        if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
        const parts = [];
        for (const seg of p.split("/")) {
            if (!seg || seg === ".") continue;
            if (seg === "..") parts.pop();
            else parts.push(seg);
        }
        return "/" + parts.join("/");
    }

    split(path) {
        const p = this.normalizePath(path);
        if (p === "/") return [];
        return p.slice(1).split("/");
    }

    join(base, name) {
        const b = this.normalizePath(base);
        const n = String(name || "").trim();
        return this.normalizePath((b === "/" ? "" : b) + "/" + n);
    }

    parent(path) {
        const p = this.normalizePath(path);
        if (p === "/") return "/";
        const parts = this.split(p);
        parts.pop();
        return "/" + parts.join("/");
    }

    basename(path) {
        const parts = this.split(path);
        return parts.length ? parts[parts.length - 1] : "";
    }

    getNode(path) {
        const parts = this.split(path);
        let cur = this.root;
        for (const seg of parts) {
            if (!cur || cur.type !== "dir") return null;
            cur = cur.children?.[seg] ?? null;
        }
        return cur;
    }

    ensureDir(path) {
        const parts = this.split(path);
        let cur = this.root;
        for (const seg of parts) {
            if (cur.type !== "dir") throw new Error("Not a directory");
            if (!cur.children[seg]) {
                cur.children[seg] = { type: "dir", name: seg, createdAt: nowISO(), updatedAt: nowISO(), children: {} };
                cur.updatedAt = nowISO();
            }
            cur = cur.children[seg];
        }
        if (cur.type !== "dir") throw new Error("Not a directory");
        return cur;
    }

    listDir(path) {
        const node = this.getNode(path);
        if (!node) throw new Error("Path not found");
        if (node.type !== "dir") throw new Error("Not a directory");
        const out = [];
        for (const child of Object.values(node.children || {})) {
            out.push({
                name: child.name,
                type: child.type,
                kind: child.kind ?? (child.type === "dir" ? "dir" : "file"),
                updatedAt: child.updatedAt,
                createdAt: child.createdAt
            });
        }
        out.sort((a, b) => {
            if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
            return a.name.localeCompare(b.name, "zh-Hans-CN");
        });
        return out;
    }

    mkdir(path) {
        const p = this.normalizePath(path);
        if (p === "/") return;
        const parent = this.ensureDir(this.parent(p));
        const name = this.basename(p);
        if (parent.children[name]) throw new Error("Already exists");
        parent.children[name] = { type: "dir", name, createdAt: nowISO(), updatedAt: nowISO(), children: {} };
        parent.updatedAt = nowISO();
        this.save();
    }

    writeText(path, content, mime = "text/plain") {
        const p = this.normalizePath(path);
        const parent = this.ensureDir(this.parent(p));
        const name = this.basename(p);
        const now = nowISO();
        const existing = parent.children[name];
        if (existing && existing.type === "dir") throw new Error("Cannot overwrite directory");
        parent.children[name] = {
            type: "file",
            name,
            kind: "text",
            mime,
            createdAt: existing?.createdAt ?? now,
            updatedAt: now,
            content: String(content ?? "")
        };
        parent.updatedAt = now;
        this.save();
    }

    writeMedia(path, kind, url) {
        const p = this.normalizePath(path);
        const parent = this.ensureDir(this.parent(p));
        const name = this.basename(p);
        const now = nowISO();
        const existing = parent.children[name];
        if (existing && existing.type === "dir") throw new Error("Cannot overwrite directory");
        parent.children[name] = {
            type: "file",
            name,
            kind,
            mime: kind === "image" ? "image/*" : "video/*",
            createdAt: existing?.createdAt ?? now,
            updatedAt: now,
            url: String(url ?? "")
        };
        parent.updatedAt = now;
        this.save();
    }

    readFile(path) {
        const node = this.getNode(path);
        if (!node) throw new Error("File not found");
        if (node.type !== "file") throw new Error("Not a file");
        return node;
    }

    deletePath(path) {
        const p = this.normalizePath(path);
        if (p === "/") throw new Error("Cannot delete root");
        const parentPath = this.parent(p);
        const parent = this.getNode(parentPath);
        if (!parent || parent.type !== "dir") throw new Error("Parent not found");
        const name = this.basename(p);
        if (!parent.children[name]) throw new Error("Path not found");
        delete parent.children[name];
        parent.updatedAt = nowISO();
        this.save();
    }

    movePath(from, to) {
        const src = this.normalizePath(from);
        const dst = this.normalizePath(to);
        if (src === "/" || dst === "/") throw new Error("Invalid path");
        const srcParent = this.getNode(this.parent(src));
        if (!srcParent || srcParent.type !== "dir") throw new Error("Source parent not found");
        const node = srcParent.children[this.basename(src)];
        if (!node) throw new Error("Source not found");
        const dstParent = this.ensureDir(this.parent(dst));
        const dstName = this.basename(dst);
        if (dstParent.children[dstName]) throw new Error("Destination exists");
        delete srcParent.children[this.basename(src)];
        node.name = dstName;
        node.updatedAt = nowISO();
        srcParent.updatedAt = nowISO();
        dstParent.children[dstName] = node;
        dstParent.updatedAt = nowISO();
        this.save();
    }
}

class ModalService {
    constructor() {
        this.root = document.getElementById("modal-root");
    }

    async confirm({ title, message, okText = "确定", cancelText = "取消", danger = false }) {
        return await new Promise((resolve) => {
            const backdrop = el("div", { class: "modal-backdrop" });
            const modal = el("div", { class: "modal", role: "dialog", "aria-modal": "true" });
            const header = el("div", { class: "modal__header" }, title || "确认");
            const body = el("div", { class: "modal__body" }, [
                el("div", { style: { fontSize: "13px", lineHeight: "1.5", color: "#111827" } }, message || "")
            ]);
            const footer = el("div", { class: "modal__footer" });
            const cancel = el("button", { class: "ui-btn", type: "button" }, cancelText);
            const ok = el("button", { class: "ui-btn " + (danger ? "danger" : "primary"), type: "button" }, okText);

            const cleanup = (val) => {
                backdrop.remove();
                resolve(val);
            };
            cancel.addEventListener("click", () => cleanup(false));
            ok.addEventListener("click", () => cleanup(true));
            backdrop.addEventListener("click", (e) => {
                if (e.target === backdrop) cleanup(false);
            });
            window.addEventListener(
                "keydown",
                (e) => {
                    if (!this.root.contains(backdrop)) return;
                    if (e.key === "Escape") cleanup(false);
                },
                { once: true }
            );

            footer.appendChild(cancel);
            footer.appendChild(ok);
            modal.appendChild(header);
            modal.appendChild(body);
            modal.appendChild(footer);
            backdrop.appendChild(modal);
            this.root.appendChild(backdrop);
            cancel.focus();
        });
    }

    async prompt({ title, message, placeholder = "", value = "", okText = "确定", cancelText = "取消", hint = "" }) {
        return await new Promise((resolve) => {
            const backdrop = el("div", { class: "modal-backdrop" });
            const modal = el("div", { class: "modal", role: "dialog", "aria-modal": "true" });
            const header = el("div", { class: "modal__header" }, title || "输入");
            const input = el("input", { class: "ui-input", value, placeholder, type: "text" });
            const body = el("div", { class: "modal__body" }, [
                message ? el("div", { style: { fontSize: "13px", lineHeight: "1.5", marginBottom: "10px", color: "#111827" } }, message) : null,
                input,
                hint ? el("div", { class: "modal__hint" }, hint) : null
            ]);
            const footer = el("div", { class: "modal__footer" });
            const cancel = el("button", { class: "ui-btn", type: "button" }, cancelText);
            const ok = el("button", { class: "ui-btn primary", type: "button" }, okText);

            const cleanup = (val) => {
                backdrop.remove();
                resolve(val);
            };
            cancel.addEventListener("click", () => cleanup(null));
            ok.addEventListener("click", () => cleanup(input.value));
            input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") cleanup(input.value);
            });
            backdrop.addEventListener("click", (e) => {
                if (e.target === backdrop) cleanup(null);
            });
            window.addEventListener(
                "keydown",
                (e) => {
                    if (!this.root.contains(backdrop)) return;
                    if (e.key === "Escape") cleanup(null);
                },
                { once: true }
            );

            footer.appendChild(cancel);
            footer.appendChild(ok);
            modal.appendChild(header);
            modal.appendChild(body);
            modal.appendChild(footer);
            backdrop.appendChild(modal);
            this.root.appendChild(backdrop);
            input.focus();
            input.select();
        });
    }
}

class ToastService {
    constructor() {
        this.root = document.getElementById("toast-root");
    }

    push({ title, message, timeoutMs = 2600 }) {
        const box = el("div", { class: "toast" }, [
            el("div", { class: "toast__title" }, title || "提示"),
            message ? el("div", { class: "toast__msg" }, message) : null
        ]);
        this.root.appendChild(box);
        window.setTimeout(() => {
            box.style.opacity = "0";
            box.style.transform = "translateY(6px)";
            box.style.transition = "opacity .18s ease, transform .18s ease";
            window.setTimeout(() => box.remove(), 220);
        }, timeoutMs);
    }
}

class AppWindow {
    constructor(os, { appId, title, glyph, width = 820, height = 560, singletonKey = null }) {
        this.os = os;
        this.id = "w_" + Math.random().toString(16).slice(2);
        this.appId = appId;
        this.singletonKey = singletonKey;
        this.glyph = glyph;
        this.titleBase = title;
        this.titleExtra = "";
        this.restoreRect = null;
        this.cleanup = [];

        const container = document.getElementById("windows-container");
        this.el = el("div", { class: "window", dataset: { windowId: this.id, appId } });

        const header = el("div", { class: "window-header" });
        this.headerEl = header;
        const titleEl = el("div", { class: "window-title" }, [
            el("span", { class: "app-badge", dataset: { glyph } }),
            el("span", { class: "title-text" }, this.titleBase)
        ]);
        this.titleTextEl = titleEl.querySelector(".title-text");
        const controls = el("div", { class: "window-controls" });
        const btnMin = el("button", { class: "win-btn", type: "button", "aria-label": "最小化" }, "—");
        const btnMax = el("button", { class: "win-btn", type: "button", "aria-label": "最大化" }, "□");
        const btnClose = el("button", { class: "win-btn close", type: "button", "aria-label": "关闭" }, "×");
        controls.appendChild(btnMin);
        controls.appendChild(btnMax);
        controls.appendChild(btnClose);

        header.appendChild(titleEl);
        header.appendChild(controls);

        const content = el("div", { class: "window-content" });
        this.contentEl = content;
        this.el.appendChild(header);
        this.el.appendChild(content);

        container.appendChild(this.el);

        const desktopRect = container.getBoundingClientRect();
        const offset = this.os.windowCount() * 22;
        const left = clamp(90 + offset, 10, desktopRect.width - width - 10);
        const top = clamp(50 + offset, 10, desktopRect.height - height - 10);
        this.el.style.left = left + "px";
        this.el.style.top = top + "px";
        this.el.style.width = width + "px";
        this.el.style.height = height + "px";

        btnClose.addEventListener("click", (e) => {
            e.stopPropagation();
            this.close();
        });
        btnMin.addEventListener("click", (e) => {
            e.stopPropagation();
            this.minimize();
        });
        btnMax.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggleMaximize();
        });

        this.el.addEventListener("pointerdown", () => this.focus());
        this.setupDrag(header, controls);
        this.os.registerWindow(this);
        this.focus();
    }

    setupDrag(handle, controlsEl) {
        let dragging = false;
        let startX = 0;
        let startY = 0;
        let baseLeft = 0;
        let baseTop = 0;

        const onMove = (e) => {
            if (!dragging) return;
            const container = document.getElementById("windows-container");
            const rect = container.getBoundingClientRect();
            const w = this.el.offsetWidth;
            const h = this.el.offsetHeight;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            const nextLeft = clamp(baseLeft + dx, 0, rect.width - Math.min(120, w));
            const nextTop = clamp(baseTop + dy, 0, rect.height - 44);
            this.el.style.left = nextLeft + "px";
            this.el.style.top = nextTop + "px";
        };

        const onUp = () => {
            if (!dragging) return;
            dragging = false;
            this.el.classList.remove("is-dragging");
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
        };

        handle.addEventListener("pointerdown", (e) => {
            if (e.target.closest(".window-controls")) return;
            if (this.el.classList.contains("is-maximized")) return;
            dragging = true;
            this.el.classList.add("is-dragging");
            this.focus();
            startX = e.clientX;
            startY = e.clientY;
            baseLeft = this.el.offsetLeft;
            baseTop = this.el.offsetTop;
            window.addEventListener("pointermove", onMove);
            window.addEventListener("pointerup", onUp);
        });

        controlsEl.addEventListener("pointerdown", (e) => e.stopPropagation());
    }

    focus() {
        this.os.focusWindow(this.id);
    }

    setTitleExtra(extra) {
        this.titleExtra = String(extra || "");
        const t = this.titleExtra ? `${this.titleBase} — ${this.titleExtra}` : this.titleBase;
        this.titleTextEl.textContent = t;
        this.os.updateTaskbarTitle(this.id, t);
    }

    minimize() {
        this.el.classList.add("is-minimized");
        this.os.onWindowMinimized(this.id);
    }

    restore() {
        this.el.classList.remove("is-minimized");
        this.focus();
    }

    toggleMaximize() {
        const isMax = this.el.classList.contains("is-maximized");
        if (!isMax) {
            this.restoreRect = {
                left: this.el.style.left,
                top: this.el.style.top,
                width: this.el.style.width,
                height: this.el.style.height
            };
            this.el.classList.add("is-maximized");
        } else {
            this.el.classList.remove("is-maximized");
            if (this.restoreRect) {
                this.el.style.left = this.restoreRect.left;
                this.el.style.top = this.restoreRect.top;
                this.el.style.width = this.restoreRect.width;
                this.el.style.height = this.restoreRect.height;
            }
        }
        this.focus();
    }

    onClose(fn) {
        this.cleanup.push(fn);
    }

    close() {
        for (const fn of this.cleanup.splice(0)) {
            try {
                fn();
            } catch (_) { }
        }
        this.os.unregisterWindow(this.id);
        this.el.remove();
    }
}

class WebOS {
    constructor() {
        this.vfs = new VFS();
        this.modal = new ModalService();
        this.toast = new ToastService();

        this.windows = new Map();
        this.singleton = new Map();
        this.z = 300;
        this.activeWindowId = null;

        this.startButton = document.getElementById("start-button");
        this.startMenu = document.getElementById("start-menu");
        this.taskbarApps = document.getElementById("taskbar-apps");
        this.clockEl = document.getElementById("clock");
        this.trayBattery = document.getElementById("tray-battery");
        this.trayNetwork = document.getElementById("tray-network");

        this.battery = clamp(Math.floor(70 + Math.random() * 28), 40, 100);
        this.trayBattery.textContent = `${this.battery}%`;
        this.trayNetwork.textContent = "Wi‑Fi";

        this.applyTheme(localStorage.getItem(WebOSStorage.themeKey) || "ocean");

        this.apps = this.createAppRegistry();
        this.installGlobalHandlers();
        this.updateClock();
        window.setInterval(() => this.updateClock(), 1000);
        this.toast.push({ title: "WebOS", message: "已启动。双击桌面图标开始使用。" });
    }

    applyTheme(themeId) {
        const allowed = new Set(["ocean", "sunset", "graphite"]);
        const id = allowed.has(String(themeId)) ? String(themeId) : "ocean";
        document.body.dataset.theme = id;
        localStorage.setItem(WebOSStorage.themeKey, id);
    }

    windowCount() {
        return this.windows.size;
    }

    installGlobalHandlers() {
        document.getElementById("desktop").addEventListener("pointerdown", (e) => {
            if (e.target.closest(".desktop-icon")) return;
            if (e.target.closest(".start-menu")) return;
            this.closeStartMenu();
        });

        this.startButton.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggleStartMenu();
        });

        document.addEventListener("click", (e) => {
            if (this.startMenu.classList.contains("is-open")) {
                if (this.startMenu.contains(e.target) || this.startButton.contains(e.target)) return;
                this.closeStartMenu();
            }
        });

        document.querySelectorAll(".start-menu-item").forEach((btn) => {
            btn.addEventListener("click", () => {
                const appId = btn.dataset.app;
                this.openApp(appId, {});
                this.closeStartMenu();
            });
        });

        document.querySelectorAll(".desktop-icon").forEach((btn) => {
            btn.addEventListener("click", () => {
                const appId = btn.dataset.app;
                this.openApp(appId, {});
            });
            btn.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    const appId = btn.dataset.app;
                    this.openApp(appId, {});
                }
            });
        });

        const power = document.getElementById("power-button");
        power.addEventListener("click", async () => {
            const ok = await this.modal.confirm({
                title: "关机",
                message: "关闭所有窗口并退出当前会话？（虚拟文件系统会保存在浏览器 localStorage）",
                okText: "关机",
                cancelText: "取消",
                danger: true
            });
            if (!ok) return;
            for (const w of Array.from(this.windows.values())) w.close();
            this.closeStartMenu();
            this.toast.push({ title: "已关机", message: "刷新页面可重新启动。", timeoutMs: 5000 });
        });
    }

    toggleStartMenu() {
        if (this.startMenu.classList.contains("is-open")) this.closeStartMenu();
        else this.openStartMenu();
    }

    openStartMenu() {
        this.startMenu.classList.add("is-open");
    }

    closeStartMenu() {
        this.startMenu.classList.remove("is-open");
    }

    updateClock() {
        const d = new Date();
        const hh = String(d.getHours()).padStart(2, "0");
        const mm = String(d.getMinutes()).padStart(2, "0");
        this.clockEl.textContent = `${hh}:${mm}`;
    }

    formatDateTimeShort(iso) {
        try {
            const d = new Date(iso);
            const yy = String(d.getFullYear());
            const mo = String(d.getMonth() + 1).padStart(2, "0");
            const da = String(d.getDate()).padStart(2, "0");
            const hh = String(d.getHours()).padStart(2, "0");
            const mm = String(d.getMinutes()).padStart(2, "0");
            return `${yy}-${mo}-${da} ${hh}:${mm}`;
        } catch (_) {
            return "";
        }
    }

    guessAppForFile(node, path) {
        const lower = String(path || "").toLowerCase();
        if (node.kind === "image") return "photos";
        if (node.kind === "video") return "video";
        if (node.kind === "text") {
            if (lower.endsWith(".py") || lower.endsWith(".js")) return "code";
            return "notepad";
        }
        return "notepad";
    }

    openPath(path) {
        const p = this.vfs.normalizePath(path);
        const node = this.vfs.getNode(p);
        if (!node) {
            this.toast.push({ title: "无法打开", message: `路径不存在：${p}` });
            return;
        }
        if (node.type === "dir") {
            this.openApp("explorer", { path: p });
            return;
        }
        const appId = this.guessAppForFile(node, p);
        this.openApp(appId, { path: p });
    }

    async showFilePicker({ title, mode, startDir, kindAllow = null, extAllow = null, defaultName = "untitled.txt" }) {
        const root = document.getElementById("modal-root");
        const vfs = this.vfs;
        const normalizeExt = (s) => String(s || "").toLowerCase().replace(/^\./, "");
        const allowedExt = extAllow ? new Set(extAllow.map(normalizeExt)) : null;
        const isAllowedFile = (name, nodeKind) => {
            if (kindAllow && !kindAllow.includes(nodeKind)) return false;
            if (!allowedExt) return true;
            const ext = name.includes(".") ? name.split(".").pop().toLowerCase() : "";
            return allowedExt.has(ext);
        };

        return await new Promise((resolve) => {
            let cwd = vfs.normalizePath(startDir || "/");
            let selected = null;
            let filename = defaultName;

            const backdrop = el("div", { class: "modal-backdrop" });
            const modal = el("div", { class: "modal", role: "dialog", "aria-modal": "true" });
            const header = el("div", { class: "modal__header" }, title || (mode === "save" ? "另存为" : "打开"));

            const pathInput = el("input", { class: "ui-input", value: cwd, type: "text" });
            const upBtn = el("button", { class: "ui-btn", type: "button" }, "上一级");
            const refreshBtn = el("button", { class: "ui-btn", type: "button" }, "刷新");

            const nameInput = el("input", { class: "ui-input", value: filename, type: "text" });
            const list = el("div", { class: "picker__list" });

            const okBtn = el("button", { class: "ui-btn primary", type: "button" }, mode === "save" ? "保存" : "打开");
            const cancelBtn = el("button", { class: "ui-btn", type: "button" }, "取消");

            const body = el("div", { class: "modal__body" }, [
                el("div", { class: "picker" }, [
                    el("div", { class: "picker__row" }, [upBtn, refreshBtn]),
                    el("div", { class: "picker__row" }, [pathInput]),
                    mode === "save"
                        ? el("div", { class: "picker__row" }, [nameInput])
                        : null,
                    list
                ])
            ]);

            const footer = el("div", { class: "modal__footer" }, [cancelBtn, okBtn]);
            modal.appendChild(header);
            modal.appendChild(body);
            modal.appendChild(footer);
            backdrop.appendChild(modal);
            root.appendChild(backdrop);

            const cleanup = (val) => {
                backdrop.remove();
                resolve(val);
            };

            const updateOkState = () => {
                if (mode === "save") {
                    const fn = String(nameInput.value || "").trim();
                    okBtn.disabled = !fn;
                    okBtn.style.opacity = okBtn.disabled ? ".5" : "1";
                    return;
                }
                okBtn.disabled = !selected;
                okBtn.style.opacity = okBtn.disabled ? ".5" : "1";
            };

            const render = () => {
                pathInput.value = cwd;
                list.innerHTML = "";
                selected = null;

                let items = [];
                try {
                    items = vfs.listDir(cwd).map((x) => ({ ...x, path: vfs.join(cwd, x.name) }));
                } catch (_) {
                    items = [];
                }

                const filtered = items.filter((it) => {
                    if (it.type === "dir") return true;
                    return isAllowedFile(it.name, it.kind);
                });

                if (cwd !== "/") {
                    const parent = vfs.parent(cwd);
                    const up = el("button", { class: "pick-item", type: "button", dataset: { kind: "dir" } }, [
                        el("span", { class: "pick-item__icon", dataset: { kind: "dir" } }),
                        el("span", { class: "pick-item__name" }, "…")
                    ]);
                    up.addEventListener("dblclick", () => {
                        cwd = parent;
                        render();
                    });
                    up.addEventListener("click", () => {
                        cwd = parent;
                        render();
                    });
                    list.appendChild(up);
                }

                for (const it of filtered) {
                    const row = el("button", { class: "pick-item", type: "button", dataset: { kind: it.type === "dir" ? "dir" : it.kind } }, [
                        el("span", { class: "pick-item__icon", dataset: { kind: it.type === "dir" ? "dir" : it.kind } }),
                        el("span", { class: "pick-item__name" }, it.name)
                    ]);
                    row.addEventListener("click", () => {
                        for (const n of list.querySelectorAll(".pick-item")) n.classList.remove("is-selected");
                        row.classList.add("is-selected");
                        if (it.type === "dir") {
                            selected = null;
                            if (mode === "save") {
                                cwd = it.path;
                                render();
                                return;
                            }
                        } else {
                            selected = it.path;
                            if (mode === "save") nameInput.value = it.name;
                        }
                        updateOkState();
                    });
                    row.addEventListener("dblclick", () => {
                        if (it.type === "dir") {
                            cwd = it.path;
                            render();
                            return;
                        }
                        selected = it.path;
                        updateOkState();
                        if (mode !== "save") cleanup(selected);
                    });
                    list.appendChild(row);
                }
                updateOkState();
            };

            const tryNavigate = () => {
                const target = vfs.normalizePath(pathInput.value || "/");
                const node = vfs.getNode(target);
                if (!node || node.type !== "dir") return;
                cwd = target;
                render();
            };

            upBtn.addEventListener("click", () => {
                cwd = vfs.parent(cwd);
                render();
            });
            refreshBtn.addEventListener("click", () => render());
            pathInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") tryNavigate();
            });
            nameInput.addEventListener("input", () => updateOkState());
            cancelBtn.addEventListener("click", () => cleanup(null));
            backdrop.addEventListener("click", (e) => {
                if (e.target === backdrop) cleanup(null);
            });
            window.addEventListener(
                "keydown",
                (e) => {
                    if (!root.contains(backdrop)) return;
                    if (e.key === "Escape") cleanup(null);
                },
                { once: true }
            );

            okBtn.addEventListener("click", async () => {
                if (mode === "save") {
                    const fn = String(nameInput.value || "").trim();
                    if (!fn) return;
                    const target = vfs.join(cwd, fn);
                    const existing = vfs.getNode(target);
                    if (existing) {
                        const ok = await this.modal.confirm({
                            title: "覆盖文件",
                            message: `文件已存在，是否覆盖？\\n${target}`,
                            okText: "覆盖",
                            cancelText: "取消",
                            danger: true
                        });
                        if (!ok) return;
                    }
                    cleanup(target);
                    return;
                }
                cleanup(selected);
            });

            render();
            if (mode === "save") nameInput.focus();
            else pathInput.blur();
        });
    }

    async ensurePyodide() {
        if (this._pyodidePromise) return await this._pyodidePromise;
        const version = "v0.26.4";
        const preferredBase = String(window.__WEBOS_PYODIDE_BASE || "").trim();
        const candidates = [
            preferredBase ? { base: preferredBase } : null,
            { base: `https://cdn.jsdelivr.net/pyodide/${version}/full/` },
            { base: `https://fastly.jsdelivr.net/pyodide/${version}/full/` },
            { base: `https://gcore.jsdelivr.net/pyodide/${version}/full/` }
        ].filter(Boolean);

        const loadFromBase = async (base) => {
            const normalized = base.endsWith("/") ? base : base + "/";
            if (!window.loadPyodide) {
                await new Promise((resolve, reject) => {
                    const s = document.createElement("script");
                    s.src = normalized + "pyodide.js";
                    s.async = true;
                    s.onload = () => resolve();
                    s.onerror = () => reject(new Error("Pyodide 脚本加载失败"));
                    document.head.appendChild(s);
                });
            }
            if (!window.loadPyodide) throw new Error("Pyodide 加载失败");
            return await window.loadPyodide({ indexURL: normalized });
        };

        this._pyodidePromise = (async () => {
            let lastError = null;
            for (const { base } of candidates) {
                try {
                    const pyodide = await loadFromBase(base);
                    await pyodide.runPythonAsync(`
import sys, io, traceback
def __webos_exec(code, ns):
    buf = io.StringIO()
    old_out, old_err = sys.stdout, sys.stderr
    sys.stdout = buf
    sys.stderr = buf
    try:
        exec(code, ns)
    except SystemExit:
        raise
    except Exception:
        traceback.print_exc()
    finally:
        sys.stdout, sys.stderr = old_out, old_err
    return buf.getvalue()
`);
                    return pyodide;
                } catch (e) {
                    lastError = e;
                }
            }
            throw lastError || new Error("Python 运行时不可用");
        })()
            .catch((e) => {
                this._pyodidePromise = null;
                this.toast.push({
                    title: "Python 不可用",
                    message: String(e?.message || e) + "（可能是网络或 CDN 被拦截，可尝试更换 __WEBOS_PYODIDE_BASE）"
                });
                throw e;
            });

        return await this._pyodidePromise;
    }

    async createPythonNamespace() {
        const pyodide = await this.ensurePyodide();
        const dict = pyodide.globals.get("dict");
        const ns = dict();
        ns.set("__name__", "__main__");
        return ns;
    }

    async runPythonCapture(code, ns) {
        const pyodide = await this.ensurePyodide();
        const execFn = pyodide.globals.get("__webos_exec");
        const out = execFn(String(code ?? ""), ns);
        const text = String(out);
        try {
            out.destroy?.();
        } catch (_) { }
        return text;
    }

    createAppRegistry() {
        return {
            explorer: { title: "文件管理器", glyph: "folder", width: 980, height: 640, singletonKey: "explorer" },
            notepad: { title: "记事本", glyph: "note", width: 820, height: 620 },
            terminal: { title: "终端", glyph: "terminal", width: 900, height: 600 },
            browser: { title: "浏览器", glyph: "globe", width: 1040, height: 700 },
            photos: { title: "照片", glyph: "photo", width: 980, height: 640 },
            calendar: { title: "日历", glyph: "calendar", width: 760, height: 620 },
            calculator: { title: "计算器", glyph: "calc", width: 420, height: 640, singletonKey: "calculator" },
            code: { title: "代码编辑器", glyph: "code", width: 980, height: 700 },
            paint: { title: "画图", glyph: "paint", width: 1040, height: 720 },
            game: { title: "小游戏", glyph: "game", width: 740, height: 760 },
            video: { title: "视频播放器", glyph: "video", width: 920, height: 640 },
            settings: { title: "设置", glyph: "settings", width: 720, height: 560, singletonKey: "settings" }
        };
    }

    registerWindow(win) {
        this.windows.set(win.id, win);
        if (win.singletonKey) this.singleton.set(win.singletonKey, win.id);
        this.addTaskbarButton(win);
    }

    unregisterWindow(windowId) {
        const w = this.windows.get(windowId);
        if (!w) return;
        if (w.singletonKey && this.singleton.get(w.singletonKey) === windowId) this.singleton.delete(w.singletonKey);
        this.windows.delete(windowId);
        this.removeTaskbarButton(windowId);
        if (this.activeWindowId === windowId) this.activeWindowId = null;
    }

    focusWindow(windowId) {
        const w = this.windows.get(windowId);
        if (!w) return;
        w.el.classList.remove("is-minimized");
        w.el.style.zIndex = String(++this.z);
        this.activeWindowId = windowId;
        for (const [id, item] of Array.from(this.taskbarApps.querySelectorAll(".taskbar-app")).map((n) => [n.dataset.windowId, n])) {
            item.classList.toggle("is-active", id === windowId);
        }
    }

    onWindowMinimized(windowId) {
        if (this.activeWindowId === windowId) {
            this.activeWindowId = null;
            for (const item of this.taskbarApps.querySelectorAll(".taskbar-app")) item.classList.remove("is-active");
        }
    }

    addTaskbarButton(win) {
        const btn = el("button", { class: "taskbar-app is-active", type: "button", dataset: { windowId: win.id } }, [
            el("span", { class: "app-chip", dataset: { glyph: win.glyph } }),
            el("span", { class: "taskbar-app__title" }, win.titleBase)
        ]);
        btn.addEventListener("click", () => {
            const w = this.windows.get(win.id);
            if (!w) return;
            const isMin = w.el.classList.contains("is-minimized");
            if (isMin) w.restore();
            else if (this.activeWindowId === win.id) w.minimize();
            else w.focus();
        });
        this.taskbarApps.appendChild(btn);
        this.focusWindow(win.id);
    }

    updateTaskbarTitle(windowId, title) {
        const btn = this.taskbarApps.querySelector(`.taskbar-app[data-window-id="${windowId}"] .taskbar-app__title`);
        if (btn) btn.textContent = title;
    }

    removeTaskbarButton(windowId) {
        const btn = this.taskbarApps.querySelector(`.taskbar-app[data-window-id="${windowId}"]`);
        if (btn) btn.remove();
    }

    openApp(appId, options) {
        const cfg = this.apps[appId];
        if (!cfg) {
            this.toast.push({ title: "无法打开", message: `未知应用：${appId}` });
            return null;
        }
        if (cfg.singletonKey && this.singleton.has(cfg.singletonKey)) {
            const id = this.singleton.get(cfg.singletonKey);
            const win = this.windows.get(id);
            if (win) {
                win.restore();
                win.focus();
                return win;
            }
        }

        const win = new AppWindow(this, {
            appId,
            title: cfg.title,
            glyph: cfg.glyph,
            width: cfg.width,
            height: cfg.height,
            singletonKey: cfg.singletonKey ?? null
        });

        this.mountApp(win, appId, options);
        return win;
    }

    mountApp(win, appId, options) {
        const mount = {
            explorer: () => this.mountExplorer(win, options),
            notepad: () => this.mountNotepad(win, options),
            terminal: () => this.mountTerminal(win, options),
            browser: () => this.mountBrowser(win, options),
            photos: () => this.mountPhotos(win, options),
            calendar: () => this.mountCalendar(win, options),
            calculator: () => this.mountCalculator(win, options),
            code: () => this.mountCodeEditor(win, options),
            paint: () => this.mountPaint(win, options),
            game: () => this.mountGame(win, options),
            video: () => this.mountVideo(win, options),
            settings: () => this.mountSettings(win, options)
        }[appId];

        if (!mount) {
            win.contentEl.appendChild(el("div", { style: { padding: "14px" } }, "应用未实现"));
            return;
        }
        mount();
    }

    mountExplorer(win, options) {
        const vfs = this.vfs;
        const root = el("div", { class: "explorer" });

        const btnNewFile = el("button", { class: "ui-btn primary", type: "button" }, "新建文件");
        const btnNewFolder = el("button", { class: "ui-btn", type: "button" }, "新建文件夹");
        const btnRename = el("button", { class: "ui-btn", type: "button" }, "重命名");
        const btnDelete = el("button", { class: "ui-btn danger", type: "button" }, "删除");
        const btnAddImage = el("button", { class: "ui-btn", type: "button" }, "添加图片URL");
        const btnAddVideo = el("button", { class: "ui-btn", type: "button" }, "添加视频URL");

        const pathInput = el("input", { class: "ui-input", type: "text", value: "/" });

        const toolbar = el("div", { class: "explorer__toolbar" }, [
            btnNewFile,
            btnNewFolder,
            btnRename,
            btnDelete,
            btnAddImage,
            btnAddVideo,
            el("div", { class: "explorer__path" }, [pathInput])
        ]);

        const left = el("div", { class: "pane left" });
        const right = el("div", { class: "pane right" });
        const body = el("div", { class: "explorer__body split" }, [left, right]);

        root.appendChild(toolbar);
        root.appendChild(body);
        win.contentEl.appendChild(root);

        let cwd = vfs.normalizePath(options?.path || "/Desktop");
        let selected = null;

        const nav = el("div", { class: "nav" }, [
            el("div", { class: "nav__title" }, "快速访问"),
            el("button", { class: "nav__item", type: "button", dataset: { path: "/Desktop" } }, [el("span", { class: "nav__glyph" }), el("span", {}, "桌面")]),
            el("button", { class: "nav__item", type: "button", dataset: { path: "/Documents" } }, [el("span", { class: "nav__glyph" }), el("span", {}, "文档")]),
            el("button", { class: "nav__item", type: "button", dataset: { path: "/Pictures" } }, [el("span", { class: "nav__glyph" }), el("span", {}, "图片")]),
            el("button", { class: "nav__item", type: "button", dataset: { path: "/Downloads" } }, [el("span", { class: "nav__glyph" }), el("span", {}, "下载")]),
            el("button", { class: "nav__item", type: "button", dataset: { path: "/Videos" } }, [el("span", { class: "nav__glyph" }), el("span", {}, "视频")])
        ]);
        left.appendChild(nav);

        nav.querySelectorAll(".nav__item").forEach((b) => {
            b.addEventListener("click", () => navigate(b.dataset.path));
        });

        const crumbs = el("div", { class: "crumbs" });
        const filelist = el("div", { class: "filelist" });
        right.appendChild(crumbs);
        right.appendChild(filelist);

        const setSelected = (p) => {
            selected = p;
            for (const card of filelist.querySelectorAll(".filecard")) {
                card.classList.toggle("is-selected", card.dataset.path === p);
            }
        };

        const buildCrumbs = () => {
            crumbs.innerHTML = "";
            const parts = vfs.split(cwd);
            const segs = [{ name: "根目录", path: "/" }];
            let cur = "/";
            for (const seg of parts) {
                cur = vfs.join(cur, seg);
                segs.push({ name: seg, path: cur });
            }
            segs.forEach((s, i) => {
                const b = el("button", { class: "crumbs__seg", type: "button" }, s.name);
                b.addEventListener("click", () => navigate(s.path));
                crumbs.appendChild(b);
                if (i !== segs.length - 1) crumbs.appendChild(el("span", { class: "crumbs__sep" }, "›"));
            });
        };

        const render = () => {
            win.setTitleExtra(cwd);
            pathInput.value = cwd;
            buildCrumbs();
            filelist.innerHTML = "";
            selected = null;
            let items = [];
            try {
                items = vfs.listDir(cwd).map((x) => ({ ...x, path: vfs.join(cwd, x.name) }));
            } catch (e) {
                this.toast.push({ title: "无法读取目录", message: String(e.message || e) });
                items = [];
            }
            for (const it of items) {
                const kind = it.type === "dir" ? "dir" : it.kind;
                const card = el("button", { class: "filecard", type: "button", dataset: { path: it.path } }, [
                    el("span", { class: "filecard__icon", dataset: { kind } }),
                    el("div", { class: "filecard__meta" }, [
                        el("div", { class: "filecard__name" }, it.name),
                        el("div", { class: "filecard__sub" }, it.type === "dir" ? "文件夹" : this.formatDateTimeShort(it.updatedAt))
                    ])
                ]);
                card.addEventListener("click", () => setSelected(it.path));
                card.addEventListener("dblclick", () => {
                    if (it.type === "dir") navigate(it.path);
                    else this.openPath(it.path);
                });
                filelist.appendChild(card);
            }
        };

        const navigate = (path) => {
            const p = vfs.normalizePath(path);
            const node = vfs.getNode(p);
            if (!node || node.type !== "dir") {
                this.toast.push({ title: "路径无效", message: p });
                return;
            }
            cwd = p;
            render();
        };

        pathInput.addEventListener("keydown", (e) => {
            if (e.key !== "Enter") return;
            navigate(pathInput.value || "/");
        });

        btnNewFolder.addEventListener("click", async () => {
            const name = await this.modal.prompt({
                title: "新建文件夹",
                message: `目标目录：${cwd}`,
                placeholder: "请输入文件夹名称",
                value: "新建文件夹"
            });
            if (!name) return;
            try {
                vfs.mkdir(vfs.join(cwd, name));
                this.toast.push({ title: "已创建", message: name });
                render();
            } catch (e) {
                this.toast.push({ title: "创建失败", message: String(e.message || e) });
            }
        });

        btnNewFile.addEventListener("click", async () => {
            const name = await this.modal.prompt({
                title: "新建文件",
                message: `目标目录：${cwd}`,
                placeholder: "例如：note.txt / hello.py",
                value: "untitled.txt"
            });
            if (!name) return;
            try {
                const target = vfs.join(cwd, name);
                vfs.writeText(target, "", "text/plain");
                render();
                this.openPath(target);
            } catch (e) {
                this.toast.push({ title: "创建失败", message: String(e.message || e) });
            }
        });

        btnAddImage.addEventListener("click", async () => {
            const name = await this.modal.prompt({
                title: "添加图片文件",
                message: `目标目录：${cwd}`,
                placeholder: "例如：photo.jpg",
                value: "photo.jpg"
            });
            if (!name) return;
            const url = await this.modal.prompt({
                title: "图片 URL",
                message: "请输入可访问的图片链接",
                placeholder: "https://...",
                value: "https://placehold.co/1200x800/jpg?text=WebOS+Photo"
            });
            if (!url) return;
            try {
                const target = vfs.join(cwd, name);
                vfs.writeMedia(target, "image", url);
                render();
                this.openPath(target);
            } catch (e) {
                this.toast.push({ title: "添加失败", message: String(e.message || e) });
            }
        });

        btnAddVideo.addEventListener("click", async () => {
            const name = await this.modal.prompt({
                title: "添加视频文件",
                message: `目标目录：${cwd}`,
                placeholder: "例如：video.mp4",
                value: "video.mp4"
            });
            if (!name) return;
            const url = await this.modal.prompt({
                title: "视频 URL",
                message: "请输入可访问的 MP4 链接",
                placeholder: "https://...",
                value: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            });
            if (!url) return;
            try {
                const target = vfs.join(cwd, name);
                vfs.writeMedia(target, "video", url);
                render();
                this.openPath(target);
            } catch (e) {
                this.toast.push({ title: "添加失败", message: String(e.message || e) });
            }
        });

        btnDelete.addEventListener("click", async () => {
            if (!selected) {
                this.toast.push({ title: "请选择", message: "先选择一个文件或文件夹" });
                return;
            }
            const ok = await this.modal.confirm({
                title: "删除",
                message: `确定删除？\\n${selected}`,
                okText: "删除",
                cancelText: "取消",
                danger: true
            });
            if (!ok) return;
            try {
                vfs.deletePath(selected);
                selected = null;
                render();
            } catch (e) {
                this.toast.push({ title: "删除失败", message: String(e.message || e) });
            }
        });

        btnRename.addEventListener("click", async () => {
            if (!selected) {
                this.toast.push({ title: "请选择", message: "先选择一个文件或文件夹" });
                return;
            }
            const oldName = vfs.basename(selected);
            const nextName = await this.modal.prompt({
                title: "重命名",
                message: selected,
                value: oldName,
                placeholder: "新的名称"
            });
            if (!nextName || nextName === oldName) return;
            try {
                const target = vfs.join(vfs.parent(selected), nextName);
                vfs.movePath(selected, target);
                selected = target;
                render();
                setSelected(target);
            } catch (e) {
                this.toast.push({ title: "重命名失败", message: String(e.message || e) });
            }
        });

        render();
    }

    mountNotepad(win, options) {
        const vfs = this.vfs;
        const root = el("div", { class: "editor" });
        const btnNew = el("button", { class: "ui-btn", type: "button" }, "新建");
        const btnOpen = el("button", { class: "ui-btn", type: "button" }, "打开");
        const btnSave = el("button", { class: "ui-btn primary", type: "button" }, "保存");
        const btnSaveAs = el("button", { class: "ui-btn", type: "button" }, "另存为");
        const spacer = el("div", { class: "editor__spacer" });
        const pathLabel = el("div", { class: "editor__path" }, "");
        const toolbar = el("div", { class: "editor__toolbar" }, [btnNew, btnOpen, btnSave, btnSaveAs, spacer, pathLabel]);
        const area = el("textarea", { class: "editor__textarea", spellcheck: "false" });
        root.appendChild(toolbar);
        root.appendChild(area);
        win.contentEl.appendChild(root);

        let currentPath = null;
        let dirty = false;

        const setDirty = (d) => {
            dirty = d;
            updateTitle();
        };

        const updateTitle = () => {
            const name = currentPath ? vfs.basename(currentPath) : "未命名";
            win.setTitleExtra(dirty ? `${name} *` : name);
            pathLabel.textContent = currentPath || "(未保存)";
        };

        const loadFile = (path) => {
            const node = vfs.readFile(path);
            if (node.kind !== "text") throw new Error("不支持的文件类型");
            currentPath = vfs.normalizePath(path);
            area.value = node.content ?? "";
            setDirty(false);
            updateTitle();
        };

        const newDoc = async () => {
            if (dirty) {
                const ok = await this.modal.confirm({
                    title: "放弃更改",
                    message: "当前内容未保存，是否放弃更改并新建？",
                    okText: "放弃",
                    cancelText: "取消",
                    danger: true
                });
                if (!ok) return;
            }
            currentPath = null;
            area.value = "";
            setDirty(false);
            updateTitle();
        };

        const openDoc = async () => {
            const picked = await this.showFilePicker({
                title: "打开文本文件",
                mode: "open",
                startDir: "/Documents",
                kindAllow: ["text"]
            });
            if (!picked) return;
            try {
                loadFile(picked);
            } catch (e) {
                this.toast.push({ title: "打开失败", message: String(e.message || e) });
            }
        };

        const saveAs = async () => {
            const baseDir = currentPath ? vfs.parent(currentPath) : "/Documents";
            const defaultName = currentPath ? vfs.basename(currentPath) : "untitled.txt";
            const picked = await this.showFilePicker({
                title: "另存为",
                mode: "save",
                startDir: baseDir,
                kindAllow: ["text"],
                defaultName
            });
            if (!picked) return;
            const ext = picked.toLowerCase().endsWith(".md") ? "text/markdown" : "text/plain";
            try {
                vfs.writeText(picked, area.value, ext);
                currentPath = picked;
                setDirty(false);
                this.toast.push({ title: "已保存", message: picked });
            } catch (e) {
                this.toast.push({ title: "保存失败", message: String(e.message || e) });
            }
        };

        const save = async () => {
            if (!currentPath) return await saveAs();
            try {
                const node = vfs.readFile(currentPath);
                const mime = node.mime || "text/plain";
                vfs.writeText(currentPath, area.value, mime);
                setDirty(false);
                this.toast.push({ title: "已保存", message: currentPath });
            } catch (e) {
                this.toast.push({ title: "保存失败", message: String(e.message || e) });
            }
        };

        area.addEventListener("input", () => setDirty(true));
        btnNew.addEventListener("click", newDoc);
        btnOpen.addEventListener("click", openDoc);
        btnSave.addEventListener("click", save);
        btnSaveAs.addEventListener("click", saveAs);

        if (options?.path) {
            try {
                loadFile(options.path);
            } catch (e) {
                this.toast.push({ title: "打开失败", message: String(e.message || e) });
                updateTitle();
            }
        } else {
            updateTitle();
        }
    }

    mountTerminal(win, options) {
        const vfs = this.vfs;
        const root = el("div", { class: "term" });
        const btnClear = el("button", { class: "ui-btn", type: "button" }, "清屏");
        const btnHelp = el("button", { class: "ui-btn", type: "button" }, "帮助");
        const btnExplorer = el("button", { class: "ui-btn", type: "button" }, "打开文件管理器");
        const toolbar = el("div", { class: "term__toolbar" }, [btnClear, btnHelp, btnExplorer, el("div", { class: "term__spacer" })]);
        const screen = el("div", { class: "term__screen", tabindex: "0" });
        const output = el("pre", { class: "term__output" });
        const promptEl = el("span", { class: "term__prompt" }, "");
        const input = el("input", { class: "term__input", type: "text", autocomplete: "off", spellcheck: "false" });
        const inputRow = el("div", { class: "term__inputrow" }, [promptEl, input]);
        screen.appendChild(output);
        screen.appendChild(inputRow);
        root.appendChild(toolbar);
        root.appendChild(screen);
        win.contentEl.appendChild(root);

        let cwd = vfs.normalizePath(options?.cwd || "/Desktop");
        let history = [];
        let hIndex = 0;
        let pythonMode = false;
        let pyNs = null;

        const writeRaw = (text) => {
            output.textContent += String(text ?? "");
            screen.scrollTop = screen.scrollHeight;
        };
        const writeLine = (text = "") => writeRaw(text + "\n");

        const updatePrompt = () => {
            promptEl.textContent = pythonMode ? ">>> " : `webos:${cwd}$ `;
            win.setTitleExtra(pythonMode ? "Python" : cwd);
        };

        const resolvePath = (p) => {
            const s = String(p || "").trim();
            if (!s) return cwd;
            if (s.startsWith("/")) return vfs.normalizePath(s);
            return vfs.normalizePath(vfs.join(cwd, s));
        };

        const parseArgs = (line) => {
            const out = [];
            let cur = "";
            let q = null;
            for (let i = 0; i < line.length; i++) {
                const ch = line[i];
                if (q) {
                    if (ch === q) q = null;
                    else cur += ch;
                    continue;
                }
                if (ch === "'" || ch === '"') {
                    q = ch;
                    continue;
                }
                if (/\s/.test(ch)) {
                    if (cur) {
                        out.push(cur);
                        cur = "";
                    }
                    continue;
                }
                cur += ch;
            }
            if (cur) out.push(cur);
            return out;
        };

        const printHelp = () => {
            writeLine("可用命令：");
            writeLine("  help                  显示帮助");
            writeLine("  clear                 清屏");
            writeLine("  pwd                   显示当前目录");
            writeLine("  ls [dir]              列出目录");
            writeLine("  cd <dir>              切换目录");
            writeLine("  cat <file>            输出文本文件内容");
            writeLine("  mkdir <dir>           新建文件夹");
            writeLine("  touch <file>          新建空文本文件");
            writeLine("  rm <path>             删除文件/文件夹");
            writeLine("  open <path>           用默认应用打开");
            writeLine("  python [file.py]      进入 Python 或执行脚本");
            writeLine("");
        };

        const execShell = async (line) => {
            const argv = parseArgs(line);
            const cmd = (argv.shift() || "").toLowerCase();
            if (!cmd) return;

            if (cmd === "help") return printHelp();
            if (cmd === "clear") {
                output.textContent = "";
                return;
            }
            if (cmd === "pwd") return writeLine(cwd);
            if (cmd === "ls") {
                const target = resolvePath(argv[0] || cwd);
                try {
                    const list = vfs.listDir(target);
                    const names = list.map((x) => (x.type === "dir" ? x.name + "/" : x.name));
                    writeLine(names.join("  "));
                } catch (e) {
                    writeLine(String(e.message || e));
                }
                return;
            }
            if (cmd === "cd") {
                const target = argv[0] ? resolvePath(argv[0]) : "/";
                const node = vfs.getNode(target);
                if (!node || node.type !== "dir") {
                    writeLine("目录不存在：" + target);
                    return;
                }
                cwd = target;
                updatePrompt();
                return;
            }
            if (cmd === "cat") {
                const target = argv[0] ? resolvePath(argv[0]) : null;
                if (!target) return writeLine("用法：cat <file>");
                try {
                    const node = vfs.readFile(target);
                    if (node.kind !== "text") {
                        writeLine(`[${node.kind}] ${node.url || ""}`);
                        return;
                    }
                    writeRaw((node.content ?? "") + "\n");
                } catch (e) {
                    writeLine(String(e.message || e));
                }
                return;
            }
            if (cmd === "mkdir") {
                if (!argv.length) return writeLine("用法：mkdir <dir>");
                for (const name of argv) {
                    try {
                        vfs.mkdir(resolvePath(name));
                    } catch (e) {
                        writeLine(String(e.message || e));
                    }
                }
                return;
            }
            if (cmd === "touch") {
                if (!argv.length) return writeLine("用法：touch <file>");
                for (const name of argv) {
                    try {
                        const p = resolvePath(name);
                        const existing = vfs.getNode(p);
                        if (!existing) vfs.writeText(p, "", "text/plain");
                    } catch (e) {
                        writeLine(String(e.message || e));
                    }
                }
                return;
            }
            if (cmd === "rm") {
                if (!argv.length) return writeLine("用法：rm <path>");
                for (const name of argv) {
                    try {
                        vfs.deletePath(resolvePath(name));
                    } catch (e) {
                        writeLine(String(e.message || e));
                    }
                }
                return;
            }
            if (cmd === "open") {
                const target = argv[0] ? resolvePath(argv[0]) : null;
                if (!target) return writeLine("用法：open <path>");
                this.openPath(target);
                return;
            }
            if (cmd === "python") {
                if (!argv.length) {
                    writeLine("正在加载 Python 运行时...");
                    try {
                        pyNs = await this.createPythonNamespace();
                        pythonMode = true;
                        writeLine("Python 已就绪。输入 exit() 退出。");
                        updatePrompt();
                    } catch (e) {
                        writeLine(String(e.message || e));
                    }
                    return;
                }
                const target = resolvePath(argv[0]);
                try {
                    const node = vfs.readFile(target);
                    if (node.kind !== "text") throw new Error("不支持的文件类型");
                    const ns = await this.createPythonNamespace();
                    const out = await this.runPythonCapture(node.content ?? "", ns);
                    if (out) writeRaw(out + (out.endsWith("\n") ? "" : "\n"));
                } catch (e) {
                    writeLine(String(e.message || e));
                }
                return;
            }

            writeLine(`未知命令：${cmd}（输入 help 查看）`);
        };

        const execPython = async (line) => {
            const t = String(line || "").trim();
            if (!t) return;
            if (["exit", "exit()", "quit", "quit()"].includes(t)) {
                pythonMode = false;
                pyNs = null;
                updatePrompt();
                return;
            }
            try {
                const out = await this.runPythonCapture(line + "\n", pyNs);
                if (out) writeRaw(out + (out.endsWith("\n") ? "" : "\n"));
            } catch (e) {
                writeLine(String(e.message || e));
            }
        };

        const submit = async () => {
            const line = input.value;
            input.value = "";
            writeLine((pythonMode ? ">>> " : `webos:${cwd}$ `) + line);
            if (pythonMode) await execPython(line);
            else await execShell(line);
            updatePrompt();
        };

        input.addEventListener("keydown", async (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                const line = input.value;
                if (line.trim()) {
                    history.push(line);
                    if (history.length > 200) history.shift();
                    hIndex = history.length;
                }
                await submit();
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                hIndex = clamp(hIndex - 1, 0, history.length);
                input.value = history[hIndex] ?? "";
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                hIndex = clamp(hIndex + 1, 0, history.length);
                input.value = history[hIndex] ?? "";
            }
        });

        btnClear.addEventListener("click", () => {
            output.textContent = "";
            input.focus();
        });
        btnHelp.addEventListener("click", () => {
            printHelp();
            input.focus();
        });
        btnExplorer.addEventListener("click", () => {
            this.openApp("explorer", { path: cwd });
            input.focus();
        });

        updatePrompt();
        printHelp();
        input.focus();
    }

    mountBrowser(win, options) {
        const root = el("div", { class: "browser" });
        const backBtn = el("button", { class: "ui-btn", type: "button" }, "←");
        const fwdBtn = el("button", { class: "ui-btn", type: "button" }, "→");
        const reloadBtn = el("button", { class: "ui-btn", type: "button" }, "刷新");
        const homeBtn = el("button", { class: "ui-btn", type: "button" }, "主页");
        const wikiBtn = el("button", { class: "ui-btn", type: "button" }, "Wikipedia");
        const newTabBtn = el("button", { class: "ui-btn", type: "button" }, "新标签页");
        const addr = el("input", { class: "ui-input", type: "text", value: options?.url || "https://example.com" });
        const goBtn = el("button", { class: "ui-btn primary", type: "button" }, "打开");
        const bar = el("div", { class: "browser__toolbar" }, [backBtn, fwdBtn, reloadBtn, homeBtn, wikiBtn, newTabBtn, addr, goBtn]);
        const frame = el("iframe", { class: "browser__frame", src: "about:blank", referrerpolicy: "no-referrer" });
        root.appendChild(bar);
        root.appendChild(frame);
        win.contentEl.appendChild(root);

        let hist = [];
        let idx = -1;
        const normalizeUrl = (u) => {
            const s = String(u || "").trim();
            if (!s) return "about:blank";
            if (s.startsWith("about:")) return s;
            if (/^https?:\/\//i.test(s)) return s;
            return "https://" + s;
        };

        const updateButtons = () => {
            backBtn.disabled = idx <= 0;
            fwdBtn.disabled = idx >= hist.length - 1;
            backBtn.style.opacity = backBtn.disabled ? ".5" : "1";
            fwdBtn.style.opacity = fwdBtn.disabled ? ".5" : "1";
        };

        const navigate = (url, push = true) => {
            const u = normalizeUrl(url);
            addr.value = u;
            frame.src = u;
            win.setTitleExtra(u);
            if (push) {
                hist = hist.slice(0, idx + 1);
                hist.push(u);
                idx = hist.length - 1;
            }
            updateButtons();
        };

        goBtn.addEventListener("click", () => navigate(addr.value, true));
        addr.addEventListener("keydown", (e) => {
            if (e.key === "Enter") navigate(addr.value, true);
        });
        homeBtn.addEventListener("click", () => navigate("https://example.com", true));
        wikiBtn.addEventListener("click", () => {
            const u = "https://www.wikipedia.org/";
            addr.value = u;
            window.open(u, "_blank", "noopener,noreferrer");
        });
        newTabBtn.addEventListener("click", () => {
            const u = normalizeUrl(addr.value);
            window.open(u, "_blank", "noopener,noreferrer");
        });
        reloadBtn.addEventListener("click", () => {
            frame.src = addr.value;
        });
        backBtn.addEventListener("click", () => {
            if (idx <= 0) return;
            idx -= 1;
            navigate(hist[idx], false);
        });
        fwdBtn.addEventListener("click", () => {
            if (idx >= hist.length - 1) return;
            idx += 1;
            navigate(hist[idx], false);
        });

        navigate(addr.value, true);
    }

    mountPhotos(win, options) {
        const vfs = this.vfs;
        const root = el("div", { class: "photos" });
        const btnOpen = el("button", { class: "ui-btn primary", type: "button" }, "打开图片");
        const btnRefresh = el("button", { class: "ui-btn", type: "button" }, "刷新");
        const bar = el("div", { class: "photos__toolbar" }, [btnOpen, btnRefresh, el("div", { class: "photos__spacer" })]);
        const grid = el("div", { class: "photos__grid" });
        const viewer = el("div", { class: "photos__viewer is-hidden" });
        root.appendChild(bar);
        root.appendChild(grid);
        root.appendChild(viewer);
        win.contentEl.appendChild(root);

        const showViewer = (path) => {
            const node = vfs.readFile(path);
            if (node.kind !== "image") throw new Error("不是图片文件");
            viewer.innerHTML = "";
            const back = el("button", { class: "ui-btn", type: "button" }, "返回");
            const name = el("div", { class: "photos__viewer-title" }, vfs.basename(path));
            const top = el("div", { class: "photos__viewer-top" }, [back, name, el("div", { style: { flex: "1" } })]);
            const img = el("img", { class: "photos__viewer-img", src: node.url, alt: vfs.basename(path) });
            viewer.appendChild(top);
            viewer.appendChild(img);
            viewer.classList.remove("is-hidden");
            win.setTitleExtra(path);
            back.addEventListener("click", () => {
                viewer.classList.add("is-hidden");
                win.setTitleExtra("图库");
            });
        };

        const render = () => {
            grid.innerHTML = "";
            let items = [];
            try {
                items = vfs.listDir("/Pictures").map((x) => ({ ...x, path: vfs.join("/Pictures", x.name) }));
            } catch (_) {
                items = [];
            }
            const images = items.filter((x) => x.type === "file" && x.kind === "image");
            for (const it of images) {
                const node = vfs.readFile(it.path);
                const card = el("button", { class: "photos__card", type: "button" }, [
                    el("img", { class: "photos__thumb", src: node.url, alt: it.name }),
                    el("div", { class: "photos__name" }, it.name)
                ]);
                card.addEventListener("click", () => {
                    try {
                        showViewer(it.path);
                    } catch (e) {
                        this.toast.push({ title: "无法打开", message: String(e.message || e) });
                    }
                });
                grid.appendChild(card);
            }
            win.setTitleExtra("图库");
        };

        btnRefresh.addEventListener("click", () => render());
        btnOpen.addEventListener("click", async () => {
            const picked = await this.showFilePicker({
                title: "选择图片",
                mode: "open",
                startDir: "/Pictures",
                kindAllow: ["image"]
            });
            if (!picked) return;
            try {
                showViewer(picked);
            } catch (e) {
                this.toast.push({ title: "无法打开", message: String(e.message || e) });
            }
        });

        render();
        if (options?.path) {
            try {
                showViewer(options.path);
            } catch (_) { }
        }
    }

    mountCalendar(win, options) {
        const root = el("div", { class: "cal" });
        const yearSel = el("select", { class: "ui-select cal__select" });
        for (let y = 1900; y <= 2099; y++) yearSel.appendChild(el("option", { value: String(y) }, String(y)));
        const monthSel = el("select", { class: "ui-select cal__select" });
        for (let m = 1; m <= 12; m++) monthSel.appendChild(el("option", { value: String(m) }, String(m) + "月"));
        const today = new Date();
        yearSel.value = String(today.getFullYear());
        monthSel.value = String(today.getMonth() + 1);
        const label = el("div", { class: "cal__label" }, "");
        const bar = el("div", { class: "cal__toolbar" }, [yearSel, monthSel, el("div", { style: { flex: "1" } }), label]);
        const grid = el("div", { class: "cal__grid" });
        root.appendChild(bar);
        root.appendChild(grid);
        win.contentEl.appendChild(root);

        const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
        let selected = null;

        const render = () => {
            const y = Number(yearSel.value);
            const m = Number(monthSel.value);
            const first = new Date(y, m - 1, 1);
            const firstDow = first.getDay();
            const days = new Date(y, m, 0).getDate();
            const prevDays = new Date(y, m - 1, 0).getDate();

            grid.innerHTML = "";
            for (const w of weekdays) grid.appendChild(el("div", { class: "cal__cell cal__head" }, w));

            const total = 42;
            for (let i = 0; i < total; i++) {
                const idx = i - firstDow + 1;
                let day = idx;
                let inMonth = true;
                let cellDate = null;
                if (idx <= 0) {
                    inMonth = false;
                    day = prevDays + idx;
                    cellDate = new Date(y, m - 2, day);
                } else if (idx > days) {
                    inMonth = false;
                    day = idx - days;
                    cellDate = new Date(y, m - 1, day);
                } else {
                    cellDate = new Date(y, m - 1, day);
                }
                const iso = `${cellDate.getFullYear()}-${String(cellDate.getMonth() + 1).padStart(2, "0")}-${String(cellDate.getDate()).padStart(2, "0")}`;
                const cell = el("button", { class: "cal__cell" + (inMonth ? "" : " is-out"), type: "button", dataset: { iso } }, String(day));
                cell.addEventListener("click", () => {
                    selected = iso;
                    for (const n of grid.querySelectorAll(".cal__cell")) n.classList.remove("is-selected");
                    cell.classList.add("is-selected");
                    label.textContent = `已选择：${selected}（周${weekdays[cellDate.getDay()]}）`;
                });
                if (selected === iso) cell.classList.add("is-selected");
                grid.appendChild(cell);
            }
            win.setTitleExtra(`${y}-${String(m).padStart(2, "0")}`);
        };

        yearSel.addEventListener("change", () => render());
        monthSel.addEventListener("change", () => render());
        render();
    }

    mountCalculator(win, options) {
        const root = el("div", { class: "calc" });
        const display = el("div", { class: "calc__display" }, "0");
        const keys = el("div", { class: "calc__keys" });
        const rows = [
            ["AC", "⌫", "÷", "×"],
            ["7", "8", "9", "-"],
            ["4", "5", "6", "+"],
            ["1", "2", "3", "="],
            ["0", ".", "=", ""]
        ];
        rows.forEach((r, ri) => {
            r.forEach((k, ci) => {
                if (!k) {
                    keys.appendChild(el("div", { class: "calc__spacer" }));
                    return;
                }
                const btn = el("button", { class: "calc__btn", type: "button", dataset: { key: k } }, k);
                if (k === "AC") btn.classList.add("is-danger");
                if (["÷", "×", "-", "+"].includes(k)) btn.classList.add("is-op");
                if (k === "=") btn.classList.add("is-eq");
                if (ri === 4 && ci === 0) btn.classList.add("is-zero");
                keys.appendChild(btn);
            });
        });
        root.appendChild(display);
        root.appendChild(keys);
        win.contentEl.appendChild(root);

        let displayValue = "0";
        let firstValue = null;
        let op = null;
        let waiting = false;

        const update = () => {
            display.textContent = displayValue;
            win.setTitleExtra(displayValue);
        };

        const inputDigit = (d) => {
            if (waiting) {
                displayValue = d;
                waiting = false;
                return;
            }
            displayValue = displayValue === "0" ? d : displayValue + d;
        };

        const inputDot = () => {
            if (waiting) {
                displayValue = "0.";
                waiting = false;
                return;
            }
            if (!displayValue.includes(".")) displayValue += ".";
        };

        const doCalc = (a, b, operator) => {
            const x = Number(a);
            const y = Number(b);
            if (operator === "+") return String(x + y);
            if (operator === "-") return String(x - y);
            if (operator === "×") return String(x * y);
            if (operator === "÷") return y === 0 ? "Error" : String(x / y);
            return String(y);
        };

        const handleOp = (nextOp) => {
            if (displayValue === "Error") {
                displayValue = "0";
                firstValue = null;
                op = null;
                waiting = false;
            }
            if (firstValue == null) {
                firstValue = displayValue;
            } else if (op && !waiting) {
                displayValue = doCalc(firstValue, displayValue, op);
                firstValue = displayValue;
            }
            op = nextOp;
            waiting = true;
        };

        keys.addEventListener("click", (e) => {
            const btn = e.target.closest(".calc__btn");
            if (!btn) return;
            const k = btn.dataset.key;
            if (!k) return;
            if (k === "AC") {
                displayValue = "0";
                firstValue = null;
                op = null;
                waiting = false;
                update();
                return;
            }
            if (k === "⌫") {
                if (!waiting) {
                    displayValue = displayValue.length > 1 ? displayValue.slice(0, -1) : "0";
                    update();
                }
                return;
            }
            if (k === ".") {
                inputDot();
                update();
                return;
            }
            if (["÷", "×", "-", "+"].includes(k)) {
                handleOp(k);
                update();
                return;
            }
            if (k === "=") {
                if (op && firstValue != null && !waiting) {
                    displayValue = doCalc(firstValue, displayValue, op);
                    firstValue = null;
                    op = null;
                    waiting = true;
                    update();
                }
                return;
            }
            if (/^\d$/.test(k)) {
                inputDigit(k);
                update();
            }
        });
        update();
    }

    mountCodeEditor(win, options) {
        const vfs = this.vfs;
        const root = el("div", { class: "code" });

        const btnOpen = el("button", { class: "ui-btn", type: "button" }, "打开");
        const btnSave = el("button", { class: "ui-btn primary", type: "button" }, "保存");
        const btnSaveAs = el("button", { class: "ui-btn", type: "button" }, "另存为");
        const btnRun = el("button", { class: "ui-btn", type: "button" }, "运行");
        const langSel = el("select", { class: "ui-select code__select" }, [
            el("option", { value: "python" }, "Python"),
            el("option", { value: "javascript" }, "JavaScript")
        ]);
        const spacer = el("div", { class: "editor__spacer" });
        const pathLabel = el("div", { class: "editor__path" }, "");

        const toolbar = el("div", { class: "editor__toolbar" }, [btnOpen, btnSave, btnSaveAs, btnRun, langSel, spacer, pathLabel]);
        const area = el("textarea", { class: "editor__textarea", spellcheck: "false" });
        const out = el("pre", { class: "code__output" });
        root.appendChild(toolbar);
        root.appendChild(area);
        root.appendChild(out);
        win.contentEl.appendChild(root);

        let currentPath = null;
        let dirty = false;
        let pyNs = null;

        const detectLangFromPath = (p) => {
            const lower = String(p || "").toLowerCase();
            if (lower.endsWith(".py")) return "python";
            if (lower.endsWith(".js")) return "javascript";
            return langSel.value;
        };

        const updateTitle = () => {
            const name = currentPath ? vfs.basename(currentPath) : "未命名";
            const tag = dirty ? `${name} *` : name;
            win.setTitleExtra(tag);
            pathLabel.textContent = currentPath || "(未保存)";
        };

        const loadFile = (path) => {
            const node = vfs.readFile(path);
            if (node.kind !== "text") throw new Error("不支持的文件类型");
            currentPath = vfs.normalizePath(path);
            area.value = node.content ?? "";
            dirty = false;
            langSel.value = detectLangFromPath(currentPath);
            updateTitle();
        };

        const saveTo = (path) => {
            const p = vfs.normalizePath(path);
            const lower = p.toLowerCase();
            const mime = lower.endsWith(".py") ? "text/x-python" : lower.endsWith(".js") ? "text/javascript" : "text/plain";
            vfs.writeText(p, area.value, mime);
            currentPath = p;
            dirty = false;
            updateTitle();
        };

        const openFile = async () => {
            const picked = await this.showFilePicker({
                title: "打开代码文件",
                mode: "open",
                startDir: "/Documents",
                kindAllow: ["text"]
            });
            if (!picked) return;
            try {
                loadFile(picked);
            } catch (e) {
                this.toast.push({ title: "打开失败", message: String(e.message || e) });
            }
        };

        const saveAs = async () => {
            const baseDir = currentPath ? vfs.parent(currentPath) : "/Documents";
            const defaultName = currentPath ? vfs.basename(currentPath) : langSel.value === "python" ? "main.py" : "main.js";
            const picked = await this.showFilePicker({
                title: "另存为",
                mode: "save",
                startDir: baseDir,
                kindAllow: ["text"],
                defaultName
            });
            if (!picked) return;
            try {
                saveTo(picked);
                this.toast.push({ title: "已保存", message: picked });
            } catch (e) {
                this.toast.push({ title: "保存失败", message: String(e.message || e) });
            }
        };

        const save = async () => {
            if (!currentPath) return await saveAs();
            try {
                saveTo(currentPath);
                this.toast.push({ title: "已保存", message: currentPath });
            } catch (e) {
                this.toast.push({ title: "保存失败", message: String(e.message || e) });
            }
        };

        const runJS = (code) => {
            const logs = [];
            const hook = (type) => (...args) => logs.push(`[${type}] ` + args.map((a) => (typeof a === "string" ? a : JSON.stringify(a))).join(" "));
            const oldLog = console.log;
            const oldErr = console.error;
            const oldWarn = console.warn;
            console.log = hook("log");
            console.error = hook("error");
            console.warn = hook("warn");
            try {
                new Function(String(code ?? ""))();
            } catch (e) {
                logs.push(String(e?.stack || e?.message || e));
            } finally {
                console.log = oldLog;
                console.error = oldErr;
                console.warn = oldWarn;
            }
            return logs.join("\n");
        };

        const run = async () => {
            out.textContent = "运行中...\n";
            const lang = langSel.value;
            if (lang === "javascript") {
                const text = runJS(area.value);
                out.textContent = text ? text + "\n" : "(无输出)\n";
                return;
            }
            try {
                if (!pyNs) {
                    out.textContent = "加载 Python 运行时...\n";
                    pyNs = await this.createPythonNamespace();
                    out.textContent = "运行中...\n";
                }
                const text = await this.runPythonCapture(area.value + "\n", pyNs);
                out.textContent = text ? text + (text.endsWith("\n") ? "" : "\n") : "(无输出)\n";
            } catch (e) {
                out.textContent =
                    "Python 运行失败：\n" +
                    String(e?.message || e) +
                    "\n\n" +
                    "排查建议：\n" +
                    "1) 确保网络可访问 Pyodide CDN（可能被拦截）\n" +
                    "2) 如需自定义镜像，可在控制台设置 window.__WEBOS_PYODIDE_BASE = 'https://.../pyodide/v0.26.4/full/' 后刷新\n";
            }
        };

        area.addEventListener("input", () => {
            dirty = true;
            updateTitle();
        });
        btnOpen.addEventListener("click", openFile);
        btnSave.addEventListener("click", save);
        btnSaveAs.addEventListener("click", saveAs);
        btnRun.addEventListener("click", run);
        langSel.addEventListener("change", () => updateTitle());

        if (options?.path) {
            try {
                loadFile(options.path);
            } catch (e) {
                this.toast.push({ title: "打开失败", message: String(e.message || e) });
                updateTitle();
            }
        } else {
            area.value = "print('Hello from Python!')\n";
            langSel.value = "python";
            updateTitle();
        }
    }

    mountPaint(win, options) {
        const root = el("div", { class: "paint" });
        const color = el("input", { class: "paint__color", type: "color", value: "#3b82f6" });
        const size = el("input", { class: "paint__size", type: "range", min: "1", max: "40", value: "6" });
        const sizeLabel = el("div", { class: "paint__sizeLabel" }, "6");
        const brushBtn = el("button", { class: "ui-btn primary", type: "button" }, "画笔");
        const eraserBtn = el("button", { class: "ui-btn", type: "button" }, "橡皮");
        const clearBtn = el("button", { class: "ui-btn danger", type: "button" }, "清空");
        const bar = el("div", { class: "paint__toolbar" }, [
            brushBtn,
            eraserBtn,
            clearBtn,
            el("div", { class: "paint__spacer" }),
            el("div", { class: "paint__control" }, ["颜色", color]),
            el("div", { class: "paint__control" }, ["粗细", size, sizeLabel])
        ]);
        const canvasWrap = el("div", { class: "paint__canvasWrap" });
        const canvas = el("canvas", { class: "paint__canvas", width: "1000", height: "600" });
        canvasWrap.appendChild(canvas);
        root.appendChild(bar);
        root.appendChild(canvasWrap);
        win.contentEl.appendChild(root);

        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = color.value;
        ctx.lineWidth = Number(size.value);

        let tool = "brush";
        let drawing = false;
        let last = null;

        const setTool = (t) => {
            tool = t;
            brushBtn.classList.toggle("primary", t === "brush");
        };

        const toCanvasPoint = (e) => {
            const r = canvas.getBoundingClientRect();
            return {
                x: (e.clientX - r.left) * (canvas.width / r.width),
                y: (e.clientY - r.top) * (canvas.height / r.height)
            };
        };

        const drawLine = (a, b) => {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        };

        canvas.addEventListener("pointerdown", (e) => {
            drawing = true;
            canvas.setPointerCapture(e.pointerId);
            last = toCanvasPoint(e);
            ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color.value;
            ctx.lineWidth = Number(size.value);
        });
        canvas.addEventListener("pointermove", (e) => {
            if (!drawing || !last) return;
            const cur = toCanvasPoint(e);
            drawLine(last, cur);
            last = cur;
        });
        canvas.addEventListener("pointerup", () => {
            drawing = false;
            last = null;
        });
        canvas.addEventListener("pointercancel", () => {
            drawing = false;
            last = null;
        });

        color.addEventListener("input", () => {
            if (tool === "brush") ctx.strokeStyle = color.value;
        });
        size.addEventListener("input", () => {
            sizeLabel.textContent = String(size.value);
        });
        brushBtn.addEventListener("click", () => {
            tool = "brush";
            brushBtn.classList.add("primary");
            eraserBtn.classList.remove("primary");
        });
        eraserBtn.addEventListener("click", () => {
            tool = "eraser";
            eraserBtn.classList.add("primary");
            brushBtn.classList.remove("primary");
        });
        clearBtn.addEventListener("click", () => {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        });

        win.setTitleExtra("画布");
    }

    mountGame(win, options) {
        const root = el("div", { class: "snake" });
        const scoreEl = el("div", { class: "snake__score" }, "分数：0");
        const highEl = el("div", { class: "snake__high" }, "最高分：0");
        const top = el("div", { class: "snake__top" }, [scoreEl, highEl]);
        const canvas = el("canvas", { class: "snake__canvas", width: "480", height: "480" });
        const startBtn = el("button", { class: "ui-btn primary", type: "button" }, "开始");
        const pauseBtn = el("button", { class: "ui-btn", type: "button" }, "暂停");
        const resetBtn = el("button", { class: "ui-btn danger", type: "button" }, "重置");
        const ctrl = el("div", { class: "snake__ctrl" }, [startBtn, pauseBtn, resetBtn]);
        const hint = el("div", { class: "snake__hint" }, "使用方向键控制移动");
        root.appendChild(top);
        root.appendChild(canvas);
        root.appendChild(ctrl);
        root.appendChild(hint);
        win.contentEl.appendChild(root);

        const ctx = canvas.getContext("2d");
        const gridSize = 20;
        const tiles = canvas.width / gridSize;

        let snake = [{ x: 10, y: 10 }];
        let food = { x: 15, y: 15 };
        let dx = 0;
        let dy = 0;
        let score = 0;
        let high = Number(localStorage.getItem(WebOSStorage.snakeHighScoreKey) || "0");
        let loop = null;
        let playing = false;
        let paused = false;

        highEl.textContent = `最高分：${high}`;

        const draw = () => {
            ctx.fillStyle = "#0b1220";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = "rgba(255,255,255,.06)";
            for (let i = 0; i <= tiles; i++) {
                ctx.beginPath();
                ctx.moveTo(i * gridSize, 0);
                ctx.lineTo(i * gridSize, canvas.height);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(0, i * gridSize);
                ctx.lineTo(canvas.width, i * gridSize);
                ctx.stroke();
            }

            snake.forEach((s, idx) => {
                ctx.fillStyle = idx === 0 ? "#22c55e" : "#4ade80";
                ctx.fillRect(s.x * gridSize + 1, s.y * gridSize + 1, gridSize - 2, gridSize - 2);
            });

            ctx.fillStyle = "#ef4444";
            ctx.beginPath();
            ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2 - 2, 0, Math.PI * 2);
            ctx.fill();
        };

        const genFood = () => {
            food = { x: Math.floor(Math.random() * tiles), y: Math.floor(Math.random() * tiles) };
            if (snake.some((s) => s.x === food.x && s.y === food.y)) genFood();
        };

        const gameOver = () => {
            playing = false;
            paused = false;
            pauseBtn.textContent = "暂停";
            if (loop) clearInterval(loop);
            loop = null;
            ctx.fillStyle = "rgba(0,0,0,.55)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#fff";
            ctx.font = "28px system-ui";
            ctx.textAlign = "center";
            ctx.fillText("游戏结束", canvas.width / 2, canvas.height / 2 - 10);
            ctx.font = "16px system-ui";
            ctx.fillText(`分数：${score}`, canvas.width / 2, canvas.height / 2 + 20);
        };

        const tick = () => {
            if (!playing || paused) return;
            const head = { x: snake[0].x + dx, y: snake[0].y + dy };
            if (head.x < 0 || head.x >= tiles || head.y < 0 || head.y >= tiles || snake.some((s) => s.x === head.x && s.y === head.y)) {
                gameOver();
                return;
            }
            snake.unshift(head);
            if (head.x === food.x && head.y === food.y) {
                score += 1;
                scoreEl.textContent = `分数：${score}`;
                if (score > high) {
                    high = score;
                    localStorage.setItem(WebOSStorage.snakeHighScoreKey, String(high));
                    highEl.textContent = `最高分：${high}`;
                }
                genFood();
            } else {
                snake.pop();
            }
            draw();
        };

        const start = () => {
            if (playing) return;
            snake = [{ x: 10, y: 10 }];
            dx = 1;
            dy = 0;
            score = 0;
            scoreEl.textContent = `分数：${score}`;
            playing = true;
            paused = false;
            pauseBtn.textContent = "暂停";
            genFood();
            draw();
            loop = setInterval(tick, 100);
        };

        const pause = () => {
            if (!playing) return;
            paused = !paused;
            pauseBtn.textContent = paused ? "继续" : "暂停";
        };

        const reset = () => {
            playing = false;
            paused = false;
            pauseBtn.textContent = "暂停";
            if (loop) clearInterval(loop);
            loop = null;
            snake = [{ x: 10, y: 10 }];
            dx = 0;
            dy = 0;
            score = 0;
            scoreEl.textContent = `分数：${score}`;
            genFood();
            draw();
        };

        const onKey = (e) => {
            if (!playing || paused) return;
            if (e.key === "ArrowUp" && dy === 0) {
                dx = 0;
                dy = -1;
            } else if (e.key === "ArrowDown" && dy === 0) {
                dx = 0;
                dy = 1;
            } else if (e.key === "ArrowLeft" && dx === 0) {
                dx = -1;
                dy = 0;
            } else if (e.key === "ArrowRight" && dx === 0) {
                dx = 1;
                dy = 0;
            }
        };

        startBtn.addEventListener("click", start);
        pauseBtn.addEventListener("click", pause);
        resetBtn.addEventListener("click", reset);
        document.addEventListener("keydown", onKey);
        win.onClose(() => document.removeEventListener("keydown", onKey));

        reset();
    }

    mountVideo(win, options) {
        const vfs = this.vfs;
        const root = el("div", { class: "video" });
        const btnOpen = el("button", { class: "ui-btn primary", type: "button" }, "打开视频");
        const btnRefresh = el("button", { class: "ui-btn", type: "button" }, "刷新");
        const bar = el("div", { class: "video__toolbar" }, [btnOpen, btnRefresh, el("div", { style: { flex: "1" } })]);
        const list = el("div", { class: "video__list" });
        const player = el("video", { class: "video__player", controls: true });
        const layout = el("div", { class: "video__body" }, [list, player]);
        root.appendChild(bar);
        root.appendChild(layout);
        win.contentEl.appendChild(root);

        const playFile = (path) => {
            const node = vfs.readFile(path);
            if (node.kind !== "video") throw new Error("不是视频文件");
            player.src = node.url;
            player.play?.().catch(() => { });
            win.setTitleExtra(path);
        };

        const render = () => {
            list.innerHTML = "";
            let items = [];
            try {
                items = vfs.listDir("/Videos").map((x) => ({ ...x, path: vfs.join("/Videos", x.name) }));
            } catch (_) {
                items = [];
            }
            const vids = items.filter((x) => x.type === "file" && x.kind === "video");
            for (const it of vids) {
                const row = el("button", { class: "video__item", type: "button" }, [el("span", { class: "video__dot" }), el("span", {}, it.name)]);
                row.addEventListener("click", () => {
                    try {
                        playFile(it.path);
                    } catch (e) {
                        this.toast.push({ title: "无法播放", message: String(e.message || e) });
                    }
                });
                list.appendChild(row);
            }
            if (!vids.length) {
                list.appendChild(el("div", { class: "app-pad", style: { color: "#64748b" } }, "Videos 文件夹为空。可在文件管理器中添加视频 URL。"));
            }
        };

        btnRefresh.addEventListener("click", () => render());
        btnOpen.addEventListener("click", async () => {
            const picked = await this.showFilePicker({
                title: "选择视频",
                mode: "open",
                startDir: "/Videos",
                kindAllow: ["video"]
            });
            if (!picked) return;
            try {
                playFile(picked);
            } catch (e) {
                this.toast.push({ title: "无法播放", message: String(e.message || e) });
            }
        });

        render();
        if (options?.path) {
            try {
                playFile(options.path);
            } catch (_) { }
        } else {
            const node = vfs.getNode("/Videos/flower.mp4");
            if (node && node.type === "file") {
                try {
                    playFile("/Videos/flower.mp4");
                } catch (_) { }
            }
        }
    }

    mountSettings(win, options) {
        const root = el("div", { class: "app-pad" });
        const title = el("div", { style: { fontWeight: "950", fontSize: "16px" } }, "设置");
        const sub = el("div", { style: { color: "#64748b", fontSize: "12px", marginTop: "6px", lineHeight: "1.4" } }, "切换桌面背景主题（会保存到本地，下次打开仍生效）");

        const themes = [
            { id: "ocean", name: "海洋蓝", desc: "清爽蓝色渐变" },
            { id: "sunset", name: "落日橙紫", desc: "高饱和暖色渐变" },
            { id: "graphite", name: "石墨灰", desc: "深色冷静渐变" }
        ];

        const current = document.body.dataset.theme || "ocean";
        const list = el("div", { style: { marginTop: "14px", display: "grid", gap: "10px" } });

        const render = () => {
            list.innerHTML = "";
            const active = document.body.dataset.theme || "ocean";
            for (const t of themes) {
                const card = el("button", { type: "button", class: "ui-btn", style: { textAlign: "left", padding: "12px 12px", borderRadius: "16px" }, dataset: { theme: t.id } }, [
                    el("div", { style: { display: "flex", alignItems: "center", gap: "10px" } }, [
                        el("div", { style: { width: "40px", height: "40px", borderRadius: "14px", border: "1px solid rgba(0,0,0,.10)", background: t.id === "ocean" ? "linear-gradient(135deg,#0b4aa2,#2a72ff,#6e9bff)" : t.id === "sunset" ? "linear-gradient(135deg,#6d28d9,#db2777,#fb923c)" : "linear-gradient(135deg,#0f172a,#334155,#64748b)" } }),
                        el("div", { style: { minWidth: "0" } }, [
                            el("div", { style: { fontWeight: "900" } }, t.name),
                            el("div", { style: { fontSize: "12px", color: "#64748b", marginTop: "2px" } }, t.desc)
                        ]),
                        el("div", { style: { flex: "1" } }),
                        el("div", { style: { fontWeight: "900", color: t.id === active ? "#1e3a8a" : "#94a3b8" } }, t.id === active ? "已启用" : "")
                    ])
                ]);
                card.addEventListener("click", () => {
                    this.applyTheme(t.id);
                    this.toast.push({ title: "主题已切换", message: t.name });
                    render();
                });
                list.appendChild(card);
            }
        };

        const resetBtn = el("button", { class: "ui-btn", type: "button", style: { marginTop: "12px" } }, "恢复默认（海洋蓝）");
        resetBtn.addEventListener("click", () => {
            this.applyTheme("ocean");
            this.toast.push({ title: "主题已切换", message: "海洋蓝" });
            render();
        });

        root.appendChild(title);
        root.appendChild(sub);
        root.appendChild(list);
        root.appendChild(resetBtn);
        win.contentEl.appendChild(root);
        win.setTitleExtra("主题");
        if (current) render();
        else render();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.__webos = new WebOS();
});
