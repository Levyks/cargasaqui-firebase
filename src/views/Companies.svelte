<script lang="ts">

    import { _ } from "svelte-i18n";
    import { onDestroy } from 'svelte';
    import { onSnapshot } from 'firebase/firestore';

    import { db } from "@/services/firebase/db";

    import LoadingFullPage from '@/components/misc/LoadingFullPage.svelte';
    import CompanyListItem from '@/components/companies/CompanyListItem.svelte';

    import type { Company } from "@/models";
    
    let companies: Company[];

    const unsub = onSnapshot(db.companies, snapshot => {
        companies = snapshot.docs.map(doc => doc.data());
    });

    onDestroy(unsub);

</script>

<LoadingFullPage loading={!companies}>
    <h1 class="text-center my-3">{ $_('companies.title') }</h1>
    <ul class="list-group">
        {#each companies as company (company.id)}
            <CompanyListItem {company} />
        {/each}
    </ul>
</LoadingFullPage>
