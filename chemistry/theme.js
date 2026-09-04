(() => {
  const toc = document.querySelector('.toc');
  const main = document.querySelector('main');
  if (!toc || !main) return;

  const chapters = [
    ['01', '化学导论', 'Introduction to Chemistry', 'Chapter01.html', '用观察开始，而不是用答案开始。'],
    ['02', '数据分析', 'Data Analysis', 'Chapter02.html', '让数据把现象说清楚。'],
    ['03', '物质：性质与变化', 'Matter', 'Chapter03.html', '辨认变化，才看得见化学正在发生。'],
    ['04', '原子结构', 'Atomic Structure', 'Chapter04.html', '从微观结构，理解看得见的世界。'],
    ['05', '原子中的电子', 'Electrons', 'Chapter05.html', '追踪电子，读懂元素的个性。'],
    ['06', '元素周期表与周期律', 'Periodic Law', 'Chapter06.html', '在周期表里发现重复出现的规律。'],
    ['07', '元素', 'Elements', 'Chapter07.html', '把元素放回它们真实的故事里。'],
    ['08', '离子化合物', 'Ionic Compounds', 'Chapter08.html', '看电荷如何把原子连接成新物质。'],
    ['09', '共价键', 'Covalent Bonding', 'Chapter09.html', '理解原子为什么愿意分享电子。'],
    ['10', '化学反应', 'Chemical Reactions', 'Chapter10.html', '每一次反应，都是物质重新组织的证据。'],
    ['11', '摩尔', 'The Mole', 'Chapter11.html', '用一摩尔，把看不见的粒子变成可计算的数量。'],
    ['12', '化学计量', 'Stoichiometry', 'Chapter12.html', '让方程式成为解决真实问题的比例尺。'],
    ['13', '物质的三态', 'States of Matter', 'Chapter13.html', '从粒子的运动，解释固体、液体与气体。']
  ];
  const chapterNumber = document.title.match(/第\s*(\d+)\s*章/)?.[1] || '01';
  const index = Math.max(0, chapters.findIndex(item => item[0] === String(chapterNumber).padStart(2, '0')));
  const current = chapters[index];
  const subtitle = toc.querySelector('.sub');

  if (subtitle) {
    const home = document.createElement('a');
    home.className = 'home-link';
    home.href = '../index.html';
    home.innerHTML = '<span>⌂</span> 返回学习航图';

    const progress = document.createElement('div');
    progress.className = 'chapter-progress';
    progress.innerHTML = '<i></i> CHAPTER ' + current[0] + ' / 13';

    const switcher = document.createElement('div');
    switcher.className = 'chapter-switcher';
    switcher.innerHTML = `
      <div class="switcher-label">直接跳转章节</div>
      <select aria-label="选择章节">
        ${chapters.map((item, chapterIndex) => `<option value="${item[3]}" ${chapterIndex === index ? 'selected' : ''}>CH ${item[0]} · ${item[1]}</option>`).join('')}
      </select>
      <div class="switcher-arrows">
        <a href="${index > 0 ? chapters[index - 1][3] : '#'}" ${index === 0 ? 'aria-disabled="true"' : ''}>← 上一章</a>
        <a href="${index < chapters.length - 1 ? chapters[index + 1][3] : '#'}" ${index === chapters.length - 1 ? 'aria-disabled="true"' : ''}>下一章 →</a>
      </div>
    `;
    switcher.querySelector('select').addEventListener('change', event => {
      if (event.target.value) location.href = event.target.value;
    });

    const periodic = document.createElement('a');
    periodic.className = 'periodic-link';
    periodic.href = 'https://artsexperiments.withgoogle.com/periodic-table/';
    periodic.target = '_blank';
    periodic.rel = 'noopener noreferrer';
    periodic.innerHTML = '<span>▦</span> 元素周期表 <small>↗</small>';

    subtitle.after(home);
    home.after(progress);
    progress.after(switcher);
    switcher.after(periodic);
  }

  const title = main.querySelector('h1.title');
  if (title) {
    const signal = document.createElement('div');
    signal.className = 'chapter-signal';
    const dots = chapters.map((item, chapterIndex) => {
      const state = chapterIndex < index ? ' is-past' : chapterIndex === index ? ' is-current' : '';
      return `<i class="signal-dot${state}" aria-label="第 ${item[0]} 章：${item[1]}"></i>`;
    }).join('');
    signal.innerHTML = `
      <div class="signal-copy">
        <span>STATION ${current[0]} / 13 · ${current[2].toUpperCase()}</span>
        <b>${current[4]}</b>
        <small>当前章节 · ${current[1]} · 每一章都是化学航线上的一个实验站</small>
      </div>
      <div class="signal-map" aria-label="13 个化学章节的学习进度">${dots}</div>
    `;
    title.after(signal);
  }

  const top = document.createElement('a');
  top.className = 'back-to-top';
  top.href = '#';
  top.setAttribute('aria-label', '回到顶部');
  top.textContent = '↑';
  document.body.append(top);
  addEventListener('scroll', () => top.classList.toggle('visible', scrollY > 520), { passive: true });

  const targets = [...document.querySelectorAll('main section[id]')];
  const links = [...toc.querySelectorAll('a[href^="#"]')];
  const activateCurrentSection = () => {
    let currentId = targets[0]?.id;
    for (const section of targets) {
      if (section.getBoundingClientRect().top < innerHeight * .35) currentId = section.id;
    }
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`));
  };
  addEventListener('scroll', activateCurrentSection, { passive: true });
  activateCurrentSection();
})();
