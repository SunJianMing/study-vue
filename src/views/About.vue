<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p @click='$store.commit("add")'>{{$store.state.count}}</p>
  </div>
</template>
<script>
export default {
  asyncData({store}){
    return store.dispatch('asyncAdd')
  }
}
</script>