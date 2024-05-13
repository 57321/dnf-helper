<template>
    <div>
        <n-space>
            <n-input-number placeholder="请输入" :min="1" :step="100" v-model:value="formParams.basicAttack">
                <template #prefix> 主C的进图三攻: </template>
            </n-input-number>
            <n-input-number placeholder="请输入" :min="1" :step="100" v-model:value="formParams.basicAttribute">
                <template #prefix> 主C的进图力智: </template>
            </n-input-number>
            <n-button type="primary" @click="() => addModalRef.openModal()">新建角色</n-button>
        </n-space>
        <n-data-table flex-height style="height: calc(100vh - 110px); margin-top: 24px" size="small" :bordered="false"
            :single-line="false" :columns="columns" :data="data" :pagination="false" :row-key="(row) => row.id"
            :expanded-row-keys="expandKeys" :on-update:expanded-row-keys="(keys) => expandKeys = keys" />
        <RoleModal ref="addModalRef" @on-success="refreshRoleList" />
        <AttributeModal ref="attributeModalRef" @on-success="refreshRoleList" />
        <CalcModal ref="calcModalRef" />
    </div>
</template>
<script setup>
import { ref, h, onMounted } from "vue";
import { NButton, NSpace, NDropdown, useDialog, messageDark } from "naive-ui";
import RoleModal from "./RoleModal.vue";
import AttributeModal from "./AttributeModal.vue";
import CalcModal from "./CalcModal.vue";
import RoleAvatar from "./RoleAvatar.vue";
import AttributeTd from "./AttributeTd.vue";
import BuffTd from "./BuffTd.vue";
import TotalTd from "./TotalTd.vue";
import { getRoleList, removeRole } from "./api";

const dialog = useDialog();
const addModalRef = ref();
const attributeModalRef = ref();
const calcModalRef = ref();

const data = ref([]);
const expandKeys = ref([]);

const formParams = ref({
    basicAttack: 3500,
    basicAttribute: 24500,
});

const refreshRoleList = () => {
    let roleList = getRoleList();
    data.value = roleList;
    expandKeys.value = roleList.map(item => item.id);
};

const options = [
    {
        label: "修改角色名",
        key: "update",
    },
    {
        label: "删除",
        key: "remove",
    },
];

const handleSelect = data => key => {
    if (key == "update") {
        addModalRef.value.openModal(data);
    } else {
        dialog.warning({
            title: "删除角色",
            content: "删除后，将无法恢复该数据！",
            positiveText: "确认",
            negativeText: "取消",
            onPositiveClick: () => {
                removeRole(data.id);
                refreshRoleList();
            },
        });
    }
};


const columns = [
    {
        type: 'expand',
        renderExpand: (row) => {
            return h(TotalTd, {
                role: row,
                cAttack: formParams.value.basicAttack ?? 1,
                cAttribute: formParams.value.basicAttribute ?? 1,
            });
        }
    },
    {
        title: "角色",
        key: "role",
        align: "center",
        width: 100,
        render(row) {
            return h(RoleAvatar, {
                role: row,
            });
        },
    },
    {
        title: "重要属性一览",
        key: "attribute",
        align: "center",
        render(row) {
            return h(AttributeTd, {
                role: row,
                tdClick: () => { },
            });
        },
    },
    {
        title: "奶量",
        key: "buff",
        align: "center",
        render(row) {
            return h(BuffTd, {
                role: row,
            });
        },
    },
    {
        title: "操作",
        key: "action",
        align: "center",
        width: 100,
        render(row) {
            return h(NSpace, { vertical: true }, [
                h(NButton, { size: "small", onClick: () => attributeModalRef.value.openModal(row) }, "属性调整"),
                h(NButton, { size: "small", onClick: () => calcModalRef.value.openModal(row) }, "奶量提升"),
                h(NDropdown, { size: "small", options: options, trigger: "click", onSelect: handleSelect(row) }, h(NButton, { size: "small" }, "更多")),
            ]);
        },
    },
];

onMounted(() => {
    refreshRoleList();
});
</script>
