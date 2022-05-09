<script lang="ts">
    import { _ } from 'svelte-i18n';
    import { Link, navigate } from 'svelte-routing';

    import { getAuth, signOut } from 'firebase/auth';
    
    import logo from '@/assets/img/cargasaqui_semfundo.png';

    import { user } from "@/stores";
    import Spinner from "@/components/misc/Spinner.svelte";
    import { routes } from "@/services/router";

    let loadingLogout: boolean = false;

    function logout() {
        loadingLogout = true;

        const auth = getAuth();
        signOut(auth)
            .then(() => {
                navigate(routes.login.path);
            })
            .catch(() => {})
            .finally(() => {
                loadingLogout = false;
            });
    }

</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <Link class="navbar-brand" to={routes.home.path}>
            <img src={logo} alt={$_('navbar.logoAlt')} width="120">
        </Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-expanded="false">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <div class="navbar-nav w-100">
                <Link class="nav-link" to="/cargas">{$_('navbar.cargoes')}</Link>
                <div class="flex-grow-1 d-flex justify-content-end">
                    {#if $user}
                        <div class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdownUser" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {$user.displayName || $user.email}
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownUser">
                                <li>
                                    <Link class="dropdown-item" to={routes.profile.path}>{$_('navbar.editProfile')}</Link>
                                </li>
                                <li>
                                    <button class="dropdown-item btn-link d-flex align-items-center" type="submit" on:click={logout} disabled={loadingLogout}>
                                        {$_('navbar.logout')}
                                        {#if loadingLogout}
                                            <Spinner size={1} strokeWidth={0.5} className="ms-1"/>
                                        {/if}
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <span class="nav-link"></span>
                    {:else}
                        <Link class="nav-link" to={routes.login.path}>{$_('navbar.login')}</Link>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</nav>

