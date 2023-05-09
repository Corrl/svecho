<script>
    import {onDestroy, tick} from 'svelte'
    import Switch from "./lib/Switch.svelte";
    import Shortcuts from "./lib/Shortcuts.svelte";

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
    let audioDataArray = []

    let micAnalyser
    let micDataArray = []

    let audio
    let currentTime
    let src

    let visualWidth
    let visualHeight

    $: barWidth = visualWidth / FFT_SIZE * 2

    let soundDetected = false
    let recording = false
    let paused = true

    async function init() {
        audioContext = new AudioContext()
        await initMediaRecorder()
        // initAudioVisualization()
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
                if (src) URL.revokeObjectURL(src)
                src = URL.createObjectURL(blob)
                // audio.load()
                await tick()
                await play()
            }

            const audioStreamSource = audioContext.createMediaStreamSource(stream)
            micAnalyser = audioContext.createAnalyser()
            micAnalyser.fftSize = FFT_SIZE
            micAnalyser.minDecibels = MIN_DECIBELS
            audioStreamSource.connect(micAnalyser)
            const bufferLength = micAnalyser.frequencyBinCount
            micDataArray = new Uint8Array(bufferLength)

        } catch (error) {
            console.error(`The following getUserMedia error occurred: ${error}`)
        }
    }

    function initAudioVisualization(audio) {
        const audioStreamSource = audioContext.createMediaElementSource(audio)
        audioAnalyser = audioContext.createAnalyser()
        audioAnalyser.fftSize = FFT_SIZE
        audioStreamSource.connect(audioAnalyser)
        audioAnalyser.connect(audioContext.destination)
        const bufferLength = audioAnalyser.frequencyBinCount
        audioDataArray = new Uint8Array(bufferLength)
    }

    $: if (!paused) setValues()
    let setValuesRequestID

    function setValues() {
        if (paused) {
            cancelAnimationFrame(setValuesRequestID)
            audioDataArray = audioDataArray.fill(0)
            return
        }
        audioAnalyser.getByteFrequencyData(audioDataArray)
        audioDataArray = audioDataArray
        setValuesRequestID = requestAnimationFrame(setValues)
    }

    let detectSoundRequestID

    function detectSound() {
        if (!automaticRecording) {
            cancelAnimationFrame(detectSoundRequestID)
            return
        }
        micAnalyser.getByteFrequencyData(micDataArray)

        soundDetected = micDataArray.some(d => d > 0)

        if (soundDetected) {
            startSoundDetectedTimer()
        } else {
            startSilenceDetectedTimer()
        }
        detectSoundRequestID = requestAnimationFrame(detectSound)
    }

    async function record() {
        if (recording) return
        recording = true
        stopPlayback()
        if (!automaticRecording && mediaRecorder.state === 'inactive') mediaRecorder.start()
        //else: with automaticRecording recorder is constantly restarted and so should already be running
    }

    function stopRecording() {
        if (!recording) return
        //might be called by silenceDetector or Shortcuts
        //even though no recording is in progress
        //recording is set to false in mediaRecorder.ondataavailable
        //so based on its value chunks are saved or discarded
        mediaRecorder.stop()
        if (automaticRecording) mediaRecorder.start()
    }

    let restartTimeout = null

    function stopPlayback() {
        if(!audio) return
        clearTimeout(restartTimeout)
        restartTimeout = null
        audio.pause()
        currentTime = 0
    }

    function restart() {
        restartTimeout = setTimeout(play, PAUSE_BETWEEN_ECHOS)
    }

    let restartRecordingInterval

    function initRecordingInterval() {
        restartRecordingInterval = setInterval(restartRecording, RESTART_RECORDING_INTERVAL)
    }

    function restartRecording() {
        if (recording) return
        //only 'recording' flag shows if intentional recording is active
        //state checks are necessary, because recorder might or might not be recording because of
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

    function handleSwitchChange(event) {
        automaticRecording = event.target.checked

        //cancel any ongoing recording for clear start in new mode
        //in case recording was in progress, it will be handled in mediaRecorder.ondataavailable
        if (mediaRecorder.state === 'recording') mediaRecorder.stop()

        if (automaticRecording) {
            mediaRecorder.start()
            initRecordingInterval()
            detectSound()
        } else {
            clearInterval(restartRecordingInterval)
            //detectSound is canceled via automaticRecording
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

<svelte:window on:keydown={(e) => {if (e.code === 'Escape') stopPlayback()}}/>

{#if initialized && !automaticRecording}
    <Shortcuts {record} {stopRecording}/>
{/if}

{#if src}
    <audio {src}
           bind:this={audio}
           bind:paused
           bind:currentTime
           on:ended={restart}
           use:initAudioVisualization
    >
    </audio>
{/if}

<main>
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
                <div id="control-btns">
                    {#if recording}
                        <div class="recording">
                            REC
                        </div>
                    {:else if !paused || restartTimeout}
                        <button id="stop-btn"
                                on:click|stopPropagation={stopPlayback}
                                on:mousedown|stopPropagation
                                on:mouseup|stopPropagation
                                on:touchstart|stopPropagation
                                on:touchend|stopPropagation
                        >
                            ◼︎ STOP
                        </button>
                    {:else if src}
                        <button id="play-btn"
                                on:click|stopPropagation={play}
                                on:mousedown|stopPropagation
                                on:mouseup|stopPropagation
                                on:touchstart|stopPropagation
                                on:touchend|stopPropagation
                        >
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
            {#each audioDataArray as d, index}
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

    #play-btn {
        background: var(--grey);
        color: var(--color-main);
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
