// script.js - 完整的交互逻辑

(function() {
  // 获取元素
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page');
  const userBadge = document.getElementById('userBadge');
  
  // 登录注册相关
  const loginTab = document.getElementById('loginTab');
  const registerTab = document.getElementById('registerTab');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginMessage = document.getElementById('loginMessage');
  const registerMessage = document.getElementById('registerMessage');
  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');
  const regName = document.getElementById('regName');
  const regEmail = document.getElementById('regEmail');
  const regPassword = document.getElementById('regPassword');

  // 模拟登录状态
  let currentUser = null;

  // 切换页面函数
  function switchPage(pageId) {
    pages.forEach(p => p.classList.remove('active-page'));
    document.getElementById(pageId + '-page').classList.add('active-page');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if(link.dataset.page === pageId) link.classList.add('active');
    });

    // 如果切换到auth页，重置tab状态
    if(pageId === 'auth') {
      loginTab.classList.add('active');
      registerTab.classList.remove('active');
      loginForm.classList.remove('hidden');
      registerForm.classList.add('hidden');
      loginMessage.innerText = '';
      registerMessage.innerText = '';
    }
  }

  // 导航点击
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      switchPage(page);
    });
  });

  // 登录/注册 tab 切换
  loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    loginMessage.innerText = '';
  });

  registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    registerMessage.innerText = '';
  });

  // 登录提交（模拟）
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginEmail.value.trim();
    const pwd = loginPassword.value.trim();

    if(!email || !pwd) {
      loginMessage.innerText = '❌ 请填写完整';
      loginMessage.style.color = '#b91c1c';
      return;
    }
    if(!email.includes('@')) {
      loginMessage.innerText = '❌ 邮箱格式错误';
      return;
    }
    // 模拟登录成功
    currentUser = { email, name: email.split('@')[0] };
    userBadge.innerText = `你好, ${currentUser.name}`;
    loginMessage.innerText = '✅ 登录成功！';
    loginMessage.style.color = '#059669';
    // 清空输入
    loginEmail.value = '';
    loginPassword.value = '';
    // 跳转到简介页
    setTimeout(() => switchPage('profile'), 600);
  });

  // 注册提交
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = regName.value.trim();
    const email = regEmail.value.trim();
    const pwd = regPassword.value;

    if(!name || !email || !pwd) {
      registerMessage.innerText = '❌ 请填写所有字段';
      registerMessage.style.color = '#b91c1c';
      return;
    }
    if(pwd.length < 6) {
      registerMessage.innerText = '❌ 密码至少6位';
      return;
    }
    if(!email.includes('@')) {
      registerMessage.innerText = '❌ 邮箱无效';
      return;
    }
    // 注册成功自动登录
    currentUser = { email, name };
    userBadge.innerText = `你好, ${name}`;
    registerMessage.innerText = '✅ 注册成功！';
    registerMessage.style.color = '#059669';
    // 清空输入
    regName.value = '';
    regEmail.value = '';
    regPassword.value = '';
    // 跳转到简介页
    setTimeout(() => switchPage('profile'), 600);
  });
})();