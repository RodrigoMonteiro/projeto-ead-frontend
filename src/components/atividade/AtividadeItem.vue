<template>
    <div class="atividade-item">
        <router-link :to="{ name: 'atividadeById', path: {id: atividade.id}}"  >
            <div class="atividade-item-image d-none d-sm-block">
                <img src="@/assets/atividades.png" alt="none" height="150" width="150">
                
            </div>
            <div class="atividade-item-info">
                <h2>{{ atividade.nome_atividade }}</h2>
                <p>{{ atividade.data_entrega}}</p>
                
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'AtividadeItem',
    props: ['atividade'],
}
    
</script>

<style>
   .atividade-item {
        border-radius: 8px;
        margin-bottom: 20px;
        background-color: #FFF;
        padding: 20px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }
   .atividade-item a {
        display: flex;
        align-items: flex-start;
        text-decoration: none;
        color: #000;
    }
   .atividade-item-info h2 {
        font-size: 1.7rem;
    }
   .atividade-item-image {
        padding-right: 20px;
        margin-right: 20px;
        border-right: 1px solid #AAA;
    }
   .atividade-item-image img {
        border-radius: 5px;
    }
   .atividade-item-info {
        display: flex;
        align-self: stretch;
        flex-direction: column;
    }
   .atividade-item-info p {
        flex: 1;
        color: #555;
        font-size: 1.1rem;
    }
</style>