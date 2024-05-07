<template>
    <component
    v-bind="$attrs"
    :is="tag"
    :class="btnClass"
    ><slot/></component>
</template>

<script setup>
    import {computed} from 'vue'

    const props = defineProps({
        block: {
            type: Boolean,
            default: false
        },
        tag: {
            type: String,
            default: 'button',
            validator: function (value) {
                return ['button', 'a', 'router-link'].indexOf(value) !== -1;
            }
        },
        theme: {
            type: String,
            default: 'primary',
            validator: function (value) {
                return ['primary', 'light'].indexOf(value) !== -1;
            }
        }
    })

    const btnClass = computed( () => {
        return {
            [`appbutton`]: true,
            [`appbutton-block`]: props.block
        }
    })

    const backColor = computed( () => {
        return ({
            'light': 'var(--app-color-light)',
            'primary': 'var(--app-color-blue)'
        }[props.theme])
    })

    const backColorHover = computed( () => {
        return ({
            'light': 'var(--app-color-blue)',
            'primary': 'var(--app-color-bluedark)'
        }[props.theme])
    })

    const backColorActive = computed( () => {
        return ({
            'light': 'var(--app-color-bluelight)',
            'primary': 'var(--app-color-bluelight)'
        }[props.theme])
    })

    const textColor = computed ( () => {
        return ({
            'light': 'var(--app-color-darkest)',
            'primary': 'var(--app-color-light)'
        }[props.theme])
    })

    const textColorHover = computed ( () => {
        return ({
            'light': 'var(--app-color-light)',
            'primary': 'var(--app-color-light)'
        }[props.theme])
    })

    const textColorActive = computed ( () => {
        return ({
            'light': 'var(--app-color-light)',
            'primary': 'var(--app-color-light)'
        }[props.theme])
    })
</script>

<style scoped>
    .appbutton {
        --background: v-bind(backColor);
        --color: v-bind(textColor);
        --borderwidth: 1px;
        --padding: var(--app-input-padding);

        animation: buttonText 0.3s linear 0.2s forwards;
        align-content: center;
        appearance: none;
        background-color: var(--background);
        border-color: var(--background);
        border-radius: 0.4rem;
        border-style: solid;
        border-width: var(--borderwidth);
        color: var(--color);
        cursor: pointer;
        display: inline-flex;
        font-family: var(--app-fontfamily);
        font-size: calc(var(--app-fontsize) * 1.2);
        font-variation-settings: 'wght' 800, 'slnt' 0, 'wdth' 135, 'opsz' 39;
        font-weight: 500;
        gap: var(--padding);
        justify-content: center;
        line-height: 1.2;
        padding: var(--padding);
        position: relative;
        text-align: center;
        text-decoration: none;
        text-transform: uppercase;
        transition: background-color 0.1s linear, border-color 0.1s linear, color 0.1s linear;
    }

    .appbutton:hover {
        --background: v-bind(backColorHover);
        --color: v-bind(textColorHover);
    }
    .appbutton:active {
        --background: v-bind(backColorActive);
        --color: v-bind(textColorActive);
    }

    .appbutton-block {
        width: 100%;
    }

    .appbutton[disabled] {
        cursor: default;
        filter: grayscale(1);
        pointer-events: none;
    }

    @keyframes buttonText {
        from {
            font-variation-settings: 'wght' 800, 'slnt' 0, 'wdth' 135, 'opsz' 39;
        } to {
            font-variation-settings: 'wght' 800, 'slnt' -10, 'wdth' 135, 'opsz' 39;
        }
    }
</style>