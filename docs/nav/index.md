---
layoutClass: m-nav-layout
outline: [2, 3, 4]
---

<script setup>
import { NAV_DATA } from './data'
</script>
<style src="./index.scss"></style>

# 前端导航

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>

<br />

::: tip
该导航基于 [maomao](https://github.com/maomao1996) 开发的基础上修改
:::
