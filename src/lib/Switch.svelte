<script>
    export let checked = false;
    export let color = 'var(--color-main)'
    export let left = 'manual'
    export let right = 'automatic'
</script>

<div class="switch-wrapper"
     style:--color={color}
     on:mousedown|stopPropagation
     on:mouseup|stopPropagation
     on:touchstart|stopPropagation
     on:touchend|stopPropagation
>
    <div class="left-option" class:active={!checked}>
        {left}
    </div>
    <label class="switch">
        <input type="checkbox"
               bind:checked
               on:change
               on:change={(e) => e.target.blur()}
        />
        <span class="slider"></span>
    </label>
    <div class="right-option" class:active={checked}>
        {right}
    </div>
</div>

<style>

    .left-option.active {
        box-shadow: 0 4px 0 0 var(--grey);
    }

    .right-option.active {
        box-shadow: 0 4px 0 0 var(--svorange);
    }

    .switch-wrapper {
        margin-bottom: 2em;
        display: grid;
        grid-template-columns: 1fr max-content 1fr;
        gap: .5em;
        align-items: center;
        font-weight: bold;
        line-height: 1.4;
    }

    .switch-wrapper > div {
        margin: 0 auto;
        transition: box-shadow 300ms;
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--grey);
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 34px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
        border-radius: 50%;
    }

    input:checked + .slider {
        /*noinspection CssUnresolvedCustomProperty*/
        background-color: var(--color);
    }

    input:checked + .slider {
        /*noinspection CssUnresolvedCustomProperty*/
        box-shadow: 0 0 1px var(--color);
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
</style>