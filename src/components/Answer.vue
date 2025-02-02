<template>
  <div v-if="Number(answer.probability) > 0.20" class="mb-10">
    <div class="alignLeft paragraph w-11/12 max-w-screen-md mx-auto mt-8 p-2 text-left border-blue-400 border-2 rounded border-solid relative">
      <p class="italic text-left rounded text-white px-2" style="width:fit-content" v-bind:class="bgColorTrust()" v-if="displayProbability">
        Indice de confiance : {{ Number(answer.probability * 100).toLocaleString('fr',{maximumSignificantDigits:2}) }} %
      </p>
      <p v-if="displayTitles && answer.meta.name" class="mt-2 truncate underline">
        {{answer.meta.name}}
      </p>
      <div ref="answ">
        <span>{{answer.context}}</span>...
      </div>
      <a v-if="answer.meta && answer.meta.link" class="text-blue-800 hover:text-blue-600 absolute border-blue-400 border-2 rounded-lg border-solid bg-white px-1 link" :href="answer.meta.link" target="_blank"> <i></i>lien vers la fiche</a>
    </div>
  </div>
  <div v-else class="mb-10">
    <p class="italic">Indice de confiance trop faible : {{ Number(answer.probability * 100).toLocaleString('fr',{maximumSignificantDigits:2}) }} %. Nous ne pouvons afficher la réponse.</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import SelectText from '@vinyll/selecttext'

export default Vue.extend({
  name: 'Answer',
  data: () => ({
    displayTitles: (process.env.VUE_APP_DISPLAY_TITLES == 'true'),
    displayProbability: (process.env.VUE_APP_DISPLAY_PROBABILITIES ?? 'true') === 'true'
  }),
  props: [
    'answer',
  ],
  methods: {
    printAnswer(): void{
      const paragraph: any = this.$refs.answ
      if (!paragraph) {
        return
      }
      const selector = new SelectText(paragraph)
      selector.addSelection(paragraph.textContent.indexOf(this.answer.answer),this.answer.answer.length)

      // here we have to clone this to remove the addeventlistner that selects text
      const elClone = selector.container.cloneNode(true);
      paragraph.parentNode.replaceChild(elClone, paragraph);
    },
    // here we have to define unsubscribe (otherwise, Typescirpt says this has no funciton such as unsubscribe)
    unsubscribe(): void{
      // console.log('here');
    },
    bgColorTrust(): string {
      let bgColor: string
      if (this.answer.probability < 0.5) {
        bgColor = 'bg-red-700'
      } else if (this.answer.probability < 0.6) {
        bgColor = 'bg-orange-700'
      } else if (this.answer.probability < 0.7) {
        bgColor = 'bg-yellow-600'
      } else if (this.answer.probability < 0.8) {
        bgColor = 'bg-teal-700'
      } else if (this.answer.probability < 0.9) {
        bgColor = 'bg-green-600'
      } else {
        bgColor = 'bg-green-800'
      }
      return bgColor
    },
  },
  beforeDestroy(): void {
    this.unsubscribe();
  },
  mounted: function() {
    this.$nextTick(function () {
      // execute this only after the HTML get fully rendered
      this.printAnswer()
    })
  },
});
</script>



<style>
.paragraph span {
  cursor: pointer;
  user-select: none;
}
.paragraph span.first {
  color: #ffffff;
  background-color: #4169e1;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.paragraph span.last {
  color: #ffffff;
  background-color: #4169e1;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.paragraph span.selected {
  color: #ffffff;
  background-color: #4169e1;
}
.link {
  bottom: -15px;
  right: 10px;
}
</style>
