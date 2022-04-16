new Vue({
    el: '#app',
    data: {
        running: true,
        salarioBruto: '',
        tipoSalario: '',
        aliquotaINSS: 0,
        aliquotaEfetivaINSS: 0,
        aliquotaEfetivaIRRF: 0,
        aliquotaIRRF: 0,
        taxaIRRF: 0,
        taxaTotalINSS: 0,
        taxaTotalIRRF: 0,
        salarioLiquido: 0,
        primeiraFaixaINSS: 0,
        segundaFaixaINSS: 0,
        terceiraFaixaINSS: 0,
        quartaFaixaINSS: 0,
        primeiraFaixaIRRF: 0,
        segundaFaixaIRRF: 0,
        terceiraFaixaIRRF: 0,
        quartaFaixaIRRF: 0,
        totalDescontos: 0
    },
    methods: {
        calculaAliquotaINSS() {
            if (this.salarioBruto <= 1212.00) {
                this.aliquotaINSS = 7.5
            } else if (this.salarioBruto > 1212 && this.salarioBruto <= 2427.35) {
                this.aliquotaINSS = 9
            } else if (this.salarioBruto > 2427.35 && this.salarioBruto <= 3641.03) {
                this.aliquotaINSS = 12
            } else if (this.salarioBruto > 3641.03 && this.salarioBruto <= 7087.22) {
                this.aliquotaINSS = 14
            }
        },

        calculaFaixasINSS() {
            if (this.salarioBruto <= 1212) {
                this.primeiraFaixaINSS = 1212 * 7.5 / 100
                const taxaTotalINSS = this.primeiraFaixaINSS
                this.taxaTotalINSS = taxaTotalINSS.toFixed(2)
            } else if (this.salarioBruto > 1212 && this.salarioBruto <= 2427.35) {
                this.primeiraFaixaINSS = 1212 * 7.5 / 100
                this.segundaFaixaINSS = (this.salarioBruto - 1212) * (9 / 100)
                const taxaTotalINSS = this.primeiraFaixaINSS + this.segundaFaixaINSS
                this.taxaTotalINSS = taxaTotalINSS.toFixed(2)
            } else if (this.salarioBruto > 2427.35 && this.salarioBruto <= 3641.03) {
                this.primeiraFaixaINSS = 1212 * 7.5 / 100
                this.segundaFaixaINSS = (2427.35 - 1212) * (9 / 100)
                this.terceiraFaixaINSS = (this.salarioBruto - 2427.35) * (12 / 100)
                const taxaTotalINSS = this.primeiraFaixaINSS + this.segundaFaixaINSS + this.terceiraFaixaINSS
                this.taxaTotalINSS = taxaTotalINSS.toFixed(2)
            } else if (this.salarioBruto > 3641.03 && this.salarioBruto <= 7087.22) {
                this.primeiraFaixaINSS = 1212 * 7.5 / 100
                this.segundaFaixaINSS = (2427.35 - 1212) * (9 / 100)
                this.terceiraFaixaINSS = (3641.03 - 2427.35) * (12 / 100)
                this.quartaFaixaINSS = (this.salarioBruto - 3641.03) * (14 / 100)
                const taxaTotalINSS = this.primeiraFaixaINSS + this.segundaFaixaINSS + this.terceiraFaixaINSS + this.quartaFaixaINSS
                this.taxaTotalINSS = taxaTotalINSS.toFixed(2)
            }
        },

        calculaAliquotaEfetivaINSS() {
            const aliquota = this.taxaTotalINSS / this.salarioBruto * 100
            this.aliquotaEfetivaINSS = aliquota.toFixed(2)
        },

        calculaAliquotaIRRF() {
            if (this.salarioBruto <= 1903.98) {
                this.aliquotaIRRF = 0
            } else if (this.salarioBruto > 1903.98 && this.salarioBruto <= 2826.65) {
                this.aliquotaIRRF = 7.5
                this.taxaIRRF = 142.8
            } else if (this.salarioBruto > 2826.65 && this.salarioBruto <= 3751.05) {
                this.aliquotaIRRF = 15
                this.taxaIRRF = 354.8
            } else if (this.salarioBruto > 3751.05 && this.salarioBruto <= 4664.68) {
                this.aliquotaIRRF = 22.5
                this.taxaIRRF = 636.13
            } else if (this.salarioBruto > 4664.68) {
                this.aliquotaIRRF = 27.5
                this.taxaIRRF = 869.36
            }
        },

        calculaFaixasIRRF() {
            const salarioSemINSS = this.salarioBruto - this.taxaTotalINSS
            if (salarioSemINSS <= 1903.98) {
                this.primeiraFaixa = 0
                const taxaTotalIRRF = this.primeiraFaixa
                this.taxaTotalIRRF = taxaTotalIRRF.toFixed(2)
            } else if (salarioSemINSS > 1903.98 && salarioSemINSS <= 2826.65) {
                this.primeiraFaixa = 0
                this.segundaFaixa = (salarioSemINSS - 1903.98) * (7.5 / 100)
                const taxaTotalIRRF = this.primeiraFaixa + this.segundaFaixa
                this.taxaTotalIRRF = taxaTotalIRRF.toFixed(2)
            } else if (salarioSemINSS > 2826.65 && salarioSemINSS <= 3751.05) {
                this.primeiraFaixa = 0
                this.segundaFaixa = (2826.65 - 1903.98) * (7.5 / 100)
                this.terceiraFaixa = (salarioSemINSS - 2826.65) * (15 / 100)
                const taxaTotalIRRF = this.primeiraFaixa + this.segundaFaixa + this.terceiraFaixa
                this.taxaTotalIRRF = taxaTotalIRRF.toFixed(2)
            } else if (salarioSemINSS > 3751.05 && salarioSemINSS <= 4664.68) {
                this.primeiraFaixa = 0
                this.segundaFaixa = (2826.65 - 1903.98) * (7.5 / 100)
                this.terceiraFaixa = (3751.05 - 2826.65) * (15 / 100)
                this.quartaFaixa = (salarioSemINSS - 3751.05) * (22.5 / 100)
                const taxaTotalIRRF = this.primeiraFaixa + this.segundaFaixa + this.terceiraFaixa + this.quartaFaixa
                this.taxaTotalIRRF = taxaTotalIRRF.toFixed(2)
            } else if (salarioSemINSS > 4664.68) {
                this.primeiraFaixa = 0
                this.segundaFaixa = (2826.65 - 1903.98) * (7.5 / 100)
                this.terceiraFaixa = (3751.05 - 2826.65) * (15 / 100)
                this.quartaFaixa = (4664.68 - 3751.05) * (22.5 / 100)
                this.quartaFaixa = (salarioSemINSS - 4664.68) * (27.5 / 100)
                const taxaTotalIRRF = this.primeiraFaixa + this.segundaFaixa + this.terceiraFaixa + this.quartaFaixa
                this.taxaTotalIRRF = taxaTotalIRRF.toFixed(2)
            }
        },

        calculaAliquotaEfetivaIRRF() {
            const aliquota = this.taxaTotalIRRF / (this.salarioBruto - this.taxaTotalINSS) * 100
            this.aliquotaEfetivaIRRF = aliquota.toFixed(2)
        },

        // calculaTaxaIRRF() {
        //     this.taxaTotalIRRF = (this.salarioBruto * (this.aliquotaIRRF / 100)) - this.taxaIRRF
        // },

        calculaSalarioLiq() {
            this.calculaAliquotaINSS()
            this.calculaFaixasINSS()
            this.calculaAliquotaEfetivaINSS()
            this.calculaAliquotaIRRF()
            this.calculaFaixasIRRF()
            this.calculaAliquotaEfetivaIRRF()
            this.running = false
            let salarioLiquido = 0
            if (this.tipoSalario === 'clt') {
                salarioLiquido = Number(this.salarioBruto) - Number(this.taxaTotalINSS) - Number(this.taxaTotalIRRF)
            } else if (this.tipoSalario === 'pj') {
                salarioLiquido = Number(this.salarioBruto) - Number(this.taxaTotalIRRF)
            }
            this.salarioLiquido = salarioLiquido.toFixed(2).replace('.', ',')
            this.totalDescontos = Number(this.taxaTotalINSS) + Number(this.taxaTotalIRRF)
        },
        calculaNovamente() {
            this.salarioBruto = ''
            this.salarioLiquido = 0
            this.aliquotaINSS = 0
            this.aliquotaIRRF = 0
            this.taxaTotalINSS = 0
            this.taxaTotalIRRF = 0
            this.totalDescontos = 0
            this.aliquotaEfetivaINSS = 0
            this.aliquotaEfetivaIRRF = 0
            this.running = true
        }
    }
})
