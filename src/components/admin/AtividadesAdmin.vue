<template>
  <div class="atividade-admin">
    <b-form>
      <b-form-group label="Coloque o nome da atividade:">
        <b-form-input
          type="text"
          v-model="atividade.nome_atividade"
          required
          placeholder="Digite o nome da atividade..."
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Data de entrega:">
        <b-form-input type="date" v-model="atividade.data_entrega" required>
        </b-form-input>
      </b-form-group>

      <b-form-group label="Aula:">
        <b-form-select
          type="select"
          v-model="atividade.aula_id"
          :options="aulas"
          required
        >
        </b-form-select>
      </b-form-group>

      <b-form-group label="Conteúdo da atividade:" v-if="mode === 'save'">
        <VueEditor
          v-model="atividade.content"
          placeholder="Informe o conteúdo da atividade.."
        />
      </b-form-group>
      <b-row>
        <b-col xs="12">
          <b-button variant="primary" v-if="this.mode === 'save'" @click="save"
            >Salvar</b-button
          >
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove"
            >Excluir</b-button
          >
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-form>

    <hr/>

 <b-table striped hover :items="atividades" :fields="fields">
      <!-- ver https://bootstrap-vue.js.org/docs/components/table/  -->
      <template v-slot:cell(actions)="data">
        <b-button variant="warning" @click="loadAtividade(data.item)">
          <i class="fa fa-pen"></i>
        </b-button>
        <b-button variant="danger" @click="loadAtividade(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <b-pagination
      size="md"
      v-model="page"
      :total-rows="count"
      :per-page="limit"
    >
    </b-pagination>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import { VueEditor } from "vue2-editor";
import axios from "axios";
export default {
  name: "AtividadesAdmin",
  components: { VueEditor },
  data: function () {
    return {
      mode: "save",
      atividade: {},
      atividades: [],
      aulas: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "data_entrega", label: "data de entrega", sortable: true },
        { key: "nome_atividade", label: "nome da atividade", sortable: true },
      ],
    };
  },
  methods: {
    loadAtividades() {
      const url = `${baseApiUrl}/atividades`;
      axios.get(url).then((res) => {
        // this.atividades = res.data
        this.atividades = res.data.data;
        this.count = res.data.count;
        this.limit = res.data.limit;
      });
    },
    reset() {
      this.mode = "save";
      this.atividade = {};
      this.loadAtividades();
    },
    save() {
      const method = this.atividade.id ? "put" : "post";
      const id = this.atividade.id ? `/${this.atividade.id}` : "";
      axios[method](`${baseApiUrl}/atividades${id}`, this.atividade)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.atividade.id;
      axios
        .delete(`${baseApiUrl}/atividades/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadAtividade(atividade, mode = "save") {
      this.mode = mode;
      // this.atividade = { ...atividade }
      axios
        .get(`${baseApiUrl}/atividades/${atividade.id}`)
        .then((res) => (this.atividade = res.data));
    },
    loadAulas() {
      const url = `${baseApiUrl}/aulas`;
      axios.get(url).then((res) => {
        this.aulas = res.data.map((aula) => {
          return { value: aula.id, text: aula.assunto };
        });
      });
    },
  },
  mounted() {
    this.loadAulas();
    this.loadAtividades();
  },
};
</script>

<style>
</style>