<template>
    <label>
        <input
            :disabled="isDisabled"
            :name="name"
            :placeholder="placeholder"
            :readonly="isDisabled"
            :required="isRequired"
            :title="title"
            :type="type"
            :value="value"
            :maxlength="7"
            @input="onInput"
            ref="input"
            class="input"
        />
        <p class="error" v-if="this.enableValidation">{{ error }}</p>
    </label>
</template>

<script>
import { emailValidator } from "./utils/emailValidator";
import { passwordValidator } from "./utils/passwordValidator";

export default {
    name: "TextInput",
    data() {
        return {
            error: "",
            isHovered: false,
            isActive: false,
            isValid: null
        };
    },
    props: {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        placeholder: String,
        value: String,
        type: {
            type: String,
            default: "text",
            validator: prop =>
                ["text", "email", "password", "code"].includes(prop)
        },
        isRequired: {
            type: Boolean,
            default: false
            // TODO: fix required markup to the correct HTML5 syntax
        },
        isDisabled: {
            type: Boolean,
            default: false
            // TODO: fix required markup to the correct HTML5 syntax
        },
        enableValidation: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        checkInput() {
            // Check if empty
            if (this.value === "") {
                this.error = "Please fill the filed";
                this.isValid = false;
                this.$emit("isValid", false);
            } else {
                this.error = "";
            }

            switch (this.type) {
                 case "code":
                    console.log("hello")
                    if (this.error === "" && !emailValidator(this.value)) {
                        this.error = "Please enter a correct email";
                        this.isValid = false;

                        this.$emit("isValid", false);
                    } else if (
                        this.error === "" &&
                        emailValidator(this.value)
                    ) {
                        this.isValid = true;

                        this.$emit("isValid", true);
                    }
                    break;
                case "email":
                    if (this.error === "" && !emailValidator(this.value)) {
                        this.error = "Please enter a correct email";
                        this.isValid = false;

                        this.$emit("isValid", false);
                    } else if (
                        this.error === "" &&
                        emailValidator(this.value)
                    ) {
                        this.isValid = true;

                        this.$emit("isValid", true);
                    }
                    break;

                case "password":
                    if (this.error === "" && !passwordValidator(this.value)) {
                        this.error =
                            "Please enter a stronger password (10 characters with 2 of low & UPPER case + special characters + numbers";
                        this.isValid = false;

                        this.$emit("isValid", false);
                    } else if (
                        this.error === "" &&
                        passwordValidator(this.value)
                    ) {
                        this.isValid = true;

                        this.$emit("isValid", true);
                    }
                    break;
            }
        },
        active() {
            this.isActive = true;
            this.isValid = null;
        },
        notActive() {
            this.isActive = false;
            if (this.enableValidation) this.checkInput();
        },
        onInput(e) {
            this.$emit("input", '#'+e.target.value);
            setTimeout(this.checkInput, 700);
        }
    },
};
</script>

<style>
    .input {
        padding: 0.5em;
        border-color: lightGray;
        border-width: 0.5px;
        box-sizing: box-sizing;
        font-size: 16px;
        --placeholder-color: lightGray;
    }
    .input::placeholder {
        color: var(--placeholder-color);
    }
</style>
