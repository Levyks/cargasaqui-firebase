<script lang="ts">
  import "./styles/main.scss";

  import { isLoading } from "svelte-i18n";

  import { Router, Route } from "svelte-routing";

  import { user } from "@/stores";
  import { routes } from "@/services/router";

  import LoadingFullPage from "@/components/misc/LoadingFullPage.svelte";
  import ComponentLoader from "@/components/misc/ComponentLoader.svelte";

  import Navbar from "@/components/layout/Navbar.svelte";

</script>

<LoadingFullPage loading={$isLoading || $user === undefined}>
  <Router>
    <div class="h-100 d-flex flex-column">
      <Navbar />
      <div class="flex-grow-1 container-fluid pt-2 d-flex flex-column">
        {#each Object.values(routes) as route}
          <Route path={route.path} let:params>
            <ComponentLoader importer={route.component} {params} />
          </Route>
        {/each}
      </div>  
    </div>
  </Router>
</LoadingFullPage>