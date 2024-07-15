<template>
  <span @mouseover="showTooltip">
    <slot name="reference" class="inline-block relative"></slot>
  </span>

  <div v-if="visible" :style="tooltipStyles" class="custom-tooltip" ref="tooltip">
    <button class="close-button" @click="hideTooltip">×</button>
    <div id="tooltip-text">
      <slot></slot>
    </div>
    <div class="container-search-button">
      <button v-for="site in searchSites" :key="site.name" class="search-button" @click="openSearchTab(site.name)">
        <img :src="site.icon" :alt="`${site.name} icon`" />
      </button>
    </div>
    <div class="tooltip-arrow"></div>
  </div>
</template>

<script>
import EventBus from '../EventBus';

export default {
  data() {
    return {
      visible: false,
      searchSites: [
        { name: 'Google', icon: '/icons/google-icon.webp' },
        { name: 'Wikipedia', icon: '/icons/wikipedia-icon.png' },
        { name: 'YouTube', icon: '/icons/youtube-icon.png' },
      ],
      tooltipStyles: {
        position: 'absolute',
        left: '0px',
        top: '0px',
        display: 'none',
      },
    };
  },
  props: {
    vocab: {
      type: String,
      required: true,
    },
  },
  methods: {
    showTooltip(event) {
      EventBus.emit('hideAllTooltips'); // Emit event to hide all tooltips
      this.visible = true;
      this.tooltipStyles.display = 'block';
      this.tooltipStyles.top = '45px';

      this.$nextTick(() => {
        const rect = event.target.getBoundingClientRect();
        this.tooltipStyles.left = `${rect.left + window.pageXOffset}px`;
        this.tooltipStyles.top = `${rect.bottom + window.pageYOffset + 10}px`;

        const tooltip = this.$refs.tooltip;
        const arrowPosition = rect.width / 2;
        tooltip.style.setProperty('--arrow-left', `${arrowPosition}px`);
        this.tooltipStyles.display = 'block';
      });
    },
    hideTooltip() {
      this.visible = false;
    },
    openSearchTab(siteName) {
      let url = '';
      const searchText = this.vocab;
      switch (siteName) {
        case 'Google':
          url = `https://www.google.com/search?q=${encodeURIComponent(searchText)}`;
          break;
        case 'Wikipedia':
          url = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(searchText)}`;
          break;
        case 'YouTube':
          url = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchText)}`;
          break;
      }
      window.open(url, '_blank');
    },
  },
  created() {
    EventBus.on('hideAllTooltips', this.hideTooltip); // Listen for the event to hide tooltips
  },
  beforeUnmount() {
    EventBus.off('hideAllTooltips', this.hideTooltip); // Clean up event listener
  },
};
</script>

<style scoped>
.custom-tooltip {
  font-family: 'Poppins', sans-serif;
  position: absolute;
  padding: 8px 12px;
  background-color: aliceblue;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  z-index: 1000;
  width: 300px;
  max-width: 500px;
  word-wrap: break-word;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: #333;
}

.custom-tooltip .close-button {
  all: initial;
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
  padding: 0 5px;
  font-size: 16px;
}

.custom-tooltip .close-button:hover {
  color: #a2a2a2;
}

.custom-tooltip .container-search-button {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.custom-tooltip .search-button:hover {
  background: #e0e0e0;
}

.custom-tooltip .search-button {
  all: initial;
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: transparent;
  color: inherit;
  font-size: 16px;
  margin-right: 5px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 5px;
}

.search-button img {
  display: block;
  width: 20px;
  height: 20px;
}

.custom-tooltip::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: var(--arrow-left, 50%);
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent aliceblue transparent;
  display: block;
}

.custom-tooltip::before {
  content: "";
  position: absolute;
  bottom: 100%;
  left: var(--arrow-left, 50%);
  margin-left: -6px;
  border-width: 6px;
  border-style: solid;
  border-color: transparent transparent #d3d3d3 transparent;
  display: block;
}
</style>