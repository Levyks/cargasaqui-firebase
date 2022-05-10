<script lang="ts">
    import { navigate } from "svelte-routing";
    import { routes } from "@/services/router";

    navigate(routes.companies.path);
</script>