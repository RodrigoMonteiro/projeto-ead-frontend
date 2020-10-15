<template>
  <div class="footer">
      <span> <strong>Trabalho desenvolvido para a disciplina de EaD</strong></span>
  </div>
</template>

<script>
export default {
name: 'Footer'
}
</script>

<style>
.footer{
    grid-area: footer;
    background-color: #DDD;
    color:  #333;

    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px ;
}
</style>