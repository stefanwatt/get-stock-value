<script lang="ts">
	export let width: string = '24px';
	export let height: string = '24px';
</script>

<svg style="width:{width};height:{height}" viewBox="0 0 24 24">
	<slot />
</svg>
