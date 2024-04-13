<template>
    <div>
        <h1 class="col p-4 display-5 fw-bold">Home</h1>
        <div class="row">
            <div class="col bg-info-subtle m-3 border border-3 border-black border-opacity-50">
                <img src="../../assets/graph.png" class="img-fluid">
                <br />
                <RouterLink to="/stats"
                    class="link-dark link-offset-1 link-underline-opacity-25 link-underline-opacity-100-hover">
                    Check stats
                </RouterLink>
            </div>
            <div class="col bg-info-subtle m-3 border border-3 border-black border-opacity-50">
                <img src="../../assets/device.png" class="img-fluid">
                <br />
                <RouterLink to="/manage"
                    class="link-dark link-offset-1 link-underline-opacity-25 link-underline-opacity-100-hover">Manage
                    Devices
                </RouterLink>
            </div>
            <div class="col bg-info-subtle m-3 border border-3 border-black border-opacity-50">
                <img src="../../assets/information.png" class="img-fluid">
                <br />
                <RouterLink to="/help"
                    class="link-dark link-offset-1 link-underline-opacity-25 link-underline-opacity-100-hover">Help
                </RouterLink>
            </div>
        </div>
    </div>
</template>