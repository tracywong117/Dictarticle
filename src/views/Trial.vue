<template>
    <div class="menu-container">
        <custom-menu button-text="Left Menu" position="left">
            <template #trigger>
                <button class="bg-amber-100 hover:bg-amber-200">
                    <span>Open Menu</span>
                </button>
            </template>
            <div class="px-1">
                <div class="dropdown-option">
                    <img src="/icons/rename.svg" class="w-4 h-4 mr-2" alt="Rename" />
                    Rename
                </div>
                <div class="dropdown-option">
                    <img src="/icons/setting-config.svg" class="w-4 h-4 mr-2" alt="Change Type" />
                    Edit Property
                </div>
                <div class="dropdown-option">
                    <img src="/icons/trash.svg" class="w-4 h-4 mr-2" alt="Change Type" />
                    Delete Property
                </div>
            </div>
        </custom-menu>
    </div>
    <div class="menu-container">
        <custom-menu button-text="Top Menu" position="top">

            <div class="px-1">
                <div class="dropdown-option">
                    <img src="/icons/rename.svg" class="w-4 h-4 mr-2" alt="Rename" />
                    Rename
                </div>
                <div class="dropdown-option">
                    <img src="/icons/setting-config.svg" class="w-4 h-4 mr-2" alt="Change Type" />
                    Edit Property
                </div>
                <div class="dropdown-option">
                    <img src="/icons/trash.svg" class="w-4 h-4 mr-2" alt="Change Type" />
                    Delete Property
                </div>
            </div>

        </custom-menu>
    </div>

    <div class="menu-container">
        <custom-menu button-text="Right Menu" position="right">
            <div class="px-1">
                <div class="dropdown-option">
                    <img src="/icons/rename.svg" class="w-4 h-4 mr-2" alt="Rename" />
                    Rename
                </div>
                <div class="dropdown-option">
                    <img src="/icons/setting-config.svg" class="w-4 h-4 mr-2" alt="Change Type" />
                    Edit Property
                </div>
                <div class="dropdown-option">
                    <img src="/icons/trash.svg" class="w-4 h-4 mr-2" alt="Change Type" />
                    Delete Property
                </div>
            </div>
        </custom-menu>
    </div>

    <div class="menu-container">
        <custom-menu button-text="Bottom Menu" position="bottom">
            <div class="px-1">
                <div class="dropdown-option">
                    <img src="/icons/rename.svg" class="w-4 h-4 mr-2" alt="Rename" />
                    Rename
                </div>
                <div class="dropdown-option">
                    <img src="/icons/setting-config.svg" class="w-4 h-4 mr-2" alt="Change Type" />
                    Edit Property
                </div>
                <div class="dropdown-option">
                    <img src="/icons/trash.svg" class="w-4 h-4 mr-2" alt="Change Type" />
                    Delete Property
                </div>
            </div>
        </custom-menu>
    </div>

</template>

<script>
import CustomMenu from '../components/CustomMenu.vue'

export default {
    name: 'App',
    components: {
        CustomMenu
    }
}
</script>

<style>
.menu-container {
    margin-bottom: 100px;
    display: flex;
    justify-content: center;
}

.dropdown-option {
    @apply hover:bg-slate-100 w-full p-2 my-1 flex items-center;
}
</style>