// 主脚本文件，用于初始化和加载各个模块
document.addEventListener('DOMContentLoaded', function() {
  // 加载导航模块
  loadModule('nav');
  
  // 加载Hero模块
  loadModule('hero');
  
  // 加载服务模块
  loadModule('services');
  
  // 加载方法模块
  loadModule('approach');
  
  // 加载定价模块
  loadModule('pricing');
  
  // 加载作品集模块
  loadModule('portfolio');
  
  // 加载联系模块
  loadModule('contact');
  
  // 初始化动画效果
  initAnimations();
});

// 加载模块函数
function loadModule(moduleName) {
  fetch(`./components/${moduleName}.js`)
    .then(response => response.text())
    .then(html => {
      const container = document.getElementById(`${moduleName}-container`);
      if (container) {
        container.innerHTML = html;
      }
    })
    .catch(error => console.error(`Error loading ${moduleName} module:`, error));
}

// 初始化动画效果
function initAnimations() {
  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // 滚动动画
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // 观察所有需要动画的元素
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
  
  // 导航栏滚动效果
  window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
      nav.classList.add('bg-opacity-90', 'backdrop-blur-sm');
    } else {
      nav.classList.remove('bg-opacity-90', 'backdrop-blur-sm');
    }
  });
  
  // 线条生长效果
  document.querySelectorAll('.hover-line').forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.querySelector('.line').classList.add('w-full');
      this.querySelector('.line').classList.remove('w-0');
    });
    
    element.addEventListener('mouseleave', function() {
      this.querySelector('.line').classList.remove('w-full');
      this.querySelector('.line').classList.add('w-0');
    });
  });
}