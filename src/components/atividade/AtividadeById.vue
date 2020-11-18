<template>
  <div class="atividade-by-id">
    <PageTitle
      icon="fa fa-file-o"
      :main="atividade.nome_atividade"
      sub="Atividade"
    />
    <div class="atividade-content" v-html="atividade.content"></div>
  </div>
</template>

<script>
import 'highlightjs/styles/dracula.css'
import hljs from 'highlightjs/highlight.pack.js'

import { baseApiUrl } from "@/global";
import axios from "axios";
import PageTitle from "@/components/template/PageTitle";
export default {
  name: "AtividadesById",
  components: { PageTitle },
  data: function () {
    return {
      atividade: {},
    };
  },
  mounted() {
    const url = `${baseApiUrl}/atividades/${this.$route.params.id}`;
    axios.get(url).then((res) => (this.atividade = res.data));
  },
  updated(){
    document.querySelectorAll('.atividade-content pre').forEach( e => {
      hljs.highlightBlock(e)
    })
  }
};
</script>

<style>
.atividade-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 25px;
}

.atividade-content pre {
  padding: 20px;
  border-radius: 8px;
  font-size: 1.2rem;
}
.atividade-content img {
  max-width: 100%;
}
.atividade-content :last-child {
  margin-bottom: 0px;
}
</style>