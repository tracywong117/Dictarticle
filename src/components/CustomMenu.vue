<template>
    <div class="relative">
        <div @click="toggleMenu" ref="triggerButton" class="menu-trigger">
            <slot name="trigger">
                <!-- Default trigger if none is provided -->
                <!-- <button>Menu</button> -->
            </slot>
        </div>
        <transition name="menu-fade">
            <div v-if="isOpen" ref="menu" :class="['menu', positionClass]">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'CustomMenu',
    props: {
        position: {
            type: String,
            default: 'bottom',
            validator: (value) => ['top', 'right', 'bottom', 'left'].includes(value)
        }
    },
    data() {
        return {
            isOpen: false
        }
    },
    computed: {
        positionClass() {
            return `menu-${this.position}`
        }
    },
    methods: {
        //   toggleMenu() {
        //     this.isOpen = !this.isOpen
        //   },
        //   handleClickOutside(event) {
        //     if (this.$refs.menu && !this.$refs.menu.contains(event.target) && 
        //         !this.$refs.triggerButton.contains(event.target)) {
        //       this.isOpen = false
        //     }
        //   }
        toggleMenu() {
            this.isOpen = !this.isOpen
            if (this.isOpen) {
                this.$emit('menu-opened')
            } else {
                this.$emit('menu-closed')
            }
        },
        handleClickOutside(event) {
            if (this.$refs.menu && !this.$refs.menu.contains(event.target) &&
                !this.$refs.triggerButton.contains(event.target)) {
                this.isOpen = false
                this.$emit('menu-closed', 'outside')
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside)
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
    }
}
</script>

<style scoped>
.menu {
    position: absolute;
    margin-top: 1px;
    border-radius: 0.25rem;
    border: 1px solid #e2e8f0;
    background-color: white;
    font-size: 14px;
    color: #4a5568;
    width: 250px;
    font-family: sans-serif;
    line-height: 1.4;
}

.menu-top {
    bottom: 100%;
    left: 0;
    margin-bottom: 8px;
}

.menu-right {
    top: 0;
    left: 100%;
    margin-left: 8px;
}

.menu-bottom {
    top: 100%;
    left: 0;
    margin-top: 8px;
}

.menu-left {
    top: 0;
    right: 100%;
    margin-right: 8px;
}

.menu-fade-enter-active,
.menu-fade-leave-active {
    transition: opacity 0.2s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
    opacity: 0;
}

.menu-trigger {
    display: inline-block;
    cursor: pointer;
}
</style>