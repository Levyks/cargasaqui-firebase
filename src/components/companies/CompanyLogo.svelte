<script lang="ts">

    import { _ } from "svelte-i18n";
    import { scale } from "svelte/transition";
  
    import { getLogoSrc } from "@/models/company";
    import type { Company } from "@/models";
  
    export let company: Company;

    $: if(!company.logoSrc) {
        getLogoSrc(company).then(src => {
        company.logoSrc = src;
        });
    }
  
</script>

{#if company.logoSrc}
    <img 
        src={company.logoSrc} 
        alt={$_('companies.logoAlt', { values: { name: company.name } })} 
        in:scale={{duration: 1000}}
    >
{/if}
<style lang="scss">
  
    img {
      height: 100%;
      max-width: 100%;
      object-fit: contain;
    }
  
</style>