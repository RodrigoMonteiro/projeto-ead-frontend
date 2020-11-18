<template>
  <div class="aulas-admin">
    <b-form>
      <b-form-group label="Coloque a data da aula:">
        <b-form-input
          type="date"
          v-model="aula.data_aula"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="O assunto da aula:">
        <b-form-input
          type="text"
          placeholder="Assunto da aula..."
          v-model="aula.assunto"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Referências:">
        <b-form-input
          type="text"
          v-model="aula.referencias"
          placeholder="Refêrencias da aula.."
        ></b-form-input>
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
    <hr />
    <b-table striped hover :items="aulas" :fields="fields">
      <!-- ver https://bootstrap-vue.js.org/docs/components/table/  -->
      <template v-slot:cell(actions)="data">
        <b-button variant="warning" @click="loadAula(data.item)" class="mr-2">
          <i class="fa fa-pen"></i>
        </b-button>
        <b-button variant="danger" @click="loadAula(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
export default {
  name: "AulasAdmin",
  aula: {},
  data: function () {
    return {
      mode: "save",
      aula: {},
      aulas: [
        // {
        //   id: 1,
        //   data: "20/04/2020",
        //   assunto: "TICs no contexto de EaD",
        //   referencia: "google.com",
        // },
      ],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "data_aula", label: "Data", sortable: true },
        { key: "assunto", label: "Assunto", sortable: true },
        { key: "referencias", label: "Referências", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadAulas() {
      const url = `${baseApiUrl}/aulas`;
      axios.get(url).then((res) => {
        this.aulas = res.data;
      });
    },

    save() {
      const method = this.aula.id ? "put" : "post";
      const id = this.aula.id ? `/${this.aula.id}` : "";
      axios[method](`${baseApiUrl}/aulas${id}`, this.aula)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    reset() {
      this.mode = "save";
      this.aula = {};
      this.loadAulas();
    },
    loadAula(aula, mode = "save") {
      this.mode = mode;
      this.aula = { ...aula };
    },
    remove() {
      const id = this.aula.id;
      axios
        .delete(`${baseApiUrl}/aulas/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
  },
  mounted() {
    this.loadAulas();
  },
};
</script>

<style>
</style>