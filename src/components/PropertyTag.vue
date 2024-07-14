<template>
    <div class="flex my-2 items-center">
        <el-popover placement="bottom-start" :show-arrow="false" trigger="click" width="250">
            <template #reference>
                <div class="relative flex items-center">
                    <img src="../assets/icons/text.svg" class="absolute left-2 w-4 h-4" alt="input" />
                    <input type="text" value="Text" readonly
                        class="pl-8 custom-input h-6 w-2/7 border-none rounded-sm outline-none resize-none p-4 m-0 hover:bg-gray-100 leading-normal text-[16px] placeholder-[#b1b1b1] bg-transparent cursor-pointer" />
                </div>

            </template>
            <div>
                <div v-if="showBasicOption">
                    <div class="px-1">
                        <div class="hover:bg-slate-100 w-full p-2 my-1 flex items-center"
                            @click="showBasicOption = false">
                            <img src="../assets/icons/rename.svg" class="w-4 h-4 mr-2" alt="Rename" />
                            Rename
                        </div>
                        <div class="hover:bg-slate-100 w-full p-2 my-1 flex items-center"
                            @click="showBasicOption = false">
                            <img src="../assets/icons/setting-config.svg" class="w-4 h-4 mr-2" alt="Change Type" />
                            Edit Property
                        </div>
                        <div class="hover:bg-slate-100 w-full p-2 my-1 flex items-center">
                            <img src="../assets/icons/trash.svg" class="w-4 h-4 mr-2" alt="Change Type" />
                            Delete Property
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="px-1">
                        <div class="w-full p-2 my-1 flex items-center">
                            <div class="bg-slate-100 mr-2 p-1 rounded">
                                <img src="../assets/icons/pencil.svg" class="w-4 h-4" alt="Renaming" />
                            </div>
                            <div class="border rounded-sm">
                                <input type="text" value="Text" class="h-6 w-full 
                                  bg-gray-100 placeholder-[#b1b1b1] 
                                    rounded-sm resize-none outline-none
                                    py-3 px-2 m-0 leading-normal text-[16px]
                                    " 
                                    onblur="this.parentElement.style.borderColor='#ccc';"
                                    onfocus="this.parentElement.style.borderColor='rgb(216, 180, 254)';" />
                            </div>

                        </div>
                        <div class="hover:bg-slate-100 w-full p-2 my-1 flex items-center"
                            @click="showBasicOption = true">
                            <!-- <img src="../assets/icons/rename.svg" class="w-4 h-4 mr-2" alt="Rename" /> -->
                            <div class="flex justify-between items-center w-full">
                                <div>
                                    Type
                                </div>
                                <div class="flex items-center">
                                    <img src="../assets/icons/text.svg" class="w-4 h-4 mr-2" alt="text" />
                                    Text
                                    <img src="../assets/icons/chevron-right-arrow.svg" class="w-4 h-4 ml-2" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </el-popover>
        <input type="text" placeholder="Empty"
            class="custom-input h-6 w-2/7 border-none rounded-sm outline-none resize-none p-4 m-0 hover:bg-gray-100 focus:bg-transparent leading-normal text-[16px] placeholder-[#b1b1b1] bg-transparent" />
    </div>


</template>

<script>
import { ElPopover } from 'element-plus';

export default {
    name: 'PropertyTag',
    components: {
        ElPopover,
    },
    data() {
        return {
            showBasicOption: true,
        };
    },
}
</script>

<style>
.el-popover.el-popper {
    box-shadow: none;
    padding: 0;
}
</style>