<script>
  import { createEventDispatcher } from 'svelte'
  export let value = 0
  export let step = 1

  const dispatch = createEventDispatcher()

  const onClick = (value) => {
    dispatch('counter', value)
  }
</script>

<div>
  <h3>{value}</h3>
  <button on:click={() => onClick((value += step))}>+</button>
  <button on:click={() => onClick((value -= step))}>-</button>
</div>