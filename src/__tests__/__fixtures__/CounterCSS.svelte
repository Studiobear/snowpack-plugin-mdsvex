<script>
  import { createEventDispatcher } from 'svelte'
  export let value = 0
  export let step = 1

  const dispatch = createEventDispatcher()

  const onClick = (value) => {
    dispatch('counter', value)
  }
</script>

<style>
  button {
    padding: 0.25em;
    border: 1px solid rgb(78, 35, 35);
    background-color: #999;
    color: #fff;
  }
  h3 {
    font-size: 1.2em;
    font-weight: bold;
  }
</style>

<div>
  <h3>{value}</h3>
  <button on:click={() => onClick((value += step))}>+</button>
  <button on:click={() => onClick((value -= step))}>-</button>
</div>