<template>
  <footer class="footer">
    <ul class="footer__list">
      <li v-for="item in LINKS" :key="item.name" class="footer__list-item">
        <a class="footer__list-link" :href="item.link" target="_blank" rel="noopener noreferrer">
          <img class="footer__list-img" :src="item.imgLink" :alt="item.name" />
        </a>
      </li>
    </ul>
  </footer>
</template>

<script setup>
const LINKS = [
  {
    name: 'github',
    link: 'https://github.com/hel1yeah',
    imgLink:
      'https://raw.githubusercontent.com/hel1yeah/hel1yeah/9f0e9601d58e819ebb139b04b3d6f0b503ed5e4a/images/git.svg',
  },
  {
    name: 'hel1yeah',
    link: 'https://hel1yeah.github.io/',
    imgLink: 'https://github.com/hel1yeah/hel1yeah/raw/main/images/hel1-logo.svg',
  },
  {
    name: 'linkedin',
    link: 'https://www.linkedin.com/in/yura-larsen',
    imgLink: 'https://github.com/hel1yeah/hel1yeah/raw/main/images/linkedin.svg',
  },
];
</script>

<style lang="scss" scoped>
.footer {
  flex-shrink: 0;
  padding: 12px 0;
  background: linear-gradient(
    90deg,
    rgba(56, 189, 248, 0.12),
    rgba(168, 85, 247, 0.18),
    rgba(236, 72, 153, 0.12)
  );
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.footer__list {
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer__list-item {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.35s ease, background 0.3s ease, border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(56, 189, 248, 0.45);
    box-shadow: 0 10px 24px rgba(56, 189, 248, 0.25);
  }
}

.footer__list-link {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
}

.footer__list-img {
  max-width: 30px;
  max-height: 30px;
  filter: brightness(0) invert(1);
  opacity: 0.85;
  transition: opacity 0.2s;

  .footer__list-item:hover & {
    opacity: 1;
  }
}
</style>
