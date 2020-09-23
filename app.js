new Vue({
    el: '#app',
    data: {
        playerLife: 100,
        monsterLife: 100,
        running: false,
        logs: [],
        textAtackPlayer: 'Jogador Atingiu o Monstro com ',
        textHealPlayer: 'Jogador se Curou em ',
        textAtackMonster: 'Monstro Atingiu o Jogador com ',
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0
        },

    },
    methods: {
        startGame() {

            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.logs = []
        },
        attack(especial) {
            
            this.attackPlayer(especial)
            this.attackMonster()  
            
        },
        attackPlayer(especial) {
            let hurt
            if(especial){
                hurt = this.getRandom(10, 15)
                this.monsterLife -= hurt
            }
            else{
                hurt = this.getRandom(5, 10)
                this.monsterLife -= hurt
            }

            if(this.monsterLife < 0)
                this.monsterLife = 0

            this.registerLog(this.textAtackPlayer + hurt, 'player')
        },
        attackMonster() {
            
            const hurt = this.getRandom(5, 13)
            this.playerLife -= hurt

            if(this.playerLife < 0)
                this.playerLife = 0

            this.registerLog(this.textAtackMonster + hurt, 'monster')
        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        heal() {
            let heal = this.getRandom(8, 15)
            this.playerLife += heal
            //const heal = this.getRandom(5, 15)
            //this.playerLife = Math.min(this.playerLife + heal, 100)
            this.attackMonster()
            if(this.playerLife > 100)
                this.playerLife = 100

            this.registerLog(this.textHealPlayer + heal, 'player')
        },
        registerLog(text, cls) {
            this.logs.unshift({ text, cls }) //adiciona sempre na primeira posição do array
        }

    },
    watch: {
       hasResult(value) {
           if(value) this.running = false
       } 
    }
})