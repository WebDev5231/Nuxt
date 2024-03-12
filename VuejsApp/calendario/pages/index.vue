<template>
  <div class="calendario-container">
    <table class="calendario-table">
      <thead>
        <tr>
          <th v-for="dia in diasDaSemana" :key="dia">{{ dia }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(semana, index) in semanas" :key="`semana_${index}`">
          <td v-for="(dia, diaIndex) in semana" :key="`dia_${index}_${diaIndex}`">
            {{ dia }}
            <ul>
              <li v-for="evento in eventos[dia]" :key="evento.titulo">{{ evento.titulo }}</li>
            </ul>
            <button @click="adicionarEvento(dia)">Adicionar Evento</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ycmftsggapnmtdevdtkf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljbWZ0c2dnYXBubXRkZXZkdGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAyNTI4NDgsImV4cCI6MjAyNTgyODg0OH0.X8mdkP7RXO_q4AHO89MZtn6hRdrbwnjVMoG0DGerrns';
const supabase = createClient(supabaseUrl, supabaseKey);
const tableName = 'eventos';

export default {
  data() {
    return {
      diasDaSemana: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      semanas: [],
      eventos: {},
    };
  },
  mounted() {
    this.criarCalendario();
  },
  methods: {
    criarCalendario() {
      for (let i = 0; i < 6; i++) {
        const semana = [];
        for (let j = 0; j < 7; j++) {
          const dia = i * 7 + j;
          semana.push(dia < this.diasDaSemana.length ? this.diasDaSemana[dia] : '');
          this.eventos[this.diasDaSemana[dia]] = [];
        }
        this.semanas.push(semana);
      }
    },
    adicionarEvento(dia) {
      const tituloEvento = prompt(`Digite o título do evento para ${dia}:`);
      if (tituloEvento) {
        const dataEvento = prompt(`Digite a data do evento para ${dia} (Formato: AAAA-MM-DD):`);
        if (dataEvento) {
          const evento = { titulo: tituloEvento, data: dataEvento };
          this.eventos[dia].push(evento);
          this.enviarEventoParaSuperbase(evento);
        }
      }
    },
    async enviarEventoParaSuperbase(evento) {
      try {
        await supabase
          .from(tableName)
          .upsert([evento]);
      } catch (error) {
        console.error('Erro ao enviar evento para o Superbase:', error.message);
      }
    },
  },
};
</script>

<style scoped>
.calendario-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendario-table {
  width: 80%;
  border-collapse: collapse;
  margin-top: 20px;
}

.calendario-table th,
.calendario-table td {
  border: 1px solid #ccc;
  padding: 12px;
  text-align: center;
  background-color: #f2f2f2;
}

.calendario-table th {
  background-color: #27b5e0;
  color: white;
}

.calendario-table button {
  margin-top: 5px;
  background-color: #1f1bf1;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
}

.calendario-table button:hover {
  background-color: #005684;
}
</style>
