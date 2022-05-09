<script lang="ts">

    import { onDestroy } from "svelte/internal";
    
    import { company, userIsMasterAdmin, userRoleInCompany } from "@/stores";
    import { db, subDocumentToStore } from "@/services/firebase/db";

    import LoadingWithNotFound from "@/components/misc/LoadingWithNotFound.svelte";
    import ComponentLoader from "@/components/misc/ComponentLoader.svelte";

    import CompanyLogo from "@/components/companies/CompanyLogo.svelte";

    export let id: string;
    let notFound: boolean = false;

    const unsub = subDocumentToStore(db.companies, id, company, () => notFound = true);

    onDestroy(() => unsub());

</script>

<LoadingWithNotFound loading={!$company} {notFound}>
    <div class="logo-wrapper mt-3">
        <CompanyLogo company={$company} />
    </div>
    <hr class="text-secondary"/>
    {#if $userIsMasterAdmin || ['operator', 'admin'].includes($userRoleInCompany) }
        <ComponentLoader importer={() => import("@/components/companies/InternalCargoesTable.svelte")} />
    {:else}
        <ComponentLoader importer={() => import("@/components/companies/PublicCargoesTable.svelte")} />
    {/if}
</LoadingWithNotFound>

<style lang="scss">
    .logo-wrapper {
        height: 3rem;
        text-align: center;
    }
</style>