<script>
    import {onMount} from 'svelte'

    export let record
    export let stopRecording

   function handleManualRecordStart(event) {
        //Prevent longpress menu from opening on mobile
        event.preventDefault()
        record()
    }

    onMount(() => {
        const main = document.querySelector('main')

        main.addEventListener('mousedown', handleManualRecordStart)
        main.addEventListener('mouseup', stopRecording)
        main.addEventListener('touchstart', handleManualRecordStart)
        main.addEventListener('touchend', stopRecording)

        return () => {
            main.removeEventListener('mousedown', handleManualRecordStart)
            main.removeEventListener('mouseup', stopRecording)
            main.removeEventListener('touchstart', handleManualRecordStart)
            main.removeEventListener('touchend', stopRecording)
        }
    })

    function handleKeydown(event) {
        if (event.code === 'Space') record()
    }

    function handleKeyup(event) {
        if (event.code === 'Space') stopRecording()
    }
</script>

<svelte:window on:keydown={handleKeydown}
               on:keyup={handleKeyup}
/>
