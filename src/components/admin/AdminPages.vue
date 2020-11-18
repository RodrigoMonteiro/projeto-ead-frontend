<template>
  <div class="admin-pages">
    <PageTitle icon="fa fa-cogs" main="Administração do sistema" sub="Cadastros"/>
    <div class="admin-pages-tabs">
      <b-card no-body>
        <b-tabs card> 
          
          <b-tab title="Aulas" active>
          <AulasAdmin/>
          </b-tab>

          <b-tab title="Atividades">
           <AtividadesAdmin/>
          </b-tab>

             <b-tab title="Usuários">
           <UserAdmin/>
            </b-tab>

        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import  UserAdmin from './UserAdmin'
import  AulasAdmin from './AulasAdmin'
import  AtividadesAdmin from './AtividadesAdmin'

export default {
  name: "AdminPages",
  components: { PageTitle, UserAdmin, AulasAdmin , AtividadesAdmin},
};
</script>

<style>
</style>