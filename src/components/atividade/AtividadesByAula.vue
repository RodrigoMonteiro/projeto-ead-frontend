<template>
  <div class="atividades-by-aula">
    <PageTitle icon="fa fa-folder-o" :main="aula.assunto" sub="Aula" />
    <ul>
      <li v-for="atividade in atividades" :key="atividade.id">
       <AtividadeItem :atividade="atividade"/>
      </li>
    </ul>
    <div class="load-more">
      <button v-if="loadMore" class="btn btn-outline-primary"
      @click="getAtividades">Carregar mais aulas</button>
    </div>
  </div>
</template>

<script>
import { baseApiUrl } from '@/global';
import axios from 'axios';
import PageTitle from '../template/PageTitle';
import AtividadeItem from './AtividadeItem'
export default {
  name: 'AtividadesByAula',
  components: { PageTitle , AtividadeItem},
  data: function () {
    return {
      aula: {},
      atividades: [],
      page: 1,
      loadMore: true,
    };
  },
  methods: {
    getAula() {
      const url = `${baseApiUrl}/aulas/${this.aula.id}`;
      axios(url).then((res) => (this.aula = res.data));
    },
    getAtividades(){
      const url = `${baseApiUrl}/aulas/${this.aula.id}/atividades?page=${this.page}`
      axios(url).then(res => {
        this.atividades = this.atividades.concat(res.data)
        this.page++

        if (res.data.length ===0 ){
          this.loadMore = false
        }
      })
    }
  },
  watch:{
$route(to){
  this.aula.id = to.params.id
  this.atividades = []
  this.page = 1
  this.loadMore = true
  this.getAula()
  this.getAtividades()
}
  },
  mounted(){
      this.aula.id = this.$route.params.id
      this.getAula()
      this.getAtividades()
  }
};
</script>

<style>
.atividades-by-aula ul{
  list-style-type: none;
  padding: 0;
}

.atividades-by-aula .load-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top:25px;

}
</style>