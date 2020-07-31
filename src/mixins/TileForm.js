export default {

    props: {
        value: [Object]
    },

    data() {
        return {
            form: this.value,
        }
    },

    watch: {
        input() {
            this.form = this.value;
        },
        form: {
            deep: true,
            handler() {
                this.onChange();
            }
        }
    },

    methods: {
        onChange() {
            this.$emit('input', this.form);
        }
    },

}