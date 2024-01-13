<template>
  <div>
    <nav class="navbar" v-if="!$route.meta.hideNavbar">
    </nav>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.div{
  width: 1000px;
}
.navbar {
  
  background-color: #121826;
  height: 2rem;
  border-bottom: #838383 solid 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  color:white;
}
.link{
  color: #838383;
}
.router-link-active{
  color:#42B883
}
</style>