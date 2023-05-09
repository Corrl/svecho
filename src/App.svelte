<script>
    import {onDestroy, tick} from 'svelte'
    import Switch from "./lib/Switch.svelte";

    const getUserMediaSupport = navigator.mediaDevices && navigator.mediaDevices.getUserMedia

    const MIN_DECIBELS = -45
    const FFT_SIZE = 128
    const PAUSE_BETWEEN_ECHOS = 800

    const RESTART_RECORDING_INTERVAL = 500
    const MIN_SOUND_TIME = 50
    const MIN_SILENCE_TIME = 600

    let initialized = false
    let microphonePermission = false

    let automaticRecording = false

    let mediaRecorder
    let chunks = []

    let audioContext
    let audioAnalyser
    let dataArray = []

    let audio
    let currentTime
    let src = ''

    let visualWidth
    let visualHeight

    $: barWidth = visualWidth / FFT_SIZE * 2

    let soundDetected = false
    let recording = false
    let paused = true
    let restartTimeout = null

    async function init() {
        audioContext = new AudioContext()
        await initMediaRecorder()
        initAudioVisualization()
        initialized = true
    }

    onDestroy(() => {
        clearInterval(restartRecordingInterval)
        clearTimeout(soundDetectedTimer)
        clearTimeout(silenceDetectedTimer)
    })

    async function initMediaRecorder() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({audio: true})
            microphonePermission = true
            mediaRecorder = new MediaRecorder(stream)
            mediaRecorder.onstart = () => {
                // console.log('mediaRecorder startet')
            }
            mediaRecorder.ondataavailable = (e) => {
                if (recording) {
                    chunks.push(e.data)
                    recording = false
                } else {
                    chunks = []
                }
            }
            mediaRecorder.onstop = async () => {
                // console.log('mediaRecorder stopped')
                if (chunks.length === 0) return
                const blob = new Blob(chunks, {type: mediaRecorder.mimeType})
                chunks = []
                if(src) URL.revokeObjectURL(src)
                src = URL.createObjectURL(blob)
                audio.load()
                await tick()
                play()
            }

            const audioStreamSource = audioContext.createMediaStreamSource(stream)
            const analyser = audioContext.createAnalyser()
            analyser.fftSize = FFT_SIZE
            analyser.minDecibels = MIN_DECIBELS
            audioStreamSource.connect(analyser)

            const bufferLength = analyser.frequencyBinCount
            dataArray = new Uint8Array(bufferLength)

            const detectSound = () => {
                if (automaticRecording) {
                    analyser.getByteFrequencyData(dataArray)

                    //optionally also visualize microphone input
                    // dataArray = dataArray

                    soundDetected = dataArray.some(d => d > 0)

                    if (soundDetected) {
                        startSoundDetectedTimer()
                    } else {
                        startSilenceDetectedTimer()
                    }
                }
                requestAnimationFrame(detectSound)
            };

            detectSound()

        } catch (error) {
            console.error(`The following getUserMedia error occurred: ${error}`)
        }
    }

    function initAudioVisualization() {
        const audioStreamSource = audioContext.createMediaElementSource(audio)
        audioAnalyser = audioContext.createAnalyser()
        audioAnalyser.fftSize = FFT_SIZE
        audioStreamSource.connect(audioAnalyser)
        audioAnalyser.connect(audioContext.destination)
        const bufferLength = audioAnalyser.frequencyBinCount
        dataArray = new Uint8Array(bufferLength)
    }

    $: if (!paused) setValues()

    function setValues() {
        if (paused) {
            dataArray = dataArray.fill(0)
            return
        }
        audioAnalyser.getByteFrequencyData(dataArray)
        dataArray = dataArray
        requestAnimationFrame(setValues)
    }

    async function record() {
        if (!initialized || recording) return
        recording = true
        stopPlayback()
        if (!automaticRecording) mediaRecorder.start()
    }

    function stopRecording() {
        if (!initialized) return
        if (mediaRecorder.state === 'recording') mediaRecorder.stop()
    }

    function stopPlayback() {
        clearTimeout(restartTimeout)
        restartTimeout = null
        audio.pause()
        currentTime = 0
    }

    function restart() {
        restartTimeout = setTimeout(() => play(), PAUSE_BETWEEN_ECHOS)
    }

    let restartRecordingInterval

    function initRecordingInterval() {
        restartRecording()
        restartRecordingInterval = setInterval(restartRecording, RESTART_RECORDING_INTERVAL)
    }

    function restartRecording() {
        if (recording) return
        if (mediaRecorder.state === 'recording') mediaRecorder.stop()
        if (mediaRecorder.state === 'inactive') mediaRecorder.start()
    }

    let soundDetectedTimer

    function startSoundDetectedTimer() {
        clearTimeout(silenceDetectedTimer)
        silenceDetectedTimer = null

        if (!soundDetectedTimer) {
            soundDetectedTimer = setTimeout(() => {
                // console.log('Sound detected for longer than', MIN_SOUND_TIME, 'ms')
                record()
            }, MIN_SOUND_TIME)
        }
    }

    let silenceDetectedTimer

    function startSilenceDetectedTimer() {
        clearTimeout(soundDetectedTimer)
        soundDetectedTimer = null

        if (!silenceDetectedTimer) {
            silenceDetectedTimer = setTimeout(() => {
                // console.log('Silence detected for longer than', MIN_SILENCE_TIME, 'ms')
                stopRecording()
            }, MIN_SILENCE_TIME)
        }
    }

    function handleKeydown(event) {
        if (event.code === 'Escape' && (!paused || restartTimeout)) stopPlayback()
        if (automaticRecording) return
        if (event.code === 'Space') record()
    }

    function handleKeyup(event) {
        if (automaticRecording) return
        if (event.code === 'Space') stopRecording()
    }

    function handleManualRecordStart(event) {
        if (!initialized || automaticRecording) return
        event.preventDefault()
        record()
    }

    function handleManualRecordStop() {
        if (automaticRecording) return
        stopRecording()
    }

    function handleSwitchChange(event) {
        automaticRecording = event.target.checked
        if (automaticRecording) {
            initRecordingInterval()
        } else {
            clearInterval(restartRecordingInterval)
            recording = false
            if (mediaRecorder.state === 'recording') mediaRecorder.stop()
        }
    }

    async function play() {
        try {
            await audio.play()
        } catch (error) {
            console.error('ERROR playing audio', error)
        }
    }
</script>

<svelte:window on:keydown={handleKeydown}
               on:keyup={handleKeyup}
/>

<audio {src}
       bind:this={audio}
       bind:paused
       bind:currentTime
       on:ended={restart}
>
</audio>
<main on:mousedown|preventDefault={handleManualRecordStart}
      on:mouseup={handleManualRecordStop}
      on:touchstart={handleManualRecordStart}
      on:touchend={handleManualRecordStop}
>
    <div id="control">
        <h1>
            Svecho
        </h1>
        {#if !initialized}
            <p>
                Record yourself and listen to the echo
            </p>
            <button id="init-btn"
                    on:click|stopPropagation={init}
            >
                initialize
            </button>
        {:else}
            {#if getUserMediaSupport && microphonePermission}
                <Switch checked={automaticRecording}
                        on:change={handleSwitchChange}
                />
                <p id="instruction">
                    {#if automaticRecording}
                        Simply start speaking to start recording.<br>
                        Stop speaking to stop recording and listen to playback in a loop.
                    {:else}
                        Click&thinsp;/&thinsp;touch anywhere on the screen or press 'Space' <u>and hold</u> to
                        record.<br>
                        Release to stop recording and listen to playback in a loop.
                    {/if}
                </p>
                <div id="control-btns"
                     on:click|stopPropagation
                     on:mousedown|stopPropagation
                     on:mouseup|stopPropagation
                     on:touchstart|stopPropagation
                     on:touchend|stopPropagation
                >
                    {#if recording}
                        <div class="recording">
                            REC
                        </div>
                    {:else if !paused || restartTimeout}
                        <button id="stop-btn"
                                on:click={stopPlayback}
                        >
                            ◼︎ STOP
                        </button>
                    {:else if src}
                        <button id="play-btn"
                                on:click={play}>
                            ▶︎ PLAY
                        </button>
                    {/if}
                </div>
            {:else if getUserMediaSupport && !microphonePermission}
                <p style="font-weight: bold;">
                    You need to grant access to your microphone
                </p>
                <p>
                    Watch out for a dialog or microphone icon in the address bar
                </p>
            {:else}
                <b>getUserMedia</b> is not supported on your browser 😔
            {/if}
        {/if}
    </div>
    <div id="visual-wrapper"
         bind:clientWidth={visualWidth}
         bind:clientHeight={visualHeight}
    >
        <svg xmlns="http://www.w3.org/2000/svg">
            {#each dataArray as d, index}
                <rect width={barWidth}
                      height={(d/255)*visualHeight}
                      x={index*barWidth}
                      y={visualHeight-((d/255)*visualHeight)}
                      fill="#ff3b00"
                />
            {/each}
        </svg>
    </div>
</main>

<style>
    main {
        height: 100%;
        display: grid;
        grid-template-rows:  5fr 1fr;
    }

    h1 {
        margin: auto auto 1em auto;
    }

    #control {
        margin: auto;
        padding: 4em 2em 2em 2em;
        display: grid;
        justify-items: center;
        text-align: center;
    }

    #instruction {
        font-size: .9em;
        line-height: 1.5em;
        min-height: 6em;
    }

    #init-btn {
        color: white;
        background: black;
    }

    #control-btns {
        display: flex;
        min-height: 6em;
        width: 9em;
    }

    .recording,
    button {
        margin: auto;
        font-size: 1.1em;
    }

    .recording {
        display: grid;
        place-content: center;
        width: 3.8em;
        height: 3.8em;
        border-radius: 50%;
        font-weight: bold;
        font-size: 1.15em;
        color: white;
        background: orangered;
    }

    #stop-btn,
    #play-btn {
        padding: 0;
        width: 6.6em;
        height: 2.8em;
    }

    #visual-wrapper {
        width: 100%;
        height: 100%;
    }

    svg {
        display: block;
        width: 100%;
        height: 100%;
    }

</style>
