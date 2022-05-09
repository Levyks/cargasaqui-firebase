<script lang="ts">
    import { _ } from "svelte-i18n"
    import { Link } from "svelte-routing";

    import { routes } from "@/services/router";
    
    import CenteredFullPage from '@/components/misc/CenteredFullPage.svelte';
</script>

<CenteredFullPage>
    <div class="card card-width-sm shadow-lg">
        <div class="card-body">
            <h5 class="card-title mb-2">{$_('notFound.title')}</h5>
            <p class="card-text">{$_('notFound.description')}</p>
            <Link to={routes.home.path} class="btn btn-primary">{$_('notFound.goHome')}</Link>
        </div>
    </div>
</CenteredFullPage>
