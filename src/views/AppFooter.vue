<template>
  <footer class="footer">
    <ul class="footer__list">
      <li class="footer__list--item" v-for="item in info" :key="item.name">
        <a class="footer__list--item-link" target="_blank" :href="item.link"
          ><img class="footer__list--item-img" :src="item.imgLink" :alt="item.name"
        /></a>
      </li>
    </ul>
  </footer>
</template>
<script setup>
const info = [
  {
    link: 'https://github.com/hel1yeah',
    imgLink: 'https://raw.githubusercontent.com/hel1yeah/hel1yeah/9f0e9601d58e819ebb139b04b3d6f0b503ed5e4a/images/git.svg',
    name: 'github',
  },
  {
    link: 'https://hel1yeah.github.io/',
    imgLink: 'https://github.com/hel1yeah/hel1yeah/raw/main/images/hel1-logo.svg',
    name: 'hel1yeah',
  },
  {
    link: 'https://www.linkedin.com/in/yura-larsen',
    imgLink: 'https://github.com/hel1yeah/hel1yeah/raw/main/images/linkedin.svg',
    name: 'linkedin',
  },
];
</script>
<style lang="scss">
.footer {
  flex-shrink: 0;
  padding: 10px 0;
  background-color: rgb(153, 67, 252);
}
.footer__list {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.footer__list--item {
  transition: 0.5s;
  &:hover {
    transform: translateY(-10px);
  }
}
.footer__list--item-img {
  max-width: 40px;
}
</style>
